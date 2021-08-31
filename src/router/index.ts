import {
  createMemoryHistory, createRouter, createWebHashHistory, createWebHistory,
} from 'vue-router'

import { cfgrouter } from './route-config'

export default function (/* { store, ssrContext } */) {
  const routermode = process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : routermode

  return createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: cfgrouter.getmenu(),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,
    ),
  })
}
