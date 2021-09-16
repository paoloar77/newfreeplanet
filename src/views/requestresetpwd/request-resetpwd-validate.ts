import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from '@vuelidate/validators'
// import { ValidationRuleset } from 'vuelidate'
import { complexity, registeredemail, registereduser, aportadorexist } from '../../validation'

export const validations = {
  form: {
    email: {
      email,
      required
    }
  }
}
