import useMedia from '@/hooks/useMedia'
import { Theme } from '@mui/material'
import { TabProps } from '@mui/material'

export default function Tabs(theme: Theme) {
  const { isMobile } = useMedia()
  return {
    MuiTabs: {
      defaultProps: {
        textColor: 'inherit',
        allowScrollButtonsMobile: true,
        variant: 'scrollable'
      },
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root': {
            marginBottom: '6px',
            fontSize: 14,
            fontWeight: 700,
            color: theme.palette.neutral[100],
            transition: 'all 0.1s linear',
            '&:not(.Mui-selected)': {
              ...(isMobile ? theme.typography.body2 : theme.typography.h6),
              color: theme.palette.neutral[100]
            },
            '&.Mui-selected': {
              ...(isMobile ? theme.typography.subtitle1 : theme.typography.h6),
              color: theme.palette.neutral[50]
            }
          },
          '& .MuiTabs-indicator': {
            height: '5px!important',
            transform: 'scaleX(0.34)',
            borderRadius: '0 0 30px 30px',
            boxShadow: `0px -4px 14px ${theme.palette.primary.main}`
          }
        },
        scrollButtons: {
          width: 48,
          borderRadius: '50%'
        }
      }
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
        iconPosition: 'start'
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: TabProps }) => ({
          padding: 0,
          opacity: 1,
          minWidth: 48,
          fontWeight: theme.typography.fontWeightMedium,
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(3),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(3)
            }
          },
          '&:not(.Mui-selected)': {
            color: theme.palette.text.secondary
          },
          ...((ownerState.iconPosition === 'start' ||
            ownerState.iconPosition === 'end') && {
            minHeight: 48
          })
        })
      }
    }
  }
}
