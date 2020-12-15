import { HttpError } from '~/utils/errors/http'
// import { AxiosResponse } from 'axios'

export const httpErrorHandler = (obj) => {
  if (obj.request?.status === 200) {
    return obj.data
  } else {
    throw new HttpError(obj.request?.status, obj.request?.statusText)
  }
}
