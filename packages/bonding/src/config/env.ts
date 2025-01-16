export enum NODE_ENV_ENUMS {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export enum APP_ENV_ENUMS {
  DEV = "dev",
  PROD = "prod",
}

export const NODE_ENV = process.env.NODE_ENV;
export const APP_ENV =
  import.meta.env?.VITE_APP_ENV ??
  APP_ENV_ENUMS[
    /dev$/.test(process.env?.npm_lifecycle_script || "") ? "DEV" : "PROD"
  ];
export const IS_PRODUCTION = NODE_ENV === NODE_ENV_ENUMS.PRODUCTION;
export const IS_PROD_ENV = APP_ENV === APP_ENV_ENUMS.PROD;
export const IS_DEV_ENV = APP_ENV === APP_ENV_ENUMS.DEV;
