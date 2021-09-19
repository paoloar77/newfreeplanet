import { ISigninOptions } from 'model'
import { required, minLength } from '@vuelidate/validators'
import { computed } from 'vue'

export type TSignin = { signin: ISigninOptions, validationGroup: string[] }

export const validations = computed(() => {
  return {
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
})
