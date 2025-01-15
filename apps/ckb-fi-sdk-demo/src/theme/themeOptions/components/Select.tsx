import { Theme } from '@mui/material'
import { InputSelectIcon } from './CustomIcons'

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon
        // size: 'small'
      },
      styleOverrides: {
        root: {
          '&.MuiInputBase-root': {
            minWidth: 150,
            height: 50,
            borderRadius: theme.radius.default,
            '&.MuiInputBase-sizeSmall': {
              height: 40,
              '& .MuiSelect-select, & input': {
                fontSize: 14
              }
            },
            '.select-placeholder': {
              color: theme.palette.text.disabled
            }
          }
        },
        input: {
          height: 50,
          padding: '0 14px!important',
          fontSize: 15,
          color: theme.palette.text.primary,
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        },
        icon: {
          color: theme.palette.neutral[100]
        }
      }
    }
  }
}
