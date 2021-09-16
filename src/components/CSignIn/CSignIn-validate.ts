import { ISigninOptions } from 'model'
import { required, minLength } from '@vuelidate/validators'

export type TSignin = { signin: ISigninOptions, validationGroup: string[] }

export const validations = {
  signin: {
    password: {
      required,
      minLength: minLength(8),
    },
    username: {
      required,
      minLength: minLength(6),
    },
  },
}
