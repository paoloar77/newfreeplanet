export const costanti = {
  ShowTypeTask: {
    SHOW_LAST_N_COMPLETED: 200,
    SHOW_ONLY_TOCOMPLETE: 201,
    SHOW_ALL: 202,
  },
  CONFIG_ID_CFG: '1',
  CONFIG_ID_STATE_CONN: '2',
  CONFIG_ID_SHOW_TYPE_TODOS: '3',

  SHOW_USERINFO: 1,
  SHOW_GROUPINFO: 5,
  SHOW_MYCARD: 10,

  MAINCARDS: [
    {
      title: ' Beni ',
      to: '/goods',
      icon: 'fas fa-tshirt',
      color: 'indigo',
      hint: '',
    },
    {
      title: 'Servizi',
      to: '/services',
      icon: 'fas fa-house-user',
      color: 'red',
      hint: '',
    },
    {
      title: 'Mobilità',
      to: '/places',
      icon: 'fas fa-taxi',
      color: 'lime-7',
      textcolor: '',
      hint: '',
      disable: true,
    },
    {
      title: 'Scuola',
      to: '/school',
      icon: 'fas fa-book-open',
      color: 'orange',
      hint: '',
      disable: true,
    },
    {
      title: 'Eventi',
      to: '/events',
      icon: 'event',
      color: 'green',
      hint: 'eventi, last minute, offerte di lavoro',
      disable: false,
    },
    {
      title: 'Luoghi',
      to: '/places',
      icon: 'fas fa-map-marker-alt',
      color: 'blue',
      hint: '',
      disable: true,
    },
    {
      title: 'Tue&nbsp;Idee',
      to: '/ideas',
      icon: 'fas fa-lightbulb',
      color: 'red-7',
      textcolor: '',
      hint: '',
      disable: true,
      small: true,
    },
    {
      title: 'Help',
      to: '/help',
      icon: 'fas fa-users',
      color: 'green-7',
      hint: '',
      disable: true,
      small: true,
    },
    {
      title: 'Social',
      to: '/socialising',
      icon: 'fas fa-users',
      color: 'blue-7',
      hint: '',
      disable: true,
      small: true,
    },
  ],

  BINARY_CHECK: 1,

  RISERVATO_PASSWORD: 1,
  NASCOSTO_CERCA: 2,

  VISUTABLE_LISTA: 2,
  VISUTABLE_SCHEDA_USER: -1,
  VISUTABLE_SCHEDA_GROUP: -3,
  VISUTABLE_USER_TABGROUP: -4,

  DIR_UPLOAD: 'upload/', // upload/

  FRIENDS: 1,
  ASK_TRUST: 2,
  TRUSTED: 3,
  REJECTED: 4,
  REQ_FRIENDS: 5,
  ASK_SENT_FRIENDS: 6,
  FIND_PEOPLE: 10,

  GROUPS: 11,
  GRP_REJECTED: 14,
  REQ_GROUP: 15,
  ASK_SENT_GROUP: 16,
  FIND_GROUP: 20,
  MY_GROUPS: 21,
  CREATE_GROUP: 30,
  MANAGE_GROUPS: 31,

  CMD_DELETE: 1,
  CMD_MODIFY: 2,
  CMD_SHOW_PAGE: 3,

  SHOW_ALL: 50,

  REQ_ADD_USER_TO_GROUP: 40,
  REQ_REMOVE_USER_TO_GROUP: 41,

  FILTER_NESSUNO: 0,
  FILTER_TUTTI: -100,
  TABLES_ARRAY: ['mygroups'],
  TABLES_USERNAME_DATE: ['friends', 'friendsandme'],
  TABLES_IMG_USERNAME: ['friends', 'friendsandme'],

  FuncDialog: {
    CANCEL_BOOKING: 1,
  },

  DRAGULA: false,

  ALLOWCHAR_CODE: 1,

  NESSUN_IMMAGINE: 'none',

  showWhen: {
    NewRec: 1,
    InPage: 2,
    InEdit: 4,
    InView: 8,
    InView_OnlyifExist: 16,
  },

  TABEVENTS: 'myevents',

  NOFIELD: 'nofield',

  MAX_PHASES: 5,

  OtherTables: ['config', 'swmsg'],
  // export const MainTables = ['todos', 'projects']
  MainTables: [],
  allMethod: ['sync_post_', 'sync_patch_', 'delete_', 'hide_'],

  FieldType: {
    boolean: 1,
    date: 2,
    string: 4,
    binary: 8,
    html: 16,
    select: 32,
    star3: 35,
    star5: 40,
    number: 64,
    typeinrec: 128,
    multiselect: 256,
    password: 512,
    listimages: 1024,
    exact: 2048,
    image: 3000,
    select_by_server: 4000,
    multiselect_by_server: 4010,
    nationality: 4096,
    intcode: 5000,
    multioption: 6000,
    onlydate: 7000,
    hours: 8000,
    crypted: 9000,
    object: 10000,
    separator: 11000,
    username_chip: 12000,
    link: 12500,
  },

  FieldTypeArr: [
    { label: 'Boolean', value: 1 },
    { label: 'Date', value: 2 },
    { label: 'String', value: 4 },
    { label: 'Binary', value: 8 },
    { label: 'Html', value: 16 },
    { label: 'Select', value: 32 },
    { label: 'Number', value: 64 },
    { label: 'crypted', value: 9000 },
  ],

  TipoVisu: {
    TESTO: 1,
    LINK: 2,
    BUTTON: 3,
    LINKIMG: 4,
    TESTO_BORDATO: 5,
  },

}
