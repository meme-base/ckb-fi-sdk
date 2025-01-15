import {
  EnumPredictionState,
  EnumPredictionOptionState
} from '@/enum/prediction'

export interface PredictionItem {
  id: number
  state: EnumPredictionState
  title: string
  icon_url: string
  deadline: number
  rules: string
  options: IPredictionOption[]
  bonding_script_args: string
  ckb_bonding_prediction_address: string
  total_buy_count: number
  total_buy_amount: string
  is_owner: boolean
  owner: IPredictionOwnerInfo
  created_at: string
  updated_at: string
}

export interface IPredictionOption {
  id: number
  state: EnumPredictionOptionState
  content: string
  total_buy_count: number
  total_buy_amount: string
  user_had_buy: boolean
  user_buy_count: number
  user_buy_amount: string
  user_pending_orders: IPendingOrders[]
  created_at: string
  updated_at: string
}

export interface IPredictionOwnerInfo {
  owner_address: 'string'
  owner_twitter: {
    uid: 'string'
    nickname: 'string'
    username: 'string'
  }
}

export interface IPendingOrders {
  id: number
  state: string
  tx_hash: string
  amount: string
  created_at: string
  updated_at: string
}

export interface IPredictionEvent {
  title: string
  icon_url: string
  rules: string
  deadline: number
}
