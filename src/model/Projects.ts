export interface IAction {
  table: string
  type: number
  _id: any
  cat?: string
}

export interface IProject {
  _id?: any,
  userId?: string
  category?: string
  typeproj?: number
  id_main_project?: string
  id_parent?: string
  descr?: string
  note?: string
  longdescr?: string
  priority?: number
  statusproj?: number
  created_at?: Date
  modify_at?: Date
  completed_at?: Date
  expiring_at?: Date
  enableExpiring?: boolean
  modified?: boolean
  favourite?: number
  pos?: number
  order?: number
  live_url?: string
  test_url?: string
  hoursplanned?: number
  hoursleft?: number
  hoursworked?: number
  progressCalc?: number
  begin_development?: Date
  hoursweeky_plannedtowork?: number
  endwork_estimate?: Date
  begin_test?: Date
  totalphases?: number
  actualphase?: number
  privacyread?: string
  privacywrite?: string
  tipovisu?: number
  themecolor?: string
  themebgcolor?: string
  groupId?: string
  respUsername?: string
  viceRespUsername?: string
  vice2RespUsername?: string
  view?: string
}

export interface IProjectsState {
  showtype: number
  projects: IProject[]
  insidePending: boolean
  visuLastCompleted: number
}

export const Privacy = {
  all: 'all',
  friends: 'friends',
  mygroup: 'mygroup',
  onlyme: 'onlyme',
  inherited: 'inherited',
}

export const TipoVisu = {
  inherited: 0,
  simplelist: 1,
  taskProgress: 2,
  responsabili: 3,
}

export const TypeProj = {
  TYPE_PROJECT: 1,
  TYPE_SUBDIR: 2,
}
