import { reactive } from '@vue/reactivity'
import useValidators from '@/modules/validators'

const errors: any = reactive({})

export default function useFormValidation() {
  const { isEmpty, minLength, isEmail } = useValidators()
  const validateNameField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4)
  }
  const validateEmailField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
  }
  return { errors, validateNameField, validateEmailField }
}
