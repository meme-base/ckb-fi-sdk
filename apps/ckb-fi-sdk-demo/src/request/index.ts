/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CanceledError
} from 'axios'
// import MockAdapter from 'axios-mock-adapter'
import { CURRENT_BASE_NETWORK_ID } from '@/constants/network'
import { AuthTokenManager } from './authTokenManager'
import { BACKEND_API_URL } from '@/config/host'
import { eventEmitter } from '@/utils/events'
import { COMMON_EVENTS } from '@/enum/events'
import { toast } from 'react-toastify'
import qs from 'qs'

const ToastErrorId = 'request-error'
export interface IRequestConfig<R> extends AxiosRequestConfig {
  customHeaders?: boolean // 为 true 时使用业务中传入的 headers
  rawResponse?: boolean // 为 true 时返回完整的响应数据方便前端判断
  noToast?: boolean // 为 true 时不弹出 toast
  withCredentials?: boolean // 是否携带 cookie
  customResponse?: (data: AxiosResponse) => R // 自定义响应处理
}

// export const mockInstance = new MockAdapter(axios, {
//   delayResponse: 500,
//   onNoMatch: 'passthrough'
// })
export const mockInstance: any = { onGet: () => {} }

const instance = axios.create({ timeout: 200000 })

async function baseRequest<R = any>(url: string, config?: IRequestConfig<R>) {
  config = {
    withCredentials: config?.withCredentials ?? true,
    ...config,
    headers: config?.customHeaders
      ? config.headers || {}
      : {
          Authorization: AuthTokenManager.token
            ? `Bearer ${AuthTokenManager.token}`
            : '',
          Accept: 'application/json',
          ...config?.headers
        }
  }

  // 统一带上 chain_id
  if (!config.params) {
    config.params = {}
  }
  config.params.chain_id = CURRENT_BASE_NETWORK_ID // 当前网络 id

  const currentVersion =
    (/\/detail(\/.+)?/.test(window.location.pathname)
      ? AuthTokenManager.detailTmpVersion
      : AuthTokenManager.contractVersion) || '2' // 合约版本 1 | 2，默认 2，详情页使用接口中的 version 字段

  // console.log(
  //   `isDetailPage: ${/\/detail(\/.+)?/.test(window.location.pathname)}`,
  //   {
  //     globalVersion: AuthTokenManager.contractVersion,
  //     detailTmpVersion: AuthTokenManager.detailTmpVersion,
  //     currentVersion
  //   }
  // )
  config.params.cv = currentVersion

  if (
    config?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded' &&
    config.data
  ) {
    config.data = qs.stringify(config.data)
  }

  return instance({ url, ...config })
    .then(res => {
      if (config?.rawResponse) {
        return res.data as R
      }
      if (config?.customResponse) {
        return config?.customResponse(res) as R
      }
      if (
        typeof res.data?.code === 'number' &&
        typeof res.data?.message === 'string'
      ) {
        if (res.data?.code === 0) {
          return res.data?.data as R
        }
        return Promise.reject(res.data)
      }
      return res.data as R
    })
    .catch(err => {
      if (typeof err?.code === 'number' && typeof err?.message === 'string') {
        if (err?.code !== 0) {
          if (!config?.noToast) {
            const errMsg = err?.message
            ;('Something went wrong. Please try again later.')
            toast.error(errMsg, { id: ToastErrorId })
          }
        }
      } else if (err instanceof AxiosError) {
        if (err instanceof CanceledError) {
          throw err
        }
        if (err.status === 401 || err.response?.status === 401) {
          // if (!config?.noToast) {
          //   toast.error('Session expired.', { id: ToastErrorId })
          // }
          eventEmitter.emit(COMMON_EVENTS.SESSION_EXPIRED)
        } else {
          if (!config?.noToast) {
            const errMsg =
              err?.response?.data?.message ??
              err.message ??
              'Opps! Please try again later.'
            toast.error(errMsg, { id: ToastErrorId })
          }
        }
      } else if (err instanceof Error) {
        if (!config?.noToast) {
          const errMsg =
            // @ts-ignore
            err?.response?.data?.message ??
            err.message ??
            'Opps! Please try again later.'
          toast.error(errMsg, { id: ToastErrorId })
        }
      } else {
        if (!config?.noToast) {
          const errMsg =
            err?.response?.data?.message ??
            err.message ??
            'Opps! Please try again later.'
          toast.error(errMsg, { id: ToastErrorId })
        }
      }
      throw err
    })
}

export const request = {
  baseRequest,
  api: {
    get: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'get',
        baseURL: BACKEND_API_URL
      }),
    post: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'post',
        baseURL: BACKEND_API_URL
      }),
    put: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'put',
        baseURL: BACKEND_API_URL
      }),
    delete: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'delete',
        baseURL: BACKEND_API_URL
      })
  }
}
/**
 * 普通的数据结构
 */
export interface PlainResponse<T> {
  code: number
  data: T
  message: string
  detail?: string
}

/**
 * 带分页的数据结构
 */
export interface PageResponse<T> {
  code: number
  data: T
  message: string
  meta: IPagerInfo
}

/**
 * 分页参数
 */
export interface IPagerParams {
  page: number
  items: number
  outset?: number
}

/**
 * 分页结构
 */
export interface IPagerInfo {
  current_page: number
  page_items: number
  total_count: number
  total_pages: number
  jump_info?: { topic_id: string; topic_onchain_id: string }
}
