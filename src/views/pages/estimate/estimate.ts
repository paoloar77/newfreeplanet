import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from '@src/boot/i18n'
import { useUserStore } from '@store/UserStore'
import { useGlobalStore } from '@store/globalStore'
import { useQuasar } from 'quasar'
import { IEstimate } from '@src/model'
import { tools } from '@src/store/Modules/tools'

export default defineComponent({
  name: 'EstimateMy',
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
  components: {},
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()

    const arrEstimate = ref(<IEstimate[]>[])

    const features: IEstimate[] = [
      {
        title: '5 pagine principali: 1) Home principale con testo + slideshow di immagini, 2) Chi siamo, 3) Dove Siamo, 4) Contatti, 5) Servizi',
        icon: 'looks_5',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Ottimizzato con tecnologia Responsive, visualizzabile su cellulare',
        icon: 'devices_other',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Possibilità di modificare, in maniera autonoma, i testi delle pagine esistenti (Sito Dinamico)',
        icon: 'edit',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Galleria d\'immagini Slideshow',
        icon: 'photo_album',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Certificato SSL / HTTPS di sicurezza incluso',
        icon: 'https',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'GDPR privacy e cookie',
        icon: 'verified_user',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Posizionamento motori di ricerca (Google)',
        icon: 'search',
        numpag: 0,
        price: 0,
        pricebase: 0,
      },
      {
        title: 'Statistica Visualizzazioni sito web (Google Analytics)',
        icon: 'search',
        numpag: 0,
        price: 0,
        pricebase: 0,
      }

    ]

    const arrEstimateit: IEstimate[] = [
      {
        id: 1,
        title: 'Pagina Web Base', description: '',
        price: 250,
        advanced: false,
        qta: 1,
        icon: 'web',
        numpag: 5,
        viewlist: null,
        checksel: true,
        pricebase: 0,
      },
      {
        id: 9,
        title: 'Hosting Base Dominio WWW (Servizio Esterno)',
        description: 'Servizio di Hosting linux base + Database Mysql + Servizio Mail + Dominio',
        advanced: false,
        icon: 'home',
        price: 80,
        qta: 1,
        numpag: 0,
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: 2,
        title: '+ 5 Pagine Aggiuntive',
        description: 'Inserisci il numero di pagine che si vuole creare',
        advanced: false,
        price: 50,
        qta: 1,
        numpag: 5,
        icon: 'description',
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: 3,
        title: '+ 10 Pagine Aggiuntive',
        description: 'pagine aggiuntive da creare',
        price: 85,
        qta: 1,
        numpag: 10,
        icon: 'description',
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: 4,
        title: '+ 20 Pagine Aggiuntive',
        description: 'pagine aggiuntive da creare',
        advanced: false,
        price: 140,
        qta: 1,
        numpag: 20,
        icon: 'description',
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: tools.languageid,
        title: '+ 1 Lingua Aggiuntiva (con testi già tradotti)',
        description: 'Inserimento di 1 lingua straniera nel sito. Comprende le pagine selezionate',
        advanced: false,
        icon: 'language',
        price: 10,
        pricebase: 50,
        qta: 1,
        numpag: 0,
        viewlist: null,
        checksel: false
      },
      {
        id: 8,
        title: 'Gestione Newsletter integrata con MailChimp',
        advanced: true,
        description: 'All\'interno del sito l\'utente potrà lasciare la propria email e nome, e verrà inviata a MailChimp (Account Gratuito)',
        icon: 'contact_mail',
        price: 50,
        qta: 1,
        numpag: 0,
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: 6,
        title: 'Calendario Eventi',
        advanced: true,
        description: 'Visualizzazione Mensile e Settimanale di un calendario Eventi Personalizzato',
        icon: 'event',
        price: 100,
        qta: 1,
        numpag: 0,
        viewlist: null,
        checksel: false,
        pricebase: 0,
      },
      {
        id: 7,
        title: 'Galleria Immagini Personalizzata',
        advanced: true,
        description: 'Possibilità di aggiungere/eliminare foto autonomamente dalla galleria Immagini (Richiede Hosting Base)',
        icon: 'perm_media',
        price: 100,
        qta: 1,
        numpag: 0,
        viewlist: null,
        checksel: false,
        pricebase: 0,
      }
      // {
      //   id: 7,
      //   title: 'Servizio di Assistenza e modifica pagine (dal 2° anno)',
      //   description: '',
      //   icon: 'perm_media',
      //   price: 100,
      //   qta: 1,
      //   numpag: 0,
      //   viewlist: null,
      //   checksel: false
      // },
    ]

    function mounted() {
      arrEstimate.value = arrEstimateit
    }

    function getPrice(rec: IEstimate) {
      let myprice = 0
      if (rec.id === tools.languageid) {
        myprice = (rec.price * getNumpagTotal()) + rec.pricebase
      } else {
        myprice = rec.price
      }

      return myprice
    }

    function getNumpagTotal() {
      let numpag = 0
      let rec: IEstimate

      for (rec of arrEstimateit) {
        if (rec.checksel) {
          numpag += rec.numpag
        }
      }

      return numpag
    }

    function getTotal() {
      let tot = 0
      let rec: IEstimate

      const numpagtot = getNumpagTotal()

      for (rec of arrEstimateit) {
        if (rec.checksel)
          tot += getPrice(rec) * rec.qta!
      }

      return tot
    }

    function getColor(rec: IEstimate) {
      if (rec.advanced) {
        return 'red'
      } else {
        return 'blue'
      }
    }

    onMounted(mounted)

    return {
      arrEstimate,
      arrEstimateit,
      features,
      getPrice,
      getNumpagTotal,
      getTotal,
      getColor,
    }
  }
})
