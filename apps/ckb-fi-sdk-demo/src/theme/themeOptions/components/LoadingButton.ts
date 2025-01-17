import { Theme } from '@mui/material'

export default function LoadingButton(theme: Theme) {
  const rootStyle = (ownerState: any) => {
    const { variant } = ownerState
    const containedVariant = variant === 'contained'
    const outlinedVariant = variant === 'outlined'

    return {
      '&.Mui-disabled': {
        // CONTAINED
        ...(containedVariant && {
          color: theme.palette.neutral[200],
          borderColor: theme.palette.neutral[700]
          // backgroundColor: alpha(color, 0.5)
        }),
        // OUTLINEED
        ...(outlinedVariant && {
          borderColor: theme.palette.neutral[700]
          // borderColor: color ? alpha(color, 0.5) : ''
        })
      }
    }
  }

  return {
    MuiLoadingButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        variant: 'contained',
        color: 'primary'
      },
      variants: [
        {
          props: { loading: true, loadingPosition: 'start', size: 'small' },
          style: {
            '& .MuiLoadingButton-loadingIndicatorStart': {
              left: 10
            }
          }
        },
        {
          props: { loading: true, loadingPosition: 'end', size: 'small' },
          style: {
            '& .MuiLoadingButton-loadingIndicatorEnd': {
              right: 10
            }
          }
        }
      ],
      styleOverrides: {
        root: ({ ownerState }: { ownerState: any }) => rootStyle(ownerState),
        loadingIndicatorStart: {
          left: 14
        },
        loadingIndicatorEnd: {
          right: 14
        }
      }
    }
  }
}
