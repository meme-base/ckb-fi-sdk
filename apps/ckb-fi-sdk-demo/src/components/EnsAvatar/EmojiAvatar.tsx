import { FC, useEffect, useMemo, useState } from 'react'
import { emojiAvatarForAddress } from './emojiAvatarForAddress'
import { Box } from '@mui/material'

const EmojiAvatar: FC<{
  address?: string
  ensImage?: string | null
  size?: number
}> = ({ address, ensImage, size }) => {
  // States
  const [loaded, setLoaded] = useState(false)

  // Effects
  useEffect(() => {
    if (ensImage) {
      const img = new Image()
      img.src = ensImage
      img.onload = () => setLoaded(true)
    }
  }, [ensImage])

  // Other hooks
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  )

  return ensImage ? (
    loaded ? (
      <Box
        sx={{
          backgroundImage: `url(${ensImage})`,
          backgroundPosition: 'center',
          height: `${size}px`,
          width: `${size}px`,
          backgroundSize: 'cover',
          borderRadius: '10000px',
          position: 'absolute'
        }}
      />
    ) : null
  ) : (
    <Box
      sx={{
        ...(!ensImage && { backgroundColor }),
        height: `${size}px`,
        width: `${size}px`,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {emoji}
    </Box>
  )
}

export default EmojiAvatar
