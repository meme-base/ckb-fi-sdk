import { alpha, Theme } from '@mui/material'

export default function Avatar(theme: Theme) {
  const palette = theme.palette

  return {
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: palette?.text.secondary,
          backgroundColor: alpha(palette?.grey[500], 0.24)
        }
      }
    },
    MuiAvatarGroup: {
      defaultProps: {
        max: 4
      },
      styleOverrides: {
        root: {
          justifyContent: 'flex-end'
        },
        avatar: {
          fontSize: 16,
          fontWeight: theme?.typography.fontWeightMedium,
          border: '1px solid #291E41',
          '&:first-of-type': {
            marginLeft: '2px',
            marginTop: '1px',
            fontSize: '14px',
            fontWeight: 700,
            color: palette.text.secondary,
            border: 'unset',
            backgroundColor: 'unset'
          }
        }
      }
    }
  }
}
