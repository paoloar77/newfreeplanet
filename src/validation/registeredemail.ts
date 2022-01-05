import { default as Axios, AxiosResponse } from 'axios'
import { GlobalConfig, PayloadMessageTypes } from '../common'

import { helpers } from '@vuelidate/validators'
const { withAsync } = helpers

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/email/ck'

export const registeredemail = withAsync(_registeredemail)

export function _registeredemail(email: string) {

  let onSuccess = (res: AxiosResponse) => {
    return res.status !== PayloadMessageTypes.statusfound
  }

  return Axios.post(VALIDATE_USER_URL, {idapp: process.env.APP_ID, email, key: process.env.PAO_APP_ID})
    .then(onSuccess)
    .catch((err) => {
      return true
    })

}
