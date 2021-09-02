import {
  ITodo,
  ITodosState,
  IParamTodo,
  IDrag,
  IAction,
} from 'model'

import Api from '@api'
import { tools } from '@store/Modules/tools'
import { lists } from './Modules/lists'
import * as ApiTables from './Modules/ApiTables'
import globalroutines from './../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'
import * as Types from '@src/store/Api/ApiTypes'
import { static_data } from '@src/db/static_data'
import { defineStore } from 'pinia'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { toolsext } from '@store/Modules/toolsext'

const nametable = 'todos'

// import _ from 'lodash'

const listFieldsToChange: string [] = ['descr', 'statustodo', 'category', 'expiring_at', 'priority', 'pos', 'enableExpiring', 'progress', 'phase', 'assigned_to_userId', 'hoursplanned', 'hoursworked', 'start_date', 'completed_at', 'themecolor', 'themebgcolor', 'assignedToUsers']

export const useTodoStore = defineStore('Todos', {
  state: (): ITodosState => (
    {
      showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
      todos: {},
      categories: [],
      // todos_changed: 1,
      reload_fromServer: 0,
      testpao: 'Test',
      insidePending: false,
      visuLastCompleted: 10,
    }),

  getters: {
    getindexbycategory: (mystate: ITodosState) => (category: string): number => {
      if (mystate.categories) {
        return mystate.categories.indexOf(category)
      }
      return -1
    },

    getRecordEmpty: (state: ITodosState) => (): ITodo => {

      const userStore = useUserStore()

      const tomorrow = tools.getDateNow()
      tomorrow.setDate(tomorrow.getDate() + 1)

      const objtodo: ITodo = {
        // _id: tools.getDateNow().toISOString(),  // Create NEW
        _id: objectId(),
        userId: userStore.my._id,
        descr: '',
        note: '',
        priority: tools.Priority.PRIORITY_NORMAL,
        statustodo: tools.Status.OPENED,
        created_at: tools.getDateNow(),
        modify_at: tools.getDateNow(),
        completed_at: tools.getDateNull(),
        category: '',
        expiring_at: tomorrow,
        enableExpiring: false,
        pos: 0,
        modified: false,
        progress: 0,
        progressCalc: 0,
        phase: 0,
        assigned_to_userId: '',
        hoursplanned: 0,
        hoursworked: 0,
        start_date: tools.getDateNull(),
        themecolor: 'blue',
        themebgcolor: 'white',
        assignedToUsers: [],
      }
      // return this.copy(objtodo)
      return objtodo
    },

    items_dacompletare: (state: ITodosState) => (cat: string): ITodo[] => {
      // console.log('items_dacompletare')
      // @ts-ignore
      const indcat: number = this.getindexbycategory(cat)
      let arrout = []
      // console.log('items_dacompletare', 'indcat', indcat, state.todos[indcat])
      if (indcat >= 0  && state.todos) {
        // @ts-ignore
        if (state.todos[indcat] ) {
          // @ts-ignore
          arrout = state.todos[indcat].filter((todo: ITodo) => todo.statustodo !== tools.Status.COMPLETED)
        }
      }

      if (arrout) { // @ts-ignore
        arrout = arrout.sort((a: ITodo, b: ITodo) => a.pos - b.pos)
      }

      // return tools.mapSort(arrout)
      return arrout
    },

    todos_completati: (state: ITodosState) => (cat: string): ITodo[] => {
      // @ts-ignore
      const indcat = this.getindexbycategory(cat)
      // console.log('todos_completati', cat, 'indcat=', indcat, 'this.categories=', this.categories)
      // @ts-ignore
      if (state.todos[indcat]) {
        let arrout = []
        if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED) {   // Show only the first N completed
          // @ts-ignore
          arrout = state.todos[indcat].filter((todo: ITodo) => todo.statustodo === tools.Status.COMPLETED).slice(0, state.visuLastCompleted)
        } else if (state.showtype === costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE) {
          arrout = []
        } else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL) {
          // @ts-ignore
          arrout = state.todos[indcat].filter((todo: ITodo) => todo.statustodo === tools.Status.COMPLETED)
        } else {
          arrout = []
        }

        if (arrout) { // @ts-ignore
          arrout = arrout.sort((a: ITodo, b: ITodo) => a.pos - b.pos)
        }

        // console.log('arrout', arrout)

        return arrout
        // return tools.mapSort(arrout)

      } else {
        return []
      }
    },

    doneTodosCount: (state: ITodosState) => (cat: string): number => {
      // @ts-ignore
      return this.todos_completati(cat).length
    },

    TodosCount: (state: ITodosState) => (cat: string): number => {
      // @ts-ignore
      const indcat = this.getindexbycategory(cat)
      if (state.todos[indcat]) {
        // @ts-ignore
        return state.todos[indcat].length
      } else {
        return 0
      }
    },

    getRecordById: (state: ITodosState) => (id: string, cat: string): ITodo => {
      // @ts-ignore
      const indcat = this.getindexbycategory(cat)
      if (state.todos) {
        // @ts-ignore
        return state.todos[indcat].find((item) => item._id === id)
      }
      return {}
    },


  },

  actions: {
    gettodosByCategory(category: string): any[] {
      const indcat = this.categories.indexOf(category)
      if (!this.todos[indcat]) {
        return []
      }
      // @ts-ignore
      return this.todos[indcat]
    },

    initcat(): any {

      const userStore = useUserStore()
      const rec = this.getRecordEmpty()
      rec.userId = userStore.my._id

      return rec

    },

    findIndTodoById(data: IParamTodo) {
      const indcat = this.categories.indexOf(data.categorySel!)
      if (indcat >= 0) {
        // @ts-ignore
        return tools.getIndexById(this.todos[indcat], data.id)
      }
      return -1
    },

    createNewItem({ objtodo, atfirst, categorySel }: { objtodo: ITodo, atfirst: boolean, categorySel: string }) {
      let indcat = this.categories.indexOf(categorySel)
      if (indcat === -1) {
        this.categories.push(categorySel)
        indcat = this.categories.indexOf(categorySel)
      }
      console.log('createNewItem', objtodo, 'cat=', categorySel, 'this.todos[indcat]', this.todos[indcat])
      if (this.todos[indcat] === undefined) {
        this.todos[indcat] = []
        this.todos[indcat].push(objtodo)
        console.log('push this.todos[indcat]', this.todos)
        return
      }
      if (atfirst) {
        this.todos[indcat].unshift(objtodo)
      } else {
        this.todos[indcat].push(objtodo)
      }

      console.log('this.todos[indcat]', this.todos[indcat])

    },

    deletemyitem(myitem: ITodo) {
      // Find record
      const indcat = this.categories.indexOf(myitem.category!)
      const ind = this.findIndTodoById({ id: myitem._id, categorySel: myitem.category })

      ApiTables.removeitemfromarray(this.todos[indcat], ind)
    },

    async movemyitem({ myitemorig, myitemdest }: { myitemorig: ITodo, myitemdest: ITodo }) {

      const indcat = this.categories.indexOf(myitemorig.category!)
      const indorig = tools.getIndexById(this.todos[indcat], myitemorig._id)
      let indcatdest = this.categories.indexOf(myitemdest.category!)

      console.log('this.categories', this.categories)
      console.log('myitemdest', myitemdest)
      // console.log('indcat', indcat, 'indcatdest', indcatdest, 'indorig', indorig)

      if (indcatdest === -1) {
        this.categories.push(myitemdest.category!)
        const newindcat = this.categories.indexOf(myitemdest.category!)
        this.todos[newindcat] = []
        indcatdest = newindcat
      }

      this.todos[indcat].splice(indorig, 1)
      this.todos[indcatdest].push(myitemdest)

      await this.modify({ myitem: myitemdest, field: 'category' })
    },

    async dbLoad({ checkPending }: { checkPending: boolean }) {
      const globalStore = useGlobalStore()
      const userStore = useUserStore()

      if (!static_data.functionality.ENABLE_PROJECTS_LOADING)
        return null

      // console.log('dbLoad', nametable, checkPending, 'userid=', userStore.my._id)

      // if (userStore.my._id === '') {
      //   return new Types.AxiosError(0, null, 0, '')
      // }

      let ris = null

      ris = await Api.SendReq('/todos/' + userStore.my._id, 'GET', null)
        .then((res) => {
          if (res.data.todos) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            this.todos = res.data.todos
            this.categories = res.data.categories
          } else {
            this.todos = [[]]
          }

          this.showtype = parseInt(globalStore.getConfigStringbyId({
            id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
            default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          }), 10)

          // console.log('ARRAY TODOS = ', this.todos)
          if (process.env.DEBUG === '1') {
            // console.log('dbLoad', 'this.todos', this.todos, 'this.categories', this.categories)
          }

          return res
        })
        .catch((error) => {
          console.log('error dbLoad', error)
          userStore.setErrorCatch(error)
          return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, toolsext.ERR_GENERICO, error)
        })

      ApiTables.aftercalling(ris, checkPending, 'categories')

      return ris
    },

    async calculateHoursTodo({ todoId }: { todoId: string }) {

      let ris = null

      ris = await Api.SendReq('/todos/calc/' + todoId, 'GET', null)
        .then((res) => {
          if (res.data.rec) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
            return res.data.rec
          }
          return null
        })
        .catch((error) => {
          console.log('error calculateHoursTodo', error)
        })

      return ris
    },

    async deleteItemtodo({ cat, idobj }: { cat: string, idobj: string }) {
      console.log('deleteItemtodo: KEY = ', idobj)

      const myarr = this.gettodosByCategory(cat)

      const myobjtrov = tools.getElemById(myarr, idobj)
      if (!!myobjtrov) {

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

          ApiTables.table_HideRecord(nametable, myobjtrov, idobj)
        }
      }
    },

    async dbInsert({ myobj, atfirst }: { myobj: ITodo, atfirst: boolean }) {

      const objtodo = this.initcat()

      objtodo.descr = myobj.descr
      objtodo.category = myobj.category

      const tipoProj = '' //++Todo: ?? nuovo tipoProj ?

      let elemtochange: ITodo = {}

      const myarr = this.gettodosByCategory(objtodo.category)

      if (atfirst) {
        console.log('INSERT AT THE TOP')
        elemtochange = tools.getFirstList(myarr)
        objtodo.pos = 10
      } else {
        console.log('INSERT AT THE BOTTOM')
        // INSERT AT THE BOTTOM , so GET LAST ITEM
        const lastelem = tools.getLastListNotCompleted(nametable, objtodo.category, tipoProj)

        objtodo.pos = (!!lastelem) ? lastelem.pos + 10 : 10
      }
      objtodo.modified = false

      this.createNewItem({ objtodo, atfirst, categorySel: objtodo.category })    // 1) Create record in Memory

      const id = await globalroutines('write', nametable, objtodo)           // 2) Insert into the IndexedDb

      let field = ''
      if (atfirst) {    // update also the last elem
        if (!!elemtochange) {
          elemtochange.pos = objtodo.pos
          console.log('elemtochange', elemtochange)
          field = 'pos'

          // Modify the other record
          await this.modify({ myitem: elemtochange, field })
        }
      }

      // 3) send to the Server
      return ApiTables.Sync_SaveItem(nametable, 'POST', objtodo)
        .then((ris) => {
          // *** Check if need to be moved because of the --- Priority Ordering --- ...

          const indelem = tools.getIndexById(myarr, objtodo._id)
          let itemdragend
          if (atfirst) {
            // Check the second item, if it's different priority, then move to the first position of the priority
            const secondindelem = indelem + 1
            if (tools.isOkIndex(myarr, secondindelem)) {
              const secondelem = tools.getElemByIndex(myarr, secondindelem)
              if (secondelem.priority !== objtodo.priority) {
                itemdragend = {
                  field: 'priority',
                  idelemtochange: objtodo._id,
                  prioritychosen: objtodo.priority,
                  category: objtodo.category,
                  atfirst,
                }
              }
            }

          } else {
            // get previous of the last
            const prevlastindelem = indelem - 1
            if (tools.isOkIndex(myarr, prevlastindelem)) {
              const prevlastelem = tools.getElemByIndex(myarr, prevlastindelem)
              if (prevlastelem.priority !== objtodo.priority) {
                itemdragend = {
                  field: 'priority',
                  idelemtochange: objtodo._id,
                  prioritychosen: objtodo.priority,
                  category: objtodo.category,
                  atfirst,
                }
              }
            }
          }

          if (itemdragend) {
            this.swapElems(itemdragend)
          }
          return ris
        })

    },

    async modify({ myitem, field }: { myitem: any, field: any }) {
      return ApiTables.table_ModifyRecord(nametable, myitem, listFieldsToChange, field)
    },

    async swapElems(itemdragend: IDrag) {
      // console.log('TODOS swapElems', itemdragend, this.todos, this.categories)

      const cat = itemdragend.category
      const indcat = this.categories.indexOf(cat!)
      // @ts-ignore
      const myarr = this.todos[indcat]

      tools.swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange)

    },

    async ActionCutPaste(action: IAction) {
      console.log('ActionCutPaste', action)
      const globalStore = useGlobalStore()

      if (action.type === lists.MenuAction.CUT) {
        globalStore.lastaction = action
      } else if (action.type === lists.MenuAction.PASTE) {
        if (globalStore.lastaction.type === lists.MenuAction.CUT) {

          // Change id_parent
          const orig_obj = this.getRecordById(globalStore.lastaction._id, globalStore.lastaction.cat!)
          // const dest = this.getRecordById(action._id, action.cat)

          console.log('action', action, 'orig_obj', orig_obj)

          const dest_obj = tools.jsonCopy(orig_obj)

          if (!!dest_obj) {
            dest_obj.category = action._id
            dest_obj.modified = true
            dest_obj.pos = 1

            globalStore.lastaction.type = 0

            return this.movemyitem({ myitemorig: orig_obj, myitemdest: dest_obj })
          }
        }
      }
    },

  },
})
