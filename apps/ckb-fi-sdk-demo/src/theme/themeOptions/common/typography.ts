export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 14)
}

export function pxToRem(value: number) {
  return `${value / 14}rem`
}

export function responsiveFontSizes({
  sm,
  md,
  lg
}: {
  sm: number
  md: number
  lg: number
}) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  }
}

const FONT_PRIMARY = [
  'Inter', // 默认字体
  // 'Pixelify Sans Variable', // 默认字体
  '"Helvetica Neue"',
  'Helvetica',
  'Roboto',
  '"Microsoft YaHei"',
  'Arial',
  '"sans-serif"',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"'
].join(',')

export const typography = {
  htmlFontSize: 14,
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 20, lg: 20 })
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 })
  },
  subtitle1: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
    // textTransform: 'capitalize'
  },
  subtitle2: {
    fontWeight: 700,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
    // textTransform: 'capitalize'
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(16)
  },
  body2: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14)
  },
  caption: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(12)
    // textTransform: 'capitalize'
  },
  overline: {
    fontWeight: 700,
    lineHeight: pxToRem(20),
    fontSize: pxToRem(12)
    // textTransform: 'capitalize'
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14)
    // textTransform: 'capitalize'
  }
} as const
