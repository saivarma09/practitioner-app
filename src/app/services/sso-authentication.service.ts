import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SsoAuthenticationService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getTokenUsingParamCode(paramCode: string, clientId: string): Promise<any> {
    const pkceGeneratedCode = localStorage.getItem('pkceGeneratedCode');
    const codeVerifier = pkceGeneratedCode ? JSON.parse(pkceGeneratedCode).verifier : '';

    // Create the query parameters
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', paramCode)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', clientId)
      .set('code_verifier', codeVerifier);

    const observable$ = this.http.post<any>(`${environment.healthcodeSSO_host}/token`, null, { params }).pipe(
      map((data) => {

        const tokenObject: SsoSession = {
          token: data.access_token,
          idToken: data.id_token,
          refreshToken: data.refresh_token,
        };

        const ssoSession: any = {
          sessionData: tokenObject
        }

        return tokenObject;
      })
    );

    return firstValueFrom(observable$);
  }

  getUser(accessToken: string): Promise<any> {
    const headers = this.getHeadersByToken(accessToken);
    return firstValueFrom(
      this.http.get<any>(`${environment.healthcodeAccounts_host}/api/restricted/user`, { headers }).pipe(
        catchError(this.handleError('getUser'))
      )
    );
  }

  getUserFeature(userId: string, accessToken: string, siteId: string): Promise<any> {
    const headers = this.getHeadersByToken(accessToken, siteId);
    return firstValueFrom(
      this.http.get<any>(`${environment.healthcodeAccounts_host}/api/feature/list?userId=${userId}`, { headers }).pipe(
        catchError(this.handleError('getUserFeature'))
      )
    );
  }

  private getHeadersByToken(token: string, siteId: string = ''): HttpHeaders {

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'SU-SiteId': siteId,
    });
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<never> => {
      console.log(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation} failed. Please try again later.`));
    };
  }

  get redirectUri() {
    return window.location.href.toLowerCase().includes('localhost') ? 'http://localhost:4200/' : environment.healthcodeSSO_redirectUri;
  }
}

export interface SsoSession {
  idToken: string;
  token: string;
  refreshToken: string;
}
