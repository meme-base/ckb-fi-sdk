export interface IUserProfile {
  id: number
  name: string
  avatar_url: string
  had_set_profile: boolean
  had_verified_twitter: boolean
  had_new_bonus: boolean
  twitter?: {
    uid: string
    nickname: string
  }
}

export interface IUserStatistics {
  id: number
  name: string
  avatar_url: string
  address: string
  had_set_profile: boolean
  base_stat: {
    created_topics_count: number
    created_topics_proposals_count: number
    created_topics_votes_count: number
    created_proposals_count: number
    created_proposals_votes_count: number
    stake_count: number
    testnet_points: string
  }
}
