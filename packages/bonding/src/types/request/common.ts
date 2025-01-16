import { EnumFileObjType } from '../../enum/common'

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
  presigned_url: string
  url: string
}
