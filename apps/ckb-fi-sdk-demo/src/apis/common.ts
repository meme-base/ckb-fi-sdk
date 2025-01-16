/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '@/request'
import { ReqUploadImage, ResUploadImage } from '@/types/request/common'

export function uploadImage(data: ReqUploadImage) {
  return request.api.post<ResUploadImage>('/v1/images/presigned', {
    data
  })
}
