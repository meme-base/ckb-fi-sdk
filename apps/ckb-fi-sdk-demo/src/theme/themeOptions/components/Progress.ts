import { Theme } from '@mui/material'
import { alpha, LinearProgressProps } from '@mui/material'
import { NAMED_COLORS } from '../../types'

export default function Progress(theme: Theme) {
  const rootStyle = (ownerState: LinearProgressProps) => {
    const bufferVariant = ownerState.variant === 'buffer'

    const defaultStyle = {
      borderRadius: 4,
      '& .MuiLinearProgress-bar': {
        borderRadius: 4
      },
      ...(bufferVariant && {
        backgroundColor: 'transparent'
      })
    }

    const colorStyle = NAMED_COLORS.map(color => ({
      ...(ownerState.color === color && {
        backgroundColor: alpha(theme.palette[color]?.main, 0.24)
      })
    }))

    return [...colorStyle, defaultStyle]
  }

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LinearProgressProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
