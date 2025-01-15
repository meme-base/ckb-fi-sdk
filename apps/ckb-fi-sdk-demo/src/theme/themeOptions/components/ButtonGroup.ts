import { alpha, Theme } from '@mui/material'
import { ButtonGroupProps } from '@mui/material'
import { BUTTON_COLORS } from '../../types'

// NEW VARIANT
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    default: true
  }
}

export default function ButtonGroup(theme: Theme) {
  const rootStyle = (ownerState: ButtonGroupProps) => {
    const inheritColor = ownerState.color === 'inherit'

    const containedVariant = ownerState.variant === 'contained'

    const outlinedVariant = ownerState.variant === 'outlined'

    const textVariant = ownerState.variant === 'text'

    const horizontalOrientation = ownerState.orientation === 'horizontal'

    const verticalOrientation = ownerState.orientation === 'vertical'

    const defaultStyle = {
      '& .MuiButtonGroup-grouped': {
        '&:not(:last-of-type)': {
          ...(!outlinedVariant && {
            borderStyle: 'solid',
            ...(inheritColor && {
              borderColor: alpha(theme.palette.grey[500], 0.32)
            }),
            // HORIZONTAL
            ...(horizontalOrientation && {
              borderWidth: '0px 1px 0px 0px'
            }),
            // VERTICAL
            ...(verticalOrientation && {
              borderWidth: '0px 0px 1px 0px'
            })
          }),
          '&:hover': {
            borderRightColor: alpha(theme.palette.default?.dark, 0.4)
          }
        }
      }
    }

    const colorStyle = BUTTON_COLORS.map(color => ({
      '& .MuiButtonGroup-grouped': {
        '&:not(:last-of-type)': {
          ...(!outlinedVariant && {
            ...(ownerState.color === color && {
              // CONTAINED
              ...(containedVariant && {
                borderColor: alpha(theme.palette[color]?.dark, 0.4)
              }),
              // TEXT
              ...(textVariant && {
                position: 'relative',
                border: 'unset!important',
                '&:before': {
                  position: 'absolute',
                  content: "''",
                  right: 0,
                  top: '50%',
                  transform: 'translate3d(0,-50%,0)',
                  width: 1,
                  height: '1em',
                  background: alpha(theme.palette[color]?.main, 0.48)
                }
              })
            })
          })
        }
      }
    }))

    const disabledState = {
      '& .MuiButtonGroup-grouped.Mui-disabled': {
        '&:not(:last-of-type)': {
          borderColor: theme.palette.action.disabledBackground
        }
      }
    }

    return [defaultStyle, ...colorStyle, disabledState]
  }

  return {
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonGroupProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
