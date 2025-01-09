import { Enum_Env } from "../enum/env";

export const MapUrl = {
  [Enum_Env.DEV]: {
    CARV_ID_HOST: "https://ckb-fi-sdk-dev.carv.io",
    TELEGRAM_BOT_URL: "https://t.me/carv_identity_dev_bot",
    TELEGRAM_APP_URL: "https://t.me/carv_identity_dev_bot/carv_id",
  },
  [Enum_Env.PROD]: {
    CARV_ID_HOST: "https://ckb-fi-sdk.carv.io",
    TELEGRAM_BOT_URL: "https://t.me/carv_identity_bot",
    TELEGRAM_APP_URL: "https://t.me/carv_identity_bot/carv_id",
  },
};
