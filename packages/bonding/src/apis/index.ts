import { request } from '../request'
import {
  ReqJoyIdLogin,
  BondingItem,
  I_LaunchParams,
  ReqUploadImage,
  ResUploadImage
} from '../types'

export function joyIdPresign(url: string, address: string) {
  return request.api.post<{ ticket: string }>(url, {
    data: { address }
  })
}

export function joyIdLogin(url: string, data: ReqJoyIdLogin) {
  return request.api.post(url, {
    data
  })
}

export function uploadImage(url: string, data: ReqUploadImage) {
  return request.api.post<ResUploadImage>('/v1/images/presigned', {
    data
  })
}

export function launchBonding(
  url: string,
  token: string,
  data: I_LaunchParams
) {
  return request.api.post<BondingItem>(url, {
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
