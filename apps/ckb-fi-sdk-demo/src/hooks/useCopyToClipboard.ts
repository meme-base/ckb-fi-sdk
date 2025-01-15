import { useState } from 'react'
import { toast } from 'react-toastify'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>
type ReturnType = {
  copy: CopyFn
  copiedText: CopiedValue
}

export const useCopyToClipboard = (option?: {
  successTip?: string
  errorTip?: string
}): ReturnType => {
  const { successTip, errorTip } = option || {}
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      toast.success(successTip || `${text} Copied.`)
      return true
    } catch (error) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.top = '-9999px'
      textArea.style.left = '-9999px'
      textArea.style.position = 'fixed'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (successful) {
        setCopiedText(text)
        toast.success(successTip || `${text} Copied.`)
        return true
      }

      toast.error(errorTip || `Copy Failed: ${error}`)
      setCopiedText(null)
      return false
    }
  }

  return { copiedText, copy }
}
