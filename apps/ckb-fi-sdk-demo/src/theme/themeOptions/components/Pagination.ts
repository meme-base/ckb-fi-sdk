import { alpha, Theme } from '@mui/material'
import { PaginationProps } from '@mui/material'

// NEW VARIANT
declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    contained?: true
    // 'contained-ramper'?: true
    // 'outlined-ramper'?: true
  }
}

export default function Pagination(theme: Theme) {
  const rootStyle = (ownerState: PaginationProps) => {
    const containedVariant = ownerState.variant === 'contained'
    const outlinedVariant = ownerState.variant === 'outlined'

    const defaultStyle = {
      '& .MuiPaginationItem-root': {
        '&.Mui-selected': {
          fontWeight: theme.typography.fontWeightMedium
        },
        ...(containedVariant && {
          backgroundColor: alpha(theme.palette.neutral[500], 0.32),
          borderColor: alpha(theme.palette.neutral[500], 0.32),
          '&.MuiPaginationItem-ellipsis': {
            backgroundColor: 'unset',
            borderColor: 'unset'
          },
          '&.Mui-selected': {
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
          }
        }),
        ...(outlinedVariant && {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          '&.Mui-selected': {
            color: '#fff',
            backgroundColor: theme.palette.primary.main
          }
        })
      }
    }

    return [defaultStyle]
  }

  return {
    MuiPagination: {
      defaultProps: {
        variant: 'contained',
        shape: 'rounded',
        color: 'primary'
      },

      styleOverrides: {
        root: ({ ownerState }: { ownerState: PaginationProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
