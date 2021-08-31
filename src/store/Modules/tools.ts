import { translation } from '@store/Modules/translation'
import {
  IEvents, IPathFile, Privacy, TipoVisu,
} from '@model'

import { lists } from '@store/Modules/lists'
import { costanti } from '@store/Modules/costanti'
import { date, Screen, useQuasar } from 'quasar'

import { toolsext } from '@store/Modules/toolsext'
import { preloadedimages, static_data } from '@src/db/static_data'
import { useGlobalStore } from '@store/globalStore'
import globalroutines from '@src/boot/globalroutines'
import { useI18n } from '@src/boot/i18n'
import { RouteNames } from '@src/router/route-names'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
  CAN_EDIT: 'q-ce',
  TABBED_DASHBOARD: 't-db',
  TABBED_HOME: 't-home',
  TABBED_NAVE: 't-nave',

  getprefCountries: ['it', 'es', 'us'],

  APORTADOR_NONE: '------',

  TYPECONF_ZOOM: 'zoom',
  TYPECONF_JITSI: 'jitsi',

  APORTADOR_SOLIDARIO: 'apsol',

  IDAPP_AYNI: '7',
  IDAPP_SIP: '9',
  IDAPP_CNM: '10',

  TipoMsg: {
    SEND_LINK_CHAT_DONATORI: 1,
    SEND_MSG: 2,
    SEND_MSG_SINGOLO: 3,
    SEND_TO_ALL: 10,
    SEND_MSG_EFFETTUA_IL_DONO: 1000,
    SEND_MSG_SOLLECITO_DONATORI_NO_DONO: 1005,
    SEND_MSG_A_MEDIATORI: 1010,
    SEND_MSG_A_SOGNATORE: 1020,
    SEND_MSG_A_UTENTE_SOSTITUITO: 1030,
    SEND_MSG_DONO_RICEVUTO_CORRETTAMENTE: 1040,
  },

  listBestColor: [
    'blue',
    'green',
    'purple',
    'deep-purple',
    'indigo',
    'light-blue',
    'cyan',
    'teal',
    'lime',
    'orange',
    'deeporange',
    'grey',
    'blue-gray',
    'yellow',
  ],

  MAX_CHARACTERS: 60,
  projects: 'projects',
  todos: 'todos',
  EMPTY: 0,
  CALLING: 10,
  OK: 20,

  TYPE_AUDIO: 1,

  NUMSEC_CHECKUPDATE: 20000,

  FIRST_PROJ: '5ca8f17fcd40dc5012f53346',

  WHAT_NOTHING: 0,
  WHAT_TODO: 1,
  WHAT_PROJECT: 2,

  languageid: 5,

  peopleWhere: {
    participants: 1,
    lunch: 2,
    dinner: 3,
    dinnerShared: 4,
  },

  Priority: {
    PRIORITY_HIGH: 2,
    PRIORITY_NORMAL: 1,
    PRIORITY_LOW: 0,
  },

  Status: {
    NONE: 0,
    OPENED: 1,
    COMPLETED: 10,
  },

  SelectHours: [
    {
      id: 0,
      label: '0',
      value: 0,
    },
    {
      id: 5,
      label: '0.5',
      value: 0.5,
    },
    {
      id: 10,
      label: '1',
      value: 1,
    },
    {
      id: 15,
      label: '1.5',
      value: 1.5,
    },
    {
      id: 20,
      label: '2',
      value: 2,
    },
    {
      id: 25,
      label: '2.5',
      value: 2.5,
    },
    {
      id: 30,
      label: '3',
      value: 3,
    },
    {
      id: 35,
      label: '3.5',
      value: 3.5,
    },
    {
      id: 40,
      label: '4',
      value: 4,
    },
    {
      id: 45,
      label: '4.5',
      value: 4.5,
    },
    {
      id: 50,
      label: '5',
      value: 5,
    },
    {
      id: 60,
      label: '6',
      value: 6,
    },
    {
      id: 70,
      label: '7',
      value: 7,
    },
    {
      id: 80,
      label: '8',
      value: 8,
    },
    {
      id: 90,
      label: '9',
      value: 9,
    },
    {
      id: 100,
      label: '10',
      value: 10,
    },
    {
      id: 110,
      label: '11',
      value: 11,
    },
    {
      id: 120,
      label: '12',
      value: 12,
    },
  ],

  SelectMetodiPagamento: [
    {
      id: 0,
      label: '[Nessuno]',
      value: 0,
    },
    {
      id: 1,
      label: 'Bonifico Bancario',
      value: 1,
    },
    {
      id: 2,
      label: 'Paypal',
      value: 2,
    },
    {
      id: 3,
      label: 'In Contanti alla CNM',
      value: 3,
    },
  ],

  SelectListNumPeople: [
    {
      id: 0,
      label: '0',
      value: 0,
    },
    {
      id: 1,
      label: '1',
      value: 1,
    },
    {
      id: 2,
      label: '2',
      value: 2,
    },
    {
      id: 3,
      label: '3',
      value: 3,
    },
    {
      id: 4,
      label: '4',
      value: 4,
    },
    {
      id: 5,
      label: '5',
      value: 5,
    },
    {
      id: 6,
      label: '6',
      value: 6,
    },
    {
      id: 7,
      label: '7',
      value: 7,
    },
    {
      id: 8,
      label: '8',
      value: 8,
    },
    {
      id: 9,
      label: '9',
      value: 9,
    },
    {
      id: 10,
      label: '10',
      value: 10,
    },
  ],

  selectPhase: {
    it: [
      {
        id: 1,
        label: `${translation.it.fase} 0`,
        value: 0,
      },
      {
        id: 2,
        label: `${translation.it.fase} 1`,
        value: 1,
      },
      {
        id: 3,
        label: `${translation.it.fase} 2`,
        value: 2,
      },
      {
        id: 4,
        label: `${translation.it.fase} 3`,
        value: 3,
      },
    ],
    es: [
      {
        id: 1,
        label: `${translation.es.fase} 0`,
        value: 0,
      },
      {
        id: 2,
        label: `${translation.es.fase} 1`,
        value: 1,
      },
      {
        id: 3,
        label: `${translation.es.fase} 2`,
        value: 2,
      },
      {
        id: 4,
        label: `${translation.es.fase} 3`,
        value: 3,
      },
    ],
    enUs: [
      {
        id: 1,
        label: `${translation.enUs.fase} 0`,
        value: 0,
      },
      {
        id: 2,
        label: `${translation.enUs.fase} 1`,
        value: 1,
      },
      {
        id: 3,
        label: `${translation.enUs.fase} 2`,
        value: 2,
      },
      {
        id: 4,
        label: `${translation.enUs.fase} 3`,
        value: 3,
      },
    ],
  },

  selectPrivacy: {
    it: [
      {
        id: 1,
        label: translation.it.privacy.all,
        value: Privacy.all,
      },
      {
        id: 2,
        label: translation.it.privacy.friends,
        value: Privacy.friends,
      },
      {
        id: 3,
        label: translation.it.privacy.mygroup,
        value: Privacy.mygroup,
      },
      {
        id: 4,
        label: translation.it.privacy.onlyme,
        value: Privacy.onlyme,
      },
      {
        id: 5,
        label: translation.it.privacy.inherited,
        value: Privacy.inherited,
      },
    ],
    es: [
      {
        id: 1,
        label: translation.es.privacy.all,
        value: Privacy.all,
      },
      {
        id: 2,
        label: translation.es.privacy.friends,
        value: Privacy.friends,
      },
      {
        id: 3,
        label: translation.es.privacy.mygroup,
        value: Privacy.mygroup,
      },
      {
        id: 4,
        label: translation.es.privacy.onlyme,
        value: Privacy.onlyme,
      },
      {
        id: 5,
        label: translation.es.privacy.inherited,
        value: Privacy.inherited,
      },
    ],
    enUs: [
      {
        id: 1,
        label: translation.enUs.privacy.all,
        value: Privacy.all,
      },
      {
        id: 2,
        label: translation.enUs.privacy.friends,
        value: Privacy.friends,
      },
      {
        id: 3,
        label: translation.enUs.privacy.mygroup,
        value: Privacy.mygroup,
      },
      {
        id: 4,
        label: translation.enUs.privacy.onlyme,
        value: Privacy.onlyme,
      },
      {
        id: 5,
        label: translation.enUs.privacy.inherited,
        value: Privacy.inherited,
      },
    ],
  },

  selectTipoVisu: {
    it: [
      {
        id: 1,
        label: translation.it.privacy.inherited,
        value: TipoVisu.inherited,
      },
      {
        id: 2,
        label: translation.it.tipovisu.simplelist,
        value: TipoVisu.simplelist,
      },
      {
        id: 3,
        label: translation.it.tipovisu.taskProgress,
        value: TipoVisu.taskProgress,
      },
      {
        id: 4,
        label: translation.it.tipovisu.responsabili,
        value: TipoVisu.responsabili,
      },
    ],
  },

  selectStatus: {
    it: [
      {
        id: 1,
        label: 'Nessuno',
        value: 0, //   Status.NONE
        icon: 'expand_less',
      },
      {
        id: 2,
        label: 'Aperto',
        value: 1, //   Status.OPENED
        icon: 'expand_less',
      },
      {
        id: 3,
        label: 'Completato',
        value: 10, //   Status.COMPLETED
        icon: 'expand_less',
      },
    ],
    es:
      [
        {
          id: 1,
          label: 'Ninguno',
          value: 0, //   Status.NONE
          icon: 'expand_less',
        },
        {
          id: 2,
          label: 'Abierto',
          value: 1, //   Status.OPENED
          icon: 'expand_less',
        },
        {
          id: 3,
          label: 'Completado',
          value: 10, //   Status.COMPLETED
          icon: 'expand_less',
        },
      ],
    enUs:
      [
        {
          id: 1,
          label: 'None',
          value: 0, //   Status.NONE
          icon: 'expand_less',
        },
        {
          id: 2,
          label: 'Opened',
          value: 1, //   Status.OPENED
          icon: 'expand_less',
        },
        {
          id: 3,
          label: 'Completed',
          value: 10, //   Status.COMPLETED
          icon: 'expand_less',
        },
      ],

  },

  INDEX_MENU_DELETE: 4,

  menuPopupTodo:
    {
      it: [
        {
          id: 5,
          disable: false,
          label: 'Taglia',
          value: lists.MenuAction.CUT,
          icon: 'undo',
        },
        {
          id: 10,
          disable: false,
          label: 'Modifica',
          value: lists.MenuAction.EDIT,
          icon: 'create',
        },
        {
          id: 11,
          disable: false,
          label: 'Elimina',
          value: lists.MenuAction.DELETE,
          icon: 'delete',
          checked: false,
        },
        {
          id: 12,
          disable: false,
          label: '',
          value: lists.MenuAction.PROGRESS_BAR,
          icon: 'rowing',
          checked: true,
        },
        {
          id: 20,
          disable: false,
          label: 'Imposta Priorità',
          value: lists.MenuAction.PRIORITY,
          icon: 'rowing',
          checked: false,
          arrlista: lists.selectPriority.it,
        },
        {
          id: 21,
          disable: false,
          label: translation.it.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme,
        },
        {
          id: 22,
          disable: false,
          label: translation.it.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme,
        },
        {
          id: 30,
          disable: false,
          label: 'Completato',
          value: lists.MenuAction.COMPLETED,
          icon: 'check_circle',
          checked: true,
        },
        {
          id: 40,
          disable: false,
          label: 'Imposta Scadenza',
          value: lists.MenuAction.TOGGLE_EXPIRING,
          icon: 'date_range',
          checked: true,
        },
      ],
      es:
        [
          {
            id: 5,
            disable: false,
            label: 'Cortar',
            value: lists.MenuAction.CUT,
            icon: 'undo',
          },
          {
            id: 7,
            disable: false,
            label: 'Editar',
            value: lists.MenuAction.EDIT,
            icon: 'create',
          },
          {
            id: 8,
            disable: false,
            label: 'Borrar',
            value: lists.MenuAction.DELETE,
            icon: 'delete',
            checked: false,
          },
          {
            id: 10,
            disable: false,
            label: '',
            value: lists.MenuAction.PROGRESS_BAR,
            icon: 'rowing',
            checked: true,
          },
          {
            id: 20,
            disable: false,
            label: 'Establecer Prioridad',
            value: lists.MenuAction.PRIORITY,
            icon: 'rowing',
            checked: false,
            arrlista: lists.selectPriority.es,
          },
          {
            id: 21,
            disable: false,
            label: translation.es.proj.themecolor,
            value: lists.MenuAction.THEME,
            icon: 'format_color_text',
            checked: false,
            arrlista: lists.selectTheme,
          },
          {
            id: 22,
            disable: false,
            label: translation.es.proj.themebgcolor,
            value: lists.MenuAction.THEMEBG,
            icon: 'format_color_fill',
            checked: false,
            arrlista: lists.selectTheme,
          },
          {
            id: 30,
            disable: false,
            label: 'Completado',
            value: lists.MenuAction.COMPLETED,
            icon: 'check_circle',
            checked: true,
          },
          {
            id: 40,
            disable: false,
            label: 'Establecer expiración',
            value: lists.MenuAction.TOGGLE_EXPIRING,
            icon: 'date_range',
            checked: true,
          },
        ],
      enUs:
        [
          {
            id: 5,
            disable: false,
            label: 'Cut',
            value: lists.MenuAction.CUT,
            icon: 'undo',
          },
          {
            id: 7,
            disable: false,
            label: 'Edit',
            value: lists.MenuAction.EDIT,
            icon: 'create',
          },
          {
            id: 8,
            disable: false,
            label: 'Delete',
            value: lists.MenuAction.DELETE,
            icon: 'trash',
            checked: false,
          },
          {
            id: 10,
            disable: false,
            label: '',
            value: lists.MenuAction.PROGRESS_BAR,
            icon: 'check_circle',
            checked: true,
          },
          {
            id: 20,
            disable: false,
            label: 'Set Priority',
            value: lists.MenuAction.PRIORITY,
            icon: 'high_priority',
            checked: false,
            arrlista: lists.selectPriority.enUs,
          },
          {
            id: 21,
            disable: false,
            label: translation.enUs.proj.themecolor,
            value: lists.MenuAction.THEME,
            icon: 'format_color_text',
            checked: false,
            arrlista: lists.selectTheme,
          },
          {
            id: 22,
            disable: false,
            label: translation.enUs.proj.themebgcolor,
            value: lists.MenuAction.THEMEBG,
            icon: 'format_color_fill',
            checked: false,
            arrlista: lists.selectTheme,
          },
          {
            id: 30,
            disable: false,
            label: 'Completed',
            value: lists.MenuAction.COMPLETED,
            icon: 'check_circle',
            checked: true,
          },
          {
            id: 40,
            disable: false,
            label: 'Set Expiring',
            value: lists.MenuAction.TOGGLE_EXPIRING,
            icon: 'date_range',
            checked: true,
          },
        ],
    },

  menuPopupProj: {
    it: [
      {
        id: 5,
        disable: false,
        label: 'Taglia',
        value: lists.MenuAction.CUT,
        icon: 'undo',
      },
      {
        id: 10,
        disable: false,
        label: 'Modifica',
        value: lists.MenuAction.EDIT,
        icon: 'create',
      },
      {
        id: 11,
        disable: false,
        label: 'Elimina',
        value: lists.MenuAction.DELETE,
        icon: 'delete',
        checked: false,
      },
      {
        id: 40,
        disable: false,
        label: 'Imposta Scadenza',
        value: lists.MenuAction.TOGGLE_EXPIRING,
        icon: 'date_range',
        checked: true,
      },
      {
        id: 45,
        disable: false,
        label: translation.it.proj.themecolor,
        value: lists.MenuAction.THEME,
        icon: 'format_color_text',
        checked: false,
        arrlista: lists.selectTheme,
      },
      {
        id: 46,
        disable: false,
        label: translation.it.proj.themebgcolor,
        value: lists.MenuAction.THEMEBG,
        icon: 'format_color_fill',
        checked: false,
        arrlista: lists.selectTheme,
      },
    ],
    es:
      [
        {
          id: 5,
          disable: false,
          label: 'Cortar',
          value: lists.MenuAction.CUT,
          icon: 'undo',
        },
        {
          id: 10,
          disable: false,
          label: 'Editar',
          value: lists.MenuAction.EDIT,
          icon: 'create',
        },
        {
          id: 11,
          disable: false,
          label: 'Borrar',
          value: 100, // DELETE
          icon: 'delete',
          checked: false,
        },
        {
          id: 40,
          disable: false,
          label: 'Establecer expiración',
          value: lists.MenuAction.TOGGLE_EXPIRING,
          icon: 'date_range',
          checked: true,
        },
        {
          id: 45,
          disable: false,
          label: translation.es.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme,
        },
        {
          id: 46,
          disable: false,
          label: translation.es.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme,
        },
      ],
    enUs:
      [
        {
          id: 5,
          disable: false,
          label: 'Cut',
          value: 71, // CUT
          icon: 'undo',
        },
        {
          id: 10,
          disable: false,
          label: 'Edit',
          value: lists.MenuAction.EDIT,
          icon: 'create',
        },
        {
          id: 40,
          disable: false,
          label: 'Set Expiring',
          value: 101, // TOGGLE_EXPIRING
          icon: 'date_range',
          checked: true,
        },
        {
          id: 45,
          disable: false,
          label: translation.enUs.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme,
        },
        {
          id: 46,
          disable: false,
          label: translation.enUs.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme,
        },
        {
          id: 50,
          disable: false,
          label: 'Delete',
          value: 100, // DELETE
          icon: 'trash',
          checked: false,
        },
      ],
  },

  menuPopupConfigTodo: {
    it: [
      {
        id: 10,
        disable: false,
        label: 'Mostra Task',
        value: 150, // SHOW_TASK
        icon: 'rowing',
      },
    ],
    es:
      [
        {
          id: 10,
          disable: false,
          label: 'Mostrar Tareas',
          value: 150,
          icon: 'rowing',
        },
      ],
    enUs:
      [
        {
          id: 10,
          disable: false,
          label: 'Show Task',
          value: 150,
          icon: 'rowing',
        },
      ],
  },

  menuPopupConfigProject: {
    it: [
      {
        id: 3,
        disable: false,
        label: translation.it.action.paste,
        value: 72, // Action.PASTE
        icon: 'file_copy',
      },
      {
        id: 5,
        disable: false,
        label: translation.it.proj.newsubproj,
        value: 200, // ADD_PROJECT
        icon: 'next_week',
      },
      {
        id: 10,
        disable: false,
        label: translation.it.task.showtask,
        value: 150, // SHOW_TASK
        icon: 'rowing',
      },
      {
        id: 15,
        disable: false,
        label: translation.it.task.showposiz,
        value: 155, // SHOW_POSIZ
        icon: 'rowing',
      },
    ],
    es:
      [
        {
          id: 3,
          disable: false,
          label: translation.es.action.paste,
          value: 72, // Action.PASTE
          icon: 'file_copy',
        },
        {
          id: 5,
          disable: false,
          label: translation.es.proj.newsubproj,
          value: 200, // ADD_PROJECT
          icon: 'next_week',
        },
        {
          id: 10,
          disable: false,
          label: translation.es.task.showtask,
          value: 150,
          icon: 'rowing',
        },
      ],
    enUs:
      [
        {
          id: 3,
          disable: false,
          label: translation.enUs.action.paste,
          value: 72, // Action.PASTE
          icon: 'file_copy',
        },
        {
          id: 5,
          disable: false,
          label: translation.enUs.proj.newsubproj,
          value: 200, // ADD_PROJECT
          icon: 'next_week',
        },
        {
          id: 10,
          disable: false,
          label: translation.enUs.task.showtask,
          value: 150,
          icon: 'rowing',
        },
      ],
  },

  menuPopupConfigMAINProject: {
    it: [
      {
        id: 3,
        disable: false,
        label: translation.it.action.paste,
        value: 72, // Action.PASTE
        icon: 'file_copy',
      },
      {
        id: 5,
        disable: false,
        label: translation.it.proj.newproj,
        value: 200, // ADD_PROJECT
        icon: 'next_week',
      },
    ],
    es:
      [
        {
          id: 3,
          disable: false,
          label: translation.es.action.paste,
          value: 72, // Action.PASTE
          icon: 'file_copy',
        },
        {
          id: 5,
          disable: false,
          label: translation.es.proj.newproj,
          value: 200, // ADD_PROJECT
          icon: 'next_week',
        },
      ],
    enUs:
      [
        {
          id: 3,
          disable: false,
          label: translation.enUs.action.paste,
          value: 72, // Action.PASTE
          icon: 'file_copy',
        },
        {
          id: 5,
          disable: false,
          label: translation.enUs.proj.newproj,
          value: 200, // ADD_PROJECT
          icon: 'next_week',
        },
      ],
  },

  listOptionShowTask: {
    it: [
      {
        id: 10,
        disable: false,
        label: 'Mostra gli ultimi N completati',
        value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
        icon: 'rowing',
        checked: true,
      },
      {
        id: 20,
        disable: false,
        label: 'Compiti da Completare',
        value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
        icon: 'rowing',
        checked: false,
      },
      {
        id: 30,
        disable: false,
        label: 'Tutti i compiti',
        value: costanti.ShowTypeTask.SHOW_ALL,
        icon: 'check_circle',
        checked: true,
      },
    ],
    es:
      [
        {
          id: 10,
          disable: false,
          label: 'Mostrar los ultimos N completados',
          value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          icon: 'rowing',
          checked: true,
        },
        {
          id: 20,
          disable: false,
          label: 'Tareas para completar',
          value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
          icon: 'rowing',
          checked: false,
        },
        {
          id: 30,
          disable: false,
          label: 'Todos las Tareas',
          value: costanti.ShowTypeTask.SHOW_ALL,
          icon: 'check_circle',
          checked: true,
        },
      ],
    enUs:
      [
        {
          id: 10,
          disable: false,
          label: 'Show last N Completed',
          value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          icon: 'rowing',
          checked: true,
        },
        {
          id: 20,
          disable: false,
          label: 'Task to complete',
          value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
          icon: 'rowing',
          checked: false,
        },
        {
          id: 30,
          disable: false,
          label: 'All Tasks',
          value: costanti.ShowTypeTask.SHOW_ALL,
          icon: 'check_circle',
          checked: true,
        },
      ],
  },

  getTitlePriority(priority: number): string {
    let cl = ''

    if (priority === this.Priority.PRIORITY_HIGH) {
      cl = 'high_priority'
    } else if (priority === this.Priority.PRIORITY_NORMAL) {
      cl = 'medium_priority'
    } else if (priority === this.Priority.PRIORITY_LOW) {
      cl = 'low_priority'
    }

    return `${cl} titlePriority`
  },

  getItemLS(item: any): any {
    let ris = localStorage.getItem(item)
    if ((ris == null) || (ris === '') || (ris === 'null') || !ris) {
      ris = ''
    }

    return ris
  },

  isLoggedToSystem(): boolean {
    const tok = this.getItemLS(toolsext.localStorage.token)
    return !!tok
  },


  addDays(mydate: Date, days: number) {
    return date.addToDate(mydate, { days })
  },

  addMinutes(mydate: Date, minutes: number) {
    return date.addToDate(mydate, { minutes })
  },

  jsonCopy(src: any): any {
    return JSON.parse(JSON.stringify(src))
  },

  askfornotification($q: any) {
    const { t } = useI18n();
    console.log('askfornotification', $q)
    this.showNotif($q, t('notification.waitingconfirm'), { color: 'positive', icon: 'notifications' })

    Notification.requestPermission((result) => {
      console.log('User Choice', result)
      if (result === 'granted') {
        this.showNotif($q, t('notification.confirmed'), { color: 'positive', icon: 'notifications' })
      } else {
        this.showNotif($q, t('notification.denied'), { color: 'negative', icon: 'notifications' })

        // displayConfirmNotification();
      }
    })
  },

  isMobile(): boolean {
    return (Screen.width < 450)
  },

  getimgbysize(dir: string, file: string): string {
    const myimage = dir + file
    // console.log('includes = ', static_data.preLoadImages.map((a) => a.imgname).includes(myimage), myimage)
    let ris = ''
    // @ts-ignore
    if (this.isMobile() && (preloadedimages().map((a) => a.imgname).includes(myimage))) {
      ris = `${dir}mobile/${file}`
    } else {
      ris = myimage
    }

    // console.log('getimgbysize', ris)

    return ris
  },

  getaltimg(dir: string, file: string, alt?: string): string {
    const myimage = dir + file
    const myrec = static_data.preLoadImages.find((rec) => rec.imgname === myimage)
    if (myrec) return (myrec) ? myrec.alt : 'my image'
    return alt || ''
  },

  getimgFullpathbysize(fileimg: string): IPathFile {
    if (!fileimg) return { path: '', file: fileimg }
    const ind = fileimg.lastIndexOf('/')
    if (ind > 0) {
      return { path: fileimg.substring(0, ind + 1), file: fileimg.substring(ind + 1) }
    }
    return { path: '', file: fileimg }
  },

  showPositiveNotif(q: any, msg: string) {
    this.showNotif(q, msg, { color: 'positive', icon: 'notifications' })
  },

  showNegativeNotif(q: any, msg: string) {
    this.showNotif(q, msg, { color: 'negative', icon: 'notifications' }, 10000)
  },

  showNeutralNotif(q: any, msg: string) {
    this.showNotif(q, msg, { color: 'info', icon: 'notifications' }, 10000)
  },

  showNotif(q: any, msg: string, data ?: INotify | null, time?: number) {
    let myicon = data ? data.icon : 'ion-add'
    if (!myicon) {
      myicon = 'ion-add'
    }
    let mycolor = data ? data.color : 'primary'
    if (!mycolor) {
      mycolor = 'primary'
    }
    q.notify({
      // group: '',
      message: msg,
      icon: myicon,
      classes: 'my-notif-class',
      color: mycolor,
      timeout: time || 4000,
    })
  },

  isBitActive(bit: any, whattofind: any) {
    if (whattofind > 0) {
      return ((bit & whattofind) === whattofind)
    }
    return false
  },

  SetBit(myval: any, bit: any) {
    // tslint:disable-next-line:no-bitwise
    let myvalout = myval
    myvalout |= bit
    return myvalout
  },

  UnSetBit(myval: any, bit: any) {
    // tslint:disable-next-line:no-bitwise
    let myvalout = myval
    myvalout &= ~bit
    return myvalout
  },

  getUnique(arr: any, comp: any) {
    const unique = arr
      // @ts-ignore
      .map(e => e[comp])

      // store the keys of the unique objects
      // @ts-ignore
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      // @ts-ignore
      .filter(e => arr[e]).map(e => arr[e])

    return unique
  },

  async createNewRecord($q: any, table: string, data: any, withnotif = true) {
    const mydata = {
      table,
      data,
    }

    const globalStore = useGlobalStore()
    const { t } = useI18n()

    return globalStore.saveTable(mydata)
      .then((record) => {
        if (withnotif) {
          if (record) {
            this.showPositiveNotif($q, t('db.recupdated'))
          } else {
            this.showNegativeNotif($q, t('db.recfailed'))
          }
        }
        return record
      })
  },

  isObject(anything: any) {
    // Object.create(null) instanceof Object → false
    return Object(anything) === anything
  },

  isDebug() {
    return process.env.DEV
  },

  isTest() {
    return process.env.ISTEST === '1'
  },

  notshowPwd(payload: any) {
    const mypay = { ...payload }
    try {
      if (mypay.password) {
        mypay.password = '**********'
      }
    } catch (e) {
      console.log('error', e)
    }
    return mypay
  },

  getstrDate(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM/YYYY')
    return ''
  },

  getstrDateLong(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    const dayofweek = this.getDayOfWeek(mytimestamp)
    if (mytimestamp) return `${dayofweek} ${date.formatDate(mytimestamp, 'DD/MM/YYYY')}`
    return ''
  },

  getstrshortDate(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM')
    return ''
  },

  getstrshortDateTime(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM HH:mm')
    return ''
  },

  getstrshortDayDateTime(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD HH:mm')
    return ''
  },

  getstrTime(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'HH:mm')
    return ''
  },

  getstrShortDate(mydate: Date | number | string | undefined) {
    const DateFormatter = new Intl.DateTimeFormat(toolsext.getLocale() || void 0, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      // timeZone: 'UTC'
    })
    try {
      if (DateFormatter) {
        // @ts-ignore
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }
  },
  getstrVeryShortDate(mydate: Date | number | string | undefined) {
    const DateFormatter = new Intl.DateTimeFormat(toolsext.getLocale() || void 0, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      // timeZone: 'UTC'
    })
    try {
      if (DateFormatter) {
        // @ts-ignore
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }
  },

  getstrVeryVeryShortDate(mydate: Date) {
    const DateFormatter = new Intl.DateTimeFormat(toolsext.getLocale() || void 0, {
      weekday: 'long',
      day: 'numeric',
      // timeZone: 'UTC'
    })
    try {
      if (DateFormatter) {
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }
  },

  getstrDateTimeEventShort(myevent: IEvents) {
    let mystr = ''
    // is same day?
    if (this.getstrShortDate(myevent.dateTimeStart) === this.getstrShortDate(myevent.dateTimeEnd)) {
      mystr = `${this.getstrVeryShortDate(myevent.dateTimeStart)}
                 h. ${this.getstrTime(myevent.dateTimeStart)}`
    } else {
      mystr = `${this.getstrVeryShortDate(myevent.dateTimeStart)} - ${this.getstrVeryShortDate(myevent.dateTimeEnd)}`
    }

    return mystr
  },

  getstrDateTime(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM/YYYY HH:mm')
    return ''
  },

  getstrDateTimeAll(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM/YYYY HH:mm:ss')
    return ''
  },

  getstrTimeAll(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'HH:mm:ss')
    return ''
  },

  getstrDateTimeShort(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD/MM HH:mm')
    return ''
  },

  getstrDateMonthTimeShort(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD MMM HH:mm')
    return ''
  },

  getstrDateMonthWeekTimeShort(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return `${this.getDayOfWeek(mytimestamp)} ${date.formatDate(mytimestamp, 'DD MMM - HH:mm')}`
    return ''
  },

  getstrDateEmailTime(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    const { t } = useI18n()
    if (mytimestamp) return `${date.formatDate(mytimestamp, 'DD/MM/YYYY')} ${t('cal.starttime')} ${date.formatDate(mytimestamp, 'HH:mm')}`
    return ''
  },
  getstrMMMDate(mytimestamp: Date | number | string | undefined) {
    // console.log('getstrDate', mytimestamp)
    if (mytimestamp) return date.formatDate(mytimestamp, 'DD MMM YYYY')
    return ''
  },
  getstrYYMMDDDate(mytimestamp: Date | number | string | undefined) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD')
  },
  getstrYYMMDDDateTime(mytimestamp: Date | number | string | undefined) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm')
  },

  getstrYYMMDDDateTimeAll(mytimestamp: Date | number | string | undefined) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm:ss')
  },

  gettimestampstrDate(mydatestr: Date | number | string | undefined) {
    if (mydatestr) {
      const mydate = new Date(mydatestr)
      if (mydate) return mydate.getTime()
    }
    return 0
  },

  // mystrdate "26.04.2013"
  convertstrtoDate(mystrdate: string) {
    if (mystrdate.length < 10) {
      return null
    }

    console.log('mystrdate', mystrdate)

    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
    const strdate = mystrdate.replace(pattern, '$3-$2-$1')
    let mydate = null
    if (date.isValid(strdate)) {
      mydate = new Date(strdate)
    } else {
      return null
    }
    // console.log('mystrdate', mystrdate, strdate, mydate)
    return mydate
  },

  capitalize(value: any) {
    if (!value) {
      return ''
    }
    const myval = value.toString()
    return myval.charAt(0).toUpperCase() + myval.slice(1)
  },

  firstchars(value: any, numchars = 200) {
    if (!value) {
      return ''
    }
    try {
      let mycar = value.substring(0, numchars)
      if (value.length > numchars) mycar += '...'
      return mycar
    } catch (e) {
      return value
    }
  },

  getDateNow() {
    const mydate = new Date()
    return mydate
  },

  isDateArrived(mydate: Date | number | string | undefined) {
    const datenow = this.getDateNow()
    const diff = date.getDateDiff(datenow, mydate)
    // console.log('diff = ' + diff)
    if (diff >= -1) {
      return true
    }
    return false
  },

  getDayOfWeek(mydate: Date | number | string | undefined) {
    // @ts-ignore
    const dayOfWeek = new Date(mydate).getDay()

    const mylang = toolsext.getLocale()

    const myday: any = {
      it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      enUs: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      pt: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      si: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'četrtek', 'Petek', 'Sobota'],
    }

    return Number.isNaN(dayOfWeek) ? '' : myday[mylang][dayOfWeek].substring(0, 3)
  },

  isSunday(mydate: Date | number | string | undefined) {
    // @ts-ignore
    const dayOfWeek = new Date(mydate).getDay()
    return dayOfWeek === 0
  },

  getDateNowEvent() {
    return this.addMinutes(this.getDateNow(), -60 * 4)
  },
  getDateNull() {
    return new Date(0)
  },

  getTimeNow() {
    return new Date().getTime()
  },
  getTimestampsNow() {
    return new Date().valueOf()
  },

  gettimestampByDate(mydate: Date) {
    return mydate.toString()
  },

  isMainProject(idproj: string) {
    return idproj === process.env.PROJECT_ID_MAIN
  },

  getUrlByTipoProj(tipoproj: string, name ?: string) {
    if (name) return `/${name}/`
    return `/${tipoproj}/`
  },

  getprivacyreadbytipoproj(tipoproj: string) {
    if (tipoproj === RouteNames.myprojects) return Privacy.inherited
    return Privacy.all
  },

  getprivacywritebytipoproj(tipoproj: string) {
    return Privacy.inherited
  },

  notifyarraychanged(array: any) {
    if (array.length > 0) {
      array.splice(array.length - 1, 1, array[array.length - 1])
    }
  },

  getModulesByTable(nametable: string) {
    if (nametable === 'todos') {
      // return Todos
    } else if (nametable === 'projects') {
      // return Projects
    }

    return null
  },

  getlang() {
    return toolsext.getLocale()
  },

  getappname(short: boolean) {
    const { t } = useI18n()
    if (short) {
      return t('ws.siteshortname')
    }
    return t('ws.sitename')
  },

  getimglogo() {
    return `images/${process.env.LOGO_REG}`
  },

  getproc() {
    return 'Testo: ' + process.env.LOGO_REG
  },

  consolelogpao(strlog: string, strlog2: any = '', strlog3: any = '') {
    // @ts-ignore
    globalroutines(null, 'log', `${strlog} ${strlog2} ${strlog3}`, null)
  },

  addRoute(myarr: any, values: any) {
    myarr.push(values)
  },

  getCellForWhatsapp(numbercell: string) {
    if (!numbercell) return ''
    let mynum = numbercell.replace(/-/g, '')
    const globalStore = useGlobalStore()
    const intcode = globalStore.getValueSettingsByKey('INT_CODE', false)
    if (numbercell.substring(0, 1) !== '+') mynum = intcode + mynum
    else mynum = mynum.substring(1)

    return mynum
  },

  getHttpForWhatsapp(numbercell: string) {
    if (!numbercell) return ''
    const mynum = this.getCellForWhatsapp(numbercell)
    if (mynum) return `https://wa.me/${mynum}`
    return ''
  },

  getHttpForTelegram(usertelegram: string) {
    if (usertelegram) return `https://t.me/${usertelegram}`
    return ''
  },
  getsuffisso() {
    if (this.isTest()) return 'TEST: '
    return ''
  },

}
