export enum EnumPredictionState {
  ALL = '',
  ACTIVE = 'active',
  SETTLING = 'settling',
  RESOLVED = 'resolved'
}

export enum EnumPredictionOptionState {
  PENDING = 'pending',
  ACTIVE = 'active',
  WON = 'won',
  LOSS = 'loss'
}

export enum EnumPredictionOrderBy {
  CREATE_TIME = 'created_at',
  BUY_AMOUNT = 'total_buy_amount'
}
