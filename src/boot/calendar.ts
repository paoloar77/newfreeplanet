import { boot } from 'quasar/wrappers'
// @ts-ignore
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendarMonth'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

export default boot(({ app }) => {
  app.use(Plugin)
})
