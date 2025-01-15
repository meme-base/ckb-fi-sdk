import { Theme } from '@mui/material'

export default function Breadcrumbs(theme: Theme) {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          '& svg': {
            fontSize: 30,
            color: theme.palette.neutral[100]
          }
        },
        li: {
          display: 'inline-flex',
          margin: theme.spacing(0.25, 0),
          '& > *': {
            ...theme.typography.h4,
            color: theme.palette.neutral[200]
          },
          '&:last-child > *': {
            color: theme.palette.neutral[50]
          }
        }
      }
    }
  }
}
