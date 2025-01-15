import { PageResponse, request, IPagerParams } from '@/request'
import { ReqSearchCategory } from '@/types/request/common'
import { SearchCategories } from '@/types/module/common'
import {
  BondingAccountItem,
  BondingFollowerRewardItem,
  BondingItem,
  IBondingDetail,
  KlineItem,
  TransactionItem
} from '@/types/module/bonding'
import {
  ReqAddBonding,
  ReqBuyBonding,
  ReqEstimateCKB,
  ReqEstimateShare,
  ReqGetBondingKline,
  ReqGetBondingList,
  ReqGetMyBondingList,
  ReqGetFavoriteBondingList,
  ReqGetFansRewardsHistory,
  ReqPackingClaim,
  ReqPreSellBonding,
  ReqSellBonding,
  ResEstimateClaim,
  ReqClaimByCreator,
  ResClaimByCreator,
  ReqEstimateRewards,
  ResEstimateRewards,
  ReqClaimFollowReward,
  ResClaimFollowReward,
  ReqDirectLaunchBonding,
  ReqActiveBondingOrder,
  ResActiveBondingOrder,
  ReqEstimateRewardsV2,
  ResEstimateRewardsV2,
  ReqClaimByCreatorV2,
  ResClaimByCreatorV2,
  ReqClaimFollowRewardV2,
  ResClaimFollowRewardV2,
  ReqClaimQuotedReward
} from '@/types/request/bonding'

export function getBondingList(params: ReqGetBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>('/v1/bondings', {
    params,
    rawResponse: true
  })
}

export function getPopularBondingList(params: ReqGetBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>('/v1/bondings/popular', {
    params,
    rawResponse: true
  })
}

export function getMyBondings(params: ReqGetMyBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>('/v1/bondings/my', {
    params,
    rawResponse: true
  })
}

export function searchCategories(params: ReqSearchCategory) {
  return request.api.get<SearchCategories>('/v1/search/nowmeme', {
    params
  })
}

export function getFavoriteBondings(params: ReqGetFavoriteBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>(
    '/v1/bonding_follower_rewards/following_bondings',
    {
      params,
      rawResponse: true
    }
  )
}

export function directLaunchBonding(data: ReqDirectLaunchBonding) {
  return request.api.post<BondingItem>('/v1/bondings/direct_launch', { data })
}

export function getFansRewardsHistory(params: ReqGetFansRewardsHistory) {
  return request.api.get<PageResponse<BondingFollowerRewardItem[]>>(
    '/v1/bonding_follower_rewards',
    {
      params,
      rawResponse: true
    }
  )
}

export function favoriteBonding(bonding_id: number) {
  return request.api.post<BondingItem>(`/v1/bondings/${bonding_id}/favorite`)
}

export function unfavoriteBonding(bonding_id: number) {
  return request.api.post<BondingItem>(`/v1/bondings/${bonding_id}/unfavorite`)
}

export function addBonding(data: ReqAddBonding) {
  return request.api.post<BondingItem>('/v1/bondings/entry', { data })
}
export function activeBondingOrder(data: ReqActiveBondingOrder) {
  return request.api.post<ResActiveBondingOrder>('/v1/bonding_orders/active', {
    data
  })
}

export function getBondingDetail(bonding_id: number | string) {
  return request.api.get<IBondingDetail>(`/v1/bondings/${bonding_id}`)
}

export function getBondingDetailByRewardCode(follower_reward_code: string) {
  return request.api.get<IBondingDetail>(
    `/v1/bonding_follower_rewards/bonding`,
    {
      params: { follower_reward_code }
    }
  )
}

export function getBondingKline(params: ReqGetBondingKline) {
  return request.api.get<KlineItem[]>(
    `/v1/bondings/${params.bonding_id}/kline`,
    {
      params
    }
  )
}

export function getBondingTransactions(
  params: IPagerParams & { bonding_id_eq?: number }
) {
  return request.api.get<TransactionItem[]>('/v1/bonding_trade_logs', {
    params
  })
}

export function getBondingAccounts(
  params: IPagerParams & { bonding_id_eq?: number }
) {
  return request.api.get<BondingAccountItem[]>('/v1/bonding_accounts', {
    params
  })
}

export function estimateShare(data: ReqEstimateShare) {
  return request.api.post<{ share: number }>(
    '/v1/bonding_orders/estimate_share',
    {
      data
    }
  )
}

export function estimateCKB(data: ReqEstimateCKB) {
  return request.api.post<{ order_amount: string }>(
    '/v1/bonding_orders/estimate_order_amount',
    {
      data
    }
  )
}

export function buyBonding(data: ReqBuyBonding) {
  return request.api.post('/v1/bonding_orders/buy', {
    data
  })
}

export function preSellBonding(data: ReqPreSellBonding) {
  return request.api.post('/v1/bonding_orders/pre_sell', {
    data
  })
}

export function sellBonding(data: ReqSellBonding) {
  return request.api.post('/v1/bonding_orders/sell', {
    data
  })
}

export function packagingClaim(data: ReqPackingClaim) {
  return request.api.post('/v1/bonding_claim_orders/packaging', {
    data
  })
}

export function estimateClaim(bonding_id: number) {
  return request.api.post<ResEstimateClaim>(
    '/v1/bonding_claim_orders/estimate_claim',
    {
      data: { bonding_id },
      noToast: true
    }
  )
}

export function estimateRewards(data: ReqEstimateRewards) {
  return request.api.post<ResEstimateRewards>(
    '/v1/bonding_follower_rewards/estimate_claim',
    {
      data
    }
  )
}

export function claimByCreator(data: ReqClaimByCreator) {
  return request.api.post<ResClaimByCreator>(
    '/v1/bonding_follower_rewards/owner_claim',
    {
      data
    }
  )
}

export function claimFollowReward(data: ReqClaimFollowReward) {
  return request.api.post<ResClaimFollowReward>(
    '/v1/bonding_follower_rewards/claim',
    {
      data
    }
  )
}

export function estimateRewardsV2(data: ReqEstimateRewardsV2) {
  return request.api.post<ResEstimateRewardsV2>(
    '/v2/bonding_follower_rewards/estimate_claim',
    {
      data
    }
  )
}

export function claimByCreatorV2(data: ReqClaimByCreatorV2) {
  return request.api.post<ResClaimByCreatorV2>(
    '/v2/bonding_follower_rewards/owner_claim',
    {
      data
    }
  )
}

export function claimFollowRewardV2(data: ReqClaimFollowRewardV2) {
  return request.api.post<ResClaimFollowRewardV2>(
    '/v2/bonding_follower_rewards/claim',
    {
      data
    }
  )
}

export function getQuotedBondings(params: ReqGetFavoriteBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>(
    '/v2/bonding_follower_rewards/quoted_bondings',
    {
      params
    }
  )
}

export function claimQuotedReward(data: ReqClaimQuotedReward) {
  return request.api.post<ResClaimFollowRewardV2>(
    '/v2/bonding_follower_rewards/quoted_claim',
    {
      data
    }
  )
}
