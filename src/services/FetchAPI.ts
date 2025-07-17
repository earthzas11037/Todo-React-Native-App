import { StatusCode } from '@/common/enum/api/StatusCodeEnum'
import Axios, { AxiosRequestConfig } from 'axios'
import { router } from 'expo-router'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import _ from 'lodash'
import { APIRequest, APIResponse } from '@/common/interface/api'

const CancelToken = Axios.CancelToken

// let cancelTokens: (() => void)[] = []
export type FetchOptions = {
  disabledError?: boolean // Disable automatic error handling
  ignore401?: boolean // Ignore 401 errors (useful for token refresh)
}

export async function fetchGeneric<T>(apiRequest: APIRequest, option?: FetchOptions): Promise<T> {
  const response = await fetch(apiRequest, option)
  if (_.get(response.data, 'statusCode') === StatusCode.SUCCESS) {
    return _.get(response.data, 'data') as T
  } else {
    throw new Error(response.data.message || 'API request failed')
  }
}

export async function fetch(apiRequest: APIRequest, option?: FetchOptions): Promise<APIResponse> {
  const options = createAxiosOptions(apiRequest)

  const startTime = new Date().valueOf()
  return new Promise((resolve, reject) => {
    console.log('Fetching API', options.url)
    Axios(options)
      .then(response => {
        console.log(`🚀 Response from SERVER: ${options.url}`)

        const responseModel: APIResponse = {
          data: response.data,
          success: response.status == StatusCode.SUCCESS
        }
        resolve(responseModel)
      })
      .catch(async err => {
        if (Axios.isCancel(err)) {
          console.log('REQUEST Cancelled', options)
        }
        try {
          const statusCode = get(err, 'response.status')
          const message = get(err, 'response.data.message')
          if (statusCode === 403) {
            // navigateToUrl(ROUTES.LOGIN())
          }
          if (!option?.disabledError) {
          }
        } catch (error) {}
        if (err.response) {
          const responseModel: APIResponse = {
            data: err.response.data,
            success: false
          }
          reject(responseModel)
        } else {
          const responseModel: APIResponse = {
            data: err,
            success: false
          }
          reject(responseModel)
        }
      })
      .finally(() => {
        console.log(`API Response Time: ${apiRequest.url}`)
        console.log(`API Response Time: ${new Date().valueOf() - startTime} ms`)
        console.log('-----')
      })
  })
}

// export function cancelAllRequests() {
//   cancelTokens.forEach(x => x())
//   cancelTokens = []
// }

function createAxiosOptions(apiRequest: APIRequest): AxiosRequestConfig {
  const body = apiRequest.makeBody()
  const isFormData = body instanceof FormData
  return {
    baseURL: apiRequest.baseUrl ? apiRequest.baseUrl : '',
    url: apiRequest.url,
    timeout: 30000,
    headers: {
      ...(!!apiRequest.makeHeader ? apiRequest.makeHeader() : {}),
      // 'x-expo-token': (getItem<string>(EXPO_NOTI_TOKEN) || '').replace(/["'\n\r]/g, ''), // replace double, single quote and newline with empty string to prevent error Network Error
      /** [Android] Need to put Content-Type multipart/form-data if formData is provided. Otherwise Network Error will occur */
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    },
    // cancelToken: new CancelToken(c => cancelTokens.push(c)),
    method: apiRequest.method,
    data: isFormData ? body : !isEmpty(body) ? body : undefined,
    params: {
      ...(apiRequest.makeQuery() || {})
    }
  }
}

export default { fetch }
