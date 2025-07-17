import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import _ from 'lodash'
import APIConfig from '@/common/contants/APIConfig'
import { APIRequest } from '@/common/interface/api'

class GetLatestAppVersionAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.coreAPI}/public/app/versions/latest`

  constructor() {}

  makeQuery() {
    return {}
  }

  makeBody() {
    return {}
  }
}

export default GetLatestAppVersionAPIRequest
