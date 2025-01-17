/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CanceledError
} from 'axios'
import { AuthManager } from './authManager'
import { eventEmitter } from '../utils/events'
import { COMMON_EVENTS } from '../enum/events'
import { toast } from 'react-toastify'
import qs from 'qs'

export interface IRequestConfig<R> extends AxiosRequestConfig {
  customHeaders?: boolean // When true, use the headers passed from user side
  rawResponse?: boolean // When true, return complete response data to facilitate front-end judgment
  noToast?: boolean // show toast or not
  withCredentials?: boolean // carry cookies or not
  customResponse?: (data: AxiosResponse) => R // customize response
}

const instance = axios.create({ timeout: 200000 })

async function baseRequest<R = any>(url: string, config?: IRequestConfig<R>) {
  config = {
    withCredentials: config?.withCredentials ?? true,
    ...config,
    headers: config?.customHeaders
      ? config.headers || {}
      : {
          Authorization: AuthManager.token ? `Bearer ${AuthManager.token}` : '',
          Accept: 'application/json',
          ...config?.headers
        }
  }

  // add `chain_id` into params
  if (!config.params) {
    config.params = {}
  }
  config.params.chain_id = 0 // chain id

  const currentVersion =
    (/\/detail(\/.+)?/.test(window.location.pathname)
      ? AuthManager.detailTmpVersion
      : AuthManager.contractVersion) || '2' // contract version 1 | 2，default 2

  // console.log(
  //   `isDetailPage: ${/\/detail(\/.+)?/.test(window.location.pathname)}`,
  //   {
  //     globalVersion: AuthManager.contractVersion,
  //     detailTmpVersion: AuthManager.detailTmpVersion,
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
            toast.error(errMsg)
          }
        }
      } else if (err instanceof AxiosError) {
        if (err instanceof CanceledError) {
          throw err
        }
        if (err.status === 401 || err.response?.status === 401) {
          // if (!config?.noToast) {
          //   toast.error('Session expired.')
          // }
          eventEmitter.emit(COMMON_EVENTS.SESSION_EXPIRED)
        } else {
          if (!config?.noToast) {
            const errMsg =
              err?.response?.data?.message ??
              err.message ??
              'Opps! Please try again later.'
            toast.error(errMsg)
          }
        }
      } else if (err instanceof Error) {
        if (!config?.noToast) {
          const errMsg =
            // @ts-ignore
            err?.response?.data?.message ??
            err.message ??
            'Opps! Please try again later.'
          toast.error(errMsg)
        }
      } else {
        if (!config?.noToast) {
          const errMsg =
            err?.response?.data?.message ??
            err.message ??
            'Opps! Please try again later.'
          toast.error(errMsg)
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
        baseURL: ''
      }),
    post: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'post',
        baseURL: ''
      }),
    put: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'put',
        baseURL: ''
      }),
    delete: <R = any>(url: string, config?: IRequestConfig<R>) =>
      baseRequest(url, {
        ...config,
        method: 'delete',
        baseURL: ''
      })
  }
}
/**
 * Normal response structure
 */
export interface PlainResponse<T> {
  code: number
  data: T
  message: string
  detail?: string
}

/**
 * Pagination response structure
 */
export interface PageResponse<T> {
  code: number
  data: T
  message: string
  meta: IPagerInfo
}

/**
 * Pagination params
 */
export interface IPagerParams {
  page: number
  items: number
  outset?: number
}

/**
 * Pagination structure
 */
export interface IPagerInfo {
  current_page: number
  page_items: number
  total_count: number
  total_pages: number
  jump_info?: { topic_id: string; topic_onchain_id: string }
}
