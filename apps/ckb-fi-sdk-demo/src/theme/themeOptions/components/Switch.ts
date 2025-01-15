import { Theme, alpha } from '@mui/material'
import { SwitchProps } from '@mui/material'
import { THEME_MODE } from '../../types'

export default function Switch(theme: Theme) {
  const isLight = theme.palette.mode === THEME_MODE.LIGHT

  const rootStyle = (ownerState: SwitchProps) => ({
    padding: '0 !important',
    width: 38,
    height: 20,
    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16,
      color: `${theme.palette.common.white} !important`,
      boxShadow: 'none'
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      borderRadius: 50,
      backgroundColor: alpha(theme.palette.grey[500], 0.48)
    },
    '& .MuiSwitch-switchBase': {
      padding: '0!important',
      left: 3,
      top: 2,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        '&+.MuiSwitch-track': { opacity: 1 }
      },
      '&.Mui-disabled': {
        '& .MuiSwitch-thumb': { opacity: isLight ? 1 : 0.48 },
        '&+.MuiSwitch-track': { opacity: 0.48 }
      }
    },
    ...(ownerState.size === 'small' && {
      width: 26,
      height: 16,
      '& .MuiSwitch-thumb': {
        width: 12,
        height: 12,
        color: `${theme.palette.common.white} !important`
      },
      '& .MuiSwitch-switchBase': {
        padding: '0!important',
        left: 2,
        top: 2,
        '&.Mui-checked': {
          transform: 'translateX(10px)',
          '&+.MuiSwitch-track': { opacity: 1 }
        },
        '&.Mui-disabled': {
          '& .MuiSwitch-thumb': { opacity: isLight ? 1 : 0.48 },
          '&+.MuiSwitch-track': { opacity: 0.48 }
        }
      }
    })
  })

  return {
    MuiSwitch: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
