import { Theme, TooltipProps } from '@mui/material'

export default function Tooltip(theme: Theme) {
  // const isLight = theme.palette.mode === 'light'

  const arrowStyle = (ownerState: TooltipProps) => {
    const { placement = 'top' } = ownerState
    const isTop = placement.startsWith('top')
    const isRight = placement.startsWith('right')
    const isBottom = placement.startsWith('bottom')
    const isLeft = placement.startsWith('left')

    return {
      color: theme.palette.background.tooltip,
      ...(isTop && {
        bottom: '2px!important'
      }),
      ...(isRight && {
        left: '2px!important'
      }),
      ...(isBottom && {
        top: '2px!important'
      }),
      ...(isLeft && {
        right: '2px!important'
      })
    }
  }

  return {
    MuiTooltip: {
      defaultProps: {
        arrow: true
      },
      styleOverrides: {
        tooltip: {
          maxWidth: 500,
          padding: '12px 14px',
          fontSize: '12px',
          borderRadius: '8px',
          backdropFilter: 'blur(4px)',
          // backgroundColor: theme.palette.background.tooltip
          backgroundColor: '#25232d'
          // boxShadow: '0 0 2px 0 rgba(255,255,255,0.3)'
        },
        arrow: ({ ownerState }: { ownerState: TooltipProps }) => ({
          ...arrowStyle(ownerState),
          color: '#25232d'
        })
      }
    }
  }
}
