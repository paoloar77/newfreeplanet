import { default as Axios, AxiosResponse } from 'axios'
// import { IPayload } from 'model'
import { GlobalConfig, PayloadMessageTypes } from '../common'

import { helpers } from '@vuelidate/validators'
const { withAsync } = helpers

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/users/'

export const registereduser = withAsync(_registereduser)

export function _registereduser (userName: string) {

  const onSuccess = (res: AxiosResponse) => {
    return res.status !== PayloadMessageTypes.statusfound
  }

  return Axios.get(VALIDATE_USER_URL + process.env.APP_ID + '/' + userName)
    .then(onSuccess)
    .catch((err) => {
      return true
    })

}
