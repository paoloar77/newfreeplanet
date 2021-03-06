import { date, useQuasar } from 'quasar'
import { useUserStore } from '@store/UserStore'
// import { useGlobalStore } from '@store/globalStore'
import { static_data } from '@/db/static_data'
import { useGlobalStore } from '@store/globalStore'
import { useTodoStore } from '@store/Todos'
import { Router } from 'vue-router'
import { ISpecialField } from 'model'

export const func_tools = {
  getLocale(vero ?: boolean): string {
    const userStore = useUserStore()
    if (userStore) {
      return userStore.lang
    }
    if (!vero) return process.env.LANG_DEFAULT ? process.env.LANG_DEFAULT : 'it'
    return ''
  },

  getDateStr(mydate: any) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      // timeZone: 'UTC'
    })
    try {
      // console.log('mydate', mydate, DateFormatter)
      if (DateFormatter) {
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }
  },

  getMinutesDuration(mydatestart: any, mydateend: any) {
    return date.getDateDiff(mydateend, mydatestart, 'minutes')
  },

  getDateTimeShortStr(mydate: any) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      // timeZone: 'UTC'
    })
    if (DateFormatter) {
      const date1 = new Date(mydate)
      return DateFormatter.format(date1)
    }
    return mydate
  },
}

export const toolsext = {
  TABUSER: 'users',
  TABFRIENDS: 'friends',
  TABMYGROUPS: 'mygroups',
  TABSKILLS: 'skills',
  TABSECTORS: 'sectors',
  TABREGIONS: 'regions',
  TABCITIES: 'cities',
  TABPROVINCE: 'provinces',
  TABMYSKILLS: 'myskills',
  TABMYGOODS: 'mygoods',
  TABMYBACHECAS: 'mybachecas',
  TABMYHOSPS: 'myhosps',
  TABCALDATE: 'caldate',
  TABCALALLDATE: 'calalldate',
  TABNAVI: 'navi',
  TABLISTAINGRESSO: 'listaingressos',
  TABGRADUATORIA: 'graduatorias',
  TABEXTRALIST: 'extralist',
  TABNEWSLETTER: 'newstosent',
  TABGALLERY: 'gallery',
  TABMAILINGLIST: 'mailinglist',
  TABGROUPS: 'groups',
  TABMYPAGE: 'mypage',
  TABMYBOT: 'bots',
  TABCALZOOM: 'calzoom',
  TABTEMPLEMAIL: 'templemail',
  TABOPZEMAIL: 'opzemail',
  TABSHAREWITHUS: 'sharewithus',
  TABTYPEHOSP: 'typehosps',
  TABTYPEACCOM: 'typeaccoms',
  TABLOCACCOM: 'locaccoms',
  TABPREF: 'hosps_preferences',
  TABPEOPLE: 'people',
  SERVKEY_VERS: 'vers',

  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,


  localStorage: {
    teleg_id: 'ti',
    verified_email: 'vf',
    verified_by_aportador: 'va',
    made_gift: 'mg',
    wasAlreadySubOnDb: 'sb',
    categorySel: 'cs',
    isLogged: 'ilog',
    expirationDate: 'expdate',
    leftDrawerOpen: 'ldo',
    userId: 'uid',
    token: 'tk',
    username: 'uname',
    name: 'nm',
    surname: 'sn',
    perm: 'pm',
    lang: 'lg',
    img: 'img',
  },

  getLocale(vero?: boolean): string {
    const userStore = useUserStore()
    if (userStore) {
      return userStore.lang
    }
    return process.env.LANG_DEFAULT ? process.env.LANG_DEFAULT : 'it'
  },
  isLang(whichlang: string): boolean {
    const loc = func_tools.getLocale()
    return (loc === whichlang)
  },
  getlangforQuasar(mylang: string) {
    if (mylang === 'enUs') return 'en-us'
    return mylang
  },
  setLangAtt($router: Router, mylang: string) {
    const globalStore = useGlobalStore()

    const $q = useQuasar()

    console.log('setLangAtt =', mylang)
    // console.log('PRIMA this.$q.lang.isoName', this.$q.lang.isoName)

    // dynamic import, so loading on demand only
    import(`quasar/lang/${this.getlangforQuasar(mylang)}`).then((lang) => {
      console.log('   Import dinamically lang =', lang)

      $q.lang.set(this.getlangforQuasar(lang.default))
      import('../../statics/i18n').then(() => {
        console.log('   *** MY LANG DOPO=', $q.lang.isoName)
      })
    })

    globalStore.addDynamicPages($router)

    // this.$q.lang.set(mylang)
  },

  getValDb(keystr: string, serv: boolean, def?: any, table?: string, subkey?: string, id?: any, idmain?: any, indrec?: number, subsubkey?: string, specialField?: ISpecialField): any | undefined {

    const todos = useTodoStore()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()
    if (table === 'users') {
      if (keystr === 'profile') {
        if (subkey) {
          // console.log('userStore.my.profile', userStore.my.profile, 'subkey', subkey, )
          if (subsubkey && indrec) {
            // @ts-ignore
            return userStore.my.profile[subkey][indrec][subsubkey]
          } else {

            if (specialField && specialField.findsubkey && !!subkey) {
              // @ts-ignore
              const myrec = userStore.my.profile[subkey].filter(specialField.findsubkey)
              // console.log('loaded', myrec)
              if (myrec && myrec.length > 0 && !!specialField.paramtosetsubkey) {
                // @ts-ignore
                return myrec[0][specialField.paramtosetsubkey]
              } else {
                return ''
              }

            } else {

              // @ts-ignore
              return userStore.my.profile[subkey]
            }
          }
        }
      } else if (keystr) { // @ts-ignore
        // @ts-ignore
        return userStore.my[keystr]
      }
    } else if (table === 'todos') {
        // console.log('id', id, 'idmain', idmain)
        const indcat = todos.categories.indexOf(idmain)
        console.log('indcat', indcat)
        if (indcat >= 0) {
          const myrec = todos.todos[indcat].find((rec: any) => rec._id === id)
          console.log('myrec', myrec)
          let ris = null
          if (myrec) {
            ris = myrec[keystr]
          }
          console.log('ris', ris)
          return ris
        }

        return ''

    } else {
      const ris = globalStore.getValueSettingsByKey(keystr, serv)

      if (ris === '') {
        if (def !== undefined) return def
        return ''
      }
      return ris
    }
    return ''

  },

  sito_online(pertutti: boolean): boolean {
    const userStore = useUserStore()

    let ris = true
    const online = this.getValDb('SITO_ONLINE', false, true)
    ris = userStore.isAdmin && !pertutti ? true : online
    // console.log('isadmin', userStore.isAdmin)
    return ris
  },

  checkLangPassed($q: any, $router: Router, mylangprop: string) {
    // console.log('checkLangPassed ', mylang)

    let mylang = mylangprop

    const userStore = useUserStore()
    const mybrowserLang = $q.lang.isoName

    if (mylang !== '') {
      if ((mylang.toLowerCase() === 'enus') || (mylang.toLowerCase() === 'en-us') || (mylang.toLowerCase() === 'uk')
        || (mylang.toLowerCase() === 'uk-uk') || (mylang.toLowerCase() === 'en-uk') || (mylang.toLowerCase() === 'en-gb')
        || (mylang.toLowerCase() === 'gb-gb')) {
        mylang = 'enUs'
      }
      if ((mylang.toLowerCase() === 'es') || (mylang.toLowerCase() === 'es-es') || (mylang.toLowerCase() === 'eses')) {
        mylang = 'es'
      }
      if ((mylang.toLowerCase() === 'pt') || (mylang.toLowerCase() === 'pt-pt') || (mylang.toLowerCase() === 'ptpt')) {
        mylang = 'pt'
      }
      if ((mylang.toLowerCase() === 'fr') || (mylang.toLowerCase() === 'fr-fr') || (mylang.toLowerCase() === 'frfr')) {
        mylang = 'fr'
      }
      if ((mylang.toLowerCase() === 'it') || (mylang.toLowerCase() === 'it-it') || (mylang.toLowerCase() === 'itit')) {
        mylang = 'it'
      }
      if ((mylang.toLowerCase() === 'si') || (mylang.toLowerCase() === 'si-si') || (mylang.toLowerCase() === 'sisi')) {
        mylang = 'si'
      }


      if (!(static_data.arrLangUsed.includes(mylang))) {
        // console.log('non incluso ', mylang)
        // mylang = static_data.arrLangUsed[0]
        mylang = 'it'

        // Metti come default
        userStore.setlang($router, mylang)
      }
    }

    if (!mylang) {
      if (process.env.LANG_DEFAULT) mylang = process.env.LANG_DEFAULT
      console.log('LANG DEFAULT: ', mylang)
    }

    if (this.getLocale(true) === '') {
      userStore.setlang($router, mylang)
    }

    // console.log('mylang calc : ', mylang)

    return mylang
  },
}

// export const costanti_tools = {
//   DateFormatter: new Intl.DateTimeFormat(func_this.getLocale() || void 0, {
//     weekday: 'long',
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
//     // timeZone: 'UTC'
//   })
// }
