export interface IAccountInfo {
  token: string
  chainId: number
  signerType: any
  signerSignType: any
  walletName: string
  address: string
  ckbAddress: string
}
export const TOKEN_KEY = 'ckb-fi:user:token'
export const CONTRACT_VERSION_KEY = 'ckb-fi:contract_version'
export const ACCOUNT_INFO_KEY = 'ckb-fi:account'

class AuthManagerClass {
  token: string
  contractVersion: string // 合约版本 1 | 2，默认 2
  detailTmpVersion: string // 详情页使用接口中的 version 字段，优先级高于全局的 contractVersion，仅在详情页使用
  accountInfo: IAccountInfo | null

  constructor() {
    this.contractVersion = localStorage.getItem(CONTRACT_VERSION_KEY) || '2'
    this.detailTmpVersion = ''
    this.token = localStorage.getItem(TOKEN_KEY) || ''
    this.accountInfo = JSON.parse(
      localStorage.getItem(ACCOUNT_INFO_KEY) || 'null'
    )
  }
  setSession(account_info: IAccountInfo) {
    const { token } = account_info
    this.token = token
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(ACCOUNT_INFO_KEY, JSON.stringify(account_info))
  }
  setContractVersion(version: string) {
    this.contractVersion = version
    localStorage.setItem(CONTRACT_VERSION_KEY, version)
  }
  clearSession() {
    this.contractVersion = ''
    this.detailTmpVersion = ''
    this.token = ''
    this.accountInfo = null

    localStorage.clear()
    sessionStorage.clear()
  }
}

export const AuthManager = new AuthManagerClass()
