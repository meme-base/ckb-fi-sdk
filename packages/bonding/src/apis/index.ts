import { request } from '../request'
import { ReqUploadImage, ResUploadImage } from '../types/request/common'
import { ReqJoyIdLogin } from '../types/request/users'
import { BondingItem } from '../types/module/bonding'
import { ReqLaunch } from '../types/request/bonding'

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

export function launchBonding(url: string, token: string, data: ReqLaunch) {
  return request.api.post<BondingItem>(url, {
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
