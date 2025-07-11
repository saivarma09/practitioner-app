import { ConfigurationService } from "../services/configuration-service";

export function appInitializerFn(configService: ConfigurationService) {
    return (): Promise<any> => configService.initiateApp();
}
