export const isProtocolUrl = (url: string) => /^http(s)?:\/\//.test(url)

export const sleep = (millisecond: number) =>
  new Promise(resolve => setTimeout(() => resolve(true), millisecond))

/**
 * ellipsisText 展示指定长度的文本
 * @param text 文字内容
 * @param max 最大展示字符数
 * @param placeholder 占位符，默认…
 * @returns
 */
export const ellipsisText = (
  text: string,
  max: number,
  placeholder = '...'
) => {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + placeholder : text
}

/**
 * ellipsisLabel 简短展示指定字符串
 * @param  {String} text 字符串文本
 * @param  {Object} options
 * maxLen?: number 生效长度
 * headLen?: number 头部字符个数
 * tailLen?: number 尾部字符个数
 * placeholder?: string 占位符
 * @return {String}
 */
export function ellipsisLabel(
  text: string,
  options?: {
    maxLen?: number
    headLen?: number
    tailLen?: number
    placeholder?: string
  }
) {
  const {
    maxLen = 10,
    headLen = 6,
    tailLen = 4,
    placeholder = '...'
  } = options || {}
  if (text.length <= maxLen) return text

  return text.slice(0, headLen) + placeholder + text.slice(0 - tailLen)
}
