import { translation } from '@store/Modules/translation'
import {
  IColl,
  ICollaborations, IDataToSet,
  IEvents,
  IListRoutes,
  IParamDialog,
  IPathFile,
  IProject,
  ITimeLineMain,
  ITodo,
  IUserFields,
  Privacy,
  TipoVisu,
} from '@model'

import { lists } from '@store/Modules/lists'
import { costanti } from '@store/Modules/costanti'
import { copyToClipboard, date, Screen, useQuasar, colors, Cookies, scroll } from 'quasar'

const { getScrollTarget, setScrollPosition } = scroll
import { func_tools, toolsext } from '@store/Modules/toolsext'
import { preloadedimages, static_data } from '@src/db/static_data'
import { useGlobalStore } from '@store/globalStore'
import globalroutines from '../../globalroutines/index'
import { useI18n } from '@src/boot/i18n'
import { RouteNames } from '@src/router/route-names'
import messages from '@src/statics/i18n'
import { shared_consts } from '@src/common/shared_vuejs'
import * as ApiTables from '@store/Modules/ApiTables'
import translate from '@src/globalroutines/util'
import { serv_constants } from '@store/Modules/serv_constants'
import { useProjectStore } from '@store/Projects'
import { useTodoStore } from '@store/Todos'
import { useUserStore } from '@store/UserStore'
import { useCalendarStore } from '@store/CalendarStore'
import { Router } from 'vue-router'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

const { t } = useI18n()

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

  getStatusListByInd(index: number) {
    try {
      // @ts-ignore
      const arr: any = this.selectStatus[toolsext.getLocale() || 'it']
      for (const rec of arr) {
        if (rec.value === index) {
          return rec.label
        }
      }
    } catch (e) {
      console.log('Error: ', e)
    }
    return ''
  },

  getPriorityByInd(index: number) {
    // console.log('LANG in PRIOR', toolsext.getLocale())
    try {
      // @ts-ignore
      const arr: any = lists.selectPriority[toolsext.getLocale() || 'it']
      for (const rec of arr) {
        if (rec.value === index) {
          return rec.label
        }
      }
    } catch (e) {
      console.log('Error: ', e)
    }
    return ''
  },

  logelem(mystr: string, elem: any) {
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, 'pos', elem.pos, ' Pr(', this.getPriorityByInd(elem.priority), ')  modif=', elem.modified)
  },

  getelemprojstr(elem: any) {
    return elem.descr + ' [id= ' + elem._id + '] ' + 'pos: ' + elem.pos + ']\n'
  },

  logga_arrproj(myarr: IProject[]) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += this.getelemprojstr(item) + '   '
    })

    return mystr
  },

  logelemprj(mystr: string, elem: any) {
    console.log(mystr, this.getelemprojstr(elem))
  },

  getstrelem(elem: any) {
    return 'elem [' + elem._id + '] ' + elem.descr + ' Pr(' + this.getPriorityByInd(elem.priority) + ') modif=' + elem.modified + ' '
  },

  logga_arr(myarr: ITodo[]) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + this.getPriorityByInd(item.priority || 0) + ')' + ' modif=' + item.modified + '\n'
      // mystr += '[' + item.pos + '] ' + item.descr + '\n'
    })

    return mystr
  },

  touchmove(scrollable: any) {
    if (window) {
      window.addEventListener('touchmove', (e) => {
        // console.log('touchmove')
        if (!scrollable) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  },

  jsonCopy(src: any) {
    return JSON.parse(JSON.stringify(src))
  },

  getItemLS(item: any): any {
    let ris = localStorage.getItem(item)
    if ((ris == null) || (ris === '') || (ris === 'null') || !ris) {
      ris = ''
    }

    return ris
  },

  notifyarraychanged(array: any) {
    if (array.length > 0) {
      array.splice(array.length - 1, 1, array[array.length - 1])
    }
  },

  isOkIndex(myarr: any, index: number) {
    return (index >= 0 && index < myarr.length)
  },

  async swapGeneralElem(nametable: string, myarr: any, itemdragend: any, listFieldsToChange: any) {

    const arrprec = [...myarr]

    if (itemdragend.field === 'priority') {
      // get last elem priority
      console.log('get last elem priority')
      itemdragend.newIndex = this.getLastFirstElemPriority(myarr, itemdragend.prioritychosen, itemdragend.atfirst, itemdragend.idelemtochange)
      itemdragend.oldIndex = this.getIndexById(myarr, itemdragend.idelemtochange)

      console.log('swapElems PRIORITY', itemdragend)
    }

    if (itemdragend.newIndex === itemdragend.oldIndex) {
      return
    }

    console.log('swapGeneralElem', 'new =', itemdragend.newIndex, 'Old =', itemdragend.oldIndex, itemdragend)

    if (this.isOkIndex(myarr, itemdragend.newIndex) && this.isOkIndex(myarr, itemdragend.oldIndex)) {

      console.log('***  SPLICE!')
      console.log('   PRIMA!', this.logga_arrproj(myarr))
      myarr.splice(itemdragend.newIndex, 0, myarr.splice(itemdragend.oldIndex, 1)[0])
      console.log('   DOPO!', this.logga_arrproj(myarr))

      // Ora inverti gli indici
      const indold = itemdragend.oldIndex
      itemdragend.oldIndex = itemdragend.newIndex
      itemdragend.newIndex = indold

      /*
      if (nametable === 'todos') {
        if (itemdragend.field !== 'priority') {
          const precind = itemdragend.newIndex - 1
          const nextind = itemdragend.newIndex + 1

          if (this.isOkIndex(myarr, precind) && this.isOkIndex(myarr, nextind)) {
            if ((myarr[precind].priority === myarr[nextind].priority) && (myarr[precind].priority !== myarr[itemdragend.newIndex].priority)) {
              console.log('   1)')
              myarr[itemdragend.newIndex].priority = myarr[precind].priority
              this.notifyarraychanged(myarr)
            }
          } else {
            if (!this.isOkIndex(myarr, precind)) {
              if ((myarr[nextind].priority !== myarr[itemdragend.newIndex].priority)) {
                console.log('   2)')
                myarr[itemdragend.newIndex].priority = myarr[nextind].priority
                this.notifyarraychanged(myarr)
              }

            } else {
              if ((myarr[precind].priority !== myarr[itemdragend.newIndex].priority)) {
                console.log('   3)')
                myarr[itemdragend.newIndex].priority = myarr[precind].priority
                this.notifyarraychanged(myarr)
              }
            }

          }
        }
      } */

      let status = 0

      // const arr = lists.selectPriority[toolsext.getLocale()]
      // for (const priority of arr) {
      for (let i = 0; i < myarr.length; ++i) {
        if (nametable === 'todos') {
          status = myarr[i].statustodo
        } else if (nametable === 'projects') {
          status = myarr[i].statusproj
        }
        if (status !== this.Status.COMPLETED) {
          myarr[i].pos = i

          const findelem = arrprec.find((rec) => rec._id === myarr[i]._id)

          if (findelem !== myarr[i].pos) {
            myarr[i].modified = true
            await ApiTables.table_ModifyRecord(nametable, myarr[i], listFieldsToChange, 'pos')
          }
        }

      }
      for (let i = 0; i < myarr.length; ++i) {
        if (nametable === 'todos') {
          status = myarr[i].statustodo
        } else if (nametable === 'projects') {
          status = myarr[i].statusproj
        }
        // (myarr[i].priority === priority.value)
        if ((status === this.Status.COMPLETED)) {
          myarr[i].pos = 1000 + i

          const findelem = arrprec.find((rec) => rec._id === myarr[i]._id)

          if (findelem !== myarr[i].pos) {
            myarr[i].modified = true
            await ApiTables.table_ModifyRecord(nametable, myarr[i], listFieldsToChange, 'pos')
          }
        }

      }
      // }

      /*

       console.table(myarr)

       // Update the id_prev property
       const elem1 = this.update_idprev(myarr, itemdragend.newIndex, itemdragend.newIndex - 1)       // 0, -1
       const elem2 = this.update_idprev(myarr, itemdragend.newIndex + 1, itemdragend.newIndex)   // 1, 0
       const elem3 = this.update_idprev(myarr, itemdragend.oldIndex, itemdragend.oldIndex - 1)       // 1, 0
       const elem4 = this.update_idprev(myarr, itemdragend.oldIndex + 1, itemdragend.oldIndex)   // 2, 1

       await
       ApiTables.table_ModifyRecord(nametable, elem1, listFieldsToChange, 'id_prev')
       await
       ApiTables.table_ModifyRecord(nametable, elem2, listFieldsToChange, 'id_prev')
       await
       ApiTables.table_ModifyRecord(nametable, elem3, listFieldsToChange, 'id_prev')
       await
       ApiTables.table_ModifyRecord(nametable, elem4, listFieldsToChange, 'id_prev')


       */

      this.notifyarraychanged(myarr)

      // console.log('arr FINALE', this.logga_arrproj(myarr))

      // Update the records:
    }
  }
  ,


  isLoggedToSystem(): boolean {
    const tok = this.getItemLS(toolsext.localStorage.token)
    return !!tok
  },


  askfornotification($q: any) {

    console.log('askfornotification', $q)
    this.showNotif($q, t('notification.waitingconfirm'), { color: 'positive', icon: 'notifications' })

    Notification.requestPermission((result) => {
      console.log('User Choice', result)
      if (result === 'granted') {
        this.showNotif($q, t('notification.confirmed'), { color: 'positive', icon: 'notifications' })
      } else {
        this.showNotif($q, t('notification.denied'), { color: 'negative', icon: 'notifications' })

        tools.displayConfirmNotification()
      }
    })
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


  async createNewRecord($q: any, table: string, data: any, withnotif = true) {
    const mydata = {
      table,
      data,
    }

    const globalStore = useGlobalStore()


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


  getIndexById(myarr: any, id: any) {
    if (myarr === undefined)
      return -1
    return myarr.indexOf(this.getElemById(myarr, id))
  }
  ,

  getElemById(myarr: any, id: any) {
    if (myarr === undefined)
      return null
    // console.log('getElemById', myarr, id)
    return myarr.find((elem: any) => elem._id === id)
  }
  ,

  getElemPrevById(myarr: any, id: any) {
    if (myarr === undefined)
      return null
    return myarr.find((elem: any) => elem.id_prev === id)
  },


  getLastFirstElemPriority(myarr: any, priority: number, atfirst: boolean, escludiId: string) {
    if (myarr === null) {
      return -1
    }

    let trovato = false

    console.log('priority', priority)

    for (let indrec = 0; indrec < myarr.length; indrec++) {
      if ((myarr[indrec].priority === priority) && (myarr[indrec]._id !== escludiId)) {
        trovato = true
        if (atfirst) {
          return indrec - 1
        }
      } else {
        if (trovato) {
          return indrec
        }
      }
    }

    console.log('trovato?', trovato, 'indrec')

    if (trovato) {
      return myarr.length - 1
    } else {
      if (priority === this.Priority.PRIORITY_LOW) {
        return myarr.length - 1
      } else if (priority === this.Priority.PRIORITY_HIGH) {
        return 0
      }
    }
  }
  ,

  getFirstList(myarr: any) {
    return myarr.find((elem: any) => elem.id_prev === ApiTables.LIST_START)
  }
  ,

  getModulesByTable(nametable: string) {
    const projects = useProjectStore()
    const todos = useTodoStore()
    if (nametable === 'todos') {
      return todos
    } else if (nametable === 'projects') {
      return projects
    }
  }
  ,

  setArrayMainByTable(nametable: string, myarr: any) {
    if (nametable === 'todos') {
      const todos = useTodoStore()
      todos.todos = this.jsonCopy(myarr)
      return todos.todos
    } else if (nametable === 'projects') {
      const projects = useProjectStore()
      projects.projects = this.jsonCopy(myarr)
      return projects.projects
    }
  },

  getmyid(id: string) {
    return 'row' + id
  }
  ,

  getLastListNotCompleted(nametable: string, cat: string, tipoproj: string) {
    // console.log('getLastListNotCompleted')
    // const module = this.getModulesByTable(nametable)
    let arr: any = []
    const projects = useProjectStore()
    const todos = useTodoStore()
    if (nametable === 'projects')
      arr = projects.projs_dacompletare(cat, tipoproj)
    else if (nametable === 'todos')
      arr = todos.items_dacompletare(cat)

    if (!!arr)
      return (arr.length > 0) ? arr[arr.length - 1] : null
    else
      return null
  },

  getElemByIndex(myarr: any, index: number) {
    if (index >= 0 && index < myarr.length) {
      return myarr[index]
    } else {
      return null
    }
  }
  ,

  existArr(x: any) {
    return x = (typeof x !== 'undefined' && x instanceof Array) ? x : []
  }
  ,

  json2array(json: any) {
    const result: any = []
    const keys = Object.keys(json)
    keys.forEach((key) => {
      result.push(json[key])
    })
    return result
  },

  visumenu(elem: IListRoutes) {  // : IListRoutes

    const userStore = useUserStore()
    let visu = ((elem.onlyAdmin && userStore.isAdmin) || (elem.onlyManager && userStore.isManager)
      || (elem.onlySocioResidente && userStore.my.profile.socioresidente)
      || (elem.onlyConsiglio && userStore.my.profile.consiglio)
      || (elem.onlyNotSoci && !userStore.my.profile.socio)
      || (elem.onlyTutor && userStore.isTutor)
      || (elem.onlyEditor && userStore.isEditor)
      || (elem.onlyDepartment && userStore.isDepartment)
      || ((!elem.onlyAdmin) && (!elem.onlyManager) && (!elem.onlyTutor) && (!elem.onlyEditor) && (!elem.onlyDepartment)
        && (!elem.onlySocioResidente) && (!elem.onlyConsiglio) && (!elem.onlyNotSoci))) && elem.active

    if (!this.isLoggedToSystem()) {
      if (elem.onlyif_logged)
        visu = false
    }

    if (elem.meta && elem.meta.requiresAuth) {
      visu = visu && this.isLoggedToSystem()
    }
    return visu
  },

  executefunc(mythisq: any, table: string, func: number, par: IParamDialog, mythis?: any) {
    const globalStore = useGlobalStore()
    const calendarStore = useCalendarStore()

    if (func === lists.MenuAction.DELETE) {
      // console.log('param1', par.param1)
      calendarStore.CancelBookingEvent({
        ideventbook: par.param1,
        notify: par.param2 === true ? '1' : '0',
      }).then((ris: any) => {
        if (ris) {
          this.showPositiveNotif(mythisq, t('cal.canceledbooking') + ' "' + par.param3 + '"')
        } else {
          this.showNegativeNotif(mythisq, t('cal.cancelederrorbooking'))
        }
      })
    } else if (func === lists.MenuAction.DELETE_EVENT) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      calendarStore.CancelEvent({ id: par.param1._id }).then((ris: any) => {
        if (ris) {
          // Remove this record from my list
          calendarStore.eventlist = calendarStore.eventlist.filter((event: IEvents) => (event._id !== par.param1._id))
          this.showPositiveNotif(mythisq, t('cal.canceledevent') + ' "' + par.param1.title + '"')
        } else {
          this.showNegativeNotif(mythisq, t('cal.cancelederrorevent'))
        }
      })
    } else if (func === lists.MenuAction.DELETE_RECTABLE) {
      // console.log('param1', par.param1)
      globalStore.DeleteRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          mythis.ActionAfterYes(func, par.param2, null)
          this.showPositiveNotif(mythisq, t('db.deletedrecord'))
        } else {
          this.showNegativeNotif(mythisq, t('db.recdelfailed'))
        }
      })
    } else if (func === lists.MenuAction.DUPLICATE_RECTABLE) {
      // console.log('param1', par.param1)
      globalStore.DuplicateRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          mythis.ActionAfterYes(func, par.param2, ris.data)
          this.showPositiveNotif(mythisq, t('db.duplicatedrecord'))
        } else
          this.showNegativeNotif(mythisq, t('db.recdupfailed'))
      })
    } else if (func === lists.MenuAction.INVIA_MSG_A_DONATORI) {
      // console.log('param1', par.param1)
      globalStore.InviaMsgADonatori({
        msgobj: par.param1,
        navemediatore: par.param2,
        tipomsg: par.param1.tipomsg,
      }).then((ris) => {
        if (ris) {
          if (par.param1.inviareale)
            this.showPositiveNotif(mythisq, t('dashboard.msg_donatori_ok'))
          this.askConfirm(mythisq, '', ris.strout, translate('dialog.yes'), translate('dialog.no'), '', 0, 0, {})
        } else
          this.showNegativeNotif(mythisq, t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.INVIA_MSG_A_SINGOLO) {
      // console.log('param1', par.param1)
      globalStore.InviaMsgADonatori({
        msgobj: par.param1,
        navemediatore: par.param2,
        tipomsg: par.param1.tipomsg,
      })
        .then((ris) => {
          if (ris) {
            this.showPositiveNotif(mythisq, t('cal.sendmsg_sent'))
          } else
            this.showNegativeNotif(mythisq, t('db.recfailed'))
        })
    } else if (func === lists.MenuAction.DONO_INVIATO) {
      const mydatatosave: IDataToSet = {
        id: par.param1._id,
        table: toolsext.TABNAVI,
        fieldsvalue: {
          date_made_gift: par.param1.date_made_gift,
          riga: par.param1.riga,
          col: par.param1.col,
          commento_al_sognatore: par.param1.commento_al_sognatore,
        },
        notifBot: null,
      }

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2, txt: par.param3 }
      }

      globalStore.saveFieldValue(mydatatosave).then((ris) => {
        if (ris) {
          mythis.ActionAfterYes(func, par.param1, par.param2)
          this.showPositiveNotif(mythisq, t('dashboard.fatto_dono'))
        } else
          this.showNegativeNotif(mythisq, t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.DONO_RICEVUTO) {
      const mydatatosave: IDataToSet = {
        id: par.param1._id,
        table: toolsext.TABNAVI,
        fieldsvalue: {},
        unset: null,
        notifBot: null,
        tipomsg: this.TipoMsg.SEND_MSG_DONO_RICEVUTO_CORRETTAMENTE,
      }

      if (!!par.param1.date_made_gift) {
        mydatatosave.fieldsvalue = {
          made_gift: par.param1.made_gift,
          riga: par.param1.riga,
          col: par.param1.col,
          date_made_gift: par.param1.date_made_gift,
        }
      } else {
        mydatatosave.fieldsvalue = { made_gift: par.param1.made_gift, riga: par.param1.riga, col: par.param1.col }
      }

      if (!!par.param1.annulla) {
        if (par.param1.annulla) {
          mydatatosave.fieldsvalue = { made_gift: false, riga: par.param1.riga, col: par.param1.col }
          mydatatosave.unset = { date_made_gift: 1, received_gift: 1 }
        }
      }

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2, txt: par.param3 }
      }

      globalStore.saveFieldValue(mydatatosave).then((ris) => {
        if (ris) {
          mythis.ActionAfterYes(func, par.param1, par.param2)
          let msg = t('dashboard.ricevuto_dono_ok')
          if (!!par.param1.annulla) {
            if (par.param1.annulla)
              msg = 'Dono Annullato'
          }
          this.showPositiveNotif(mythisq, msg)
        } else {
          this.showNegativeNotif(mythisq, t('db.recfailed'))
        }
      })
    }
  },

  async saveFieldToServer(mythisq: any, table: string, id: any, mydata: any, notif = true) {

    const mydatatosave = {
      id,
      table,
      fieldsvalue: mydata,
      notifBot: null,
    }

    const globalStore = useGlobalStore()

    return globalStore.saveFieldValue(mydatatosave).then((ris) => {
      if (ris) {
        if (notif)
          this.showPositiveNotif(mythisq, t('db.recupdated'))
      } else {
        this.showNegativeNotif(mythisq, t('db.recfailed'))
      }
    })

  },

  askConfirm($q: any, mytitle: string, mytext: string, ok: string, cancel: string, table: string, funcok: number, funccancel: number, par: IParamDialog, mythis?: any) {
    return $q.dialog({
      message: mytext,
      html: true,
      ok: {
        label: ok,
        push: true,
      },
      title: mytitle,
      cancel: true,
      persistent: false,
    }).onOk(() => {
      // console.log('OK')
      this.executefunc($q, table, funcok, par, mythis)
      return true
    }).onCancel(() => {
      // console.log('CANCEL')
      this.executefunc($q, table, funccancel, par, mythis)
      return false
    })
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

  isRegistered() {
    return localStorage.getItem(toolsext.localStorage.userId) !== ''
  }
  ,

  checkIfUserExist(mythis?: any) {
    const userStore = useUserStore()

    if (userStore.isUserInvalid) {
      this.showNotif(mythis.$q, mythis.$t('todo.usernotdefined'))
      return false
    }

    if (!this.isRegistered()) {
      // Not logged
      this.showNotif(mythis.$q, mythis.$t('user.notregistered'))
      return false
    }

    return true
  },

  checkLangPassed($router: Router, mylangpass: string) {
    // console.log('checkLangPassed ', mylang)
    const userStore = useUserStore()

    let mylang: string = mylangpass

    // const mybrowserLang = Quasar.lang.isoName

    if (mylang !== '') {
      if ((mylang.toLowerCase() === 'enus') || (mylang.toLowerCase() === 'en-us') || (mylang.toLowerCase() === 'uk')
        || (mylang.toLowerCase() === 'uk-uk') || (mylang.toLowerCase() === 'en-uk') || (mylang.toLowerCase() === 'en-gb')
        || (mylang.toLowerCase() === 'gb-gb')) {
        mylang = 'enUs'
      }
      if ((mylang.toLowerCase() === 'es') || (mylang.toLowerCase() === 'es-es') || (mylang.toLowerCase() === 'eses')) {
        mylang = 'es'
      }
      if ((mylang.toLowerCase() === 'pt') || (mylang.toLowerCase() === 'pt-pt') || (mylang.toLowerCase() === 'ptpt')) {
        mylang = 'pt'
      }
      if ((mylang.toLowerCase() === 'fr') || (mylang.toLowerCase() === 'fr-fr') || (mylang.toLowerCase() === 'frfr')) {
        mylang = 'fr'
      }
      if ((mylang.toLowerCase() === 'it') || (mylang.toLowerCase() === 'it-it') || (mylang.toLowerCase() === 'itit')) {
        mylang = 'it'
      }
      if ((mylang.toLowerCase() === 'si') || (mylang.toLowerCase() === 'si-si') || (mylang.toLowerCase() === 'sisi')) {
        mylang = 'si'
      }

      if (!(static_data.arrLangUsed.includes(mylang))) {
        // console.log('non incluso ', mylang)
        // mylang = static_data.arrLangUsed[0]
        mylang = 'it'

        // Metti come default
        userStore.setlang($router, mylang)
      }
    }

    if (!mylang) {
      mylang = process.env.LANG_DEFAULT!
      console.log('LANG DEFAULT: ', mylang)
    }

    if (toolsext.getLocale(true) === '') {
      userStore.setlang($router, mylang)
    }

    // console.log('mylang calc : ', mylang)

    return mylang
  },

  getlang() {
    return toolsext.getLocale()
  },

  getimglogo() {
    return `images/${process.env.LOGO_REG}`
  },

  consolelogpao(strlog: string, strlog2: any = '', strlog3: any = '') {
    // @ts-ignore
    globalroutines('log', `${strlog} ${strlog2} ${strlog3}`, null)
  },

  aspettansec(numsec: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('anything')
      }, numsec)
    })
  }
  ,

  dragula_option($service: any, dragname: any) {
    //++Todo: Dragula
    /*$service.options(dragname,
      {
        moves(el, source, handle, sibling) {
          return !el.classList.contains('donotdrag') // elements are always draggable by default
        },
        accepts(el, target, source, sibling) {
          return true // elements can be dropped in any of the `containers` by default
        },
        invalid(el, handle) {
          return el.classList.contains('donotdrag') // don't prevent any drags from initiating by default
        },
        direction: 'vertical'
      })

     */
  }
  ,

  // _.cloneDeep(  Per clonare un oggetto

  mapSort(linkedList: any) {
    console.log('mapSort')
    let sortedList = []
    const map = new Map()
    let currentId = null

    // console.log('linkedList', linkedList)

    // index the linked list by previous_item_id
    for (let i = 0; i < linkedList.length; i++) {
      const item = linkedList[i]
      // this.logelemprj(i, item)
      if (item.id_prev === ApiTables.LIST_START) {
        // first item
        currentId = String(item._id)
        // console.log('currentId', currentId);
        sortedList.push(item)
      } else {
        map.set(item.id_prev, i)
      }
    }

    // let i2 = 0
    while (sortedList.length < linkedList.length) {
      // get the item with a previous item ID referencing the current item
      const nextItem: any = linkedList[map.get(currentId)]
      if (nextItem === undefined) {
        break
      }
      sortedList.push(nextItem)
      // this.logelemprj('FATTO:' + i, nextItem)
      currentId = String(nextItem._id)
      // i2++
    }

    if (sortedList.length < linkedList.length) {
      console.log('!!!!! NON CI SONO TUTTI !!!!!', sortedList.length, linkedList.length)
      // Forget something not in a List !
      for (const itemlinked of linkedList) {
        const elemtrov = sortedList.find((item) => item._id === itemlinked._id)
        if (elemtrov === undefined) {
          sortedList.push(itemlinked)
        }
      }
    }

    // Now Order by Priority
    if (!!sortedList) {
      if (sortedList.length > 0) {
        if (sortedList[0].priority !== undefined) {
          const sortednew = []
          let myarr = []
          for (const priorelem of lists.selectPriority.it) {
            const myprior = priorelem.value
            myarr = sortedList.filter((item) => item.priority === myprior)
            if (myarr !== undefined)
              sortednew.push(...myarr)
          }

          sortedList = sortednew
        }
      }
    }

    // console.log('DOPO sortedList', sortedList)

    return sortedList
  },

  getProgressClassColor(progress: number) {
    if (progress > 66) {
      return 'highperc'
    } else if (progress > 33) {
      return 'medperc'
    } else {
      return 'lowperc'
    }
  }
  ,

  getProgressColor(progress: number) {
    if (progress > 66) {
      return 'green'
    } else if (progress > 33) {
      return 'blue'
    } else {
      return 'red'
    }
  },
  hasManyDays(mydatestart: Date | number | string | undefined, mydateend: Date | number | string | undefined) {
    if (mydateend)
      return this.getstrDate(mydatestart) !== this.getstrDate(mydateend)
    else
      return false
  },

  isManager() {
    const userStore = useUserStore()
    return userStore.isManager
  },

  isSocioResidente() {
    const userStore = useUserStore()
    return !!userStore.my.profile ? userStore.my.profile.socioresidente : false
  },

  isConsiglio() {
    const userStore = useUserStore()
    return !!userStore.my.profile ? userStore.my.profile.consiglio : false
  },

  isSocio() {
    const userStore = useUserStore()
    return !!userStore.my.profile ? userStore.my.profile.socio : false
  },

  isResp() {
    const userStore = useUserStore()
    return userStore.my.profile.resplist
  },

  isWorkers() {
    const userStore = useUserStore()
    return userStore.my.profile.workerslist
  },

  isDepartment() {
    const userStore = useUserStore()
    return userStore.isDepartment
  },

  isAdmin() {
    const userStore = useUserStore()
    return userStore.isAdmin
  },

  isTutor() {
    const userStore = useUserStore()
    return userStore.isTutor
  },

  isZoomeri() {
    const userStore = useUserStore()
    return userStore.isZoomeri
  },

  isEditor() {
    const userStore = useUserStore()
    return userStore.isEditor
  },

  isTeacher() {
    const userStore = useUserStore()
    return userStore.isTeacher
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

  getstrDateTimeEvent($t: any, myevent: IEvents, withhtml: boolean) {
    let mystr = ''
    // is same day?
    if (this.getstrDate(myevent.dateTimeStart) === this.getstrDate(myevent.dateTimeEnd)) {
      if (withhtml) {
        mystr += `<span class="cal__where-content">${this.getstrDateLong(myevent.dateTimeStart)}</span>
                    <span class="cal__hours-content">${$t('cal.starttime')} ${this.getstrTime(myevent.dateTimeStart)}
                    ${$t('cal.endtime')} ${this.getstrTime(myevent.dateTimeEnd)}`
      } else {
        mystr = `${this.getstrDateLong(myevent.dateTimeStart)}
                 ${$t('cal.starttime')} ${this.getstrTime(myevent.dateTimeStart)}
                 ${$t('cal.endtime')} ${this.getstrTime(myevent.dateTimeEnd)}`
      }
    } else {
      mystr = `<span class="cal__where-content">${this.getstrDateLong(myevent.dateTimeStart)}</span>
                 <span class="cal__hours-content">${$t('cal.starttime')} ${this.getstrTime(myevent.dateTimeStart)} </span>
                  ${$t('cal.enddate')} ${this.getstrDateLong(myevent.dateTimeEnd)}
                  <span class="cal__hours-content">${$t('cal.endtime')} ${this.getstrTime(myevent.dateTimeEnd)} </span>`
    }

    if (myevent.infoextra) {
      mystr += `<span class="cal__hours">
                  <span class="cal__hours-title">${$t('cal.hours')}: </span>
                  <span class="cal__hours-content">${myevent.infoextra}  </span>
              </span>
            </span>`
    }
    return mystr
  },

  getstrDateTimeEventSimple(myevent: IEvents) {
    let mystr = ''
    // is same day?
    if (this.getstrShortDate(myevent.dateTimeStart) === this.getstrShortDate(myevent.dateTimeEnd)) {
      mystr = `${this.getstrShortDate(myevent.dateTimeStart)}
                 - ${this.getstrTime(myevent.dateTimeStart)}`
    } else {
      mystr = `${this.getstrVeryVeryShortDate(myevent.dateTimeStart!)} - ${this.getstrShortDate(myevent.dateTimeEnd)}`

    }

    return mystr
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

  getstrdateToDate(strdate: string) {
    let mydate = new Date(strdate)
    return mydate
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

  firstchars_onedot(value: any, numchars = 200) {
    if (!value) {
      return ''
    }
    try {
      let mycar = value.substring(0, numchars)
      if (value.length > numchars)
        mycar += '.'
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

  addRoute(myarr: any, values: any) {
    myarr.push(values)
  },

  displayConfirmNotification() {
    let options: any = null
    if ('serviceWorker' in navigator) {
      options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: '/icons/app-icon-96x96.png',
        image: '/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: 'Okay', icon: '/icons/app-icon-96x96.png' },
          { action: 'cancel', title: 'Cancel', icon: '/icons/app-icon-96x96.png' },
        ],
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((swreg) => {
            swreg.showNotification('Successfully subscribed!', options)
          })
      }
    }
  }
  ,

  dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: mimeString })
    return blob
  }
  ,

  showNotificationExample() {
    let options: any = null

    if ('serviceWorker' in navigator) {
      options = {
        body: t('notification.subscribed'),
        icon: '/images/android-chrome-192x192.png',
        image: '/images/imglogonotif.png',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/images/android-chrome-192x192.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: t('dialog.ok'), icon: '/images/android-chrome-192x192.png' },
          // { action: 'cancel', title: 'Cancel', icon: '/statics/images/android-chrome-192x192.png', }
        ],
      }

      navigator.serviceWorker.ready
        .then((swreg) => {
          swreg.showNotification('aaa', options)
        })
    }
  },

  getemailto(text: string) {
    return 'mailto:' + text
  },

  heightgallery(coeff: any) {
    // console.log('heightgallery')
    return this.heightGallVal(coeff).toString() + 'px'
  },

  heightGallVal(coeff = 1.33) {
    let maxh2 = 0

    const globalStore = useGlobalStore()

    let myw = Screen.width
    if (!this.isMobile())
      if (globalStore.leftDrawerOpen)
        myw -= 300
    if (!this.isMobile())
      if (globalStore.rightDrawerOpen)
        myw -= 300

    maxh2 = (myw / coeff) + 20
    if (maxh2 > 500)
      maxh2 = 500

    return maxh2
  },

  myheight_imgtitle(myheight?: number, myheightmobile?: number) {
    let maxheight = 0
    if (!!myheight) {
      maxheight = myheight
      if (myheight > 0) {
        if (myheight > 1000) {
          maxheight = 1000
        } else {
          maxheight = myheight
        }
      }
    } else {
      maxheight = 500
    }

    const maxh2 = this.heightGallVal()

    // console.log('maxh2', maxh2)
    // console.log('maxheight', maxheight)

    let ris = 0

    if (maxh2 < maxheight)
      ris = maxh2
    else
      ris = maxheight

    if (!!myheightmobile) {
      if (this.isMobile() && maxh2 > myheightmobile)
        ris = myheightmobile
    }

    // console.log('ris', ris)
    return ris
  }
  ,

  myheight_dialog() {
    if (Screen.width < 410) {
      return '337'
    } else if (Screen.width < 600) {
      return '450'
    } else if (Screen.width < 800) {
      return '550'
    } else if (Screen.width < 900) {
      return '700'
    } else if (Screen.width < 1000) {
      return '800'
    } else if (Screen.width < 1100) {
      return '900'
    } else {
      return Screen.width - 200
    }
  },

  styles_imgtitle(sized ?: string) {
    if (!!sized) {
      return sized
    } else {
      if (Screen.width < 410) {
        return 'max-height: 250px'
      } else {
        return 'max-height: 350px'
      }
    }
  }
  ,

  /*
      <q-img
        src="https://cdn.quasar.dev/img/image-src.png"
        srcset="https://cdn.quasar.dev/img/image-1x.png 400w,
                https://cdn.quasar.dev/img/image-2x.png 800w,
                https://cdn.quasar.dev/img/image-3x.png 1200w,
                https://cdn.quasar.dev/img/image-4x.png 1600w"
        sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
        style="height: 280px; max-width: 300px"
      >
        <div class="absolute-bottom text-body1 text-center">
          With srcset & sizes
        </div>
      </q-img>
  */

  getsizes() {
    return '(max-width: 400px) 400w, ' +
      '(min-width: 400px) and (max-width: 800px) 800w, ' +
      '(min-width: 800px) and (max-width: 1200px) 1200w, ' +
      '(min-width: 1200px) 1600w'
  }
  ,

  maxwidth_imgtitle() {
    if (Screen.width < 410) {
      return 'max-width: 250px'
    } else {
      return 'max-width: 350px'
    }
  }
  ,

  isMobile() {
    return (Screen.width < 450)
  }
  ,

  mywidth_imgtitle() {
    if (Screen.width < 450) {
      return '250'
    } else if (Screen.width < 600) {
      return '350'
    } else {
      return '350'
    }
  }
  ,

  mymargin_imgtitle() {
    return 'auto'
  }
  ,

  showthumbnails() {
    if (Screen.width < 410) {
      return false
    } else if (Screen.width < 600) {
      return true
    } else {
      return true
    }
  }
  ,

  padTime(valpass: string) {
    let val = parseFloat(valpass)
    val = Math.floor(val)
    if (val < 10) {
      return '0' + val
    }
    return val + ''
  }
  ,

  getLocale(vero ?: boolean) {
    const userStore = useUserStore()
    if (userStore) {
      if (userStore) {
        return userStore.lang
      }
    }
    if (!vero)
      return process.env.LANG_DEFAULT
    else
      return ''
  },

  addDays(mydate: Date, days: number) {
    return date.addToDate(mydate, { days })
  },

  addMinutes(mydate: Date, minutes: number) {
    return date.addToDate(mydate, { minutes })
  },

  gettitlemain(datamain: ITimeLineMain) {
    if (datamain.titlemain[toolsext.getLocale()])
      return datamain.titlemain[toolsext.getLocale()]
    else {
      return datamain.titlemain[static_data.arrLangUsed[0]]
    }

  }
  ,
  getwwithwhocoll(datamain: ICollaborations) {
    if (datamain.withwhom_title[toolsext.getLocale()])
      return datamain.withwhom_title[toolsext.getLocale()]
    else {
      return datamain.withwhom_title[static_data.arrLangUsed[0]]
    }

  }
  ,
  gettextcoll(data: IColl) {
    if (data.subtitle[toolsext.getLocale()])
      return data.subtitle[toolsext.getLocale()]
    else {
      return data.subtitle[static_data.arrLangUsed[0]]
    }
  },
  gettitlecoll(data: IColl) {
    if (data.title[toolsext.getLocale()])
      return data.title[toolsext.getLocale()]
    else {
      return data.title[static_data.arrLangUsed[0]]
    }
  }
  ,
  gettextdescr(data: {[index: string]: any}, numdescr = 'description',
  ) {
    if (!!data[numdescr]) {
      if (data[numdescr][toolsext.getLocale()])
        return data[numdescr][toolsext.getLocale()]
      else {
        return data[numdescr][static_data.arrLangUsed[0]]
      }
    } else {
      return ''
    }
  }
  ,

  getlink(data: any) {
    if (data.link_text[toolsext.getLocale()])
      return data.link_text[toolsext.getLocale()]
    else {
      return data.link_text[static_data.arrLangUsed[0]]
    }

  },

  getlinkurl(data: any) {
    if (data.link_url_lang) {
      if (data.link_url_lang[toolsext.getLocale()]) {
        return data.link_url_lang[toolsext.getLocale()]
      } else {
        return data.link_url
      }
    } else {
      return data.link_url
    }

  },

  appid() {
    return process.env.APP_ID
  },

  getLabelByItem(item: any) {
    if (!!item.name)
      return translate(item.name)
    else
      return item.text

  },

  getimgev(ev: IEvents) {
    if (!!ev.img_small)
      return '' + ev.img_small
    else if (!!ev.img)
      return '' + ev.img
    else
      return ''
  },

  convertHTMLtoText(myhtml: string) {
    let msg = myhtml
    msg = msg.replace('&quot;', '"')
    msg = msg.replace('&gt;', '>')
    msg = msg.replace('&lt;', '<')
    msg = msg.replace('&amp;', '&')
    msg = msg.replace('<br>', '\n')

    return msg
  }
  ,
  gettextevent(myevent: IEvents) {
    // return '"' + myevent.title + '" (' + func_tools.getDateStr(myevent.date) + ') - ' + myevent.time
    return '"' + myevent.title + '" (' + this.getstrDateEmailTime(myevent.dateTimeStart) + ')'
  },

  getlangforQuasar(mylang: string) {
    if (mylang === 'enUs')
      return 'en-us'
    else
      return mylang
  },

  setLangAtt($router: Router, mylang: string) {
    console.log('setLangAtt =', mylang)
    // console.log('PRIMA this.$q.lang.isoName', this.$q.lang.isoName)

    const $q = useQuasar()
    const globalStore = useGlobalStore()

    // dynamic import, so loading on demand only
    import(`quasar/lang/${this.getlangforQuasar(mylang)}`).then((lang) => {
      console.log('   Import dinamically lang =', lang)
      $q.lang.set(this.getlangforQuasar(lang.default))
      import('../../statics/i18n').then(() => {
        console.log('   *** MY LANG DOPO=', $q.lang.isoName)
      })
    })

    globalStore.addDynamicPages($router)

    // this.$q.lang.set(mylang)

  },
  getappname(short: boolean) {

    if (short) {
      return t('ws.siteshortname')
    }
    return t('ws.sitename')
  },

  getproc() {
    return 'Testo: ' + process.env.LOGO_REG
  },

  loginOk($router: Router, route: any, mythisq: any, ispageLogin: boolean) {
    // console.log('loginOk')
    const userStore = useUserStore()

    if (toolsext.getLocale() !== '') {
      // mythisq.$i18n.locale = toolsext.getLocale()
    } else {
      userStore.setlang($router, mythisq.lang.getLocale())
    }     // Set Lang

    if (process.env.DEBUG) {
      console.log('LANG ORA=', toolsext.getLocale())
    }

    globalroutines('loadapp', '')

    this.SignIncheckErrors(mythisq, $router, route, this.OK, ispageLogin)
  }
  ,

  loginInCorso(mythisq: any) {
    // console.log('loginInCorso')


    const msg = t('login.incorso')
    // if (process.env.DEBUG) {
    //   msg += ' ' + process.env.MONGODB_HOST
    // }
    mythisq.loading.show({ message: msg })
  }
  ,

  getUrlSite() {
    const url = window.location.href
    const arr = url.split('/')
    return arr[0] + '//' + arr[2]
  },

  SignIncheckErrors(mythisq: any, $router: Router, route: any, riscode: any, ispageLogin ?: boolean) {
    // console.log('SignIncheckErrors: ', riscode)
    const $q = useQuasar()

    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    try {
      if (riscode === this.OK) {
        this.showNotif(mythisq, t('login.completato'), { color: 'positive', icon: 'check' })
        console.log('mythis.$router.name', route.name)
        if (ispageLogin) {
          if (route.name !== '/')
            $router.push('/')
        }
      } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR) {

        // Wait N seconds to avoid calling many times...
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('anything')
          }, 3000)
        }).then(() => {
          setTimeout(() => {
            // console.log('HIDE...')
            mythisq.loading.hide()
          }, 500)
          this.showNotif(mythisq, t('login.errato'), { color: 'negative', icon: 'notifications' })
          // iswaitingforRes = false
          if (ispageLogin) {
            globalStore.rightDrawerOpen = true
            // mythis.$router.push('/signin')
          }
        })

      } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR_SUBACCOUNT) {

        // Wait N seconds to avoid calling many times...
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('anything')
          }, 1000)
        }).then(() => {
          setTimeout(() => {
            // console.log('HIDE...')
            mythisq.loading.hide()
          }, 500)
          this.showNotif(mythisq, t('login.subaccount'), { color: 'negative', icon: 'notifications' })
          // mythis.iswaitingforRes = false
          if (ispageLogin) {
            globalStore.rightDrawerOpen = true
            // mythis.$router.push('/signin')
          }
        })

      } else if (riscode === toolsext.ERR_SERVERFETCH) {
        this.showNotif(mythisq, t('fetch.errore_server'), { color: 'negative', icon: 'notifications' })
      } else if (riscode === toolsext.ERR_GENERICO) {
        const msg = t('fetch.errore_generico') + userStore.getMsgError(riscode)
        this.showNotif(mythisq, msg, { color: 'negative', icon: 'notifications' })
      } else {
        this.showNotif(mythisq, 'Errore num ' + riscode, { color: 'negative', icon: 'notifications' })
      }

      if (riscode !== serv_constants.RIS_CODE_LOGIN_ERR) {
        // mythis.iswaitingforRes = false
        setTimeout(() => {
          mythisq.loading.hide()
        }, 200)
      }

    } finally {
      // ...
    }
  },

  SignUpcheckErrors(mythisq: any, riscode: number, msg: string) {
    console.log('SignUpcheckErrors', riscode)
    const endload = true

    const userStore = useUserStore()


    if (riscode === serv_constants.RIS_CODE_EMAIL_ALREADY_EXIST) {
      this.showNotif(mythisq, t('reg.err.duplicate_email'))
    } else if (riscode === serv_constants.RIS_CODE_USER_ALREADY_EXIST) {
      this.showNegativeNotif(mythisq, t('reg.err.user_already_exist'))
    } else if (riscode === serv_constants.RIS_CODE_USER_EXTRALIST_NOTFOUND) {

      this.showNegativeNotif(mythisq, t('reg.err.user_extralist_not_found') + ' ' + msg)
    } else if (riscode === serv_constants.RIS_CODE_USER_NOT_THIS_APORTADOR) {

      this.showNegativeNotif(mythisq, t('reg.err.user_not_this_aportador') + ' ' + msg)

    } else if (riscode === serv_constants.RIS_CODE_USERNAME_NOT_VALID) {
      this.showNotif(mythisq, t('reg.err.username_not_valid'))
    } else if (riscode === serv_constants.RIS_CODE_USERNAME_ALREADY_EXIST) {
      this.showNotif(mythisq, t('reg.err.duplicate_username'))
    } else if (riscode === toolsext.ERR_SERVERFETCH) {
      this.showNotif(mythisq, t('fetch.errore_server'))
    } else if (riscode === toolsext.ERR_GENERICO) {
      const msg2 = t('fetch.errore_generico') + userStore.getMsgError(riscode)
      this.showNotif(mythisq, msg2)
    } else if (riscode === this.OK) {
      mythisq.$router.push('/regok')
      this.showNotif(mythisq, t('components.authentication.email_verification.link_sent', { botname: t('ws.botname') }), {
        color: 'green',
        textColor: 'black',
      })
    } else if (riscode === serv_constants.RIS_ISCRIZIONE_OK) {
      mythisq.$router.push('/')
      this.showNotif(mythisq, t('components.authentication.iscrizione_ok', { botname: t('ws.botname') }), {
        color: 'green',
        textColor: 'black',
      })
    } else {
      this.showNotif(mythisq, 'Errore num ' + riscode)
    }

    return endload
  },
  isCssColor(color: any) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
  },
  displayClasses(eventparam: any) {
    return {
      // [`bg-${eventparam.bgcolor}`]: !this.isCssColor(eventparam.bgcolor),
      'text-white': !this.isCssColor(eventparam.bgcolor),
    }
  },
  displayStyles(eventparam: any) {
    const s = { color: '' }

    let mycol = eventparam.bgcolor
    if (!this.isCssColor(eventparam.bgcolor)) {
      mycol = this.colourNameToHex(mycol)
    }

    if (this.isCssColor(mycol)) {
      // s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(mycol) > 0.5 ? 'black' : 'white'
    }
    return s
  },
  CancelBookingEvent(mythisq: any, eventparam: IEvents, bookeventid: string, notify: boolean) {
    console.log('CancelBookingEvent ', eventparam)
    this.askConfirm(mythisq, translate('cal.titlebooking'), translate('cal.cancelbooking') + ' ' + this.gettextevent(eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), '', lists.MenuAction.DELETE, 0, {
      param1: bookeventid,
      param2: notify,
      param3: eventparam.title,
    })
  },
  CancelEvent(mythisq: any, eventparam: IEvents) {
    console.log('CancelEvent ', eventparam)
    this.askConfirm(mythisq, translate('cal.event'), translate('cal.cancelevent') + ' ' + this.gettextevent(eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), '', lists.MenuAction.DELETE_EVENT, 0, {
      param1: eventparam,
      param2: true,
    })
  },
  AskGiaPartecipatoZoom(mythisq: any, user: any) {
    console.log('AskGiaPartecipatoZoom', user.username)
    this.askConfirm(mythisq, translate('steps.zoom_gia_partecipato'), translate('steps.zoom_gia_partecipato'), translate('dialog.yes'), translate('dialog.no'), '', lists.MenuAction.ZOOM_GIA_PARTECIPATO, 0, {
      param1: user,
      param2: user,
      param3: 'Confermato',
    })
  },
  ActionRecTable(mythisq: any, action: number, table: string, id: string, item: any, askaction: any) {
    // console.log('ActionRecTable', id)
    return this.askConfirm(mythisq, 'Action', translate(askaction) + '?', translate('dialog.yes'), translate('dialog.no'), table, action, 0, {
      param1: id,
      param2: item,
    }, this)
  },

  getheight(mythis: any) {
    // return height()
    return mythis.$q.screen.height
  },
  getwidth(mythisq: any, withright = false, withleft = true): number {
    const globalStore = useGlobalStore()
    // return height()
    let myw = mythisq.screen.width
    if (withleft) {
      if (globalStore.leftDrawerOpen)
        myw -= 300
    }

    if (withright)
      if (globalStore.rightDrawerOpen)
        myw -= 300
    return myw

  },

  getwidthscale(mythis: any, mywidthpass: string, maxwidth: string): number {
    let mywidth = parseInt(mywidthpass)
    if (this.isMobile()) {
      // if (mywidth > this.getwidth(mythis) - 20)
      mywidth = this.getwidth(mythis, false, false) - 32

      // console.log('mywidth', mywidth)
      return mywidth
    } else {
      // console.log('this.getwidth(mythis) = ', this.getwidth(mythis))
      let myw: number = mywidth + ((this.getwidth(mythis, true) - mywidth) * 0.6)
      // console.log('myw1 = ', myw)
      if (myw > parseInt(maxwidth))
        myw = parseInt(maxwidth)
      if (myw > this.getwidth(mythis) - 24)
        myw = this.getwidth(mythis) - 24

      // console.log('myw = ', myw)
      return myw
    }
  },

  getheightbywidth(mythis: any, mywidth: string, myheight: string, maxwidth: string) {
    // console.log('getheightbywidth')
    const myw = this.getwidthscale(mythis, mywidth, maxwidth)
    return myw * (parseInt(myheight) / parseInt(mywidth))
  },

  isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
    const d = new Date(str)
    return d.toISOString() === str
  },

  getLastDateReadReset() {
    return new Date(1999, 1, 1, 0, 0, 0)
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
    return arr
      // @ts-ignore
      .map(e => e[comp])

      // store the keys of the unique objects
      // @ts-ignore
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      // @ts-ignore
      .filter(e => arr[e]).map(e => arr[e])
  },

  getColorByIndexBest(index: any) {
    if (index < this.listBestColor.length - 1)
      return this.listBestColor[index]
    else
      return 'primary'
  },
  getCookie(mytok: any, def?: any) {
    const ris = Cookies.get(mytok)
    // console.log('getCookie', ris)
    if (!!ris) {
      return ris
    } else {
      return def
    }
  },

  setCookie(mytok: any, value: string) {
    return Cookies.set(mytok, value)
  },

  removeCookie(mytok: any) {
    return Cookies.remove(mytok)
  },

  scrollToTop() {
    const element = document.getElementById('mypage')
    this.scrollToElement(element)
  },
  scrollToElementId(myid: string) {
    const element = document.getElementById(myid)
    this.scrollToElement(element)
  },
  scrollToElement(el: any) {
    const target = getScrollTarget(el)
    const offset = el.offsetTop
    const duration = 500
    console.log('target', target, 'offset', offset, 'duration', duration)
    setScrollPosition(target, offset, duration)
  },

  getCellForWhatsapp(numbercell: string) {
    if (!numbercell) return ''
    let mynum = numbercell.replace(/-/g, '')
    const globalStore = useGlobalStore()
    const intcode = globalStore.getValueSettingsByKey('INT_CODE', false)
    if (numbercell) {
      if (numbercell.substring(0, 1) !== '+') mynum = intcode + mynum
      else mynum = mynum.substring(1)
    } else {
      return ''
    }

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

  metafunc(mythis: any) {
    return {
      title: mythis.t('ws.sitename'),
      titleTemplate: (title: any) => `${this.getsuffisso()} ${mythis.mymeta.title} - ${mythis.t('ws.sitename')}`,
      meta: {
        keywords: {
          name: 'keywords',
          content: mythis.mymeta.keywords,
        },
        description: {
          name: 'description',
          content: mythis.mymeta.description,
        },
        equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' },
      },
    }
  },
  geturlupload() {
    return process.env.MONGODB_HOST + `/uploadnew/${this.getvers()}/`
  },
  escapeslash(mystr: string) {
    return mystr.replace(/\//g, '-')
  },
  geturlrelativeprofile() {
    return 'upload/profile'
  },
  getvers() {
    return process.env.APP_VERSION
  },
  getheaders() {
    const userStore = useUserStore()
    return [{ name: 'x-auth', value: userStore.x_auth_token }]
  },

  getextfile(filename: string) {
    if (filename) {
      const mystr = filename.split('.')
      if (mystr)
        return mystr.pop()!.toLowerCase()
    }
    return ''
  },

  getelembylang(arr: any) {
    const mylang = toolsext.getLocale()
    for (const elem in arr) {
      if (arr[elem][mylang])
        return arr[elem][mylang]
    }
  },
  isChristmasHoliday() {
    const now = new Date()
    return ((now.getMonth() === 11 && now.getDate() > 20) || (now.getMonth() === 0 && now.getDate() < 8))
  },

  CapitalizeAllWords(str: string | undefined) {
    if (str === undefined)
      return ''
    const splitStr = str.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(' ')
  },


  getValDb(keystr: string, serv: boolean, def?: any, table?: string, subkey?: any, id?: any, idmain?: any): any {
    const globalStore = useGlobalStore()
    const todos = useTodoStore()
    const userStore = useUserStore()
    if (table === 'users') {
      if (keystr === 'profile') {
        // @ts-ignore
        return userStore.my.profile[subkey]
      } else {
        // @ts-ignore
        return userStore.my[keystr]
      }
    } else if (table === 'todos') {
      // console.log('id', id, 'idmain', idmain)
      const indcat = todos.categories.indexOf(idmain)
      console.log('indcat', indcat)
      if (indcat >= 0) {
        const myrec = todos.todos[indcat].find((rec: any) => rec._id === id)
        console.log('myrec', myrec)
        let ris = null
        if (myrec) {
          ris = myrec[keystr]
        }
        console.log('ris', ris)
        return ris
      }

      return ''
    } else {
      console.log('keystr', keystr, 'serv', serv)
      const ris = globalStore.getValueSettingsByKey(keystr, serv)
      console.log('...ris', ris)

      if (ris === '')
        if (def !== undefined)
          return def
        else
          return ''
      else
        return ris
    }

  },

  getkey(youtube: boolean, title: boolean, isnum: boolean) {
    let mykey = 'MP4'
    if (youtube)
      mykey = 'YT'

    if (isnum) {
      mykey += '_NUM'
    } else {
      if (title)
        mykey += '_TITLE_'
      else
        mykey += '_VIDEO_'
    }

    return mykey
  },

  heightgallvideo() {
    const h = this.heightgallery(this.getValDb('YT_W', false) / this.getValDb('YT_H', false))
    return h
  },

  getvideourl(index: number, youtube: boolean) {
    const myvideo = this.getValDb(this.getkey(youtube, false, false) + index, false)
    if (myvideo)
      if (youtube)
        return myvideo
      else
        return this.getpath(myvideo)
    else
      return ''
  },

  getvideonum(youtube: boolean) {
    return this.getValDb(this.getkey(youtube, false, true), false)
  },

  getvideomp4yt(index: number) {
    return [{ src: 'https://www.youtube.com/embed/' + this.getvideourl(index, true), type: 'video/mp4' },
    ]
  },
  getvideomp4src(index: number) {
    return [{ src: this.getvideourl(index, false), type: 'video/mp4' },
    ]
  },

  getvideoyt(index: number) {
    return 'https://www.youtube.com/embed/' + this.getvideourl(index, true)
  },

  getvideobyidyoutube(key: string) {
    return 'https://www.youtube.com/embed/' + key
  },

  getpath(myvideo: string) {
    return 'video/' + func_tools.getLocale() + '/' + myvideo
  },
  mygetarrValDb(keystr: string, serv: boolean) {
    const globalStore = useGlobalStore()
    const myval = globalStore.getValueSettingsByKey(keystr, serv)
    // console.log('AA: myval', myval)
    try {
      if (myval) {
        // console.log('   Entro')
        const myrec = JSON.parse(myval)
        // console.log('*************** getarrValDb')
        // console.table(myrec)
        return myrec
      } else {
        // console.log('NO MYVAL')
        return []
      }
    } catch (e) {
      console.log('Errore: ', e)
      return []
    }
  },

  getvideotitle(index: number, youtube: boolean) {

    const mykey = this.getkey(youtube, true, false) + index
    const ris = this.mygetarrValDb(mykey, false)

    return this.getelembylang(ris)
  },

  getvideoposter(index: number) {
    return ''
  },
  clone(obj: any) {
    if (null === obj || 'object' !== typeof obj) return obj
    const copy = obj.constructor()
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
    }
    return copy
  },

  geticon(langin: string) {
    if (langin === '')
      return ''
    try {
      const lang = langin.toUpperCase()

      const arrlang = ['IT', 'ES', 'PT', 'BR', 'US', 'GB', 'UK', 'DE', 'FR', 'SI', 'MD', 'IE', 'KE', 'AU', 'ML', 'DO',
        'NG', 'SK', 'CH', 'CM', 'CO', 'CG', 'PE', 'MS', 'SM', 'HR', 'RO', 'VE', 'CL', 'PL', 'EG', 'AR', 'MX', 'SN', 'PK', 'AT', 'NP',
        'CU', 'MA', 'PH', 'BA', 'UA', 'BE', 'NL', 'CI', 'BF']

      const flag = arrlang.find((mylang) => mylang === lang)
      if (!!flag) {
        return 'fa-flag-' + flag.toLowerCase()
      }

      return ''

    } catch (e) {
      return ''
    }
  },

  removespaces(mystr: string) {
    return mystr.replace(/\s+/g, '')
  },

  copyStringToClipboard(myq: any, mystr: string, show: boolean) {

    copyToClipboard(mystr).then(() => {
      let msg = t('dialog.copyclipboard')
      if (show)
        msg += ' \'' + mystr + '\''

      this.showNotif(myq, msg)
    })

  },

  getlinkhref(mylink: string, text: string) {
    return '<a href="' + mylink + '" target="_blank">' + text + '</a>'
  },

  getNationsByNationality(nat: string) {
    if (!nat)
      return ''

    nat = nat.toUpperCase()

    if (nat === 'IT') {
      return 'Italy'
    } else if (nat === 'SI') {
      return 'Slovenia'
    } else if (nat === 'SK') {
      return 'Slovakia'
    } else if (nat === 'NG') {
      return 'Nigeria'
    } else if (nat === 'MD') {
      return 'Moldova'
    } else if (nat === 'ES') {
      return 'Spain'
    } else if (nat === 'DE') {
      return 'Germany'
    } else if (nat === 'FR') {
      return 'France'
    } else if (nat === 'US') {
      return 'United States'
    } else if (nat === 'CA') {
      return 'Canada'
    } else if (nat === 'MA') {
      return 'Morocco'
    } else if (nat === 'LT') {
      return 'Lithuania'
    } else if (nat === 'HR') {
      return 'Croatia'
    } else if (nat === 'HU') {
      return 'Hungary'
    } else if (nat === 'CH') {
      return 'Switzerland'
    } else if (nat === 'CM') {
      return 'Cameroon'
    } else if (nat === 'CO') {
      return 'Colombia'
    } else if (nat === 'PE') {
      return 'Peru'
    } else if (nat === 'PL') {
      return 'Poland'
    } else if (nat === 'SM') {
      return 'San Marino'
    } else if (nat === 'PT') {
      return 'Portugal'
    } else if ((nat === 'UK') || (nat === 'GB')) {
      return 'United Kingdom'
    } else if (nat === 'UA') {
      return 'Ukraine'
    } else if (nat === 'RO') {
      return 'Romania'
    } else if (nat === 'VE') {
      return 'Venezuela'
    } else if (nat === 'CL') {
      return 'Chile'
    } else if (nat === 'EG') {
      return 'Egypt'
    } else if (nat === 'BR') {
      return 'Brazil'
    } else if (nat === 'CG') {
      return 'Congo'
    } else if (nat === 'AR') {
      return 'Argentina'
    } else if (nat === 'MX') {
      return 'Mexico'
    } else if (nat === 'SN') {
      return 'Senegal'
    } else if (nat === 'PK') {
      return 'Pakistan'
    } else if (nat === 'AT') {
      return 'Austria'
    } else if (nat === 'NP') {
      return 'Nepal'
    } else if (nat === 'CU') {
      return 'Cuba'
    } else if (nat === 'PH') {
      return 'Philippines'
    } else if (nat === 'BA') {
      return 'Bosnia and Herzegovina'
    } else if (nat === 'BE') {
      return 'Belgium'
    } else if (nat === 'NL') {
      return 'Netherlands'
    } else if (nat === 'MS') {
      return 'Montserrat'
    } else if (nat === 'CI') {
      return 'Cote d\'Ivoire'
    } else if (nat === 'BF') {
      return 'Burkina Faso'
    } else if (nat === 'IE') {
      return 'Ireland'
    } else if (nat === 'KE') {
      return 'Kenya'
    } else if (nat === 'AU') {
      return 'Australia'
    } else if (nat === 'ML') {
      return 'Mali'
    } else if (nat === 'DO') {
      return 'Dominican Republic'
    }
  },

  getGroupById(myid: string) {
    const globalStore = useGlobalStore()
    const group = globalStore.groups.find((rec) => rec._id === myid)
    if (group) {
      return group.descr
    }
    return ''
  },

  getLinkZoom() {
    let id = ''
    const globalStore = useGlobalStore()
    if (globalStore.calzoom.length > 0) {
      // @ts-ignore
      id = globalStore.calzoom.slice(-1)[0].id_conf_zoom.toString()
    } else {
      id = '0'
    }
    return 'https://zoom.us/j/' + id
  },

  myprintf(val: string, params: any[]) {

    params.forEach((par) => {
      val = val.replace('{' + par.strin + '}', par.strout)
    })
    return val
  },

  translate(params: string, options?: any) {
    const msg = params.split('.')
    const lang = toolsext.getLocale()

    // @ts-ignore
    const stringa: string = messages[lang]

    let ris: any = stringa
    if (!!ris) {
      msg.forEach((param) => {
        ris = ris[param]
      })

      if (!!options) {
        ris = this.myprintf(ris, options)
      }

    } else {
      console.log('ERRORE IN TRANSLATE! ', params, ' NON ESISTE!')
      return params
    }

    return ris
  },

  isSel2Metodi(user: IUserFields) {
    if (user.profile.paymenttypes) {
      return user.profile.paymenttypes.length > 1
    }
    return false

  },

  getnumrequisiti(user: IUserFields) {
    let req = 0

    req += user.verified_email ? 1 : 0
    req += user.profile.teleg_id! > 0 ? 1 : 0
    req += this.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value) ? 1 : 0
    req += this.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value) ? 1 : 0
    // req += user.profile.saw_zoom_presentation ? 1 : 0
    // if (!!user.profile.my_dream)
    //   req += user.profile.my_dream.length >= 10 ? 1 : 0
    req += this.isSel2Metodi(user) ? 1 : 0

    return req
  },

  Is7ReqOk(user: IUserFields) {
    return this.getnumrequisiti(user) === 7
  },

  getRiganave(riga: number) {
    let ris = riga - 3
    if (ris <= 1)
      ris = 1

    return ris
  },

  getColnave(col: number) {
    let ris = Math.ceil(col / (2 * 4))
    if (ris <= 1)
      ris = 1
    return ris
  },

  getrigacolstr(mianave: any) {
    return this.getRiganave(mianave.riga) + '.' + this.getColnave(mianave.col)
  },

  getlastnavestr(lastnave: any) {
    return lastnave.riga + '.' + lastnave.col
  },

  getmaxcol(riga: number) {

    return Math.pow(2, riga - 1)
  },

  getrigaNaveByPosiz(riga: number) {
    let ris = riga + 3
    if (ris <= 1)
      ris = 1
    return ris

  },

  getcolNaveByPosiz(col: number) {
    let ris = Math.ceil(col * Math.pow(2, 3))
    if (ris <= 1)
      ris = 1
    return ris
  },

  getfirstnaveSognatore(riga: number, col: number) {
    const myriga = this.getrigaNaveByPosiz(riga)
    const mycol = this.getcolNaveByPosiz(col)

    // console.log(`${riga}.${col} => ${myriga}.${mycol}`)
    return { riga: myriga, col: mycol }
  },

  getnumnavi_finoa(naveorig: any, navedest: any, lastnave: any) {
    let contaattuale = 0
    let contatot = 0

    const indrigaattuale = lastnave.riga
    const indcolattuale = lastnave.col

    if (navedest.riga < indrigaattuale) {
      return { perc: 100, totale: 0, contaattuale: 0 }
    }

    for (let indriga = naveorig.riga; indriga <= navedest.riga; indriga++) {

      let startcol = 0
      if (indriga === naveorig.riga) {
        startcol = naveorig.col
      }
      let endcol = this.getmaxcol(indriga)
      if (indriga === navedest.riga) {
        endcol = navedest.col
      }

      if (indriga <= navedest.riga) {
        contatot += (endcol - startcol)
      }

      if (indriga < indrigaattuale) {
        contaattuale += (endcol - startcol)
      } else if (indriga === indrigaattuale) {
        contaattuale += indcolattuale
      }
    }

    let perc = 0
    if (contatot > 0)
      perc = (contaattuale / contatot) * 100

    if (perc > 100)
      perc = 100

    // console.log('naveorig', naveorig.riga, '.', naveorig.col, 'dest', navedest.riga, ',', navedest.col)
    // console.log('lastnave', lastnave.riga, '.', lastnave.col)
    // console.log('contaattuale', contaattuale, 'contatot', contatot, 'perc', perc)

    return { perc, totale: contatot, contaattuale }
  },

  sito_online(pertutti: boolean) {

    const userStore = useUserStore()

    let ris = true
    const online = this.getValDb('SITO_ONLINE', false, true)
    ris = userStore.isAdmin && !pertutti ? true : online
    // console.log('isadmin', userStore.isAdmin)
    return ris
  },

  getsize() {
    if (this.isMobile()) {
      return '0.85rem'
    } else {
      return '1rem'
    }
  },

  getsizesmall() {
    if (this.isMobile()) {
      return '0.75rem'
    } else {
      return '0.85rem'
    }
  },

  convertiTagHTMLPerBOT(msg: string) {

    msg = msg.replace(/<strong>/g, '<b>')
    msg = msg.replace(/<\/strong>/g, '</b>')

    return msg
  },

  getlinkstd(link: string) {
    let mylink = link
    if (!!link) {
      if (!link.startsWith('http')) {
        mylink = 'https://' + link
      }
    }

    return mylink
  },

  isselectPaypal() {
    const userStore = useUserStore()
    if (userStore.my.profile) {
      if (userStore.my.profile.paymenttypes) {
        if (userStore.my.profile.paymenttypes.includes({ key: 'paypal', label: 'paypal' })) {
          return true
        }
      }

      return false
    }
  },

  isselectPayeer() {
    const userStore = useUserStore()
    if (userStore.my.profile) {
      if (userStore.my.profile.paymenttypes) {
        if (userStore.my.profile.paymenttypes.includes({ key: 'payeer', label: 'payeer' })) {
          return true
        }
      }

      return false
    }
  },

  isselectRevolut() {
    const userStore = useUserStore()
    if (userStore.my.profile) {
      if (userStore.my.profile.paymenttypes) {
        if (userStore.my.profile.paymenttypes.includes({ key: 'revolut', label: 'revolut' })) {
          return true
        }
      }

      return false
    }
  },

  isselectAdvCash() {
    const userStore = useUserStore()
    if (userStore.my.profile) {
      if (userStore.my.profile.paymenttypes) {
        if (userStore.my.profile.paymenttypes.includes({ key: 'advcash', label: 'advcash' })) {
          return true
        }
      }

      return false
    }
  },

  getGroupList() {
    const globalStore = useGlobalStore()

    // console.log('globalStore.groups', globalStore.groups)
    const mylist: any = {
      it: [],
      es: [],
      enUs: [],
    }

    let myrec = {}

    for (const mygroup of globalStore.groups) {
      myrec = {
        id: mygroup._id,
        label: mygroup.descr,
        value: mygroup._id,
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  getRespList() {

    // console.log('globalStore.groups', globalStore.groups)
    const mylist: any = {
      it: [],
      es: [],
      enUs: [],
    }

    let myrec = {}

    const globalStore = useGlobalStore()

    for (const myresp of globalStore.resps) {
      myrec = {
        id: myresp._id,
        label: myresp.name + ' ' + myresp.surname,
        value: myresp.username,
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  getWorkersList() {

    // console.log('globalStore.groups', globalStore.groups)
    const mylist: any = {
      it: [],
      es: [],
      enUs: [],
    }

    let myrec = {}

    const globalStore = useGlobalStore()

    for (const myresp of globalStore.workers) {
      myrec = {
        id: myresp._id,
        label: myresp.name + ' ' + myresp.surname,
        value: myresp.username,
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  IsLogged() {
    const userStore = useUserStore()
    if (!!userStore)
      return userStore.isLogged
    else
      return false
  },

  formatDate(mydate: any) {
    let d: Date

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    const month = '' + (d.getMonth() + 1)
    const day = '' + d.getDate()
    const year = d.getFullYear()

    return [year, this.padTime(month), this.padTime(day)].join('-')
  },

  firstDayOfDate(mydate: any) {
    let d: Date

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    const month = d.getMonth()
    const day = 1
    const year = d.getFullYear()

    return new Date(year, month, day)
  },

  LastDayOfDate(mydate: any) {
    let d: Date

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    let month = d.getMonth()
    if (month === 11)
      month = 0
    else
      month++
    const year = d.getFullYear()

    return new Date(year, month, 0)
  },

  formatTime(mydate: any) {
    const d = mydate !== void 0 ? new Date(mydate) : new Date(),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes()

    return [this.padTime(hours), this.padTime(minutes)].join(':')
  },
  colourNameToHex(colour: string) {
    const colours: any = {
      'aliceblue': '#f0f8ff',
      'antiquewhite': '#faebd7',
      'aqua': '#00ffff',
      'aquamarine': '#7fffd4',
      'azure': '#f0ffff',
      'beige': '#f5f5dc',
      'bisque': '#ffe4c4',
      'black': '#000000',
      'blanchedalmond': '#ffebcd',
      'blue': '#0000ff',
      'blueviolet': '#8a2be2',
      'brown': '#a52a2a',
      'burlywood': '#deb887',
      'cadetblue': '#5f9ea0',
      'chartreuse': '#7fff00',
      'chocolate': '#d2691e',
      'coral': '#ff7f50',
      'cornflowerblue': '#6495ed',
      'cornsilk': '#fff8dc',
      'crimson': '#dc143c',
      'cyan': '#00ffff',
      'darkblue': '#00008b',
      'darkcyan': '#008b8b',
      'darkgoldenrod': '#b8860b',
      'darkgray': '#a9a9a9',
      'darkgreen': '#006400',
      'darkkhaki': '#bdb76b',
      'darkmagenta': '#8b008b',
      'darkolivegreen': '#556b2f',
      'darkorange': '#ff8c00',
      'darkorchid': '#9932cc',
      'darkred': '#8b0000',
      'darksalmon': '#e9967a',
      'darkseagreen': '#8fbc8f',
      'darkslateblue': '#483d8b',
      'darkslategray': '#2f4f4f',
      'darkturquoise': '#00ced1',
      'darkviolet': '#9400d3',
      'deeppink': '#ff1493',
      'deepskyblue': '#00bfff',
      'dimgray': '#696969',
      'dodgerblue': '#1e90ff',
      'firebrick': '#b22222',
      'floralwhite': '#fffaf0',
      'forestgreen': '#228b22',
      'fuchsia': '#ff00ff',
      'gainsboro': '#dcdcdc',
      'ghostwhite': '#f8f8ff',
      'gold': '#ffd700',
      'goldenrod': '#daa520',
      'gray': '#808080',
      'green': '#008000',
      'greenyellow': '#adff2f',
      'honeydew': '#f0fff0',
      'hotpink': '#ff69b4',
      'indianred ': '#cd5c5c',
      'indigo': '#4b0082',
      'ivory': '#fffff0',
      'khaki': '#f0e68c',
      'lavender': '#e6e6fa',
      'lavenderblush': '#fff0f5',
      'lawngreen': '#7cfc00',
      'lemonchiffon': '#fffacd',
      'lightblue': '#add8e6',
      'lightcoral': '#f08080',
      'lightcyan': '#e0ffff',
      'lightgoldenrodyellow': '#fafad2',
      'lightgrey': '#d3d3d3',
      'lightgreen': '#90ee90',
      'lightpink': '#ffb6c1',
      'lightsalmon': '#ffa07a',
      'lightseagreen': '#20b2aa',
      'lightskyblue': '#87cefa',
      'lightslategray': '#778899',
      'lightsteelblue': '#b0c4de',
      'lightyellow': '#ffffe0',
      'lime': '#00ff00',
      'limegreen': '#32cd32',
      'linen': '#faf0e6',
      'magenta': '#ff00ff',
      'maroon': '#800000',
      'mediumaquamarine': '#66cdaa',
      'mediumblue': '#0000cd',
      'mediumorchid': '#ba55d3',
      'mediumpurple': '#9370d8',
      'mediumseagreen': '#3cb371',
      'mediumslateblue': '#7b68ee',
      'mediumspringgreen': '#00fa9a',
      'mediumturquoise': '#48d1cc',
      'mediumvioletred': '#c71585',
      'midnightblue': '#191970',
      'mintcream': '#f5fffa',
      'mistyrose': '#ffe4e1',
      'moccasin': '#ffe4b5',
      'navajowhite': '#ffdead',
      'navy': '#000080',
      'oldlace': '#fdf5e6',
      'olive': '#808000',
      'olivedrab': '#6b8e23',
      'orange': '#ffa500',
      'orangered': '#ff4500',
      'orchid': '#da70d6',
      'palegoldenrod': '#eee8aa',
      'palegreen': '#98fb98',
      'paleturquoise': '#afeeee',
      'palevioletred': '#d87093',
      'papayawhip': '#ffefd5',
      'peachpuff': '#ffdab9',
      'peru': '#cd853f',
      'pink': '#ffc0cb',
      'plum': '#dda0dd',
      'powderblue': '#b0e0e6',
      'purple': '#800080',
      'rebeccapurple': '#663399',
      'red': '#ff0000',
      'rosybrown': '#bc8f8f',
      'royalblue': '#4169e1',
      'saddlebrown': '#8b4513',
      'salmon': '#fa8072',
      'sandybrown': '#f4a460',
      'seagreen': '#2e8b57',
      'seashell': '#fff5ee',
      'sienna': '#a0522d',
      'silver': '#c0c0c0',
      'skyblue': '#87ceeb',
      'slateblue': '#6a5acd',
      'slategray': '#708090',
      'snow': '#fffafa',
      'springgreen': '#00ff7f',
      'steelblue': '#4682b4',
      'tan': '#d2b48c',
      'teal': '#008080',
      'thistle': '#d8bfd8',
      'tomato': '#ff6347',
      'turquoise': '#40e0d0',
      'violet': '#ee82ee',
      'wheat': '#f5deb3',
      'white': '#ffffff',
      'whitesmoke': '#f5f5f5',
      'yellow': '#ffff00',
      'yellowgreen': '#9acd32',
    }

    const index: any = colour.toLowerCase()

    if (typeof colours[index] != 'undefined')
      return colours[index]

    return false
  },

  errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }
      console.log('errorMsg', cosa, item)

      if (item.email) {
        if (item.email.$invalid)
          return t('reg.err.email')
      }

      if (item.minLength !== undefined) {
        if (item.minLength.$invalid) {
          return t('reg.err.atleast') + ` ${item.minLength.$params.min} ` + t('reg.err.char')
        }
      }
      if (item.complexity !== undefined) {
        if (item.complexity.$invalid) {
          return t('reg.err.complexity')
        }
      }
      // if (!item.maxLength) { return t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + t('reg.err.char') }

      if (item.required !== undefined) {
        if (item.required.$invalid) {
          return t('reg.err.required')
        }
      }

      // console.log('    ....avanti')
      if (cosa === 'email') {
        // console.log("EMAIL " + item.isUnique);
        // console.log(item);
        if (item.registeredemail.$invalid) {
          return t('reg.err.duplicate_email')
        }
      } else if (cosa === 'username') {
        if (item.registereduser.$invalid) {
          return t('reg.err.duplicate_username')
        }
      } else if (cosa === 'aportador_solidario') {
        // console.log(item);
        if (item.aportadorexist.$invalid) {
          // console.log('!item.aportadorexist !')
          return t('reg.err.aportador_not_exist')
        }
      } else if ((cosa === 'name') || (cosa === 'surname')) {
        // console.log(item);
      } else if (cosa === 'repeatpassword') {
        if (item.matchText) {
          if (item.matchText.$invalid) {
            return t('reg.err.sameaspassword')
          }
        }
      }

      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  },

  array_move(arr: any, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
      let k: any = new_index - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
    return arr // for testing
  },
  getColByLevel(level: number) {
    let col = ''
    if (level === 0){
      col = 'grey-5'
    } else if (level === 1){
      col = 'red-5'
    } else if (level === 2){
      col = 'orange-5'
    } else if (level === 3){
      col = 'yellow-5'
    } else if (level === 4){
      col = 'blue-5'
    } else if (level === 5){
      col = 'green-5'
    }
    return col
  }
// getLocale() {
  //   if (navigator.languages && navigator.languages.length > 0) {
  //     return navigator.languages[0]
  //   } else {
  //     return navigator.userLanguages || navigator.language || navigator.browserLanguages || 'it-IT'
  //   }
  // }
}
