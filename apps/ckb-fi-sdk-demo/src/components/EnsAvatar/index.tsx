import { FC } from 'react'
import { Box } from '@mui/material'
import EmojiAvatar from './EmojiAvatar'

export const EnsAvatar: FC<{
  address?: string
  loading?: boolean
  imageUrl?: string | null
  size: number
}> = ({ address, imageUrl, loading, size }) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        height: `${size}px`,
        width: `${size}px`,
        userSelect: 'none',
        overflow: 'hidden',
        background: '#282828',
        borderRadius: '50%'
      }}
    >
      <Box
        sx={{
          fontSize: `${Math.round(size * 0.55)}px`,
          height: `${size}px`,
          transform: loading ? 'scale(0.72)' : undefined,
          transition: '.25s ease',
          transitionDelay: loading ? undefined : '.1s',
          width: `${size}px`,
          willChange: 'transform',
          userSelect: 'none',
          overflow: 'hidden',
          borderRadius: '50%'
        }}
      >
        <EmojiAvatar address={address} ensImage={imageUrl} size={size} />
      </Box>
    </Box>
  )
}
