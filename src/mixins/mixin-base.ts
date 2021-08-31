import { toolsext } from '@src/store/Modules/toolsext'

import { useI18n } from '@src/boot/i18n'

// import { fieldsTable } from '@src/store/Modules/fieldsTable'
import MixinMetaTags from '@src/mixins/mixin-metatags'

import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IDataPass } from '@model'
import { shared_consts } from '../common/shared_vuejs'
import { tools } from '../store/Modules/tools'
import { func_tools } from '../store/Modules/toolsext'
import { costanti } from '@costanti'

// You can declare a mixin as the same style as components.
export const MixinBase = {
  created() {

  },
  mythis() {
    return this
  },

  showNotif(msg: string) {
    const $q = useQuasar()

    const { t } = useI18n();

    tools.showNotif($q, t(msg))
  },

  db_fieldsTable() {
    // return fieldsTable
  },

  getValDb(keystr: string, serv: boolean, def?: any, table?: string, subkey?: any, id?: any, idmain?: any) {
    console.log('getValDb')
    return toolsext.getValDb(keystr, serv, def, table, subkey, id, idmain)
  },

  getValDbLang(keystr: string, serv: boolean, def?: any, table?: string, subkey?: any) {
    let ris = toolsext.getValDb(`${keystr}_${toolsext.getLocale()}`, serv, def, table, subkey)
    if (ris === def) ris = toolsext.getValDb(`${keystr}_it`, serv, def, table, subkey)
    return ris
  },

  async setValDb(key: string, value: any, type: any, serv: boolean, table?: string, subkey?: string, id?: any) {
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    const $q = useQuasar()
    const { t } = useI18n();

    // console.log('setValDb', key, value, serv, table, subkey)
    let mydatatosave: IDataPass | null = null
    if (table === 'users') {
      const myid = userStore.my._id

      const myfield: any = {}

      if (key === 'profile') {
        // @ts-ignore
        userStore.my.profile[subkey] = value
      } else {
        // @ts-ignore
        userStore.my[key] = value
      }

      // Save to the DB:
      if (subkey) {
        myfield[`${key}.${subkey}`] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id: myid,
        table,
        fieldsvalue: myfield,
      }
    } else if (table === 'todos') {
      const myfield: any = {}

      // Save to the DB:
      if (subkey) {
        myfield[`${key}.${subkey}`] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id,
        table,
        fieldsvalue: myfield,
      }
    } else if (table === 'settings') {
      globalStore.setValueSettingsByKey({ key, value, serv })

      let myrec = globalStore.getrecSettingsByKey(key, serv)
      if (myrec === undefined) {
        myrec = {
          idapp: process.env.APP_ID,
          key,
          type,
        }
        myrec.serv = serv
        if ((myrec.type === costanti.FieldType.date) || (myrec.type === costanti.FieldType.onlydate)) myrec.value_date = value
        else if ((myrec.type === costanti.FieldType.number) || (myrec.type === costanti.FieldType.hours)) myrec.value_num = value
        else if (myrec.type === costanti.FieldType.boolean) myrec.value_bool = value
        else myrec.value_str = value

        myrec = await tools.createNewRecord($q, 'settings', myrec).then(
          (myrecris) => {
            // console.log('myrec')
            let recsett = null
            if (serv) recsett = globalStore.serv_settings
            else recsett = globalStore.settings

            if (myrecris) recsett.push(myrecris)
            // @ts-ignore
            return recsett.find((rec) => rec.key === key)
          },
        )
      }
      // console.log('myrec', myrec)

      mydatatosave = {
        // @ts-ignore
        id: myrec ? myrec._id : '',
        table: 'settings',
        // @ts-ignore
        fieldsvalue: myrec,
      }
    } else {
      const myfield: any = {}

      // Save to the DB:
      if (subkey) {
        myfield[`${key}.${subkey}`] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id,
        table: table || '',
        fieldsvalue: myfield,
      }
    }

    // console.log('mydatatosave', mydatatosave)

    // @ts-ignore
    globalStore.saveFieldValue(mydatatosave).then((esito) => {
      if (esito) {
        tools.showPositiveNotif($q, t('db.recupdated'))
      } else {
        tools.showNegativeNotif($q, t('db.recfailed'))
        // Undo...
      }
    })
  },

  getarrValDb(keystr: string, serv: boolean) {
    const globalStore = useGlobalStore()

    const myval = globalStore.getValueSettingsByKey(keystr, serv)
    // console.log('myval', myval)
    try {
      if (myval) {
        const myrec: any = JSON.parse(myval)
        // console.log('*************** getarrValDb')
        // console.table(myrec)
        return myrec
      }
      return []
    } catch (e) {
      return []
    }
  },

}
