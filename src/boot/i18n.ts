// @ts-ignore
import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import messages from '../statics/i18n'
import { boot } from 'quasar/wrappers'
// you'll need to create the src/i18n/index.js file too

const i18n = createI18n({
  locale: 'it',
  messages,
})

export default ({ app }: { app: any }) => {
  // Set i18n instance on app
  app.use(i18n)
}

export function useI18n() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t, te, tm, rt, d, n, ...globalApi } = i18n.global;

  return {
    t: t.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    d: d.bind(i18n),
    n: n.bind(i18n),
    ...globalApi,
  };
}

export { i18n }
