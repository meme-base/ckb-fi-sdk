import { PaletteOptions, ThemeOptions, alpha } from '@mui/material'
import { createCustomShadows } from './common/customShadows'
import { typography } from './common/typography'
import { customRadius } from './common/radius'
import { createShadow } from './common/shadows'

const GREY = {
  0: '#FFFFFF',
  50: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  1000: '#1E1B25',
  1100: '#1E1C25',
  A100: '#F5F5F5',
  A200: '#EEE',
  A400: '#BDBDBD',
  A700: '#616161'
}

const NEUTRAL = {
  50: '#F4F1FE',
  100: '#A69DBE',
  200: '#877F9B',
  300: '#726B83',
  400: '#38304E',
  500: '#4F4B5A',
  600: '#464250',
  700: '#3A3643',
  800: '#322E3A',
  900: '#18161E'
}

const DEFAULT = {
  lighter: NEUTRAL[500],
  light: NEUTRAL[700],
  main: NEUTRAL[800],
  dark: '#272430',
  darker: '#221F2A',
  contrastText: '#fff'
}

const PRIMARY = {
  lighter: '#8ed2ff',
  light: '#52baff',
  main: '#1d9bf0',
  dark: '#198ad6',
  darker: '#1673b2',
  contrastText: '#fff'
}

const SECONDARY = {
  light: '#9fd3f6',
  main: '#77c2f5',
  dark: '#64a4cf',
  contrastText: '#fff'
}

const INFO = {
  light: '#6BC9E0',
  main: '#00B8D9',
  dark: '#2A89A0',
  contrastText: '#fff'
}

const SUCCESS = {
  light: '#3ECC8A',
  main: '#30B466',
  dark: '#2A8659',
  contrastText: '#fff'
}

const WARNING = {
  light: '#F3AE70',
  main: '#FFA34E',
  dark: '#B17338',
  contrastText: '#fff'
}

const ERROR = {
  light: '#EF5B88',
  main: '#FF3471',
  dark: '#B52C58',
  contrastText: '#fff'
}

export const customPalette: PaletteOptions = {
  common: { black: '#000', white: '#FFF' },
  default: DEFAULT,
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  neutral: NEUTRAL,
  border: {
    default: '#292239',
    avatar: '#464250',
    image: '#483D63',
    tag: '#3F3758'
  },
  text: {
    primary: NEUTRAL[50],
    secondary: GREY[500],
    disabled: NEUTRAL[200],
    contrastText: NEUTRAL[50]
  },
  background: {
    default: '#000',
    paper: NEUTRAL[800],
    image: NEUTRAL[900],
    tooltip: NEUTRAL[600],
    neutral: alpha(GREY[500], 0.16)
  }
}

export const customThemeOptions: ThemeOptions = {
  direction: 'ltr',
  palette: customPalette,
  typography,
  shape: { borderRadius: 6 },
  radius: customRadius,
  shadows: createShadow(),
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500
    }
  },
  customShadows: createCustomShadows(customPalette)
}
