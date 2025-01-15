import { CheckboxProps } from '@mui/material'
import {
  CheckboxIcon,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon
} from './CustomIcons'

export default function Checkbox() {
  return {
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        indeterminateIcon: <CheckboxIndeterminateIcon />
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: CheckboxProps }) => ({
          // padding: theme.spacing(1),
          padding: 0,
          ...(ownerState.size === 'small' && {
            '& svg': { width: 22, height: 22 }
          }),
          ...(ownerState.size === 'medium' && {
            '& svg': { width: 26, height: 26 }
          })
        })
      }
    }
  }
}
