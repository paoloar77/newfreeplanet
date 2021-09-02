import { IProject, IProjectsState, IDrag, IMenuList, IAction } from 'model'
import { Privacy, TipoVisu } from '@src/model'

import Api from '@api'
import { tools } from './Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { lists } from './Modules/lists'
import * as ApiTables from './Modules/ApiTables'
import globalroutines from './../globalroutines/index'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'
import { RouteNames } from '@src/router/route-names'
import * as Types from '@src/store/Api/ApiTypes'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { static_data } from '@src/db/static_data'
import { defineStore } from 'pinia'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'

const nametable = 'projects'

const listFieldsToChange: string [] = ['descr', 'respUsername', 'viceRespUsername', 'vice2RespUsername', 'longdescr', 'hoursplanned', 'hoursleft', 'hoursworked', 'id_parent', 'statusproj',
  'category', 'expiring_at', 'priority', 'pos', 'groupId', 'enableExpiring', 'progressCalc', 'live_url', 'test_url',
  'begin_development', 'begin_test', 'actualphase', 'totalphases', 'hoursweeky_plannedtowork', 'endwork_estimate',
  'privacyread', 'privacywrite', 'tipovisu', 'id_main_project', 'typeproj', 'favourite', 'themecolor', 'themebgcolor', 'view']

const listFieldsUpdateCalculation: string [] = ['hoursplanned', 'hoursleft', 'hoursworked', 'progressCalc', 'endwork_estimate']

export const useProjectStore = defineStore('Projects', {
  state: (): IProjectsState => ({
    showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
    projects: [],
    insidePending: false,
    visuLastCompleted: 10,
  }),

  getters: {

    getRecordEmpty: (state: IProjectsState) => (): IProject => {
      // const tomorrow = tools.getDateNow()
      // tomorrow.setDate(tomorrow.getDate() + 1)

      const obj: IProject = {
        _id: objectId(),
        descr: '',
        longdescr: '',
        typeproj: 0,
        id_parent: '',
        id_main_project: '',
        priority: tools.Priority.PRIORITY_NORMAL,
        statusproj: tools.Status.OPENED,
        created_at: tools.getDateNow(),
        modify_at: tools.getDateNow(),
        completed_at: tools.getDateNull(),
        category: '',
        // expiring_at: tomorrow,
        enableExpiring: false,
        pos: 0,
        modified: false,
        live_url: '',
        test_url: '',
        totalphases: 1,
        actualphase: 1,
        hoursworked: 0,
        hoursplanned: 0,
        hoursleft: 0,
        progressCalc: 0,
        privacyread: 'inherited',
        privacywrite: 'inherited',
        begin_development: tools.getDateNull(),
        begin_test: tools.getDateNull(),
        hoursweeky_plannedtowork: 0,
        endwork_estimate: tools.getDateNull(),
        themecolor: '',
        themebgcolor: '',
        groupId: '',
        respUsername: '',
        viceRespUsername: '',
        vice2RespUsername: '',
        tipovisu: 0,
      }

      return obj
    },

    projs_dacompletare: (state: IProjectsState) => (id_parent: string, tipoproj: string): IProject[] => {
      // console.log('projs_dacompletare')
      if (state.projects) {
        // console.log('projs_dacompletare', state.projects)
        // @ts-ignore
        return this.getproj(state.projects, id_parent, tipoproj)
      } else {
        return []
      }
    },

    listaprojects: (state: IProjectsState) => (tipoproj: string): IMenuList[] => {
      if (state.projects) {
        console.log('listaprojects')
        // @ts-ignore
        const listaproj = this.getproj(state.projects, process.env.PROJECT_ID_MAIN, tipoproj)
        const myarr: IMenuList[] = []
        for (const proj of listaproj) {
          myarr.push({ nametranslate: '', description: proj.descr, idelem: proj._id })
        }
        console.log('   myarr', myarr, listaproj)
        return myarr

      } else {
        return []
      }
    },

    listagerarchia: (state: IProjectsState) => (tipoproj: string, idparent: string): IMenuList[] => {
      if (state.projects) {
        // console.log('listagerarchia', idparent)
        const myarrgerarchia: IMenuList[] = []
        let myidparent: string = idparent
        let precmyparent = '-1'

        while (state.projects && myidparent) {
          // @ts-ignore
          const proj = this.getRecordById(myidparent)
          // const proj = state.projects.find((rec: IProject) => rec._id === myidparent)
          if (proj) {
            myarrgerarchia.push({ nametranslate: '', description: proj.descr, idelem: proj._id })
          } else {
            break
          }
          if (myidparent === proj.id_parent || (!proj.id_parent && (precmyparent === myidparent)))
            break
          precmyparent = myidparent
          myidparent = proj.id_parent ? proj.id_parent : ''
        }
        // console.log('  myarrgerarchia', myarrgerarchia)
        return myarrgerarchia.reverse()

      } else {
        return []
      }
    },

    getDescrById: (state: IProjectsState) => (id: string): string => {
      if (id === process.env.PROJECT_ID_MAIN)
        return 'Projects'
      if (state.projects) {
        const itemtrov = state.projects.find((item) => item._id === id)
        if (!!itemtrov)
          return itemtrov.descr!
      }

      return ''
    },

    getRecordById: (state: IProjectsState) => (id: string): IProject | null => {
      // console.log('state.projects', state.projects)
      // console.log('find', state.projects.find((item) => item._id === id))
      if (state.projects) {
        return state.projects.find((item) => item._id === id)!
      }
      return null
    },

    getifCanISeeProj: (state: IProjectsState) => (proj: IProject): boolean => {
      if ((proj === undefined) || (proj === null))
        return false

      const userStore = useUserStore()

      if (!!userStore.my) {

        if (userStore.my._id === proj.userId)  // If it's the owner
          return true

        let myprojtocheck = proj
        if (proj.privacyread === Privacy.inherited) {
          // @ts-ignore
          myprojtocheck = this.getFirstInherited(proj, proj.id_parent, state)
          if (!myprojtocheck)
            return true
        }

        console.log('privacyread', myprojtocheck.privacyread)

        return (userStore.my._id === myprojtocheck.userId) || (myprojtocheck.privacyread === Privacy.all) ||
          (myprojtocheck.privacyread === Privacy.friends) && (userStore.IsMyFriend(myprojtocheck.userId!))
          || ((myprojtocheck.privacyread === Privacy.mygroup) && (userStore.IsMyGroup(myprojtocheck.userId!)))

      } else {
        return false
      }

    },

    getTipoVisuProj: (state: IProjectsState) => (proj: IProject): number => {
      if ((proj === undefined) || (proj === null))
        return TipoVisu.simplelist

      const userStore = useUserStore()

      if (!!userStore) {

        let tipovisuproj = proj
        if (tipovisuproj.tipovisu === TipoVisu.inherited) {
          // @ts-ignore
          tipovisuproj = this.getFirstInheritedTipoVisu(proj, proj.id_parent, state)
          if (!tipovisuproj)
            return TipoVisu.simplelist
        }

        return tipovisuproj.tipovisu!

      } else {
        return TipoVisu.simplelist
      }

    },

    CanIModifyPanelPrivacy: (state: IProjectsState) => (proj: IProject): boolean => {
      if ((proj === undefined) || (proj === null))
        return false

      const userStore = useUserStore()

      if (!!userStore) {

        let myprojtocheck = proj
        if (proj.privacywrite === Privacy.inherited) {
          // @ts-ignore
          myprojtocheck = this.getFirstInherited(proj, proj.id_parent, state)
          if (!myprojtocheck)
            return true
        }

        if (!!userStore)
          return (userStore.my._id === myprojtocheck.userId) || (myprojtocheck.privacywrite === Privacy.all) ||
            (myprojtocheck.privacywrite === Privacy.friends) && (userStore.IsMyFriend(myprojtocheck.userId!))
            || ((myprojtocheck.privacywrite === Privacy.mygroup) && (userStore.IsMyGroup(myprojtocheck.userId!)))
        else
          return false
      }
      return false
    },
  },


  actions: {

    getFirstInherited(proj: IProject, idparent: string) {
      let myprojtocheck = null
      while (proj.privacyread === Privacy.inherited) {
        myprojtocheck = this.getRecordById(idparent)
        if (!myprojtocheck)
          return null

        idparent = myprojtocheck.id_parent!
        proj = myprojtocheck
      }
      return myprojtocheck
    },

    getFirstInheritedTipoVisu(proj: IProject, idparent: string) {
      let tipovisuproj = null
      while (!proj.tipovisu || proj.tipovisu <= 0) {
        tipovisuproj = this.getRecordById(idparent)
        if (!tipovisuproj)
          return null

        idparent = tipovisuproj.id_parent!
        proj = tipovisuproj
      }
      return tipovisuproj!.tipovisu
    },

    getarrByCategory(category: string) {
      if (!this.projects) {
        return []
      }
      return this.projects
    },

    initcat() {
      const userStore = useUserStore()
      const rec = this.getRecordEmpty()
      rec.userId = userStore.my._id

      return rec
    },

    updateDataCalculated(projout: any, projin: any) {
      listFieldsUpdateCalculation.forEach((field) => {
        projout[field] = projin[field]
      })
    },

    getproj(projects: any, idproj: any, tipoproj: string) {

      let ris = null

      const userStore = useUserStore()

      if (tipoproj === RouteNames.myprojects)
        ris = projects.filter((proj: IProject) => (proj.id_parent === idproj) && (proj.userId === userStore.my._id))
      else if (tipoproj === RouteNames.projectsshared)
        ris = projects.filter((proj: IProject) => (proj.id_parent === idproj) && (proj.userId === userStore.my._id) && (proj.privacyread !== Privacy.onlyme))
      else if (tipoproj === RouteNames.projectsall)
        ris = projects.filter((proj: IProject) => (proj.id_parent === idproj) && (proj.userId !== userStore.my._id))
      else
        ris = projects.filter((proj: IProject) => (proj.id_parent === idproj))

      if (ris) { // @ts-ignore
        ris = ris.sort((a: IProject, b: IProject) => a.pos - b.pos)
      }
      // console.log('idproj', idproj, 'projects', projects, 'getproj', tipoproj, 'ris=', ris)

      return ris
    },

    createNewItem({ objproj, atfirst, categorySel }: { objproj: IProject, atfirst: boolean, categorySel: string }) {
      // console.log('createNewItem', objproj, 'cat=', categorySel, 'this.projects', this.projects)
      if (this.projects === undefined) {
        this.projects = []
        this.projects.push(objproj)
        console.log('push this.projects', this.projects)
        return
      }
      if (atfirst) {
        this.projects.unshift(objproj)
      } else {
        this.projects.push(objproj)
      }
    },

    updateProject({ objproj }: { objproj: IProject }) {
      if (!!objproj) {
        // console.log('updateProject', objproj)
        const index = tools.getIndexById(this.projects, objproj._id)
        // console.log('index', index)
        if (index >= 0) {
          this.updateDataCalculated(this.projects[index], objproj)

          // this.projects.splice(index, 1, objproj)
          // tools.notifyarraychanged(this.projects)
        }
      }
    },

    deletemyitem(myitem: IProject) {
      // Find record
      const ind = tools.getIndexById(this.projects, myitem._id)

      ApiTables.removeitemfromarray(this.projects, ind)
    },

    async movemyitem({ myitemorig, myitemdest }: { myitemorig: IProject, myitemdest: IProject }) {
      const indorig = tools.getIndexById(this.projects, myitemorig._id)

      this.projects.splice(indorig, 1)
      this.projects.push(myitemdest)

      await this.modify({ myitem: myitemdest, field: 'id_parent' })
    },

    async dbLoad({ checkPending, onlyiffirsttime }: { checkPending: boolean, onlyiffirsttime: boolean }) {

      if (!static_data.functionality.ENABLE_PROJECTS_LOADING)
        return null

      if (onlyiffirsttime) {
        if (this.projects.length > 0) {
          // if already set, then exit.
          return new Types.AxiosError(0, null, 0, '')
        }
      }

      // if (userStore.my._id === '') {
      //   return false  // Login not made
      // }

      // console.log('userStore.my', userStore.my)

      // console.log('dbLoad', nametable, checkPending, 'userid=', userStore.my._id)

      const userStore = useUserStore()
      const globalStore = useGlobalStore()

      const ris = await Api.SendReq('/projects/' + userStore.my._id, 'GET', null)
        .then((res) => {
          if (res.data.projects) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.projects = res.data.projects
          } else {
            this.projects = []
          }

          this.showtype = parseInt(globalStore.getConfigStringbyId({
            id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
            default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          }), 10)

          if (process.env.DEBUG === '1') {
            console.log('dbLoad', 'this.projects', this.projects)
          }

          return res
        })
        .catch((error) => {
          console.log('error dbLoad', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      ApiTables.aftercalling(ris, checkPending, nametable)
    },

    async calculateHoursProjects({ projId, actualphase }: { projId: string, actualphase: string }) {

      let ris = null

      ris = await Api.SendReq('/projects/calc/' + projId + '/' + actualphase, 'GET', null)
        .then((res) => {
          if (res.data.rec) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            return res.data.rec
          }
          return null
        })
        .catch((error) => {
          console.log('error calculateHoursProjects', error)
        })

      return ris
    },

    async deleteItem({ idobj }: {idobj: any}) {
      console.log('deleteItem: KEY = ', idobj)

      const myarr = this.getarrByCategory('')

      const myobjtrov = tools.getElemById(myarr, idobj)

      console.log('myobjtrov', myobjtrov.descr)

      if (!!myobjtrov) {
        /*
        const myobjnext = tools.getElemPrevById(myarr, myobjtrov._id)

        if (!!myobjnext) {
          myobjnext.pos = myobjtrov.pos + 1
          myobjnext.modified = true
          await modify( { myitem: myobjnext, field: 'pos' })
        }

         */

        // ApiTables.table_DeleteRecord(nametable, myobjtrov, idobj)
        ApiTables.table_HideRecord(nametable, myobjtrov, idobj)
      }
    },

    async dbInsert({ myobj, atfirst }: { myobj: IProject, atfirst: boolean }) {

      const objproj = this.initcat()

      objproj.descr = myobj.descr
      objproj.category = myobj.category
      objproj.id_parent = myobj.id_parent
      objproj.id_main_project = myobj.id_main_project
      objproj.typeproj = myobj.typeproj
      objproj.privacyread = myobj.privacyread
      objproj.privacywrite = myobj.privacywrite
      objproj.actualphase = myobj.actualphase
      objproj.tipovisu = myobj.tipovisu

      let elemtochange: IProject = {}

      const myarr = this.getarrByCategory(objproj.category!)

      const tipoProj = ''

      if (atfirst) {
        console.log('INSERT AT THE TOP')
        elemtochange = tools.getFirstList(myarr)
        objproj.pos = 10
      } else {
        console.log('INSERT AT THE BOTTOM')
        // INSERT AT THE BOTTOM , so GET LAST ITEM
        const lastelem = tools.getLastListNotCompleted(nametable, objproj.id_parent!, tipoProj)

        objproj.pos = (!!lastelem) ? lastelem.pos + 10 : 10
      }
      objproj.modified = false

      this.createNewItem({ objproj, atfirst, categorySel: objproj.category! })    // 1) Create record in Memory

      const id = await globalroutines('write', nametable, objproj)           // 2) Insert into the IndexedDb

      let field = ''
      if (atfirst) {    // update also the last elem
        if (!!elemtochange) {
          elemtochange.pos = objproj.pos
          console.log('elemtochange', elemtochange)
          field = 'pos'

          // Modify the other record
          await this.modify({ myitem: elemtochange, field })
        }
      }

      // 3) send to the Server
      await ApiTables.Sync_SaveItem(nametable, 'POST', objproj)

      return id
    },

    async modify({ myitem, field }: {myitem: any, field: any}) {
      return ApiTables.table_ModifyRecord(nametable, myitem, listFieldsToChange, field)
    },

    async swapElems(itemdragend: IDrag) {
      console.log('PROJECT swapElems', itemdragend, this.projects)

      const myarr = this.projs_dacompletare(itemdragend.id_proj!, itemdragend.tipoproj!)

      tools.swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange)

    },

    async ActionCutPaste(action: IAction) {
      const globalStore = useGlobalStore()

      if (action.type === lists.MenuAction.CUT) {
        globalStore.lastaction = action
      } else if (action.type === lists.MenuAction.PASTE) {
        if (globalStore.lastaction.type === lists.MenuAction.CUT) {

          // Change id_parent
          const orig_obj = this.getRecordById(globalStore.lastaction._id)
          const dest = this.getRecordById(action._id)

          // console.log('dest', dest)

          const dest_obj = tools.jsonCopy(orig_obj)

          if (!!dest_obj) {
            dest_obj.id_parent = dest!._id
            dest_obj.id_main_project = dest!.id_main_project
            dest_obj.modified = true

            globalStore.lastaction.type = 0

            return this.movemyitem({ myitemorig: orig_obj!, myitemdest: dest_obj })
          }
        }
      }
    },
  },
})
