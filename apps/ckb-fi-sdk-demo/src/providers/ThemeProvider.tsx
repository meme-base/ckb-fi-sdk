import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@/theme/themeOptions/common/globalStyles'
import { customThemeOptions } from '@/theme/themeOptions'
import Overrides from '@/theme/themeOptions/components'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider
} from '@mui/material'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme(customThemeOptions)
  // @ts-ignore
  theme.components = Overrides(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
