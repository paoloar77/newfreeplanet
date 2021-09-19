import {
  IListRoutes,
  ILang,
  IFunctionality,
  IPreloadImages,
} from '@model'

const functionality: IFunctionality = {
  PWA: false,
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

const routes_admin: IListRoutes[] = [
  {
    active: true,
    order: 10,
    path: '/admin/sites',
    materialIcon: 'event_seat',
    name: 'pages.Sites',
    component: () => import('@/rootgen/admin/sites/sites.vue'),
    level_parent: 0.0,
    level_child: 0.5,
    inmenu: true,
    submenu: true,
    onlyAdmin: true
  },
  {
    active: true,
    order: 1000,
    path: '/admin/cfgserv',
    materialIcon: 'event_seat',
    name: 'pages.Admin',
    component: () => import('@/views/admin/cfgServer/cfgServer.vue'),
    level_parent: 0.0,
    level_child: 0.5,
    inmenu: true,
    submenu: true,
    onlyAdmin: true
  },
  {
    active: true,
    order: 1020,
    path: '/admin/dbop',
    materialIcon: 'event_seat',
    name: 'pages.dbop',
    component: () => import('@/views/admin/dbop/dbop.vue'),
    level_parent: 0.0,
    level_child: 0.5,
    inmenu: true,
    submenu: true,
    onlyAdmin: true
  },
  {
    active: true,
    order: 1030,
    path: '/admin/sendpushnotif',
    materialIcon: 'event_seat',
    name: 'otherpages.manage.sendpushnotif',
    component: () => import('@/rootgen/admin/sendpushnotif/sendpushnotif.vue'),
    level_parent: 0.0,
    level_child: 0.5,
    inmenu: true,
    submenu: true,
    onlyAdmin: true
  }
]

const baseroutes: IListRoutes[] = [
  {
    active: true,
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
    active: true,
    order: 120,
    path: '/profile',
    materialIcon: 'fas fa-user',
    name: 'pages.profile',
    component: () => import('@/views/user/profile/profile.vue'),
    meta: { requiresAuth: true },
    inmenu: true,
    infooter: true,
  },
  /*{
    active: true,
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

   */
  {
    active: true,
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
  {
    active: true,
    order: 2000,
    path: '/admin',
    materialIcon: 'fas fa-user-shield',
    name: 'otherpages.admin.menu',
    inmenu: true,
    routes2: routes_admin,
    solotitle: true,
    infooter: true,
    onlyAdmin: true
  },
  ...routes_admin,
  {
    active: true,
    order: 1000,
    path: '/404error',
    materialIcon: 'fas fa-calendar-plus',
    name: 'otherpages.error404',
    component: () => import('@/root/My404page/My404page.vue'),
    inmenu: false,
    infooter: false
  },

  // --- NOT IN MENU: ---
  /*{
    order: 8,
    path: '/policy',
    name: 'pages.policy',
    component: () => import('@src/root/policy/policy.vue'),
  },*/
  {
    active: functionality.ENABLE_REGISTRATION,
    order: 1000,
    path: '/signup',
    materialIcon: 'how_to_reg',
    name: 'pages.SignUp',
    component: () => import('@/views/login/signup/signup.vue'),
    inmenu: false,
    infooter: false,
    separator: false
  },
  {
    active: functionality.ENABLE_REGISTRATION,
    order: 2000,
    path: '/regok',
    materialIcon: 'how_to_reg',
    name: 'pages.regok',
    component: () => import('@/views/login/regok/regok.vue'),
    inmenu: false,
    infooter: false,
    separator: false,
  },
  {
    active: true,
    order: 1000,
    path: '/signin',
    materialIcon: 'account_circle',
    name: 'pages.SignIn',
    component: () => import('@/views/login/signin_noreg/signin_noreg.vue'),
    inmenu: true,
    infooter: true
  },
  {
    active: true,
    order: 1000,
    path: '/vreg',
    name: 'pages.vreg',
    component: () => import('@/views/login/vreg/vreg.vue')
  },
  {
    active: true,
    order: 1000,
    path: '/requestresetpwd',
    name: 'pages.requestresetpwd',
    component: () => import('@/views/requestresetpwd/requestresetpwd.vue')
  },
  {
    active: true,
    order: 1000,
    path: '/updatepassword',
    name: 'pages.updatepassword',
    component: () => import('@/views/updatepassword/updatepassword.vue')
  },
  {
    active: true,
    order: 1000,
    path: '/offline',
    name: 'Offline',
    component: () => import('@/views/offline/offline.vue')
  },
  {
    active: true,
    path: '/separator',
    name: 'separator',
    order: 35,
    isseparator: true,
    inmenu: true,
  },

]

const arrLangUsed = [
  'it',
  'enUs',
  'es',
]

const lang_available: ILang[] = [
  {
    label: 'Italiano', icon: 'fa-flag-it', value: 'it', image: '../images/it.png', short: 'IT',
  },
  {
    label: 'English', icon: 'fa-flag-us', value: 'enUs', image: '../images/gb.png', short: 'EN',
  },
  {
    label: 'Español', icon: 'fa-flag-es', value: 'es', image: '../images/es.png', short: 'ES',
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
