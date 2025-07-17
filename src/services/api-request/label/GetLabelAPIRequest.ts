import APIConfig from '@/common/contants/APIConfig'
import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import { APIRequest } from '@/common/interface/api'

class GetLabelAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.GET
  url: string = `${APIConfig.coreAPI}/public/web-labels`
  locale: string

  constructor(locale: string) {
    this.locale = locale
  }

  makeQuery() {
    return {
      locale: this.locale,
      page: 1,
      pageSize: -1
    }
  }

  makeBody() {
    return {}
  }
}

export default GetLabelAPIRequest
