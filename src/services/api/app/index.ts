import { fetch } from '@/services/FetchAPI'
import get from 'lodash/get'
import GetLatestAppVersionAPIRequest from '@/services/api-request/app/GetLatestAppVersionAPIRequest'
import CheckAppVersionAPIRequest from '@/services/api-request/app/CheckAppVersionAPIRequest'
import GetConfigurationAPIRequest from '@/services/api-request/app/GetConfigurationAPIRequest'
import { AppVersion, Configuration } from '@/common/interface/app'

export function getLatestAppVersion(): Promise<AppVersion> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new GetLatestAppVersionAPIRequest()
      const dataJSON = await fetch(apiReuqest)
      const data: AppVersion = get(dataJSON, 'data.data')

      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export function checkAppVersion(version: string, buildNumber: string): Promise<AppVersion> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new CheckAppVersionAPIRequest(version, buildNumber)
      const dataJSON = await fetch(apiReuqest)
      const data: AppVersion = get(dataJSON, 'data.data')

      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export function getConfiguration(): Promise<Configuration[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new GetConfigurationAPIRequest()
      const dataJSON = await fetch(apiReuqest)
      const data: Configuration[] = get(dataJSON, 'data.data', [])
      resolve(data)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
