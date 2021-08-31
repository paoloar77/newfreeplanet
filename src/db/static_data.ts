import {
  IListRoutes,
  ILang,
  IFunctionality,
  IPreloadImages,
} from '@model'

const functionality: IFunctionality = {
  PWA: true,
  SHOW_USER_MENU: true, // Cambiare con true
  SHOW_PROFILE: true,
  SHOW_REG_BUTTON: true,
  ENABLE_REGISTRATION: true, // Cambiare con true
  ENABLE_REG_AYNI: false,
  SHOW_NEWSLETTER: false,
  SHOW_ONLY_POLICY: false,
  ENABLE_TODOS_LOADING: true,
  ENABLE_PROJECTS_LOADING: true,
  SHOW_IF_IS_SERVER_CONNECTION: false,
  SHOW_MESSAGES: false,
  BOOKING_EVENTS: false,
  ENABLE_ECOMMERCE: true,
  ENABLE_REG_CNM: true,
}

// const SHOW_PROJINTHEMENU = false
//
// let arrlistafavourite = []
// let arrlistaprojtutti = []
// let arrlistaprojmiei = []
// if (SHOW_PROJINTHEMENU) {
//   arrlistaprojtutti = Projects.getters.listaprojects(RouteNames.projectsall)
//   arrlistaprojmiei = Projects.getters.listaprojects(RouteNames.myprojects)
//   arrlistafavourite = Projects.getters.listaprojects(RouteNames.favouriteprojects)
// }
// PROGETTI -> FAVORITI :

// if (arrlistafavourite.length > 0) {
//   arrMenu.push({
//     icon: 'favorite_border',
//     nametranslate: 'pages.' + RouteNames.favouriteprojects,
//     urlroute: RouteNames.favouriteprojects,
//     level_parent: 0.0,
//     level_child: 0.5,
//     routes2: arrlistafavourite,
//     idelem: ''
//   })
// }

const routes_todo: IListRoutes[] = []
const arrlista = [
  { nametranslate: 'personal', description: 'personal' },
  { nametranslate: 'work', description: 'work' },
  { nametranslate: 'shopping', description: 'shopping' },
]

const baseroutes: IListRoutes[] = [
  {
    order: 4,
    path: '/ciao',
    materialIcon: 'ciao',
    name: 'pages.ciao',
    component: () => import('@src/root/ciao/ciao.vue'),
    reqauth: false,
    inmenu: true,
    infooter: true,
  },
  {
    order: 5,
    path: '/',
    materialIcon: 'home',
    name: 'pages.home',
    component: () => import('@src/root/home/home.vue'),
    reqauth: false,
    inmenu: true,
    infooter: true,
  },
  {
    order: 6,
    path: '/b',
    faIcon: 'fa fa-list-alt',
    materialIcon: 'format_list_numbered',
    name: 'pages.Todo',
    routes2: routes_todo,
    level_parent: 0,
    level_child: 0.5,
    inmenu: true,
    solotitle: true,
    infooter: true,
  },
  {
    order: 7,
    path: '/c',
    faIcon: 'fa fa-list-alt',
    materialIcon: 'next_week',
    name: 'pages.projects',
    // routes2: routes_projects,
    level_parent: 0,
    level_child: 0.5,
    inmenu: true,
    solotitle: true,
    infooter: true,
  },
  // --- NOT IN MENU: ---
  /*{
    order: 8,
    path: '/policy',
    name: 'pages.policy',
    component: () => import('@src/root/policy/policy.vue'),
  },*/
]

const arrLangUsed = [
  'it',
  'enUs',
  'es',
]

const lang_available: ILang[] = [
  {
    label: 'Italiano', icon: 'fa-flag-it', value: 'it', image: '../public/images/it.png', short: 'IT',
  },
  {
    label: 'English', icon: 'fa-flag-us', value: 'enUs', image: '../public/images/gb.png', short: 'EN',
  },
  {
    label: 'Español', icon: 'fa-flag-es', value: 'es', image: '../public/images/es.png', short: 'ES',
  },
// { label: 'Français', icon: 'fa-facebook', value: 'fr', image: '../public/images/fr.png', short: 'FR' }
// { label: 'German', icon: 'fa-flag-de', value: 'de', image: '../public/images/de.png', short: 'DE' },
]

const preLoadImages: IPreloadImages[] = []

export const preloadedimages = []

export const routes = baseroutes

export const static_data = {
  baseroutes,
  routes,
  functionality,
  lang_available,
  preLoadImages,
  arrLangUsed,
  preloadedimages,
}
