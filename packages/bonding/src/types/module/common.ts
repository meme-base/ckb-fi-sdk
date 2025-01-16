import { ChangeEvent } from 'react'
import { InputProps, FilledInputProps, OutlinedInputProps } from '@mui/material'

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
