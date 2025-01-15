import { EnumBondingState, EnumLaunchType } from '@/enum/bonding'

export interface BondingItem {
  id: number
  onchain_id: string
  state: string
  topic_id: string
  proposal_id: string
  name: string
  symbol: string
  marketcap: string
  is_owner: boolean
  favorited: boolean
  progress: string
  current_price: string
  icon_url: string
  ar_url: string
  swap_url: string
  order_num: number
  favorites_count: number
  holders_count: number
  last_share: string
  total_share: string
  total_supply: string
  final_supply: string
  token_address: string
  bonding_curve_address: string
  bonding_script_args: string
  created_at: string
  updated_at: string
  extra?: IBondingExtraInfo
  follower_reward_code: string
  tweet_followers_count: number
  follower_reward_claimed: boolean
  follower_reward_deadline: number
}

export interface IBondingDetail {
  id: number
  onchain_id: string
  state: EnumBondingState
  topic_id: string
  proposal_id: string
  name: string
  symbol: string
  marketcap: string
  launch_type: EnumLaunchType
  is_owner: boolean
  favorited: boolean
  progress: string
  current_price: string
  icon_url: string
  ar_url: string
  swap_url: string
  order_num: number
  holders_count: number
  favorites_count: number
  max_share: string
  total_share: string
  last_share: string
  total_supply: string
  final_supply: string
  token_address: string
  bonding_curve_address: string
  bonding_script_args: string
  contract: {
    args: string
    code_hash: string
    script_hash: string
    order_code_hash: string
    aggregator_hash: string
    cell_deps_tx_hash: string
    version: number
  }
  xudt: {
    script_hash: string
    args: string
  }
  can_active: boolean
  bonding_active_address: string
  created_at: string
  updated_at: string
  extra?: IBondingExtraInfo
  account?: IBondingAccount
  follower_reward_code: string
  follower_reward_distribution: string
  tweet_followers_count: number
  follower_reward_claimed: boolean
  follower_reward_deadline: number
}

export interface IBondingAccount {
  balance: string
  created_at: string
  updated_at: string
}

export interface IBondingObject {
  decimal: number
  name: string
  symbol: string
  token_address: string
}

export interface IBondingExtraInfo {
  topic_state: string
  topic_tweet_id: string
  topic_content: string
  proposal_tweet_id: string
  proposal_content: string
  proposal_creator_address: string
}

export interface TransactionItem {
  state: string
  trade_type: string
  created_at: string
  updated_at: string
  block_timestamp: number
  buy_price: string
  user_address: string
  average_price_after_fee: string
  buy_price_after_fee: string
  sell_price_after_fee: string
  fee: string
  share: string
  last_share: string
  tx_hash: string
  order_tx_hash: string
  bonding: {
    name: string
    symbol: string
    decimal: number
    token_address: string
  }
}

export interface BondingAccountItem {
  created_at: string
  updated_at: string
  balance: string
  bonding: BondingItem
}

export interface KlineItem {
  ts: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export interface BondingFollowerRewardItem {
  bonding?: BondingItem
  bonding_id: number
  created_at: string
  deadline: number
  distribution: number
  fail_reason: string
  id: number
  recipient_address: string
  reward_amount: string
  state: string
  token_address: string
  updated_at: string
}

export interface RewardItem {
  bonding_id: number
  created_at: string
  deadline: number
  distribution: number
  fail_reason: string
  id: number
  packaging_tx_hash: string
  recipient_address: string
  reward_amount: string
  state: string
  updated_at: string
}
