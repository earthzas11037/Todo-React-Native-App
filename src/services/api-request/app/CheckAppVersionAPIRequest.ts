import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import _ from 'lodash'
import APIConfig from '@/common/contants/APIConfig'
import { APIRequest } from '@/common/interface/api'
import { Env } from '@env'

class CheckAppVersionAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.coreAPI}/public/app/versions/check`
  version: string
  buildNumber: string

  constructor(version: string, buildNumber: string) {
    this.version = version
    this.buildNumber = buildNumber
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {
      version: this.version,
      buildNumber: this.buildNumber
    }
  }

  makeHeader() {
    return {
      'x-api-key': Env.APP_VERSION_API_KEY
    }
  }
}

export default CheckAppVersionAPIRequest
