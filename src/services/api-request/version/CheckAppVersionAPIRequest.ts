import APIConfig from '@/common/contants/APIConfig'
import { HTTPMethod } from '@/common/enum/api/HTTPMethod'
import { APIRequest } from '@/common/interface/api'
import { AppVersionDTO } from '@/lib/updates'

class CheckAppVersionAPIRequest implements APIRequest {
  method: HTTPMethod = HTTPMethod.POST
  url: string = `${APIConfig.coreAPI}/public/app/versions/check`
  dto: AppVersionDTO

  constructor(dto: AppVersionDTO) {
    this.dto = dto
  }

  makeQuery() {
    return {}
  }

  makeBody() {
    return {
      version: this.dto.version,
      buildNumber: this.dto.buildNumber
    }
  }
}

export default CheckAppVersionAPIRequest
