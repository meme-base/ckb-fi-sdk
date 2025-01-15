import { IPagerParams } from '@/request'
import { EnumPredictionState, EnumPredictionOrderBy } from '@/enum/prediction'
import { IPredictionEvent } from '../module/prediction'

export type ReqGetPredictionList = IPagerParams & {
  chain_id?: string
  bonding_id: number
  state_eq?: EnumPredictionState | string
  order_by?: EnumPredictionOrderBy | string
}

export interface ReqAddPrediction {
  bonding_id: number
  event: IPredictionEvent
  options: { content: string }[]
}

export interface ReqJudgePrediction {
  bonding_id: number
  event_id: number
  event_option_id: number
}

export interface ReqBuyPrediction {
  bonding_id: number
  event_option_id: number
  amount: number
  tx_hash: string
}

export interface ResBuyPrediction {
  id: number
  state: string
  tx_hash: string
  created_at: string
  updated_at: string
}

export interface ReqPackingClaim {
  bonding_id: number
  tx_hash: string
}
