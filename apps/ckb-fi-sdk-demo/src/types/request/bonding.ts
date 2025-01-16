import {
  EnumBondingState,
  EnumBondingAction,
  EnumBondingOrderBy
} from '@/enum/bonding'
import { IPagerParams } from '@/request'

export type ReqGetBondingList = IPagerParams & {
  chain_id?: string
  topic_id_eq?: string
  outset?: number
  state_eq?: EnumBondingState | string
  action_eq?: EnumBondingAction | string
  order_by?: EnumBondingOrderBy | string
}

export interface ReqLaunch {
  bonding: {
    name: string
    symbol: string
    icon_url: string
    desc: string
    tokenized_url: string
  }
}
