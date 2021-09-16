// @ts-ignore
import { VueTelInput } from 'vue3-tel-input'
import { boot } from 'quasar/wrappers'

// "async" is optional
export default boot( ({ app }) => {
  // something to do
  // @ts-ignore
  app.use(VueTelInput)
})
