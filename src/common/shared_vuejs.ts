
export const shared_consts = {

  Accepted: {
    CHECK_READ_GUIDELINES: {
      value: 1,
      label: 'steps.linee_guida',
      icon: 'fas fa-user-shield',
      color: 'red',
    },
    CHECK_SEE_VIDEO_PRINCIPI: {
      value: 2,
      label: 'steps.video_intro',
      icon: 'fas fa-tools',
      color: 'green',
    },
  },

  ALL_SAW_AND_ACCEPTED: 3,

  FILTER_EXTRALIST_NOT_REGISTERED: 1,
  FILTER_EXTRALIST_NOT_CONTACTED: 2,
  FILTER_EXTRALIST_WITH_NOTE: 4,
  FILTER_USER_NO_ZOOM: 8,
  FILTER_USER_NO_INVITANTE: 16,
  FILTER_USER_NO_TELEGRAM_ID: 32,
  FILTER_USER_CODICE_AUTH_TELEGRAM: 64,
  FILTER_USER_NO_EMAIL_VERIFICATA: 128,
  FILTER_USER_NO_DREAM: 256,
  FILTER_USER_TELEGRAM_BLOCKED: 1024,
  FILTER_ATTIVI: 2048,
  FILTER_NASCOSTI: 4096,
  FILTER_NAVI_NON_PRESENTI: 8192,
  FILTER_QUALIFIED: 16384,
  FILTER_ASK_ZOOM_VISTO: 32768,
  FILTER_HOURS_MYLIST: 65536,
  FILTER_HOURS_ALL: 131072,
  FILTER_MISSING_PAYMENT: 262144,
  FILTER_TO_MAKE_MEMBERSHIP_CARD: 524288,
  FILTER_MEMBERSHIP_CARD_OK: 1048576,

  FILTER_MYSKILL_SKILL: 1,

  OPTIONS_SEARCH_ONLY_FULL_WORDS: 1,

  FRIENDSCMD: {
    SETTRUST: 121,
    SETFRIEND: 132,
    REMOVE_FROM_MYFRIENDS: 144,
    BLOCK_USER: 155,
    FIND_PEOPLE: 166,
  },

  REPORT_FILT_RESP: 1,
  REPORT_FILT_ATTIVITA: 2,

  TAB_COUNTRY: 'countries',
  TAB_CITIES: 'cities',
  TAB_PHONES: 'phones',
  TAB_SETTINGS: 'settings',

  KEY_TO_CRYPTED: ['PWD_FROM'],

  TablePickup: ['countries', 'phones', 'cities'],

  CashType: {
    None: 0,
    Incoming: 1,
    Outcoming: 2,
  },

  BOTTYPE_NONE: 0,
  BOTTYPE_PAGE: 1,
  BOTTYPE_LINK: 2,
  BOTTYPE_TEXT: 3,

  BotType: [
    {
      value: 0,
      label: '[Nessuno]',
    },
    {
      value: 1,
      label: 'Pagina',
    },
    {
      value: 2,
      label: 'Link',
    },
    {
      value: 3,
      label: 'Testo',
    },
  ],

  VISIB_ALL: 0,
  VISIB_ONLYIF_VERIFIED: 1,
  VISIB_ONLY_MANAGER: 2,
  VISIB_ONLY_ADMIN: 4,

  Visibility: [
    {
      value: 1,
      label: 'Verificato',
    },
    {
      value: 2,
      label: 'Gestione',
    },
    {
      value: 4,
      label: 'Admin',
    },
  ],

  Permissions: {
    Admin: {
      value: 1,
      label: 'pages.Admin',
      icon: 'fas fa-user-shield',
      color: 'red',
    },
    Manager: {
      value: 2,
      label: 'otherpages.manage.manager',
      icon: 'fas fa-tools',
      color: 'green',
    },
    Teacher: {
      value: 4,
      label: 'event.teacher',
      icon: 'fas fa-user-tie',
      color: 'blue',
    },
    Tutor: {
      value: 8,
      label: 'dashboard.tutor',
      icon: 'fas fa-user-tie',
      color: 'fuchsia',
    },
    Editor: {
      value: 16,
      label: 'dashboard.Editor',
      icon: 'fas fa-user-tie',
      color: 'orange',
    },
    Zoomeri: {
      value: 32,
      label: 'dashboard.zoomeri',
      icon: 'fas fa-user-tie',
      color: 'yellow',
    },
    Department: {
      value: 64,
      label: 'pages.department',
      icon: 'fas fa-user-tie',
      color: 'yellow',
    },
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4,
  },

  TypeMsg: {
    SEND_TO_ALL: 1,
    SEND_TO_SOCI: 2,
    SEND_TO_SOCIO_RESIDENTE: 3,
    SEND_TO_NON_SOCI: 10,
    SEND_TO_PAOLO: 20,
  },

  TypeMsg_Actions: {
    NORMAL: 0,
    YESNO: 1,
    OPZ1_2: 2,
  },

  selectActions: [
    {
      id: 0,
      label: 'Normale',
      value: 0,
    },
    {
      id: 1,
      label: 'Si / No',
      value: 1,
    },
    {
      id: 2,
      label: 'Opzione 1 / Opzione 2',
      value: 2,
    },
  ],

  selectDestination: [
    {
      id: 0,
      label: 'A Tutti',
      value: 1,
    },
    {
      id: 1,
      label: 'Solo ai Soci',
      value: 2,
    },
    {
      id: 2,
      label: 'Solo ai Soci Residenti',
      value: 3,
    },
    {
      id: 3,
      label: 'Solo ai NON Soci',
      value: 10,
    },
    {
      id: 4,
      label: 'a Paolo (test)',
      value: 20,
    },
  ],

  OrderStatus: {
    NONE: 0,
    IN_CART: 1,
    CHECKOUT_SENT: 2,
    ORDER_CONFIRMED: 3,
    PAYED: 4,
    DELIVEDED: 5,
    RECEIVED: 6,
    CANCELED: 10,
  },

  OrderStatusView: [
    2,
    3,
    4,
    6,
    10,
  ],

  OrderStatusStr: [
    {
      label: 'Nessuno',
      value: 0,
    },
    {
      label: 'In Carrello',
      value: 1,
    },
    {
      label: 'Ordine in Lavorazione',
      value: 2,
    },
    {
      label: 'Ordine Confermato',
      value: 3,
    },
    {
      label: 'Pagato',
      value: 4,
    },
    {
      label: 'Spedito',
      value: 5,
    },
    {
      label: 'Ricevuto',
      value: 6,
    },
    {
      label: 'Cancellato',
      value: 10,
    },
  ],

  getStatusStr(status: number) {
    const trovatorec = this.OrderStatusStr.find((rec) => rec.value === status)
    return (trovatorec) ? trovatorec.label : ''
  },

  fieldsUserToChange() {
    return ['_id', 'username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'verified_by_aportador', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  },

}
