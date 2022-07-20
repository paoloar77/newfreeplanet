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
    DELETE_GROUP: 1170,
  },

  PUBTOSHARE: {
    ALL: 0,
    ONLY_GROUPS_FOLLOW: 1,
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
  TABLES_MYHOSPS: 'myhosps',
  TABLES_MYGOODS: 'mygoods',

  TABLES_ENABLE_GETREC_BYID: ['mybachecas', 'myhosps'],

  TABLES_USER_INCLUDE_MY: ['mygroups'],
  TABLES_GETCOMPLETEREC: ['myskills', 'mybachecas', 'myhosps', 'mygoods'],
  TABLES_WITH_FILTER_FIELD: ['caldate'],
  TABLES_WITH_SPECIAL_FILTER: ['pub_to_share'],
  COL_WITH_FILTER_GTE: ['numMaxPeopleHosp'],
  TABLES_WITH_DATE: ['mybachecas', 'myhosps'],
  TABLES_WITH_SORTING: ['mybachecas', 'myhosps'],
  TABLES_REC_ID: ['skills', 'goods', 'subskills', 'myskills', 'mybachecas', 'myhosps', 'mygoods'],

  // costanti.VISUTABLE_SCHEDA_USER, VISUTABLE_SCHEDA_GROUP, VISUTABLE_USER_TABGROUP
  VERTIC_SHOW_GRID: [-1, 2, -3, -4],

  TABLES_UPDATE_LASTIFIED: ['myskills', 'mybachecas', 'myhosps', 'mygoods', 'bots'],
  TABLES_FINDER: ['myskills', 'mybachecas', 'myhosps', 'mygoods', 'mygroups'],
  TABLES_VISU_CMYSRECCARD: ['myskills', 'mybachecas', 'myhosps', 'mygoods', 'mygroups'],
  TABLES_SHOW_ADTYPE: ['myskills', 'mygoods'],

  TABLES_VISU_LISTA_USER: ['myskills', 'mybachecas', 'myhosps', 'mygoods', 'users'],

  TABLES_VISU_IMG: ['myskills', 'mybachecas', 'myhosps', 'mygoods', 'mygroups'],
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

  TypeHosps: [
    {
      value: 1,
      label: 'Scambio Casa',
    },
    {
      value: 2,
      label: 'Ospitalità',
    }
  ],

  TypeAccom: [
    {
      value: 1,
      label: 'Letti matrimoniali',
    },
    {
      value: 2,
      label: 'Letti singoli',
    },
    {
      value: 3,
      label: 'Divani-letto',
    },
    {
      value: 4,
      label: 'Almaca',
    },
    {
      value: 5,
      label: 'sul materasso',
    },
    {
      value: 6,
      label: 'sul tappeto',
    },
    {
      value: 7,
      label: 'sacco a pelo',
    },
    {
      value: 8,
      label: 'Culla',
    },
  ],

  LocationAccom: [
    {
      value: 1,
      label: 'Camera Privata',
    },
    {
      value: 2,
      label: 'Camera Condivisa',
    },
    {
      value: 3,
      label: 'Soggiorno',
    },
    {
      value: 4,
      label: 'Camper',
    },
    {
      value: 5,
      label: 'Roulotte',
    },
    {
      value: 6,
      label: 'Tenda',
    },
    {
      value: 7,
      label: 'Casetta sull\'Albero',
    },
    {
      value: 8,
      label: 'Yurta',
    },
    {
      value: 9,
      label: 'Giardino',
    },
    {
      value: 10,
      label: 'Aria aperta',
    },
  ],


  People: [
    {
      value: 0,
      label: 'Nessuno',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 11,
      label: '11',
    },
    {
      value: 12,
      label: '12',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 20,
      label: '20',
    },
  ],

  Preferences: [
    {
      value: 2,
      label: 'Si accettano cani',
    },
    {
      value: 3,
      label: 'Si accettano gatti',
    },
    {
      value: 4,
      label: 'E\' consentito fumare in casa',
    },
    {
      value: 5,
      label: 'Accessibile con sedia a rotelle',
    },
    {
      value: 6,
      label: 'Parcheggio gratuito nella proprietà',
    },
    {
      value: 7,
      label: 'Wi-fi disponibile',
    },
    {
      value: 8,
      label: 'Sono permessi soggiorni a lungo termine',
    },
    {
      value: 9,
      label: 'Cucina Vegetariana',
    },
    {
      value: 10,
      label: 'Cucina Vegana',
    },
    {
      value: 11,
      label: 'Uso della Cucina',
    },
    {
      value: 12,
      label: 'Uso della Lavatrice',
    },
    {
      value: 13,
      label: 'Aria condizionata',
    },
    {
      value: 14,
      label: 'Ventilatore',
    },
    {
      value: 15,
      label: 'Doccia all\'aperto',
    },
    {
      value: 16,
      label: 'TV',
    },
    {
      value: 17,
      label: 'Eventi consentiti',
    },
    {
      value: 18,
      label: 'Adatto a bambini da 2 a 12 anni',
    },
    {
      value: 19,
      label: 'Adatto ai neonati (fino ai 2 anni)',
    },
    {
      value: 20,
      label: 'Biancheria inclusa',
    },
    {
      value: 21,
      label: 'Biancheria su richiesta (a parte)',
    },
    {
      value: 22,
      label: 'Asciugamani',
    },
    {
      value: 23,
      label: 'Asciugacapelli',
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

  Pub_to_Share: [
    {
      value: 0,
      label: 'Tutti',
    },
    {
      value: 1,
      label: 'Miei Gruppi',
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
    Facilitatore: {
      value: 8,
      label: 'dashboard.facilitatore',
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

  UsersNotif: {
    NEW_ADV_PROVINCE: 1,
    NEW_ADV_CITY: 2,
    NEW_ADV_MY_GROUPS: 4,
    NEW_ADV_MY_RIS_CIRCUIT: 8,
  },

  typeNotifs: [
    {
      value: 1, //
      labeltrans: 'typenotifs.new_rec_bacheca',
      descr: 'typenotifs.new_rec_bacheca_descr',
    },
    {
      value: 2, //
      labeltrans: 'typenotifs.events',
      descr: 'typenotifs.events_descr',
    },
    {
      value: 3, //
      labeltrans: 'typenotifs.friends',
      descr: 'typenotifs.friends_descr',
    },
    {
      value: 4, //
      labeltrans: 'typenotifs.circuits',
      descr: 'typenotifs.circuits_descr',
    },
    {
      value: 5, //
      labeltrans: 'typenotifs.booking',
      descr: '',
    },
  ],



  UsersNotif_Adv_List: [
    {
      value: 1, // NEW_ADV_PROVINCE
      labeltrans: 'notifs.warn_province',
      directory: 1,
    },
    {
      value: 2, // NEW_ADV_CITY
      labeltrans: 'notifs.warn_city',
      directory: 1,
    },
    {
      value: 4, // NEW_ADV_MY_GROUPS
      labeltrans: 'notifs.warn_my_groups',
      directory: 1,
    },
    {
      value: 8, // NEW_ADV_MY_RIS_CIRCUIT
      labeltrans: 'notifs.warn_my_ris_circuit',
      directory: 1,
    },
    {
      value: 1, //
      labeltrans: 'notifs.new_event',
      directory: 2,
    },
    {
      value: 1, //
      labeltrans: 'notifs.new_friends',
      directory: 3,
    },
  ],


  getStatusStr(status: number) {
    const trovatorec = this.OrderStatusStr.find((rec) => rec.value === status)
    return (trovatorec) ? trovatorec.label : ''
  },

  getLabelByValueAndArr(value: number, array: any) {
    const trovatorec = array.find((rec: any) => rec.value === value)
    return (trovatorec) ? trovatorec.label : ''
  },

  fieldsUserToChange() {
    return ['_id', 'username', 'group', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'notask_verif', 'verified_by_aportador', 'trust_modified', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  },

}
