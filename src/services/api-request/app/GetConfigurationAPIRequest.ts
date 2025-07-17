import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import _ from 'lodash'
import APIConfig from '@/common/contants/APIConfig'
import { APIRequest } from '@/common/interface/api'

class GetConfigurationAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.coreAPI}/public/configurations`

  constructor() {}

  makeQuery() {
    return {
      page: 1,
      pageSize: -1,
      sort: 'id:DESC'
    }
  }

  makeBody() {
    return {}
  }
}

export default GetConfigurationAPIRequest
