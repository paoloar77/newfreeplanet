import { IParamsQuery, IShareWithUs } from 'model'
import { tools } from '@store/Modules/tools'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { CCopyBtn } from '../CCopyBtn'

import { computed, defineComponent, ref } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { toolsext } from '@store/Modules/toolsext'

export default defineComponent({
  name: 'CShareWithUs',
  props: {
    mystr: {
      type: String,
      required: true,
      default: '',
    },
    myval: {
      type: Number,
      required: true,
      default: 0,
    },
    mybool: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { CTitleBanner, CCardState, CCopyBtn },
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const userStore = useUserStore()
    const globalStore = useGlobalStore()

    const mydescrtext = ref('')

    const listasharewithus = computed(() => {

      const myarr = globalStore.sharewithus

      return myarr.sort((a: any, b: any) => b.numshared! - a.numshared!)
    })

    function listamyshare() {
      return userStore.my.profile.myshares
    }

    function myload() {
      const sortBy = 'numshared'
      const descending = 1
      const myobj: any = {}
      if (descending)
        myobj[sortBy] = -1
      else
        myobj[sortBy] = 1

      const params: IParamsQuery = {
        table: 'sharewithus',
        startRow: 0,
        endRow: 10000,
        filter: '',
        filterand: '',
        filtersearch: '',
        filtercustom: '',
        sortBy: myobj,
        descending,
        userId: userStore.my._id
      }

      console.log('myload', params)

      globalStore.loadTable(params).then((data) => {
        globalStore.sharewithus = data.rows
      })
    }

    function recsharenow(mydescr: string): IShareWithUs {
      return {
        idapp: process.env.APP_ID,
        description: mydescr,
        userId: userStore.my._id,
        numshared: 0,
        rating: 0
      }
    }

    function add_newshare(mydescr: string) {
      if (!mydescr)
        return false
      if (userStore.my.profile.myshares) {
        const recfound = userStore.my.profile.myshares.find((rec: IShareWithUs) => rec.description.toLowerCase() === mydescr.toLowerCase())
        if (!!recfound) {
          tools.showNegativeNotif($q, '"' + mydescr + '" è già presente!')
          return false
        }
        userStore.my.profile.myshares.push({ description: mydescr, rating: 5 })

        const mydata = {
          'profile.myshares': userStore.my.profile.myshares
        }
        tools.saveFieldToServer($q, 'users', userStore.my._id, mydata)

        const myrec = recsharenow(mydescr)

        const updatedexistingrec = updaterecnow(mydescr, true)
        if (!updatedexistingrec) {
          tools.createNewRecord($q, 'sharewithus', myrec, false).then((myrecris) => {
            globalStore.sharewithus.push(myrecris)
            myload()
            mydescrtext.value = ''
            return true
          })
        }
      }

    }

    function updaterecnow(mydescr: string, add: boolean) {
      const recesistente = globalStore.sharewithus.find((rec) => rec.description.toLowerCase() === mydescr.toLowerCase())
      const indrec = globalStore.sharewithus.findIndex((rec) => rec.description.toLowerCase() === mydescr.toLowerCase())
      console.log('recesistente', recesistente)
      if (recesistente) {
        const mydatatosave = {
          id: recesistente._id,
          table: toolsext.TABSHAREWITHUS,
          fieldsvalue: recesistente
        }

        if (recesistente.numshared) {
          if (add)
            recesistente.numshared++
          else {
            if (recesistente.numshared <= 0)
              return false
            else
              recesistente.numshared--
          }
        }

        globalStore.saveFieldValue(mydatatosave).then((myrecris) => {
          if (myrecris) {
            globalStore.sharewithus[indrec] = recesistente
            myload()
          }
          mydescr = ''
        })
        return true
      } else {
        return false
      }
    }

    /*
    function selected(value: any, shared: IShareWithUs) {
      shared.numshared!++
      tools.saveFieldToServer($q, 'sharewithus', shared._id, { numshared: shared.numshared })

    }
     */

    function checkifICanRemove(shared: IShareWithUs) {
      // Controlla se questo è stato aggiunto da me
      const recfound = globalStore.sharewithus.find((rec) => rec.description.toLowerCase() === shared.description.toLowerCase())
      if (!!recfound)
        return recfound.userId === userStore.my._id
      else
        return true
    }

    function removeShared(shared: IShareWithUs) {
      $q.dialog({
        message: 'Vuoi cancellare "' + shared.description + '" dalla tua lista ?',
        ok: {
          label: t('dialog.yes'),
          push: true
        },
        cancel: {
          label: t('dialog.cancel')
        },
        title: t('pages.sharedwithus')
      }).onOk(async () => {

          const descr = shared.description

          // Aggiorna Record Personale
          userStore.my.profile.myshares = userStore.my.profile.myshares.filter((rec: any) => rec.description !== descr)

          const mydata = {
            'profile.myshares': userStore.my.profile.myshares
          }
          tools.saveFieldToServer($q, 'users', userStore.my._id, mydata)

          const updatedexistingrec = updaterecnow(shared.description, false)
          if (!updatedexistingrec) {
            if (checkifICanRemove(shared)) {
              const myrec = globalStore.sharewithus.find((rec) => rec.description.toLowerCase() === descr.toLowerCase())
              if (!!myrec) {
                await globalStore.DeleteRec({ table: toolsext.TABSHAREWITHUS, id: myrec._id })
                  .then((ris) => {
                    console.log('DELETEREC ris=', ris)
                    if (ris) {

                      // Aggiorna Array Globale
                      globalStore.sharewithus = globalStore.sharewithus.filter((rec) => rec.description !== descr)
                      myload()

                      console.log('globalStore.sharewithus', globalStore.sharewithus)
                      tools.showPositiveNotif($q, t('db.deletedrecord'))
                    }
                  })
              }
            }
          }
        }
      )
    }

    function findrec(descr: string) {
      if (userStore.my.profile.myshares) {
        if (userStore.my.profile.myshares.length === 0)
          return false
        return userStore.my.profile.myshares.find((rec: any) => rec.description.toLowerCase() === descr.toLowerCase())
      }
      return null
    }

    function mycolorbtn(shared: IShareWithUs) {
      if (findrec(shared.description)) {
        return 'positive'
      } else {
        return 'primary'
      }
    }

    function geticon(shared: IShareWithUs) {
      if (findrec(shared.description))
        return undefined
      else
        return 'fas fa-plus'
    }

    function getifdisable(shared: IShareWithUs) {
      return findrec(shared.description)
    }

    myload()

    return {
      listasharewithus,
      listamyshare,
      removeShared,
      mycolorbtn,
      geticon,
      getifdisable,
      mydescrtext,
      add_newshare,
    }
  }
})
