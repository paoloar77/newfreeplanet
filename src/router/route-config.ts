import { static_data } from '@src/db/static_data'
import type { RouteRecordRaw } from 'vue-router'
import { tools } from '@store/Modules/tools'

interface IMyMeta {
  title?: string,
  headerShadow?: boolean,
  contentProp?: boolean,
  transparent?: boolean,
  isModal?: boolean,
  requiresAuth?: boolean,
  isTab?: boolean,
  noAuth?: boolean,
  // asyncData?: (to?: IMyRoute | IMyRouteRecord) => Promise<{title?: string} | void>,
  asyncData?: (to?: any) => Promise<{ title?: string } | void>,
  isAuthorized?: (to?: any) => boolean
  middleware?: any[]
}

/*
export interface IMyRoute extends Route {
  meta: IMyMeta,
  matched: IMyRouteRecord[]
}

export interface IMyRouteRecord extends RouteRecord {
  meta: IMyMeta,
}
*/

export const cfgrouter = {

  getmenu(): RouteRecordRaw[] {
    const arrroutes: RouteRecordRaw[] = []

    for (const route of static_data.routes) {
      tools.addRoute(arrroutes, route)
    }

    return arrroutes
  },
}
