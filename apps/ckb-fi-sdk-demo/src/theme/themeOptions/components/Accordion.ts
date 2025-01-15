import { Theme } from '@mui/material'

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:before': {
            height: 0 // 去除Accordion之间默认的分割线
          },
          '& .MuiAccordionDetails-root': {
            backgroundColor: theme.palette.neutral[900]
          },
          '&.Mui-expanded': {
            margin: 0,
            boxShadow: theme.customShadows.z8,
            backgroundColor: theme.palette.background.paper
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: 40,
          borderRadius: '0!important',
          backgroundColor: theme.palette.neutral[900],
          // '&.Mui-expanded': {
          //   minHeight: 32
          // },
          // '& .Mui-expanded': {
          //   marginTop: theme.spacing(2),
          //   marginBottom: theme.spacing(1)
          // },
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          '&.expanded': {
            minHeight: 50
          },
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
            '& .MuiTypography-root': {
              color: 'inherit'
            }
          }
        },
        expandIconWrapper: {
          color: 'inherit'
        }
      }
    }
  }
}
