/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme, alpha } from '@mui/material'
import { ButtonProps } from '@mui/material'

export default function Button(theme: Theme) {
  const rootStyle = (ownerState: ButtonProps) => {
    const containedVariant = ownerState.variant === 'contained'
    const outlinedVariant = ownerState.variant === 'outlined'
    const textVariant = ownerState.variant === 'text'

    const smallSize = ownerState.size === 'small'
    const largeSize = ownerState.size === 'large'

    const defaultStyle = {
      height: 36,
      textTransform: 'initial',
      fontWeight: 500,
      '&.Mui-disabled': {
        // @ts-ignore
        color: `${alpha('#fff', 0.6)}!important`,
        backgroundColor: containedVariant
          ? // @ts-ignore
            theme.palette[ownerState.color]?.dark
          : 'unset',
        filter: 'grayscale(0.5) brightness(0.7)'
      },
      '& .MuiButton-startIcon': {
        marginRight: '5px'
      },
      '& .MuiButton-endIcon': {
        marginLeft: '5px'
      }
    }

    const size = {
      minWidth: 50,
      ...(smallSize && {
        height: 32,
        fontSize: 14
      }),
      ...(largeSize && {
        height: 48,
        padding: '8px 24px',
        fontSize: 14
      })
    }

    return [defaultStyle, size]
  }

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
