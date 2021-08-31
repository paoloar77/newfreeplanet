interface IUriConfig {
  auth?: string
  content?: string
  site?: string
  services?: string
}

const uri: IUriConfig = {}

const addProp = (obj: {}, propName: string, value: string) => {
  Object.defineProperty(obj, propName, {
    enumerable: false,
    get: () => `//${window.location.host}${value}`,
  })
}

addProp(uri, 'auth', '/auth/')
addProp(uri, 'content', '/api/content/')
addProp(uri, 'site', process.env.MONGODB_HOST ? process.env.MONGODB_HOST : '')
addProp(uri, 'services', '/api/')

const config = {
  claimsNamespace: '//toucan/claims',
  uri,
  auth: {
    accessTokenKey: 'AUTH-LOCAL',
    externalProviderKey: 'AUTH-EXTERNAL',
  },
  uopt: 'UOPT',
  xsrf: {
    cookieName: 'XSRF-TOKEN',
    headerName: 'X-XSRF-TOKEN',
  },
}

export default config
