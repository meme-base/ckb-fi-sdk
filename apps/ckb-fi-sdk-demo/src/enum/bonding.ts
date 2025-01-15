export enum EnumBondingType {
  ALL = '',
  LAUNCHED = 'launched',
  My = 'my'
}

export enum EnumBondingState {
  ALL = '',
  SEED = 'seed',
  STARTING = 'starting',
  TRADING = 'trading',
  LAUNCHED = 'launched'
}

export enum EnumBondingAction {
  FAVORITED = 'favorited'
}

export enum EnumBondingOrderBy {
  CREATE_TIME = 'created_at',
  PROGRESS = 'current_progress',
  FOLLOWER_COUNT = 'followers_count'
}

export enum EnumLaunchType {
  DIRECT = 'direct',
  CURVE = 'curve'
}
