import { Box, SxProps } from '@mui/material'
import './index.scss'

interface Props {
  size?: 'small' | 'medium' | 'large'
  sx?: SxProps
}

const MemeAnimIcon = ({ size = 'medium', sx = {} }: Props) => {
  return (
    <Box
      className="meme-animate-logo"
      sx={{
        position: 'relative',
        width: 50,
        height: 40,
        overflow: 'hidden',
        transform: `scale(${
          size === 'large' ? 0.8 : size === 'small' ? 0.6 : 0.7
        })`,
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 10,
          height: 40,
          background: '#0000ff',
          animation: 'meme_dong1 1.3s ease infinite alternate'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 10,
          bottom: 20,
          width: 10,
          height: 10,
          background: '#fff',
          animation: 'meme_dong3 1s ease infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 20,
          bottom: 0,
          width: 10,
          height: 20,
          background: '#fff',
          animation: 'meme_dong2 1.2s ease infinite alternate'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 10,
          bottom: 20,
          width: 10,
          height: 10,
          background: '#fff',
          animation: 'meme_dong3 1s ease infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 10,
          height: 40,
          background: '#0000ff',
          animation: 'meme_dong1 1.3s ease infinite alternate'
        }}
      />
    </Box>
  )
}

export default MemeAnimIcon
