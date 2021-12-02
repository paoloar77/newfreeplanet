export const costanti = {
  ShowTypeTask: {
    SHOW_LAST_N_COMPLETED: 200,
    SHOW_ONLY_TOCOMPLETE: 201,
    SHOW_ALL: 202,
  },
  CONFIG_ID_CFG: '1',
  CONFIG_ID_STATE_CONN: '2',
  CONFIG_ID_SHOW_TYPE_TODOS: '3',

  FuncDialog: {
    CANCEL_BOOKING: 1,
  },

  DRAGULA: false,

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
    star5: 40,
    number: 64,
    typeinrec: 128,
    multiselect: 256,
    password: 512,
    listimages: 1024,
    exact: 2048,
    image: 3000,
    nationality: 4096,
    intcode: 5000,
    multioption: 6000,
    onlydate: 7000,
    hours: 8000,
  },
  FieldTypeArr: [
    { label: 'Boolean', value: 1 },
    { label: 'Date', value: 2 },
    { label: 'String', value: 4 },
    { label: 'Binary', value: 8 },
    { label: 'Html', value: 16 },
    { label: 'Select', value: 32 },
    { label: 'Number', value: 64 },
  ],


}
