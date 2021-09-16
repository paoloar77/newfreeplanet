import { default as Axios, AxiosResponse } from 'axios'
import { GlobalConfig, PayloadMessageTypes } from '../common'

import { helpers } from '@vuelidate/validators'
const { withAsync } = helpers

// const SITE_URL = GlobalConfig.uri.site
const VALIDATE_USER_URL = process.env.MONGODB_HOST + '/email/'

export const registeredemail = withAsync(_registeredemail)

export function _registeredemail(email: string) {

  let onSuccess = (res: AxiosResponse) => {
    return res.status !== PayloadMessageTypes.statusfound
  }

  return Axios.get(VALIDATE_USER_URL + process.env.APP_ID + '/' + email)
    .then(onSuccess)
    .catch((err) => {
      return true
    })

}
