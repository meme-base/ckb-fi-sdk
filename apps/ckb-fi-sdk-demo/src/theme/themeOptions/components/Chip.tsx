import { NAMED_COLORS, THEME_MODE } from '../../types'
import { alpha } from '@mui/material'
import { ChipProps } from '@mui/material'
import { CloseIcon } from './CustomIcons'

// NEW VARIANT
declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true
    'contained-ramper'?: true
    'outlined-ramper'?: true
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Chip(theme: any) {
  const isLight = theme.palette.mode === THEME_MODE.LIGHT

  const rootStyle = (ownerState: ChipProps) => {
    const defaultColor = ownerState.color === 'default'

    const filledVariant = ownerState.variant === 'filled'

    const outlinedVariant = ownerState.variant === 'outlined'
    const containedRampVariant = ownerState.variant === 'contained-ramper'
    const outlinedRampVariant = ownerState.variant === 'outlined-ramper'

    const softVariant = ownerState.variant === 'soft'

    const defaultStyle = {
      ...(defaultColor && {
        '& .MuiChip-avatar': {
          color: theme.palette.text[isLight ? 'secondary' : 'primary'],
          backgroundColor: alpha(theme.palette.grey[500], 0.48)
        },
        // OUTLINED
        ...(outlinedVariant && {
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.grey[500], 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.32)
          }
        })
      })
    }

    const colorStyle = NAMED_COLORS.map(color => ({
      ...(ownerState.color === color && {
        '& .MuiChip-avatar': {
          color: theme.palette[color]?.lighter,
          backgroundColor: theme.palette[color]?.dark
        },
        // FILLED
        ...(filledVariant && {
          '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette.common.white, 0.56),
            '&:hover': {
              color: theme.palette.common.white
            }
          }
        }),
        // SOFT
        ...(softVariant && {
          color:
            theme.palette[color][isLight ? THEME_MODE.DARK : THEME_MODE.LIGHT],
          backgroundColor: alpha(theme.palette[color]?.main, 0.16),
          '&:hover': {
            backgroundColor: alpha(theme.palette[color]?.main, 0.32)
          },
          '& .MuiChip-deleteIcon': {
            color: alpha(
              theme.palette[color][
                isLight ? THEME_MODE.DARK : THEME_MODE.LIGHT
              ],
              0.48
            ),
            '&:hover': {
              color: theme.palette[color]?.dark
            }
          }
        }),

        ...(containedRampVariant && {
          color: theme.palette.text.contrastText,
          backgroundColor: theme.palette[color]?.main,
          transition: 'all ease 0.24s',
          borderRadius: 0,
          border: '1px solid transparent',
          borderImage: `linear-gradient(150deg, ${theme.palette[color]?.lighter}, transparent 30%) 1`,
          // clipPath: 'inset(0px round 1px)',
          '&:hover': {
            boxShadow: theme.customShadows[color]?.main,
            backgroundColor: theme.palette[color]?.light,
            borderImage: `linear-gradient(150deg, transparent 50%, ${theme.palette[color]?.lighter}) 1`
          },
          '&.Mui-disabled': {
            color: theme.palette.neutral[200],
            backgroundColor: theme.palette.neutral[700],
            borderImage: `linear-gradient(150deg, ${theme.palette.neutral[500]}, transparent 30%) 1`
          }
        }),
        // OUTLINEED-RAMP
        ...(outlinedRampVariant && {
          color: color === 'primary' ? theme.palette.text.primary : color,
          transition: 'all ease 0.24s',
          borderRadius: 0,
          border: '1px solid transparent',
          borderImage: `linear-gradient(150deg, ${theme.palette[color]?.main}, ${theme.palette[color]?.main} 40%) 1`,
          // clipPath: 'inset(0px round 1px)',
          '&:hover': {
            // backgroundColor: alpha(theme.palette[color]?.main, 0.1),
            backgroundColor: alpha(theme.palette[color]?.main, 1),
            borderImage: `linear-gradient(150deg, ${theme.palette[color]?.main} 50%, ${theme.palette[color]?.lighter}) 1`
          },
          '&.Mui-disabled': {
            color: theme.palette.neutral[200],
            borderColor: theme.palette.neutral[700],
            borderImage: `linear-gradient(150deg, ${theme.palette.neutral[300]}, ${theme.palette.neutral[700]} 40%) 1`
          }
        })
      })
    }))

    return [...colorStyle, defaultStyle]
  }

  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseIcon />
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: ChipProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
