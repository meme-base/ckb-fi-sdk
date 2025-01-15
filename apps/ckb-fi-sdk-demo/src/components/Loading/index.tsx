import { Stack, Box, SxProps } from '@mui/material'
import { CircularProgress } from '@mui/material'
import MemeAnimIcon from './MemeAnimIcon'

interface Props {
  height?: string | number
  useMemeIcon?: boolean
  showText?: boolean
  text?: string
  sx?: SxProps
}

function Loading({
  height,
  useMemeIcon = false,
  showText = true,
  text = 'Loading',
  sx = {}
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        color: '#fff',
        ...sx
      }}
    >
      <Stack alignItems="center" justifyContent="center" spacing={1}>
        {useMemeIcon ? (
          <MemeAnimIcon />
        ) : (
          <CircularProgress
            role="status"
            size={24}
            thickness={4}
            sx={{ color: '#cecece' }}
          />
        )}
        {showText && (
          <span className="font-semibold text-[#8b8b8b]">{text}</span>
        )}
      </Stack>
    </Box>
  )
}

export default Loading
