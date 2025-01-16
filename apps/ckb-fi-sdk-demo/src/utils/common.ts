import { toast } from 'react-toastify'
import dayjs from 'dayjs'

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

/**
 * checkPathValidate 检测路径是否在指定规则内
 * @param pathname 当前路径，location.pathname
 * @param rules 需要匹配的规则，字符串或者正则组成的数组
 * @returns
 */
export const checkPathValidate = (
  pathname: string,
  rules: string | RegExp | Array<string | RegExp>
) => {
  if (!rules) return true

  if (typeof rules === 'string') return pathname === rules
  if (Array.isArray(rules)) {
    const ret = rules.map(item =>
      typeof item === 'string' ? pathname === item : item.test(pathname)
    )
    return ret.some(itm => itm)
  } else {
    return rules.test(pathname)
  }
}

export const genBetweenAll = (m: number, n: number) =>
  Math.floor(Math.random() * (n - m + 1)) + m

export const getRandomColor = (isGradient = false) => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  if (isGradient)
    return `linear-gradient(135deg, ${Color(color)
      .lighten(0.5)
      .hex()} 0%, ${color} 100%)`

  return color
}

export const generateRandomRGB = (isArray = false) => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return isArray ? [r, g, b] : `rgb(${r}, ${g}, ${b})`
}

export const transformValueFormat = (
  value: string | number | boolean,
  type: 'string' | 'number' | 'bigint' | 'boolean'
) => {
  if (type === 'string') return String(value).trim() as string
  if (type === 'boolean') return Boolean(value) as boolean
  if (type === 'number') return Number(String(value).trim()) as number
  if (type === 'bigint') return BigInt(String(value).trim()) as bigint
}

/**
 * formatTime 获取格式化后的时间字符串
 * @param time
 * @param friendly
 * @returns string
 */
export const formatTime = (
  time: number | string,
  friendly?: boolean,
  unix = false,
  format = 'YYYY-MM-DD HH:mm'
) => {
  const date = unix ? dayjs.unix(Number(time)) : dayjs(time)
  if (friendly)
    return date
      .fromNow()
      .replace(/^a day/, '1 day')
      .replace(/^a minute/, '1 minute')
  return date.format(format)
}
