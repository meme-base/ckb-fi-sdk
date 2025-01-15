import '@material-ui/core/styles'

// 扩展 MUI 的主题类型
declare module '@mui/material/styles' {
  interface Theme {
    radius: CustomRadiusOptions
    customShadows: CustomShadowOptions
  }
  interface ThemeOptions {
    radius: CustomRadiusOptions
    customShadows: CustomShadowOptions
  }
  interface Palette {
    default: Palette['primary']
    neutral: CommonKeyValue<string>
    border: CommonKeyValue<string>
  }
  interface PaletteOptions {
    default: PaletteOptions['primary']
    neutral: CommonKeyValue<string>
    border: CommonKeyValue<string>
  }
  interface PaletteColor {
    lighter?: string
    darker?: string
  }
  interface TypeText {
    contrastText?: string
  }
  interface TypeAction {
    default?: string
  }
  interface TypeBackground {
    image?: string
    tooltip?: string
    neutral?: string
  }
  interface BreakpointOverrides {
    w1024: true
    w1280: true
    w1440: true
    w728: true
  }
}
