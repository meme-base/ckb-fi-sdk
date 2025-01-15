/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @name: checkNum
 * @param: obj表示e.target,或者传入的 value
 * @param: intNum表示整数位个数，默认0为不限制  [可选]
 * @param: decNum表示小数位个数，默认0为没小数 [可选]
 * @param: maxLength用于限制输入的数字位数（包含小数位） [可选]
 * @param: min用于限制输入的数字最小值 [可选]
 * @param: max用于限制输入的数字最大值 [可选]
 */
export interface ICheckNumProps {
  obj: any
  intNum?: number
  decNum?: number
  maxLength?: number
  min?: number
  max?: number
}

const checkNum = ({
  obj,
  intNum = 0,
  decNum = 0,
  maxLength = 0,
  max = 0,
  min = 0
}: ICheckNumProps) => {
  let value = obj.value.toString()
  let changeValue: string, t1: string, t2: string
  if (decNum === 0) {
    value = value.replace(/[^\d]/g, '') //  去除数字以外的字符，若要支持负数，可将此处正则改为/[^\-\d]/g
    value = value.replace(/^0\d+/g, '0') // 防止整数位出现'00'的情况

    obj.value = value
    if (intNum !== 0) {
      value = value.substr(0, intNum)
    }
  } else {
    // value = value.replace(/[^\d.]/g, '') // 去除数字和小数点以外的字符，若要支持负数，可将此处正则改为/[^\-\d.]/g
    value = value.replace(/[^\-\d.]/g, '') // 去除数字和小数点以外的字符，若要支持负数，可将此处正则改为/[^\-\d.]/g
    // value = value.replace(/^[^\d]/g, '') // 保证第一个字符是数字，若要支持负数，可将此处正则改为/^[^\-\d]/g
    value = value.replace(/^[^\-\d]/g, '') // 保证第一个字符是数字，若要支持负数，可将此处正则改为/^[^\-\d]/g
    value = value.replace(/\.{2}/g, '.') // 去除第二个小数点
    value = value.replace(/^0\d+/g, '0')
    changeValue = value.split('.')
    if (changeValue.length > 1) {
      // 表示用户输入的既有整数又有小数
      if (intNum === 0) {
        t1 = changeValue[0]
      } else {
        t1 = changeValue[0].slice(0, intNum)
      }
      t2 = changeValue[1].slice(0, decNum)
      value = t1 + '.' + t2
    } else {
      if (intNum !== 0) {
        value = value.substr(0, intNum)
      }
    }
  }
  if (maxLength !== 0) {
    value = value.slice(0, maxLength)
  }
  if (max !== 0 && value > max) {
    value = max
  }
  if (min !== 0 && value < min) {
    value = min
  }
  if (obj.value !== value) {
    obj.value = value
  }

  return Number(value)
}

export default checkNum
