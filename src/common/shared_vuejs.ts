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

  QUERYTYPE_MYGROUP: 1,

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
  FILTER_USER_NO_VERIFIED_APORTADOR: 2097152,
  FILTER_USER_SI_TELEGRAM_ID: 4194304,
  FILTER_USER_WITHOUT_USERNAME_TELEGRAM: 8388608,

  OPTIONS_SEARCH_ONLY_FULL_WORDS: 1,
  OPTIONS_SEARCH_USER_ONLY_FULL_WORDS: 2,
  OPTIONS_SEARCH_USER_ALL_WORDS: 4,

  FRIENDSCMD: {
    SETTRUST: 121,
    REQFRIEND: 125,
    SETFRIEND: 132,
    REMOVE_FROM_MYFRIENDS: 144,
    REFUSE_REQ_FRIEND: 145,
    CANCEL_REQ_FRIEND: 146,
    BLOCK_USER: 155,
    FIND_PEOPLE: 166,
  },

  GROUPSCMD: {
    SETTRUST: 1121,
    REQGROUP: 1125,
    SETGROUP: 1132,
    REMOVE_FROM_MYGROUP: 1144,
    REFUSE_REQ_GROUP: 1145,
    CANCEL_REQ_GROUP: 1146,
    BLOCK_GROUP: 1155,
    FIND_GROUP: 1166,
  },

  REPORT_FILT_RESP: 1,
  REPORT_FILT_ATTIVITA: 2,

  TAB_COUNTRY: 'countries',
  TAB_CITIES: 'cities',
  TAB_PROVINCES: 'provinces',
  TAB_PHONES: 'phones',
  TAB_SITES: 'sites',
  TAB_SETTINGS: 'settings',

  KEY_TO_CRYPTED: ['PWD_FROM'],

  TablePickup: ['countries', 'phones', 'cities'],

  PARAM_SHOW_PROVINCE: 1,

  TABLES_MYSKILLS: 'myskills',
  TABLES_MYBACHECAS: 'mybachecas',
  TABLES_MYGOODS: 'mygoods',

  TABLES_ENABLE_GETREC_BYID: ['mybachecas'],

  TABLES_USER_INCLUDE_MY: ['mygroups'],
  TABLES_GETCOMPLETEREC: ['myskills', 'mybachecas', 'mygoods'],
  TABLES_WITH_FILTER_FIELD: ['caldate'],
  TABLES_WITH_DATE: ['mybachecas'],
  TABLES_WITH_SORTING: ['mybachecas'],
  TABLES_PERM_NEWREC: ['skills', 'goods', 'subskills', 'mygroups'],
  TABLES_REC_ID: ['skills', 'goods', 'subskills', 'myskills', 'mybachecas', 'mygoods'],

  // costanti.VISUTABLE_SCHEDA_USER, VISUTABLE_SCHEDA_GROUP, VISUTABLE_USER_TABGROUP
  VERTIC_SHOW_GRID: [-1, 2, -3, -4],

  TABLES_ID_NUMBER: ['permissions', 'levels', 'adtypes', 'adtypegoods', 'statusSkills', 'sectors', 'sectorgoods', 'catgrps', 'skills', 'subskills', 'cities', 'provinces',
    'myskills', 'mybachecas', 'mygoods', 'mygroups'],
  TABLES_USER_ID: ['mygroups', 'myskills', 'mybachecas', 'mygoods'],
  TABLES_UPDATE_LASTIFIED: ['myskills', 'mybachecas', 'mygoods', 'mybots'],
  TABLES_FINDER: ['myskills', 'mybachecas', 'mygoods', 'mygroups'],
  TABLES_VISU_CMYSRECCARD: ['myskills', 'mybachecas', 'mygoods', 'mygroups'],
  TABLES_SHOW_ADTYPE: ['myskills', 'mybachecas', 'mygoods'],

  TABLES_PERM_CHANGE_FOR_USERS: ['myskills', 'mybachecas', 'mygoods'],
  TABLES_VISU_LISTA_USER: ['myskills', 'mybachecas', 'mygoods', 'users'],

  TABLES_VISU_IMG: ['myskills', 'mybachecas', 'mygoods', 'mygroups'],
  TABLES_DIRECTORY_A_PARTE: ['mygroups'],

  VISIB_ALL: 0,
  VISIB_ONLYIF_VERIFIED: 1,
  VISIB_ONLY_MANAGER: 2,
  VISIB_ONLY_ADMIN: 4,

  BOTTYPE_NONE: 0,
  BOTTYPE_PAGE: 1,
  BOTTYPE_LINK: 2,
  BOTTYPE_TEXT: 3,
  BOTTYPE_MENU: 4,

  CashType: {
    None: 0,
    Incoming: 1,
    Outcoming: 2,
  },

  Cmd: {
    PROVINCE: 1,
    COMUNI: 2,
    CITIES_SERVER: 3,
    CAT_SKILL_TXT: 4,
    CAT_NO_SPAZI: 5,
    CAT_GOODS_TXT: 10,
  },

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
    {
      value: 4, // BOTTYPE_MENU
      label: 'Menu',
    },
  ],

  Shippings: [
    {
      label: 'Di Persona',
      value: 1,
    },
    {
      label: 'Tramite Corriere',
      value: 2,
    },
    {
      label: 'Tramite Posta',
      value: 3,
    },
  ],

  OtherFilters: [
    {
      label: 'AutoProduzione',
      value: 1,
    },
    {
      label: 'Ecovillaggio',
      value: 2,
    },
    {
      label: 'Azienda Prodotti Locali',
      value: 4,
    },
    {
      label: 'Upcycle',
      value: 8,
    },
  ],

  Regions: [
    {
      value: 'ABR',
      label: 'Abruzzo',
    },
    {
      value: 'BAS',
      label: 'Basilicata',
    },
    {
      value: 'CAL',
      label: 'Calabria',
    },
    {
      value: 'CAM',
      label: 'Campania',
    },
    {
      value: 'EMR',
      label: 'Emilia-Romagna',
    },
    {
      value: 'FVG',
      label: 'Friuli Venezia Giulia',
    },
    {
      value: 'LAZ',
      label: 'Lazio',
    },
    {
      value: 'LIG',
      label: 'Liguria',
    },
    {
      value: 'LOM',
      label: 'Lombardia',
    },
    {
      value: 'MAR',
      label: 'Marche',
    },
    {
      value: 'MOL',
      label: 'Molise',
    },
    {
      value: 'PIE',
      label: 'Piemonte',
    },
    {
      value: 'PUG',
      label: 'Puglia',
    },
    {
      value: 'RSM',
      label: 'Repubblica di San Marino',
    },
    {
      value: 'SAR',
      label: 'Sardegna',
    },
    {
      value: 'SIC',
      label: 'Sicilia',
    },
    {
      value: 'TOS',
      label: 'Toscana',
    },
    {
      value: 'TAA',
      label: 'Trentino-Alto Adige',
    },
    {
      value: 'UMB',
      label: 'Umbria',
    },
    {
      value: 'VDA',
      label: 'Valle d\'Aosta',
    },
    {
      value: 'VEN',
      label: 'Veneto',
    },
    {
      value: 'EST',
      label: 'Estero',
    },
    {
      value: 'ONL',
      label: 'On Line',
    },
  ],

  Lang: [
    {
      value: 'it',
      label: 'Italiano',
    },
    {
      value: 'es',
      label: 'Spagnolo',
    },
    {
      value: 'enUs',
      label: 'Inglese',
    },
  ],

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

  VisibilGroup: [
    {
      value: 1,
      label: 'Riservato',
      hint: 'Per accedere al gruppo, verrà richiesto la password'
    },
    {
      value: 2,
      label: 'Nascosto',
      hint: 'il Gruppo non sarà visibile nella ricerca'
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

  CmdToSend: {
    SHARE_MSGREG: 1,
  },

  TypeMsg: {
    SEND_TO_ALL: 1,
    SEND_TO_SOCI: 2,
    SEND_TO_SOCIO_RESIDENTE: 3,
    SEND_TO_NON_SOCI: 10,
    SEND_TO_PAOLO: 20,
    SEND_TO_USER: 25,
    SEND_TO_GROUP: 30,
    SEND_TO_MYSELF: 40,
    SEND_TO_TELEG_NO_USERNAME_TELEG: 50,
    SEND_TO_TELEG_NO_VERIF_BY_APORTADOR: 60,
  },

  TypeMsg_Actions: {
    NORMAL: 0,
    YESNO: 1,
    OPZ1_2: 2,
  },

  whatMsgToSend: {
    MSG_OF_TEMPLATE: 1,
    MSG_TEXT: 2,
  },

  selectwhatMsgToSend: [
    {
      id: 1,
      label: 'Messaggio su Template',
      value: 1,  //MSG_OF_TEMPLATE
    },
    {
      id: 2,
      label: 'Messaggio di Testo',
      value: 2,  // MSG_TEXT
    },
  ],

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

  selectSendReally: [
    {
      id: 0,
      label: 'Vedi quanti msg saranno inviati',
      value: false,
    },
    {
      id: 1,
      label: 'Invia il messaggio veramente',
      value: true,
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
    {
      id: 5,
      label: 'a un Utente',
      value: 25,  //TypeMsg.SEND_TO_USER
    },
    {
      id: 6,
      label: 'a un Gruppo',
      value: 30,  //SEND_TO_GROUP: 30,

    },
    {
      id: 7,
      label: 'a me stesso',
      value: 40,  //SEND_TO_MYSELF: 40,

    },
    {
      id: 8,
      label: 'Abilitati Telegram (senza Username telegram)',
      value: 50,  //SEND_TO_TELEG_NO_USERNAME_TELEG: 50,

    },
    {
      id: 9,
      label: 'Abilitati Telegram (Non Verificati dall\'Invitante)',
      value: 60,  //SEND_TO_TELEG_NO_VERIF_BY_APORTADOR: 60,

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

  ConfSite: {
    Notif_Reg_Bot_ToManagers: 1,
    Notif_Reg_Push_Admin: 2,
    Need_Aportador_On_DataReg_To_Verify_Reg: 4,
  },

  MsgTeleg: {
    SHARE_MSGREG: 1
  },

  TypeMsgTemplate: {
    MSG_BENVENUTO: 2010,
    MS_SHARE_LINK: 2000
  },

  TypeSend: {
    PUSH_NOTIFICATION: 1,
    TELEGRAM: 2,
  },

  getStatusStr(status: number) {
    const trovatorec = this.OrderStatusStr.find((rec) => rec.value === status)
    return (trovatorec) ? trovatorec.label : ''
  },

  fieldsUserToChange() {
    return ['_id', 'username', 'group', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'notask_verif', 'verified_by_aportador', 'trust_modified', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  },

}
