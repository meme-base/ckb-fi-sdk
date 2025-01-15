import { alpha, PaletteOptions, SimplePaletteColorOptions } from '@mui/material'

export function createCustomShadows(palette: PaletteOptions) {
  const color = palette.common?.black ?? '#000'
  const transparent = alpha(color, 0.16)

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z4: `0 4px 8px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    primary: `0 8px 16px 0 ${alpha(
      (palette.primary as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    info: `0 8px 16px 0 ${alpha(
      (palette.info as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    secondary: `0 8px 16px 0 ${alpha(
      (palette.secondary as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    success: `0 8px 16px 0 ${alpha(
      (palette.success as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    warning: `0 8px 16px 0 ${alpha(
      (palette.warning as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    error: `0 8px 16px 0 ${alpha(
      (palette.error as SimplePaletteColorOptions)?.main || '',
      0.24
    )}`,
    card: `0 0 2px 0 ${alpha(color, 0.2)}, 0 12px 24px -4px ${alpha(
      color,
      0.12
    )}`,
    dialog: `-40px 40px 80px -8px ${alpha(color, 0.24)}`,
    dropdown: `0 0 2px 0 ${alpha(color, 0.24)}, -20px 20px 40px -4px ${alpha(
      color,
      0.24
    )}`
  }
}
