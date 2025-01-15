import { Theme } from '@mui/material'

export default function Card(theme: Theme) {
  const { palette } = theme

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          zIndex: 0,
          padding: '16px',
          backgroundColor: palette.background.paper,
          boxShadow: theme.customShadows?.card,
          borderRadius: 2
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: {
          variant: 'body2',
          marginTop: theme.spacing(0.5)
        }
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0)
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3)
        }
      }
    }
  }
}
