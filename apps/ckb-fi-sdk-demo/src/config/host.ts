import { APP_ENV, IS_PRODUCTION } from './env'
import { API_PREFIX } from '../constants/common'

export const HOST_CONFIG = {
  dev: 'https://dev.ckb.fi',
  prod: 'https://ckb.fi'
}

export const BACKEND_API_HOST_CONFIG = {
  dev: 'https://dev.api.ckb.fi',
  prod: 'https://api.ckb.fi'
}

export const HOST = HOST_CONFIG[APP_ENV as keyof typeof HOST_CONFIG]

export const BACKEND_API_HOST =
  BACKEND_API_HOST_CONFIG[APP_ENV as keyof typeof BACKEND_API_HOST_CONFIG]

export const BACKEND_API_URL = IS_PRODUCTION
  ? BACKEND_API_HOST + API_PREFIX
  : API_PREFIX
