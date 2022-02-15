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
  SHOW_MYSKILL: 10,

  BINARY_CHECK: 1,

  RISERVATO_PASSWORD: 1,
  NASCOSTO_CERCA: 2,

  VISUTABLE_LISTA: 2,
  VISUTABLE_SCHEDA_USER: -1,
  VISUTABLE_SCHEDA_GROUP: -3,

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

  SHOW_ALL: 50,

  REQ_ADD_USER_TO_GROUP: 40,
  REQ_REMOVE_USER_TO_GROUP: 41,

  FILTER_TUTTI: -100,
  TABLES_ARRAY: ['mygroups'],
  TABLES_USERNAME_DATE: ['friends', 'friendsandme'],
  TABLES_IMG_USERNAME: ['friends', 'friendsandme'],

  FuncDialog: {
    CANCEL_BOOKING: 1,
  },

  DRAGULA: false,

  ALLOWCHAR_CODE: 1,

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
  },

}
