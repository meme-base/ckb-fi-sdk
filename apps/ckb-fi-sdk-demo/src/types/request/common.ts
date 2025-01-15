/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnumEntityCategory, EnumFileObjType } from '@/enum/common'
import { IPagerParams } from '@/request'

export interface UTCTimeResponse {
  abbreviation: string
  client_ip: string
  datetime: string
  day_of_week: number
  day_of_year: number
  dst: boolean
  dst_from?: any
  dst_offset: number
  dst_until?: any
  raw_offset: number
  timezone: string
  unixtime: number
  utc_datetime: string
  utc_offset: string
  week_number: number
}

export interface ReqUploadImage {
  obj_type: EnumFileObjType
  file_content_type: string
  // file_content_type:
  //   | 'image/jpeg'
  //   | 'image/png'
  //   | 'image/gif'
  //   | 'image/bmp'
  //   | 'image/tiff'
  //   | 'image/webp'
}

export interface ResUploadImage {
  /**
   * 预签名链接
   */
  presigned_url: string
  /**
   * 上传成功后可使用链接
   */
  url: string
}

export interface ReqSearchCategory extends IPagerParams {
  keyword: string
  category?: EnumEntityCategory
}
