import APIConfig from '@/common/contants/APIConfig'
import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import { APIRequest } from '@/common/interface/api'

class CoreAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = ''
  setPrefixToken: string = 'Bearer '
  baseUrl: string = APIConfig.coreAPI || ''

  makeQuery() {}

  makeBody() {}

  makeHeader() {
    return {}
  }
}

export default CoreAPIRequest
