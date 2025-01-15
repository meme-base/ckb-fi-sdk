import { Theme } from '@mui/material'
import { RadioProps } from '@mui/material'
import { RadioIcon, RadioCheckedIcon } from './CustomIcons'

// const RadioIcon = styled('span')((theme: ThemeOptions) => {
//   const palette = theme.palette as any
//   return {
//     display: 'inline-block',
//     width: '100%',
//     height: '100%',
//     backgroundColor: palette?.action.default,
//     borderRadius: 'inherit'
//   }
// })

// const RadioCheckedIcon = styled('span')((theme: ThemeOptions) => {
//   const palette = theme.palette as any
//   return {
//     position: 'absolute',
//     zIndex: 1,
//     width: '6px',
//     height: '6px',
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     margin: 'auto',
//     backgroundColor: palette?.action.default,
//     borderRadius: 'inherit'
//   }
// })

export default function Radio(_theme: Theme) {
  return {
    MuiRadio: {
      defaultProps: {
        size: 'small',
        disableRipple: true,
        icon: <RadioIcon />,
        checkedIcon: <RadioCheckedIcon />
      },
      styleOverrides: {
        root: ({
          ownerState: { size = 'small' }
        }: {
          ownerState: RadioProps
        }) => ({
          // padding: theme.spacing(1),
          padding: 0,
          ...(size === 'small' && {
            '& svg': { width: 16, height: 16 }
          }),
          ...(size === 'medium' && {
            '& svg': { width: 20, height: 20 }
          })
        })
      }
    }
  }
}
