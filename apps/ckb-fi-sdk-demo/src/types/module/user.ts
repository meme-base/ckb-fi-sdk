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
