import { useMediaQuery, useTheme } from '@mui/material'

export default function useMedia() {
  const {
    breakpoints: {
      up,
      down,
      between,
      values: { xl, w1440, w1280, lg, w1024, md, sm }
    }
  } = useTheme()
  const isXs = useMediaQuery(down(sm))
  const isSm = useMediaQuery(between(sm, md))
  const isMd = useMediaQuery(between(md, lg))
  const isLg = useMediaQuery(between(lg, xl))

  const isw1440 = useMediaQuery(up(w1440))
  const isw1280 = useMediaQuery(between(w1280, w1440))
  const isw1024 = useMediaQuery(between(w1024, w1280))

  const isMobile = useMediaQuery(down(md))
  const mdTo1280 = useMediaQuery(between(md, w1280))

  return {
    isMobile,
    isXs,
    isSm,
    isMd,
    isLg,
    isw1440,
    isw1280,
    isw1024,
    mdTo1280
  }
}
