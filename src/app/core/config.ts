export interface EnvironmentConfig {
    serverUrl: string;
    healthcodeSSO_host: string,
    healthcodeSSO_redirectUri: string,
    healthcodeAccounts_host: string,
    pracAppClientId: string;
}

export interface EnvironmentConfigList {
    dev: EnvironmentConfig,
    uat: EnvironmentConfig,
    sit: EnvironmentConfig,
    prod: EnvironmentConfig
}

export const ENVIRONMENT_CONFIGS: EnvironmentConfigList = {
    dev: {
        serverUrl: 'https://epractice.ext.dev.healthcode.co.uk/api',
        healthcodeSSO_host: "https://auth.dev.healthcode.co.uk",
        healthcodeSSO_redirectUri: "https://epractice.ext.dev.healthcode.co.uk/",
        healthcodeAccounts_host: "https://accounts.dev.healthcode.co.uk",
        pracAppClientId: "practapp"
    },
    uat: {
        serverUrl: 'https://epractice.ext.uat.healthcode.co.uk/api',
        healthcodeSSO_host: "https://auth.uat.healthcode.co.uk",
        healthcodeSSO_redirectUri: "https://epractice.ext.uat.healthcode.co.uk/",
        healthcodeAccounts_host: "https://accounts.uat.healthcode.co.uk",
        pracAppClientId: "practapp"
    },
    sit: {
        serverUrl: 'https://epractice.ext.sit.healthcode.co.uk/api',
        healthcodeSSO_host: "https://auth.sit.healthcode.co.uk",
        healthcodeSSO_redirectUri: "https://epractice.ext.sit.healthcode.co.uk/",
        healthcodeAccounts_host: "https://accounts.sit.healthcode.co.uk",
        pracAppClientId: "practapp"
    },
    prod: {
        serverUrl: 'https://epractice.ext.healthcode.co.uk/api',
        healthcodeSSO_host: "https://auth.healthcode.co.uk",
        healthcodeSSO_redirectUri: "https://epractice.ext.healthcode.co.uk/",
        healthcodeAccounts_host: "https://accounts.healthcode.co.uk",
        pracAppClientId: "practapp"
    }
}