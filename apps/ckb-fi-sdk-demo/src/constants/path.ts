import { HOST } from '@/config/host'

export const PATH = {
  root: '/',
  detail: (id: number | string) => `${HOST}/detail/${id}`
}
