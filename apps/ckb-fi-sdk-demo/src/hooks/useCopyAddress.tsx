import { useState } from 'react'
import { Stack } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import copyToClipboard from 'copy-to-clipboard'

const defaultCopyText = 'Click to copy'

const useCopyAddress = () => {
  const [copyTip, setCopyTip] = useState<JSX.Element | string>(defaultCopyText)
  const [copyText, setCopyText] = useState('')

  const copy = (addr: string) => {
    if (!addr) return

    copyToClipboard(addr)
    setCopyText(addr)
    setCopyTip(
      <Stack direction="row" alignItems="center" spacing="5px">
        <CheckCircleIcon sx={{ fontSize: 16, color: '#00FFA1' }} />
        <p>Copied</p>
      </Stack>
    )

    setTimeout(() => {
      setCopyTip(defaultCopyText)
      setCopyText('')
    }, 1000)
  }

  return {
    copy,
    copyTip,
    copyText
  }
}

export default useCopyAddress
