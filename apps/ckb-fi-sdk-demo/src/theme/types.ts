export enum THEME_MODE {
  LIGHT = 'light',
  DARK = 'dark'
}

export const NAMED_COLORS = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error'
] as const

export type PositionSchema = 'top' | 'right' | 'bottom' | 'left'
export type SizeSchema = 'mini' | 'small' | 'medium' | 'large'
export type MuiSizeSchema = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ColorSchema =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export const BUTTON_COLORS = [
  'default',
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'error'
] as const

export interface ColorPaletteVariants {
  lighter: string
  light: string
  main: string
  dark: string
  darker: string
  contrastText: string
}

export interface CustomRadiusOptions {
  none: string
  xs: string
  sm: string
  default: string
  md: string
  lg: string
  xl: string
  xxl: string
  full: string
}
export interface CustomShadowOptions {
  z1: string
  z4: string
  z8: string
  z12: string
  z16: string
  z20: string
  z24: string
  primary: string
  secondary: string
  info: string
  success: string
  warning: string
  error: string
  card: string
  dialog: string
  dropdown: string
}
