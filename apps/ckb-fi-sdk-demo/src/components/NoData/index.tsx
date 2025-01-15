import { Box, SxProps } from '@mui/material'

const NoData = (props: {
  content?: string | JSX.Element
  skew?: boolean
  className?: string
  sx?: SxProps
}) => {
  const { content, skew = false, className = '', sx = {} } = props

  return (
    <Box
      className={className}
      sx={{
        textTransform: 'lowercase',
        textAlign: 'center',
        py: 2,
        color: 'neutral.300',
        ...(skew ? { transform: 'skewX(348deg)' } : {}),
        ...sx
      }}
    >
      {content ? content : <>- No Data -</>}
    </Box>
  )
}

export default NoData
