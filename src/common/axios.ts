import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

// import { default as VueRouter } from 'vue-router'
import { serv_constants } from '@src/store/Modules/serv_constants'
// import { TokenHelper } from "./token-helper";

let initialized = false

interface IRequestConfig extends AxiosRequestConfig {
  ignore: number[]
}

function handle(status: number, exclude: number[]) {
  if (exclude.length === 0) return true
  return exclude.find(o => o === status) === undefined
}

export function UseAxios(router: any) { // VueRouter
  if (!initialized) {
    // @ts-ignore
    axios.interceptors.request.use((config: IRequestConfig) => {
      if (!config.headers.Authorization) {
        // append authorization header
        /* ++Todo: disattivato per ora...
        let bearerToken = TokenHelper.getBearerToken()

        if (bearerToken.Authorization)
          Object.assign(config.headers, bearerToken)
          */
      }

      // ensure axios does not follow redirects, so custom response interceptor below can push to app login page
      if (!config.maxRedirects || (config.maxRedirects === 5)) {
        config.maxRedirects = 0
      }

      return config
    })

    axios.interceptors.response.use(undefined, (config: AxiosError) => {
      // @ts-ignore
      const { response } = config
      const exclude = (<IRequestConfig>config.config).ignore || []

      if (response) {
        if (response.status === 401 && handle(response.status, exclude)) {
          const location: string = response.headers.location || response.headers.Location

          if (location) {
            const redirectTo = `/${location}`
            window.setTimeout(() => router.replace(redirectTo), 200)
          }
        }

        if (response.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN && handle(response.status, exclude)) {
          window.setTimeout(() => router.replace('/forbidden'), 200)
        }
      }

      return config
    })

    initialized = true
  }
}
