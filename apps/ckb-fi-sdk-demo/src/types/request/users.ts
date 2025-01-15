/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ReqJoyIdLogin {
  verify_type: string
  internal_address: string
  sign_response_data: any
  ticket: string
}

export interface ReqAuthWallet {
  signature: string
  message: string
  ticket: string
}

export interface ResAuthWallet {
  address: string
  token: string
  expires_at: string
}
export interface ReqGetAuthTicket {
  chain_id?: bigint
  address: string
}

export interface ResGetAuthTicket {
  message: string
  ticket: string
}

export interface ReqUpdateUserInfo {
  name: string
  avatar_url: string
}

export interface ReqChatJoinVerify {
  verify_token: string
}
