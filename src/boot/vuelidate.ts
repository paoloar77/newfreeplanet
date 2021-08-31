import Vuelidate from 'vuelidate'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  // @ts-ignore
  app.use(Vuelidate)
})
