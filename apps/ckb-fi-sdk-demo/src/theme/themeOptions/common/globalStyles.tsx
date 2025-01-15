import { GlobalStyles as MUIGlobalStyles } from '@mui/material'

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100vw',
          minHeight: '100vh',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          paddingRight: '0!important',
          overflowX: 'hidden'
        },
        input: {
          fontSize: 14,
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },
        img: {
          display: 'block',
          maxWidth: '100%'
        },
        ul: {
          margin: 0,
          padding: 0
        }
      }}
    />
  )

  return inputGlobalStyles
}
