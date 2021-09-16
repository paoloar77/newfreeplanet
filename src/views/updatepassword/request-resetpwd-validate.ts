import { ISignupOptions } from 'model'
import { email, minLength, required, sameAs } from '@vuelidate/validators'
// import { ValidationRuleset } from 'vuelidate'
import { complexity, registeredemail, registereduser, aportadorexist } from '../../validation'
import { computed } from 'vue'

export const validations = computed(() => ({
  repeatPassword: {
    required,
    sameAsPassword: sameAs('password')
  },
  password: {
    required,
    minLength: minLength(8),
    complexity
  }
}))
