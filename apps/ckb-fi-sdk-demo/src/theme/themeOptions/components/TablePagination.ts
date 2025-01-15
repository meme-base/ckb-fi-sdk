import { TablePaginationProps } from '@mui/material'

// NEW VARIANT
// declare module '@mui/material/Pagination' {
//   interface TablePaginationPropsVariantOverrides {
//     contained?: true
//   }
// }

export default function TablePagination() {
  const rootStyle = (_ownerState: TablePaginationProps) => {
    const defaultStyle = {
      '& .MuiInputBase-input': {
        marginRight: '4px'
      }
    }

    return [defaultStyle]
  }

  return {
    MuiTablePagination: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TablePaginationProps }) =>
          rootStyle(ownerState)
      }
    }
  }
}
