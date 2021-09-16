export default function useValidators() {

  const isEmpty = (fieldName: string, fieldValue: string) => {
    return !fieldValue ? 'The ' + fieldName + ' field is required' : '';
  }

  const minLength = (fieldName: string, fieldValue: string, min: number) => {
    return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : '';
  }

  const isEmail = (fieldName: string, fieldValue: string) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? 'The input is not a valid ' + fieldName + ' address' : '';
  }
  return { isEmpty, minLength, isEmail }
}
