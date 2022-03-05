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

  Provinces: [
    { _id: 1, reg: 'SIC', value: 'AG', label: 'Agrigento', }, {
      _id: 2,
      reg: 'PIE',
      value: 'AL',
      label: 'Alessandria',
    }, { _id: 3, reg: 'MAR', value: 'AN', label: 'Ancona', }, {
      _id: 4,
      reg: 'VDA',
      value: 'AO',
      label: 'Aosta',
    }, { _id: 5, reg: 'TOS', value: 'AR', label: 'Arezzo', }, {
      _id: 6,
      reg: 'MAR',
      value: 'AP',
      label: 'Ascoli Piceno',
    }, { _id: 7, reg: 'PIE', value: 'AT', label: 'Asti', }, {
      _id: 8,
      reg: 'CAM',
      value: 'AV',
      label: 'Avellino',
    }, { _id: 9, reg: 'PUG', value: 'BA', label: 'Bari', }, {
      _id: 10,
      reg: 'PUG',
      value: 'BT',
      label: 'Barletta-Andria-Trani',
    }, { _id: 11, reg: 'VEN', value: 'BL', label: 'Belluno', }, {
      _id: 12,
      reg: 'CAM',
      value: 'BN',
      label: 'Benevento',
    }, { _id: 13, reg: 'LOM', value: 'BG', label: 'Bergamo', }, {
      _id: 14,
      reg: 'PIE',
      value: 'BI',
      label: 'Biella',
    }, { _id: 15, reg: 'EMR', value: 'BO', label: 'Bologna', }, {
      _id: 16,
      reg: 'TAA',
      value: 'BZ',
      label: 'Bolzano',
    }, { _id: 17, reg: 'LOM', value: 'BS', label: 'Brescia', }, {
      _id: 18,
      reg: 'PUG',
      value: 'BR',
      label: 'Brindisi',
    }, { _id: 19, reg: 'SAR', value: 'CA', label: 'Cagliari', }, {
      _id: 20,
      reg: 'SIC',
      value: 'CL',
      label: 'Caltanissetta',
    }, { _id: 21, reg: 'MOL', value: 'CB', label: 'Campobasso', }, {
      _id: 22,
      reg: 'SAR',
      value: 'CI',
      label: 'Carbonia-Iglesias',
    }, { _id: 23, reg: 'CAM', value: 'CE', label: 'Caserta', }, {
      _id: 24,
      reg: 'SIC',
      value: 'CT',
      label: 'Catania',
    }, { _id: 25, reg: 'CAL', value: 'CZ', label: 'Catanzaro', }, {
      _id: 26,
      reg: 'ABR',
      value: 'CH',
      label: 'Chieti',
    }, { _id: 27, reg: 'LOM', value: 'CO', label: 'Como', }, {
      _id: 28,
      reg: 'CAL',
      value: 'CS',
      label: 'Cosenza',
    }, { _id: 29, reg: 'LOM', value: 'CR', label: 'Cremona', }, {
      _id: 30,
      reg: 'CAL',
      value: 'KR',
      label: 'Crotone',
    }, { _id: 31, reg: 'PIE', value: 'CN', label: 'Cuneo', }, {
      _id: 32,
      reg: 'SIC',
      value: 'EN',
      label: 'Enna',
    }, { _id: 33, reg: 'MAR', value: 'FM', label: 'Fermo', }, {
      _id: 34,
      reg: 'EMR',
      value: 'FE',
      label: 'Ferrara',
    }, { _id: 35, reg: 'TOS', value: 'FI', label: 'Firenze', }, {
      _id: 36,
      reg: 'PUG',
      value: 'FG',
      label: 'Foggia',
    }, { _id: 37, reg: 'EMR', value: 'FC', label: 'Forli-Cesena', }, {
      _id: 38,
      reg: 'LAZ',
      value: 'FR',
      label: 'Frosinone',
    }, { _id: 39, reg: 'LIG', value: 'GE', label: 'Genova', }, {
      _id: 40,
      reg: 'FVG',
      value: 'GO',
      label: 'Gorizia',
    }, { _id: 41, reg: 'TOS', value: 'GR', label: 'Grosseto', }, {
      _id: 42,
      reg: 'LIG',
      value: 'IM',
      label: 'Imperia',
    }, { _id: 43, reg: 'MOL', value: 'IS', label: 'Isernia', }, {
      _id: 44,
      reg: 'LIG',
      value: 'SP',
      label: 'La Spezia',
    }, { _id: 45, reg: 'ABR', value: 'AQ', label: 'L\'Aquila', }, {
      _id: 46,
      reg: 'LAZ',
      value: 'LT',
      label: 'Latina',
    }, { _id: 47, reg: 'PUG', value: 'LE', label: 'Lecce', }, {
      _id: 48,
      reg: 'LOM',
      value: 'LC',
      label: 'Lecco',
    }, { _id: 49, reg: 'TOS', value: 'LI', label: 'Livorno', }, {
      _id: 50,
      reg: 'LOM',
      value: 'LO',
      label: 'Lodi',
    }, { _id: 51, reg: 'TOS', value: 'LU', label: 'Lucca', }, {
      _id: 52,
      reg: 'MAR',
      value: 'MC',
      label: 'Macerata',
    }, { _id: 53, reg: 'LOM', value: 'MN', label: 'Mantova', }, {
      _id: 54,
      reg: 'TOS',
      value: 'MS',
      label: 'Massa-Carrara',
    }, { _id: 55, reg: 'BAS', value: 'MT', label: 'Matera', }, {
      _id: 56,
      reg: 'SIC',
      value: 'ME',
      label: 'Messina',
    }, { _id: 57, reg: 'LOM', value: 'MI', label: 'Milano', }, {
      _id: 58,
      reg: 'EMR',
      value: 'MO',
      label: 'Modena',
    }, { _id: 59, reg: 'LOM', value: 'MB', label: 'Monza e della Brianza', }, {
      _id: 60,
      reg: 'CAM',
      value: 'NA',
      label: 'Napoli',
    }, { _id: 61, reg: 'PIE', value: 'NO', label: 'Novara', }, {
      _id: 62,
      reg: 'SAR',
      value: 'NU',
      label: 'Nuoro',
    }, { _id: 63, reg: 'SAR', value: 'OT', label: 'Olbia-Tempio', }, {
      _id: 64,
      reg: 'SAR',
      value: 'OR',
      label: 'Oristano',
    }, { _id: 65, reg: 'VEN', value: 'PD', label: 'Padova', }, {
      _id: 66,
      reg: 'SIC',
      value: 'PA',
      label: 'Palermo',
    }, { _id: 67, reg: 'EMR', value: 'PR', label: 'Parma', }, {
      _id: 68,
      reg: 'LOM',
      value: 'PV',
      label: 'Pavia',
    }, { _id: 69, reg: 'UMB', value: 'PG', label: 'Perugia', }, {
      _id: 70,
      reg: 'MAR',
      value: 'PU',
      label: 'Pesaro e Urbino',
    }, { _id: 71, reg: 'ABR', value: 'PE', label: 'Pescara', }, {
      _id: 72,
      reg: 'EMR',
      value: 'PC',
      label: 'Piacenza',
    }, { _id: 73, reg: 'TOS', value: 'PI', label: 'Pisa', }, {
      _id: 74,
      reg: 'TOS',
      value: 'PT',
      label: 'Pistoia',
    }, { _id: 75, reg: 'FVG', value: 'PN', label: 'Pordenone', }, {
      _id: 76,
      reg: 'BAS',
      value: 'PZ',
      label: 'Potenza',
    }, { _id: 77, reg: 'TOS', value: 'PO', label: 'Prato', }, {
      _id: 78,
      reg: 'SIC',
      value: 'RG',
      label: 'Ragusa',
    }, { _id: 79, reg: 'EMR', value: 'RA', label: 'Ravenna', }, {
      _id: 80,
      reg: 'CAL',
      value: 'RC',
      label: 'Reggio CAL',
    }, { _id: 81, reg: 'EMR', value: 'RE', label: 'Reggio Emilia', }, {
      _id: 82,
      reg: 'LAZ',
      value: 'RI',
      label: 'Rieti',
    }, { _id: 83, reg: 'EMR', value: 'RN', label: 'Rimini', }, {
      _id: 84,
      reg: 'LAZ',
      value: 'RM',
      label: 'Roma',
    }, { _id: 85, reg: 'VEN', value: 'RO', label: 'Rovigo', }, {
      _id: 86,
      reg: 'CAM',
      value: 'SA',
      label: 'Salerno',
    }, { _id: 87, reg: 'SAR', value: 'VS', label: 'Medio Campidano', }, {
      _id: 88,
      reg: 'SAR',
      value: 'SS',
      label: 'Sassari',
    }, { _id: 89, reg: 'LIG', value: 'SV', label: 'Savona', }, {
      _id: 90,
      reg: 'TOS',
      value: 'SI',
      label: 'Siena',
    }, { _id: 91, reg: 'SIC', value: 'SR', label: 'Siracusa', }, {
      _id: 92,
      reg: 'LOM',
      value: 'SO',
      label: 'Sondrio',
    }, { _id: 93, reg: 'PUG', value: 'TA', label: 'Taranto', }, {
      _id: 94,
      reg: 'ABR',
      value: 'TE',
      label: 'Teramo',
    }, { _id: 95, reg: 'UMB', value: 'TR', label: 'Terni', }, {
      _id: 96,
      reg: 'PIE',
      value: 'TO',
      label: 'Torino',
    }, { _id: 97, reg: 'SAR', value: 'OG', label: 'Ogliastra', }, {
      _id: 98,
      reg: 'SIC',
      value: 'TP',
      label: 'Trapani',
    }, { _id: 99, reg: 'TAA', value: 'TN', label: 'Trento', }, {
      _id: 100,
      reg: 'VEN',
      value: 'TV',
      label: 'Treviso',
    }, { _id: 101, reg: 'FVG', value: 'TS', label: 'Trieste', }, {
      _id: 102,
      reg: 'FVG',
      value: 'UD',
      label: 'Udine',
    }, { _id: 103, reg: 'LOM', value: 'VA', label: 'Varese', }, {
      _id: 104,
      reg: 'VEN',
      value: 'VE',
      label: 'Venezia',
    }, { _id: 105, reg: 'PIE', value: 'VB', label: 'Verbano-Cusio-Ossola', }, {
      _id: 106,
      reg: 'PIE',
      value: 'VC',
      label: 'Vercelli',
    }, { _id: 107, reg: 'VEN', value: 'VR', label: 'Verona', }, {
      _id: 108,
      reg: 'CAL',
      value: 'VV',
      label: 'Vibo Valentia',
    },
    { _id: 109, reg: 'VEN', value: 'VI', label: 'Vicenza', }, {
      _id: 110,
      reg: 'LAZ',
      value: 'VT',
      label: 'Viterbo',
    },
    { _id: 111, reg: 'RSM', value: 'RSM', label: 'Repubblica di San Marino', },
    { _id: 112, reg: 'EST', value: 'EST', label: 'Estero', },
    { _id: 113, reg: 'ONL', value: 'ONL', label: 'On Line', },
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
