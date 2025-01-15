import { ChangeEvent } from 'react'
import { InputProps, FilledInputProps, OutlinedInputProps } from '@mui/material'
import { BondingItem } from './bonding'

// 表单验证类型
export interface IFormItem<T> {
  label: string
  field: string
  value: T
  hidden?: boolean
  multiline?: boolean
  rows?: number
  placeholder: string
  validator?: (
    value: string | boolean,
    form: Record<string, IFormItem<T>>
  ) => string
  postFormat?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => string
  inputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
  useDivision?: boolean
  required: boolean
  error: boolean
  errorMessage: string
  validatorMessage?: string
}

export interface IEthereumError {
  code: number
  message: string
  stack: string
}

export interface ISearchCateGoryProposalRow {
  tweet_id: string
  tweet_content: string
  bonding: BondingItem | BondingItem[]
}

export interface ISearchCateGoryBondingRow {
  name: string
  symbol: string
  tweet_user_nickname: string
  tweet_user_username: string
  bonding: BondingItem
}

export interface ISearchCateGoryProposal {
  data: ISearchCateGoryProposalRow[]
}

export interface ISearchCateGoryBonding {
  data: ISearchCateGoryBondingRow[]
}

export interface SearchCategories {
  category_proposal: ISearchCateGoryProposal
  category_bonding: ISearchCateGoryBonding
}
