import { Label } from '@/common/interface/label'
import GetLabelAPIRequest from '@/services/api-request/label/GetLabelAPIRequest'
import { fetch } from '@/services/FetchAPI'
import get from 'lodash/get'

export function getLabel(lang: string): Promise<{ data: Label[] }> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiReuqest = new GetLabelAPIRequest(lang)
      const dataJSON = await fetch(apiReuqest)
      const result: Label[] = get(dataJSON, 'data.data', [])

      resolve({
        data: result
      })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}
