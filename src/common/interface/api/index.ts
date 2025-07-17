import type { HTTPMethod } from '@/common/enum/api/HTTPMethod'

export type APIRequestFetchOptions = {
  useInternal?: boolean
}

export interface APIRequest {
  baseUrl?: string
  method: HTTPMethod
  url: string
  makeQuery: () => any
  makeBody: () => any
  makeHeader?: () => any
  refreshToken?: () => void
  withoutTimestamp?: boolean
  cacheRevalidateDuration?: number
}

export interface APIResponse<T = any> {
  success: boolean
  data: T
}
