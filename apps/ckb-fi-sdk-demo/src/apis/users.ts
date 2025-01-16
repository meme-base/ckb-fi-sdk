import { request } from '@/request'
import { ReqJoyIdLogin } from '@/types/request/users'
import { IUserProfile } from '@/types/module/user'

export function joyIdPresign(address: string) {
  return request.api.post<{ ticket: string }>('/v1/auth_tokens/joyid_persign', {
    data: { address }
  })
}

export function joyIdLogin(data: ReqJoyIdLogin) {
  return request.api.post('/v1/auth_tokens/joyid_login', {
    data: data
  })
}

export function getUserInfo() {
  return request.api.get<IUserProfile>('/v1/users/profile')
}
