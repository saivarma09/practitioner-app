import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ENVIRONMENT_CONFIGS, EnvironmentConfig, EnvironmentConfigList } from '../core/config';
import { PkceService } from './pkce.service';
import { SsoAuthenticationService } from './sso-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  paramStateValue: string = '';
  prompt: 'none' | 'login' | 'consent' = 'none';

  constructor(
    private readonly ssoAuthenticationService : SsoAuthenticationService
  ) { 
    this.handleUrlParams()
  }

  private handleUrlParams(): void {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    const error = searchParams.get('error');

    if (error === 'login_required') {
      this.prompt = 'login';
    } else if (error === 'interaction_required' || error === 'consent_required') {
      this.prompt = 'consent';
    }

    const encodedState = searchParams.get('state');
    if (encodedState) {
      const decoded = this.decodeState(encodedState);
      this.paramStateValue = decoded;
    }
  }

  private decodeState(encodedState: string): string {
    try {
      return decodeURIComponent(atob(encodedState));
    } catch {
      return '';
    }
  }

  async initiateApp(): Promise<void> {
    await this.setUpEnvironmentConfig();
    await this.handleSsoAuthentication();
  }

  private async handleSsoAuthentication() {
    const user = sessionStorage.getItem('user');
    const decodedState = this.paramStateValue || this.decodeState(new URL(window.location.href).searchParams.get('state') || '');

    if (!user && (window.location.href.includes('/auth/') || decodedState.includes('auth'))) {
      await this.generateSsoSession();
    }
  }

  private async generateSsoSession(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const paramCodeValue = new URL(location.href).searchParams.get('code');
      if (!paramCodeValue) {
        this.redirectToHealthcodeSSO();
      } else {
        // Step 1: Get sessionData
        const sessionData = await this.ssoAuthenticationService
          .getTokenUsingParamCode(paramCodeValue, this.clientId)
          .catch((error) => {
            console.error('Error fetching session data:', error);
            reject()
          });

        if (!sessionData?.token) {
          console.error('Invalid session data. Access token is missing.');
          reject()
        }

        // Step 2: Get user
        const user = await this.ssoAuthenticationService
          .getUser(sessionData.token)
          .catch((error) => {
            console.error('Error fetching user data:', error);
            reject()
          });

        if (!user?.userId) {
          console.error('Invalid user data. User ID is missing.');
          reject()
        }

        // Step 3: Get features
        const features = await this.ssoAuthenticationService
          .getUserFeature(user.userId, sessionData.token, this.siteId)
          .catch((error) => {
            console.error('Error fetching user features:', error);
            reject()
          });

        let session = {
          sessionData,
          user,
          features,
        };

        session.sessionData.siteId = this.siteId;

        if (session && session.sessionData && session.user && session.features) {
          const features: any[] = session.features.flatMap((group: any) => group.features);
          const ssoSession: any = {
            sessionData: session.sessionData,
            user: session.user,
            userPermissions: this.getuserPermissions(features),
          };
          this.sessionService.epxSessionTransaction = ssoSession;
          this.checkAccessiblePage();
          resolve(true);
        } else {
          console.log('Incomplete ssoSession data received.');
        }
      }
    })
  }

  get clientId(): string {
    return environment.pracAppClientId;
  }

  get currentUrl(): string {
    return window.location.href;
  }

  set currentUrl(url: string) {
    window.location.href = url;
  }

  async redirectToHealthcodeSSO() {
    const pkceService: PkceService = new PkceService();
    const pkceGeneratedCode = await pkceService.generatePKCEPair();

    window.location.href = `${environment.healthcodeSSO_host}${this.getAuthoriseURLString(pkceGeneratedCode.challenge)}`
  }

  getAuthoriseURLString(codeChallenge: string): string {
    return `/authorize?client_id=${this.clientId}` +
      `&response_type=code&scope=openid%20siteid%20email%20offline_access` +
      `&prompt=${this.prompt}` +
      `&redirect_uri=${this.ssoAuthenticationService.redirectUri}` +
      `&state=${this.state}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`
  }

  private async setUpEnvironmentConfig() {
    return new Promise(async (resolve, reject) => {
      if (environment.production) {
        const currentEnvironment = await this.getEnvironment() as keyof EnvironmentConfigList;
        const environmentConfig: EnvironmentConfig = ENVIRONMENT_CONFIGS[currentEnvironment];
        await this.configureEnvironmentBasedOnConfig(environmentConfig);
        console.log(`Using the config file environment configuration for ${currentEnvironment}`);
        this.disableConsoleLogs();
      } else {
        console.log('Using the angular environment configuration, as production is false');
      }
      resolve(true);
    });
  }

  // Detect the environment from hostname
  private getEnvironment() {
    return new Promise(((_resolve, _reject) => {
      const hostname = location.hostname;
      if (hostname.includes('dev')) {
        _resolve('dev');
      } else if (hostname.includes('uat')) {
        _resolve('uat');
      } else if (hostname.includes('sit')) {
        _resolve('sit');
      } else {
        _resolve('prod');
      }
    }));
  }

  private configureEnvironmentBasedOnConfig(environmentConfig: EnvironmentConfig) {
    return new Promise((_resolve, reject) => {
      environment.serverUrl = environmentConfig.serverUrl ? environmentConfig.serverUrl : environment.serverUrl;
      environment.healthcodeAccounts_host = environmentConfig.healthcodeAccounts_host ? environmentConfig.healthcodeAccounts_host : environment.healthcodeAccounts_host;
      environment.healthcodeSSO_host = environmentConfig.healthcodeSSO_host ? environmentConfig.healthcodeSSO_host : environment.healthcodeSSO_host;
      environment.healthcodeSSO_redirectUri = environmentConfig.healthcodeSSO_redirectUri ? environmentConfig.healthcodeSSO_redirectUri : environment.healthcodeSSO_redirectUri;
      _resolve(environment);
    });
  }

  disableConsoleLogs(): void {
    console.log = function (): void { };
    console.debug = function (): void { };
    console.warn = function (): void { };
    console.info = function (): void { };
  }

}
