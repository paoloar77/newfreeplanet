/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { configure } = require('quasar/wrappers');

const path = require('path')
const webpack = require('webpack')
const helpers = require('./helpers')
const envparser = require('./config/envparser')

// const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = configure((ctx) => ({
  // https://v2.quasar.dev/quasar-cli/supporting-ts
  supportTS: {
    tsCheckerConfig: {
      eslint: {
        enabled: true,
        files: './src/**/*.{ts,tsx,jsx,vue}',
      },
    },
  },

  // https://v2.quasar.dev/quasar-cli/prefetch-feature
  // preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://v2.quasar.dev/quasar-cli/boot-files
  // boot: ['vue-i18n', 'vue-meta', 'axios', 'vee-validate', 'myconfig', 'local-storage', 'error-handler', 'globalroutines', 'vue-idb', 'dragula', 'guard'],
  boot: ['i18n', 'axios', 'vee-validate', 'myconfig', 'local-storage', 'error-handler', 'globalroutines'],

  // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
  css: [
    'app.scss',
    // '~quasar-ui-qcalendar/src/css/calendar-day.sass'
  ],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    // 'ionicons-v4',
    // 'mdi-v5',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    'ionicons-v4',
    // 'mdi-v3',
    'fontawesome-v5',
    'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
  ],

  aliases: {
    quasar: path.resolve(__dirname, 'node_modules/@quasar/'),
    src: path.resolve(__dirname, 'src'),
    statics: path.resolve(__dirname, 'src/statics'),
    components: path.resolve(__dirname, 'src/components'),
    views: path.resolve(__dirname, 'src/views/index.ts'),
    icons: path.resolve(__dirname, 'src/assets/icons'),
    images: path.resolve(__dirname, 'src/assets/images'),
    classes: path.resolve(__dirname, 'src/classes/index.ts'),
    fonts: path.resolve(__dirname, 'src/assets/fonts'),
    utils: path.resolve(__dirname, 'src/utils/index.ts'),
    css: path.resolve(__dirname, 'src/styles/variables.scss'),
    router: path.resolve(__dirname, 'src/router/index.ts'),
    validators: path.resolve(__dirname, 'src/utils/validators.ts'),
    methods: path.resolve(__dirname, 'src/utils/methods.ts'),
    filters: path.resolve(__dirname, 'src/utils/filters.ts'),
    api: path.resolve(__dirname, 'src/store/Api/index.ts'),
    paths: path.resolve(__dirname, 'src/store/Api/ApiRoutes.ts'),
    store: path.resolve(__dirname, 'src/store/index.ts'),
    modules: path.resolve(__dirname, 'src/store/Modules/index.ts'),
    model: path.resolve(__dirname, 'src/model/index.ts'),
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
  build: {
    env: envparser(),
    vueRouterMode: 'history',
    vueCompiler: true,
    gzip: false, // gzip true
    analyze: false, // true
    transpile: true,
    transpileDependencies: [
      /quasar-ui-qcalendar[\\/]src/
    ],

    chainWebpack(chain, { isServer, isClient }) {
      chain.resolve.alias
      // .set('myalias', path.resolve(__dirname, './src/somefolder'))
        .set('@', helpers.root('src'))
        .set('@components', helpers.root('src/components/index.ts'))
        .set('@boot', helpers.root('src/boot/*'))
        .set('@costanti', helpers.root('src/store/Modules/costanti.ts'))
        .set('@views', path.resolve(__dirname, 'src/views/index.ts'))
        .set('@src', path.resolve(__dirname, 'src'))
        .set('@css', path.resolve(__dirname, 'src/public/css/variables.scss'))
        .set('@icons', path.resolve(__dirname, 'src/public/icons/*'))
        .set('@images', path.resolve(__dirname, 'src/public/images/*'))
        .set('@classes', path.resolve(__dirname, 'src/classes/index.ts'))
        .set('@utils', path.resolve(__dirname, 'src/utils/index.ts'))
        .set('@utils', path.resolve(__dirname, 'src/utils/*'))
        .set('@router', path.resolve(__dirname, 'src/router/index.ts'))
        .set('@validators', path.resolve(__dirname, 'src/utils/validators.ts'))
        .set('@methods', path.resolve(__dirname, 'src/utils/methods.ts'))
        .set('@api', path.resolve(__dirname, 'src/store/Api/index.ts'))
        .set('@paths', path.resolve(__dirname, 'src/store/Api/ApiRoutes.ts'))
        .set('@storemod', path.resolve(__dirname, 'src/store/Modules/*'))
        .set('@store', path.resolve(__dirname, 'src/store'))
        .set('@modules', path.resolve(__dirname, 'src/store/Modules/index.ts'))
        .set('@model', path.resolve(__dirname, 'src/model/index.ts'))
    },
    // extractCSS: false,
    // transpile: false,

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: true, // https://v2.quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,

    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,

    // https://v2.quasar.dev/quasar-cli/handling-webpack
    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
  dev: {
    env: require('./.env.development'),
  },
  devServer: {
    https: false,
    port: 8083,
    open: false, // opens browser window automatically
    liveReload: false,
  },

  // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
  framework: {
    config: {},

    // iconSet: 'material-icons', // Quasar icon set
    // lang: 'en-US', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    components: [
      'QLayout',
      'QDrawer',
      'QItemSection',
      'QHeader',
      'QFooter',
      'QPageContainer',
      'QPage',
      'QPopupProxy',
      'QToolbar',
      'QToolbarTitle',
      'QBtn',
      'QBtnDropdown',
      'QColor',
      'QIcon',
      'QList',
      'QKnob',
      'QItemLabel',
      'QItem',
      'QCard',
      'QMarkupTable',
      'QSpace',
      'QDialog',
      'QBadge',
      'QForm',
      'QCardSection',
      'QCardActions',
      'QField',
      'QInput',
      'QSelect',
      'QMenu',
      'QToggle',
      'QFab',
      'QInfiniteScroll',
      'QAjaxBar',
      'QChip',
      'QExpansionItem',
      'QCheckbox',
      'QBanner',
      'QInnerLoading',
      'QSpinnerGears',
      'QDate',
      'QTime',
      'QSlideTransition',
      'QTable',
      'QTh',
      'QTr',
      'QTd',
      'QLinearProgress',
      'QSlider',
      'QPopupEdit',
      'QCarousel',
      'QCarouselControl',
      'QCarouselSlide',
      'QPageScroller',
      'QAvatar',
      'QImg',
      'QSplitter',
      'QRating',
      'QParallax',
      'QTab',
      'QTabs',
      'QTabPanels',
      'QTabPanel',
      'QTree',
      'QSeparator',
    ],
    directives: [
      'Ripple',
      'ClosePopup',
    ],
    // Quasar plugins
    plugins: [
      'Meta',
      'Dialog',
      'Notify',
      'Cookies',
      'Loading',
    ],
    iconSet: 'fontawesome-v5',
    lang: 'it', // Quasar language
  },

  // animations: 'all', // --- includes all animations
  // https://v2.quasar.dev/options/animations
  animations: [],

  // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
  ssr: {
    pwa: false,

    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,

    prodPort: 3000, // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)

    maxAge: 1000 * 60 * 60 * 24 * 30,
    // Tell browser when a file from the server should expire from cache (in ms)

    chainWebpackWebserver(/* chain */) {
      //
    },

    middlewares: [
      ctx.prod ? 'compression' : '',
      'render', // keep this as last one
    ],
  },

  // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
  pwa: {
    workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
    workboxOptions: {}, // only for GenerateSW

    // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
    // if using workbox in InjectManifest mode
    chainWebpackCustomSW(chain) {
      // chain.plugin('eslint-webpack-plugin')
      //   .use(ESLintPlugin, [{ extensions: ['js'] }])
    },

    manifest: {
      name: 'PopoloDelNuovoMondo',
      short_name: 'PdNM',
      description: 'Popolo del Nuovo Mondo',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        {
          src: 'images/pdnm-android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'images/pdnm-android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'images/pdnm-android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'images/pdnm-android-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
  cordova: {
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
  electron: {
    bundler: 'packager', // 'packager' or 'builder'

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',

      // Windows only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      appId: 'firstproj',
    },

    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
    chainWebpack(/* chain */) {
      // do something with the Electron main process Webpack cfg
      // extendWebpackMain also available besides this chainWebpackMain
    },

    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
    chainWebpackPreload(/* chain */) {
      // do something with the Electron main process Webpack cfg
      // extendWebpackPreload also available besides this chainWebpackPreload
    },
  },
}))
