import { useGlobalStore } from '@store/globalStore'
import { static_data } from '@src/db/static_data'
import { useProgressBar } from '@store/Modules/ProgressBar'
import { tools } from '@store/Modules/tools'
import { useUserStore } from '@store/UserStore'
import { useRouter } from 'vue-router'

const progressBar = useProgressBar()

const getRouteData = async (to: any) => {
  if (!to.meta.transparent) {
    progressBar.start()
  }
  const titleToDisplay: any = await to.meta.asyncData(to)
}

const $router = useRouter()

// router().beforeEach(async (to: IMyRoute, from: IMyRoute, next) => {
$router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const globalStore = useGlobalStore()

  try {
    if (globalStore) {
      if (!globalStore.finishLoading) {
        let eseguicheck = true

        // Controlla se c'è nella lista allora non eseguire il controllo:
        for (const route of static_data.routes) {
          if (route.path === to.path) {
            eseguicheck = false
            break
          }
        }

        if (eseguicheck) {
          // Qui arrivano gli URL che non sono della lista ROUTE.
          // quindi ad esempio http://localhost:8085/signup/paoloar77

          if (!globalStore.TIMER && to.path !== '/') {
            // console.log('TIMER')
            globalStore.TIMER = setInterval(() => {
              // console.log('SETINTERVAL')
              if (globalStore.finishLoading) {
                if (globalStore.TIMER) {
                  // console.log('TIMER_STATE', TIMER_STATE, 'URL_RITORNA', URL_RITORNA)
                  if (globalStore.TIMER_STATE === 2) {
                    clearInterval(globalStore.TIMER)
                    globalStore.TIMER = null
                    // console.log('TERMINA INTERVALLO')
                    // next('/prova')
                    // return
                  }
                  // se mi ero salvato un url per doverci ritornare, allora puntalo a questo:
                  if (globalStore.URL_RITORNA !== '') {
                    // next(URL_RITORNA)
                    globalStore.TIMER_STATE = 2
                  } else if (globalStore.TIMER_STATE === 0) {
                    globalStore.URL_RESTORE = to.path
                    //  next('/')
                    globalStore.TIMER_STATE = 1
                  }
                }
              }
            }, 200)
          }
        }
      }
      if (globalStore.finishLoading) {
        if (globalStore.TIMER) {
          // console.log('TIMER_STATE', TIMER_STATE, 'to.path', to.path)
          if (globalStore.URL_RITORNA === '' && globalStore.URL_RESTORE !== '') {
            globalStore.URL_RITORNA = globalStore.URL_RESTORE
            // onsole.log('URL_RITORNA', URL_RITORNA)
          }
        }
      }

      // await tools.aspettansec(4000)
    }

    if (from.name && from.matched[0].name === to.name && from.meta.isModal) {
      next()
      console.log('Route interceptor log: <1>')
      return
    }
    // else if (from.name === to.name && isEqual(from.params, to.params)) {
    if (from.name === to.name) {
      console.log('Route interceptor log: <2>')
      console.log('from e to: ', from, to)
      next()
    } else {
      if (!to.meta.transparent && !to.meta.isModal) {
        // console.log('Route interceptor log: <4>')
        progressBar.start()
      } else if (to.meta.transparent && !from.name) {
        console.log('Route interceptor log: <5>')
        progressBar.start()
      } else if (to.meta.transparent && !to.matched.some((m) => m.name === from.name)) {
        console.log('Route interceptor log: <6>')
        progressBar.start()
      }

      // Check requires auth
      if (to.matched.some((m) => m.meta.requiresAuth)) {
        // await LoginStore.actions.refreshUserInfos()
        if (tools.isLoggedToSystem()) {
          if (to.meta.asyncData) {
            await getRouteData(to)
          }
        } else {
          // LoginStore.mutations.showLoginRoute(to.fullPath)
          if (from.name) {
            progressBar.hide()
          } else {
            // next('/')
          }

          $router.push({ name: 'pages.SignIn' })
          return
        }
      } else if (to.matched.some((m) => m.meta.noAuth) && userStore.isLogged) {
        next('/')
      } else if (to.meta.asyncData) {
        await getRouteData(to)
        return
      }
    }

    // if (to.meta.middleware) {
    //   const middleware = Array.isArray(to.meta.middleware)
    //     ? to.meta.middleware
    //     : [to.meta.middleware]
    //
    //   const context = {
    //     from,
    //     next,
    //     Router,
    //     to
    //   }
    //
    //   const nextMiddleware = nextFactory(context, middleware, 1)
    //
    //   return middleware[0]({ ...context, next: nextMiddleware })
    // }
    //
    return next()
  } catch
  (err) {
    console.log('Route error:', err)
    progressBar.fail()
  }
})

// const getRouteData = async (to: IMyRoute | IMyRouteRecord) => {

/*
router().afterEach(async (from: IMyRoute, next) => {
  progressBar.finish()
  // AlertsStore.mutations.hideAlert()
  // EventBus.$emit('closePopups')
})
*/
