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

export interface IBondingAccount {
  balance: string
  created_at: string
  updated_at: string
}

export interface IBondingExtraInfo {
  topic_state: string
  topic_tweet_id: string
  topic_content: string
  proposal_tweet_id: string
  proposal_content: string
  proposal_creator_address: string
}
