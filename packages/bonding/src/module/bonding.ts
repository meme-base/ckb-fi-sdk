import { joyIdPresign, joyIdLogin, launchBonding } from '../apis'
import { toast } from 'react-toastify'
import {
  Enum_Env,
  BondingItem,
  I_BondingOptions,
  I_SignMessageParams,
  I_LoginParams,
  I_LaunchParams
} from '../types'

export const TOKEN_KEY = 'ckb-fi-sdk:user:token'

export class Bonding {
  private env: Enum_Env
  private baseUrl: string
  private token: string

  constructor(options?: I_BondingOptions) {
    this.env = options?.env || Enum_Env.PROD
    this.baseUrl = `https://${this.env === Enum_Env.DEV ? 'dev.' : ''}api.ckb.fi/api/v1`
    this.token = localStorage.getItem(TOKEN_KEY) || ''
  }

  // 1.Get ticket by address
  async getTicket(ckbAddress: string): Promise<string> {
    const res = await joyIdPresign(
      `${this.baseUrl}/auth_tokens/joyid_persign`,
      ckbAddress
    ).catch((err: any) => {
      if (err instanceof Error) {
        throw new Error(`Get signature text failed: ${err.message}`)
      }
      throw new Error('Unknown error occurred while getting signature text')
    })

    const ticket = res.ticket

    if (!ticket) {
      toast.error('Failed to get ticket')
      return ''
    }
    console.log(ticket, 'ticket')

    return ticket
  }

  // 2.Sign ticket using your current provider
  async signMessage(params: I_SignMessageParams): Promise<any> {
    const res = await params.signer
      .signMessage(params.ticket)
      .catch((err: any) => {
        if (err instanceof Error) {
          throw new Error(`Failed to sign message: ${err.message}`)
        }
        throw new Error('Failed to sign message')
      })

    if (!res) {
      throw new Error('Failed to sign message')
    }

    console.log(res, 'signMessage')

    return res
  }

  // 3.Login to ckb.fi
  async login(params: I_LoginParams): Promise<string> {
    const res = await joyIdLogin(
      `${this.baseUrl}/auth_tokens/joyid_login`,
      params
    ).catch(err => {
      if (err instanceof Error) {
        throw new Error(`Login failed: ${err.message}`)
      }
      throw new Error('Unknown error occurred while login')
    })
    const token = res.token
    this.token = token
    localStorage.setItem(TOKEN_KEY, token)

    console.log(token, 'token')
    return token
  }

  // 4.Launch memecoin
  async launch(params: I_LaunchParams): Promise<BondingItem | undefined> {
    if (!this.token) {
      toast.error('Please login first')
      return
    }

    const res = await launchBonding(
      `${this.baseUrl}/bondings/direct_launch`,
      this.token,
      params
    ).catch((err: any) => {
      if (err instanceof Error) {
        throw new Error(`Login failed: ${err.message}`)
      }
      throw new Error('Unknown error occurred while login')
    })

    return res
  }
}
