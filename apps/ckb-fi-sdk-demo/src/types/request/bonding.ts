/* eslint-disable @typescript-eslint/no-explicit-any */
import { BondingItem, RewardItem } from '../module/bonding'
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

export type ReqGetMyBondingList = IPagerParams & {
  chain_id?: string
}

export type ReqGetFavoriteBondingList = IPagerParams & {
  chain_id?: string
}

export type ReqGetFansRewardsHistory = IPagerParams & {
  chain_id?: string
}

export interface ReqDirectLaunchBonding {
  bonding: {
    name: string
    symbol: string
    icon_url: string
    desc: string
    tokenized_url: string
  }
}

export interface ReqAddBonding {
  bonding_onchain_id: string
  icon_url: string
  /**
   * proposal = 转发 @ 那条推文
   */
  proposal_tweet_content: string
  proposal_tweet_id: string
  /**
   * proposal 的创建者 xcom user_id
   */
  proposal_user_id: string
  /**
   * topic = 原文
   */
  topic_tweet_content: string
  topic_tweet_id: string
  /**
   * topic 创建者 xcom user id
   */
  topic_user_id: string
}

export interface ReqActiveBondingOrder {
  bonding_id: number
  share: number
  tx_hash: string
}

export interface ResActiveBondingOrder {
  id: number
  created_at: string
  updated_at: string
  tx_hash: string
}

export interface ResGetStakePoolTimeline {
  block_timestamp: number
  total_score: string
}

export interface ReqGetBondingKline {
  bonding_id: number
  period: number // 1 = 1m | 5 = 5m
  // chain_id: number
}

export interface ReqEstimateShare {
  bonding_id: string
  order_amount: number
  order_type: string
}

export interface ReqEstimateCKB {
  bonding_id: string
  share: number
  order_type: string
}

export interface ReqBuyBonding {
  bonding_id: number
  share: number
  tx_hash: string
}

export interface ReqPreSellBonding {
  bonding_id: number
  share: number
}

export interface ReqSellBonding {
  verify_type: string
  bonding_id: number
  share: number
  ticket: string
  internal_address: string
  sign_response_data: any
}

export interface ReqPackingClaim {
  bonding_id: number
  tx_hash: string
}

// V1
export interface ResEstimateClaim {
  claim_amount: number
  packaging_address: string
}

export interface ReqEstimateRewards {
  bonding_id: number
  distribution: number
}

export interface ResEstimateRewards {
  reward_amount: number
  distribution_amount?: number
  packaging_address: string
}

export interface ReqClaimByCreator {
  bonding_id: number
  distribution: number
  tx_hash: string
}

export interface ResClaimByCreator {
  code: string
  deadline: number
  reward: RewardItem
}

export interface ReqClaimFollowReward {
  bonding_id: number
  tx_hash: string
}

export interface ResClaimFollowReward {
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

// V2

export interface ResEstimateClaimV2 {
  claim_amount: number
  packaging_address: string
}

export interface ReqEstimateRewardsV2 {
  bonding_id: number
  follower_distribution: number
  quoted_distribution: number
  claim_type: 'quoted'
}

export interface ResEstimateRewardsV2 {
  reward_amount: number
  distribution_amount?: number
  packaging_address: string
}

export interface ReqClaimByCreatorV2 {
  bonding_id: number
  tx_hash: string
  follower_distribution: number
  quoted_distribution: number
}

export interface ResClaimByCreatorV2 {
  code: string
  deadline: number
  reward: RewardItem
}

export interface ReqClaimFollowRewardV2 {
  bonding_id: number
  tx_hash: string
}

export interface ResClaimFollowRewardV2 {
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

// export interface ReqGetQuotedBondings {}

export interface ReqClaimQuotedReward {
  bonding_id: number
  tx_hash: string
}

// export interface ResClaimQuotedReward {}
