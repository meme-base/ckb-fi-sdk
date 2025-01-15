import { NAMED_COLORS, THEME_MODE } from '../../types'
import { Theme } from '@mui/material'
import { AlertProps } from '@mui/material'
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './CustomIcons'

export default function Alert(theme: Theme) {
  const palette = theme.palette
  const isLight = palette.mode === THEME_MODE.LIGHT

  const rootStyle = (ownerState: AlertProps) => {
    const standardVariant = ownerState.variant === 'standard'

    const filledVariant = ownerState.variant === 'filled'

    const outlinedVariant = ownerState.variant === 'outlined'

    const colorStyle = NAMED_COLORS.map(color => ({
      ...(ownerState.severity === color && {
        // STANDARD
        ...(standardVariant && {
          color: palette[color][isLight ? 'darker' : 'lighter'],
          backgroundColor: palette[color][isLight ? 'lighter' : 'darker'],
          '& .MuiAlert-icon': {
            color: palette[color].light
          }
        }),
        // FILLED
        ...(filledVariant && {
          color: palette.common.white,
          backgroundColor: palette[color]?.main
        }),
        // OUTLINED
        ...(outlinedVariant && {
          color: palette[color][isLight ? THEME_MODE.DARK : THEME_MODE.LIGHT],
          border: `solid 1px ${palette[color]?.main}`,
          '& .MuiAlert-icon': {
            color: palette[color]?.main
          }
        })
      })
    }))

    return [...colorStyle]
  }

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />
        }
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: AlertProps }) =>
          rootStyle(ownerState),
        icon: {
          opacity: 1
        }
      }
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(0.5)
        }
      }
    }
  }
}
