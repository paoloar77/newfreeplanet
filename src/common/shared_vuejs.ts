
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

  TABLES_ID_NUMBER: ['permissions', 'levels', 'statusSkills', 'sectors', 'skills', 'subskills', 'cities', 'provinces', 'myskills'],
  TABLES_USER_ID: ['myskills'],
  TABLES_UPDATE_LASTMODIFIED: ['myskills', 'mybots'],

  TABLES_PERM_CHANGE_FOR_USERS: ['myskills'],

  VISIB_ALL: 0,
  VISIB_ONLYIF_VERIFIED: 1,
  VISIB_ONLY_MANAGER: 2,
  VISIB_ONLY_ADMIN: 4,

  BOTTYPE_NONE: 0,
  BOTTYPE_PAGE: 1,
  BOTTYPE_LINK: 2,
  BOTTYPE_TEXT: 3,

  CashType: {
    None: 0,
    Incoming: 1,
    Outcoming: 2,
  },

  Cmd: {
    PROVINCE: 1,
    COMUNI: 2,
    CITIES_SERVER: 3,
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
  ],

  Provinces: [
    {
      label: 'Agrigento',
      value: 'AG',
    },
    {
      label: 'Alessandria',
      value: 'AL',
    },
    {
      label: 'Ancona',
      value: 'AN',
    },
    {
      label: 'Aosta',
      value: 'AO',
    },
    {
      label: 'Arezzo',
      value: 'AR',
    },
    {
      label: 'Ascoli Piceno',
      value: 'AP',
    },
    {
      label: 'Asti',
      value: 'AT',
    },
    {
      label: 'Avellino',
      value: 'AV',
    },
    {
      label: 'Bari',
      value: 'BA',
    },
    {
      label: 'Barletta-Andria-Trani',
      value: 'BT',
    },
    {
      label: 'Belluno',
      value: 'BL',
    },
    {
      label: 'Benevento',
      value: 'BN',
    },
    {
      label: 'Bergamo',
      value: 'BG',
    },
    {
      label: 'Biella',
      value: 'BI',
    },
    {
      label: 'Bologna',
      value: 'BO',
    },
    {
      label: 'Bolzano',
      value: 'BZ',
    },
    {
      label: 'Brescia',
      value: 'BS',
    },
    {
      label: 'Brindisi',
      value: 'BR',
    },
    {
      label: 'Cagliari',
      value: 'CA',
    },
    {
      label: 'Caltanissetta',
      value: 'CL',
    },
    {
      label: 'Campobasso',
      value: 'CB',
    },
    {
      label: 'Carbonia-Iglesias',
      value: 'CI',
    },
    {
      label: 'Caserta',
      value: 'CE',
    },
    {
      label: 'Catania',
      value: 'CT',
    },
    {
      label: 'Catanzaro',
      value: 'CZ',
    },
    {
      label: 'Chieti',
      value: 'CH',
    },
    {
      label: 'Como',
      value: 'CO',
    },
    {
      label: 'Cosenza',
      value: 'CS',
    },
    {
      label: 'Cremona',
      value: 'CR',
    },
    {
      label: 'Crotone',
      value: 'KR',
    },
    {
      label: 'Cuneo',
      value: 'CN',
    },
    {
      label: 'Enna',
      value: 'EN',
    },
    {
      label: 'Fermo',
      value: 'FM',
    },
    {
      label: 'Ferrara',
      value: 'FE',
    },
    {
      label: 'Firenze',
      value: 'FI',
    },
    {
      label: 'Foggia',
      value: 'FG',
    },
    {
      label: 'Forli-Cesena',
      value: 'FC',
    },
    {
      label: 'Frosinone',
      value: 'FR',
    },
    {
      label: 'Genova',
      value: 'GE',
    },
    {
      label: 'Gorizia',
      value: 'GO',
    },
    {
      label: 'Grosseto',
      value: 'GR',
    },
    {
      label: 'Imperia',
      value: 'IM',
    },
    {
      label: 'Isernia',
      value: 'IS',
    },
    {
      label: 'La Spezia',
      value: 'SP',
    },
    {
      label: 'L\'Aquila',
      value: 'AQ',
    },
    {
      label: 'Latina',
      value: 'LT',
    },
    {
      label: 'Lecce',
      value: 'LE',
    },
    {
      label: 'Lecco',
      value: 'LC',
    },
    {
      label: 'Livorno',
      value: 'LI',
    },
    {
      label: 'Lodi',
      value: 'LO',
    },
    {
      label: 'Lucca',
      value: 'LU',
    },
    {
      label: 'Macerata',
      value: 'MC',
    },
    {
      label: 'Mantova',
      value: 'MN',
    },
    {
      label: 'Massa-Carrara',
      value: 'MS',
    },
    {
      label: 'Matera',
      value: 'MT',
    },
    {
      label: 'Messina',
      value: 'ME',
    },
    {
      label: 'Milano',
      value: 'MI',
    },
    {
      label: 'Modena',
      value: 'MO',
    },
    {
      label: 'Monza e della Brianza',
      value: 'MB',
    },
    {
      label: 'Napoli',
      value: 'NA',
    },
    {
      label: 'Novara',
      value: 'NO',
    },
    {
      label: 'Nuoro',
      value: 'NU',
    },
    {
      label: 'Olbia-Tempio',
      value: 'OT',
    },
    {
      label: 'Oristano',
      value: 'OR',
    },
    {
      label: 'Padova',
      value: 'PD',
    },
    {
      label: 'Palermo',
      value: 'PA',
    },
    {
      label: 'Parma',
      value: 'PR',
    },
    {
      label: 'Pavia',
      value: 'PV',
    },
    {
      label: 'Perugia',
      value: 'PG',
    },
    {
      label: 'Pesaro e Urbino',
      value: 'PU',
    },
    {
      label: 'Pescara',
      value: 'PE',
    },
    {
      label: 'Piacenza',
      value: 'PC',
    },
    {
      label: 'Pisa',
      value: 'PI',
    },
    {
      label: 'Pistoia',
      value: 'PT',
    },
    {
      label: 'Pordenone',
      value: 'PN',
    },
    {
      label: 'Potenza',
      value: 'PZ',
    },
    {
      label: 'Prato',
      value: 'PO',
    },
    {
      label: 'Ragusa',
      value: 'RG',
    },
    {
      label: 'Ravenna',
      value: 'RA',
    },
    {
      label: 'Reggio Calabria',
      value: 'RC',
    },
    {
      label: 'Reggio Emilia',
      value: 'RE',
    },
    {
      label: 'Rieti',
      value: 'RI',
    },
    {
      label: 'Rimini',
      value: 'RN',
    },
    {
      label: 'Roma',
      value: 'RM',
    },
    {
      label: 'Rovigo',
      value: 'RO',
    },
    {
      label: 'Salerno',
      value: 'SA',
    },
    {
      label: 'Medio Campidano',
      value: 'VS',
    },
    {
      label: 'Sassari',
      value: 'SS',
    },
    {
      label: 'Savona',
      value: 'SV',
    },
    {
      label: 'Siena',
      value: 'SI',
    },
    {
      label: 'Siracusa',
      value: 'SR',
    },
    {
      label: 'Sondrio',
      value: 'SO',
    },
    {
      label: 'Taranto',
      value: 'TA',
    },
    {
      label: 'Teramo',
      value: 'TE',
    },
    {
      label: 'Terni',
      value: 'TR',
    },
    {
      label: 'Torino',
      value: 'TO',
    },
    {
      label: 'Ogliastra',
      value: 'OG',
    },
    {
      label: 'Trapani',
      value: 'TP',
    },
    {
      label: 'Trento',
      value: 'TN',
    },
    {
      label: 'Treviso',
      value: 'TV',
    },
    {
      label: 'Trieste',
      value: 'TS',
    },
    {
      label: 'Udine',
      value: 'UD',
    },
    {
      label: 'Varese',
      value: 'VA',
    },
    {
      label: 'Venezia',
      value: 'VE',
    },
    {
      label: 'Verbano-Cusio-Ossola',
      value: 'VB',
    },
    {
      label: 'Vercelli',
      value: 'VC',
    },
    {
      label: 'Verona',
      value: 'VR',
    },
    {
      label: 'Vibo Valentia',
      value: 'VV',
    },
    {
      label: 'Vicenza',
      value: 'VI',
    },
    {
      label: 'Viterbo',
      value: 'VT',
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
      value: 'EMI',
      label: 'Emilia-Romagna',
    },
    {
      value: 'FRI',
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
      value: 'TRE',
      label: 'Trentino-Alto Adige',
    },
    {
      value: 'UMB',
      label: 'Umbria',
    },
    {
      value: 'VAL',
      label: 'Valle d\'Aosta',
    },
    {
      value: 'VEN',
      label: 'Veneto',
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
      label: 'Pubblico',
    },
    {
      value: 2,
      label: 'Privato',
    },
    {
      value: 4,
      label: 'Nascosto',
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
    return ['_id', 'username', 'group', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'verified_by_aportador', 'trust_modified', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  },

}
