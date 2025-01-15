import { Theme } from '@mui/material'

export default function TabPanel(_theme: Theme) {
  return {
    MuiTabPanel: {
      defaultProps: {
        variant: 'scrollable'
      },
      styleOverrides: {
        root: {
          '&.MuiTabPanel-root': {
            padding: '16px 0'
          }
        }
        // scrollButtons: {
        //   width: 48,
        //   borderRadius: '50%'
        // }
      }
    }
  }
}
