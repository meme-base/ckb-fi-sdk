import { PageResponse, request } from '@/request'
import { BondingItem } from '@/types/module/bonding'
import { ReqGetBondingList, ReqLaunch } from '@/types/request/bonding'

export function getBondingList(params: ReqGetBondingList) {
  return request.api.get<PageResponse<BondingItem[]>>('/v1/bondings', {
    params,
    rawResponse: true
  })
}

export function launchBonding(data: ReqLaunch) {
  return request.api.post<BondingItem>('/v1/bondings/direct_launch', { data })
}
