import CheckAppVersionAPIRequest from '@/services/api-request/version/CheckAppVersionAPIRequest'
import { fetch } from '@/services/FetchAPI'
import _ from 'lodash'

export function checkVersion(version: string, buildNumber: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new CheckAppVersionAPIRequest({ version, buildNumber })
      const dataJSON = await fetch(apiReuqest, { ignore401: true })
      resolve(_.get(dataJSON.data, 'statusCode') === 200)
    } catch (error) {
      console.log(error)
      // reject(error)
      resolve(false)
    }
  })
}
