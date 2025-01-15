import { request } from '@/request'
import {
  ReqAuthWallet,
  ReqGetAuthTicket,
  ReqUpdateUserInfo,
  ResAuthWallet,
  ResGetAuthTicket,
  ReqJoyIdLogin
} from '@/types/request/users'
import { IUserProfile, IUserStatistics } from '@/types/module/user'

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

export function authWallet(data: ReqAuthWallet) {
  return request.api.post<ResAuthWallet>('/v1/auth_tokens', {
    data: data
  })
}

export function getAuthTicketInfo(params: ReqGetAuthTicket) {
  return request.api.get<ResGetAuthTicket>('/v1/auth_tokens/new', {
    params
  })
}

export function getUserInfo() {
  return request.api.get<IUserProfile>('/v1/users/profile')
}

export function getUserStatistics() {
  return request.api.get<IUserStatistics>('/v1/users/base_stats')
}

export function updateUserInfo(data: ReqUpdateUserInfo) {
  return request.api.put<IUserProfile>('/v1/users/profile', {
    data: data
  })
}

export function getAuthUrl(data: { redirect_uri: string; provider: string }) {
  return request.api.post<{ auth_url: string }>('/v1/oauth2/gen_auth_url', {
    data
  })
}

export function authCallback(data: { code: string; provider: string }) {
  return request.api.post<{ id: number; name: string; avatar: string }>(
    '/v1/oauth2/callback',
    {
      data
    }
  )
}
