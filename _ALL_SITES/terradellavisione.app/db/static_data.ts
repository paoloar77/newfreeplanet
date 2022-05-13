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
  SHOW_REG_BUTTON: false,
  ENABLE_REGISTRATION: true, // Cambiare con true
  SHOW_NEWSLETTER: false,
  SHOW_ONLY_POLICY: true,
  ENABLE_TODOS_LOADING: false,
  ENABLE_PROJECTS_LOADING: false,
  SHOW_IF_IS_SERVER_CONNECTION: false,
  SHOW_MESSAGES: false,
  BOOKING_EVENTS: true,
  ENABLE_ECOMMERCE: false,
  ENABLE_REG_ISP: true,
  ENABLE_GROUPS: true,
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
    order: 1040,
    path: '/admin/importfile',
    materialIcon: 'event_seat',
    name: 'otherpages.manage.importfile',
    component: () => import('@/rootgen/admin/importdata/importdata.vue'),
    level_parent: 0.0,
    level_child: 0.5,
    inmenu: true,
    submenu: true,
    onlyAdmin: true
  }
]


const routes_newsletter: IListRoutes[] = [
  {
    active: true,
    order: 10,
    name: 'newsletter.template', path: '/admin/newsletter/templemail', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 20,
    name: 'newsletter.sendemail', path: '/admin/newsletter/newnewsletter', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 30,
    name: 'newsletter.check', path: '/admin/newsletter/check', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 40,
    name: 'newsletter.sent', path: '/admin/newsletter/newslist', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 50,
    name: 'newsletter.mailinglist', path: '/admin/newsletter/mailinglist', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 60,
    name: 'newsletter.settings', path: '/admin/newsletter/settings', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 70,
    name: 'newsletter.serversettings', path: '/admin/newsletter/main_settings', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  },
  {
    active: true,
    order: 80,
    name: 'newsletter.others', path: '/admin/newsletter/events', materialIcon: 'fas fa-users',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: true, submenu: true, level_parent: 0.5, level_child: 0.5, onlyManager: true, noroute: true
  }
]

const routes_ris: IListRoutes[] = [
  {
    active: true,
    order: 10,
    path: '/admin/ris/circuitslist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.circuitslist',
    component: () => import('@/rootgen/admin/circuitsList/circuitsList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: true
  },
  {
    active: true,
    order: 20,
    path: '/admin/ris/accountslist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.accountslist',
    component: () => import('@/rootgen/admin/accountsList/accountsList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: true
  },
  {
    active: true,
    order: 30,
    path: '/admin/ris/movslist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.movslist',
    component: () => import('@/rootgen/admin/movsList/movsList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: true
  },
]


const routes_manager: IListRoutes[] = [
  {
    active: functionality.BOOKING_EVENTS,
    order: 70,
    path: '/admin/usereventlist',
    materialIcon: 'edit',
    name: 'otherpages.admin.usereventlist',
    component: () => import('@/rootgen/admin/eventlist/eventlist.vue'),
    inmenu: functionality.BOOKING_EVENTS,
    submenu: functionality.BOOKING_EVENTS,
    level_parent: 0,
    level_child: 0.5,
    infooter: false,
    onlyManager: true,
    onlyConsiglio: true,
    onlyAdmin: true
  },
  {
    active: true,
    order: 10,
    path: '/admin/userlist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.userlist',
    component: () => import('@/rootgen/admin/usersList/usersList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: true
  },
  /*
  {
    active: true,
    order: 10,
    path: '/admin/iscritticonacreis',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.iscritticonacreis',
    component: () => import('@/rootgen/admin/iscritticonacreis/iscritticonacreis.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: true
  },

   */
  {
    active: true,
    path: '/admin/ris',
    order: 60,
    faIcon: 'fa fa-list-alt',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.monete',
    routes2: routes_ris,
    inmenu: false,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    solotitle: true,
    onlyAdmin: true,
    onlyManager: true
  },
  {
    active: false,
    order: 10,
    path: '/admin/zoomlist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.zoomlist',
    component: () => import('@/rootgen/admin/zoomList/zoomList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyTutor: false
  },
  {
    active: true,
    order: 27,
    path: '/admin/tableslist',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.tableslist',
    component: () => import('@/rootgen/admin/tablesList/tablesList.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyAdmin: true,
    onlyManager: true
  },
  {
    active: true,
    order: 30,
    path: '/admin/pages',
    materialIcon: 'fas fa-file-alt',
    name: 'otherpages.admin.pages',
    component: () => import('@/rootgen/admin/pages/pages.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyEditor: true
  },
  {
    active: true,
    order: 30,
    path: '/admin/bot',
    materialIcon: 'fas fa-file-alt',
    name: 'otherpages.admin.bot',
    component: () => import('@/rootgen/admin/bot/bot.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyEditor: true
  },
  {
    active: true,
    order: 30,
    path: '/admin/confsite',
    materialIcon: 'fas fa-file-alt',
    name: 'otherpages.admin.confsite',
    component: () => import('@/rootgen/admin/confsite/confsite.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyManager: true,
    onlyEditor: true
  },
  {
    active: true,
    path: '/admin/newsletter',
    order: 60,
    faIcon: 'fa fa-list-alt',
    materialIcon: 'fas fa-users',
    name: 'otherpages.admin.newsletter',
    routes2: routes_newsletter,
    inmenu: false,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    solotitle: true,
    onlyAdmin: true,
    onlyManager: true
  },
  /*
    {
    active: functionality.ENABLE_ECOMMERCE,
    path: '/admin/ecommerce',
    order: 31,
    faIcon: 'fa fa-list-alt',
    materialIcon: 'next_week',
    name: 'pages.admin_ecommerce',
    routes2: routes_admin_ecommerce,
    inmenu: false,
    submenu: true,
    level_parent: 0.5,
    level_child: 0.5,
    solotitle: true,
    onlyAdmin: true,
    onlyManager: true,
    onlyDepartment: true
  },

   */
  {
    active: true,
    order: 35,
    path: '/admin/msg_template',
    materialIcon: 'fas fa-file-alt',
    name: 'msgs.messages',
    component: () => import('@/rootgen/admin/msg_template/msg_template.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyAdmin: true,
    onlyManager: true
    // onlyTutor: true
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
    onlyAdmin: true,
    onlyManager: true,
  },
  {
    active: true,
    order: 40,
    path: '/admin/gallery',
    materialIcon: 'fas fa-file-alt',
    name: 'otherpages.admin.gallery',
    component: () => import('@/rootgen/admin/gallery/gallery.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyAdmin: true,
    onlyManager: true
  },
  {
    active: true,
    order: 50,
    path: '/admin/media',
    materialIcon: 'fas fa-file-alt',
    name: 'otherpages.admin.media',
    component: () => import('@/rootgen/admin/uploader/uploader.vue'),
    inmenu: true,
    submenu: true,
    level_parent: 0,
    level_child: 0.5,
    onlyAdmin: true,
    onlyManager: true
  },
]


const baseroutes: IListRoutes[] = [
  {
    active: true,
    order: 5,
    path: '/',
    materialIcon: 'home',
    name: 'pages.home',
    component: () => import('@src/root_spec/home_tdv/home_tdv.vue'),
    reqauth: false,
    inmenu: true,
    infooter: true,
  },
  {
    active: true,
    order: 135,
    path: '/my/:username',
    materialIcon: 'fas fa-user',
    name: 'pages.profile2',
    component: () => import('@/views/user/myprofile/myprofile.vue'),
    meta: { requiresAuth: true },
    inmenu: false,
    infooter: false,
  },
  {
    active: true,
    order: 400,
    path: '/test',
    materialIcon: 'fas fa-test',
    name: 'mypages.test',
    component: () => import('@/views/testServer/testServer.vue'),
    inmenu: false,
    infooter: false,
  },
  {
    active: true,
    order: 400,
    path: '/testlocal',
    materialIcon: 'fas fa-test',
    name: 'mypages.TestLocal',
    component: () => import('@/views/test/test.vue'),
    meta: { requiresAuth: true },
    inmenu: false,
    infooter: false,
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
    infooter: false,
    onlyAdmin: true
  },
  ...routes_admin,
  {
    active: true,
    order: 2110,
    path: '/manage',
    materialIcon: 'fas fa-users-cog',
    name: 'otherpages.manage.menu',
    inmenu: true,
    routes2: routes_manager,
    solotitle: true,
    infooter: false,
    onlyAdmin: true,
    onlyManager: true,
    onlyTutor: true,
    onlyEditor: true
  },
  ...routes_manager,
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

  {
    active: true,
    order: 2000,
    path: '/policy',
    materialIcon: 'fas fa-user',
    name: 'pages.policy',
    component: () => import('@src/root/policy/policy.vue'),
    inmenu: false,
    infooter: true
  },
  {
    active: functionality.ENABLE_REGISTRATION,
    order: 1000,
    path: '/signup/:invited/:usernameteleg/:idteleg',
    materialIcon: 'how_to_reg',
    name: 'pages.SignUp',
    component: () => import('@/views/login/signup/signup.vue'),
    inmenu: false,
    infooter: false,
    separator: false
  },
  {
    active: true,
    order: 1001,
    path: '/signup/:invited',
    materialIcon: 'how_to_reg',
    name: 'pages.SignUp2',
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
  // --- NOT IN MENU: ---
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
  {
    active: true,
    order: 80,
    path: '/calendario-eventi',
    materialIcon: 'event',
    name: 'pages.calendarioeventi',
    component: () => import('@/root/calendarioeventi/calendarioeventi.vue'),
    extraclass: 'isCalendar',
    inmenu: false,
    infooter: false
  },
  {
    active: true,
    order: 1000,
    path: '/admin/newsletter/:idparam',
    materialIcon: 'event',
    name: 'pages.newsletter.menu',
    component: () => import('@/rootgen/admin/newsletter/newsletter.vue'),
    inmenu: false,
    infooter: false
  },
  {
    active: true,
    order: 90,
    path: '/event/:typol/:eventid',
    materialIcon: 'event',
    name: 'pages.evento',
    component: () => import('@/root/evento/evento.vue'),
    inmenu: false,
    infooter: false
  },
  {
    active: true,
    order: 110,
    path: '/event/:typol',
    materialIcon: 'event',
    name: 'pages.eventodef',
    component: () => import('@/root/evento/evento.vue'),
    inmenu: false,
    infooter: false
  },

]
export function firstimagehome() {

  let img = 'statics/images/background.jpg'
  return img
}


const arrLangUsed = [
  'it',
  // 'enUs',
  // 'es',
]

const lang_available: ILang[] = [
  {
    label: 'Italiano', icon: 'fa-flag-it', value: 'it', image: '../images/it.png', short: 'IT',
  },
  /*{
    label: 'English', icon: 'fa-flag-us', value: 'enUs', image: '../images/gb.png', short: 'EN',
  },
  {
    label: 'Español', icon: 'fa-flag-es', value: 'es', image: '../images/es.png', short: 'ES',
  },

   */
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
