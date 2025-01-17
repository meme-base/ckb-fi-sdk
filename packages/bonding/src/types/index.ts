/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ReqJoyIdLogin {
  verify_type: string
  internal_address: string
  sign_response_data: any
  ticket: string
}

export interface ReqUploadImage {
  obj_type: 'bondings'
  file_content_type: string
  // file_content_type:
  //   | 'image/jpeg'
  //   | 'image/png'
  //   | 'image/gif'
  //   | 'image/bmp'
  //   | 'image/tiff'
  //   | 'image/webp'
}

export interface ResUploadImage {
  presigned_url: string
  url: string
}

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

export enum Enum_Env {
  DEV = 'dev',
  PROD = 'prod'
}

export interface I_BondingOptions {
  env?: Enum_Env
}

export interface I_SignMessageParams {
  signer: any
  ticket: string
}

export interface I_LoginParams {
  verify_type: string
  internal_address: string
  sign_response_data: any
  ticket: string
}

export interface I_LaunchParams {
  bonding: {
    name: string
    symbol: string
    icon_url: string
    desc: string
    tokenized_url: string
  }
}
