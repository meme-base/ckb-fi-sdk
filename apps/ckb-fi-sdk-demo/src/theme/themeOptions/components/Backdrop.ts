import { alpha, Theme } from '@mui/material'

export default function Backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.common.black, 0.6),
          backdropFilter: 'blur(5px)'
        },
        invisible: {
          background: 'transparent',
          backdropFilter: 'unset'
        }
      }
    }
  }
}
