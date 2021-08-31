module.exports = {
  Accepted: {
    CHECK_READ_GUIDELINES: 1,
    CHECK_SEE_VIDEO_PRINCIPI: 2,
  },

  ALL_SAW_AND_ACCEPTED: 3,
  // ---------------------

  FILTER_EXTRALIST_NOT_REGISTERED: 1,
  FILTER_EXTRALIST_NOT_CONTACTED: 2,
  FILTER_EXTRALIST_WITH_NOTE: 4,
  FILTER_USER_NO_ZOOM: 8,
  FILTER_USER_NO_INVITANTE: 16,
  FILTER_USER_NO_TELEGRAM_ID: 32,
  FILTER_USER_CODICE_AUTH_TELEGRAM: 64,
  FILTER_USER_NO_EMAIL_VERIFICATA: 128,
  FILTER_USER_NO_DREAM: 256,
  FILTER_EXTRALIST_DELETED: 512,
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

  REPORT_FILT_RESP: 1,
  REPORT_FILT_ATTIVITA: 2,

  PaymentTypes: [
    'Nessuno',
    'Bonifico Bancario',
    'Paypal',
    'In Contanti alla CNM',
  ],

  CashType: {
    None: 0,
    Incoming: 1,
    Outcoming: 2,
  },

  WalletFinalStatusType: {
    None: 0,
    InCommonCash: 1,
    InMyWallet: 2,
  },

  Permissions: {
    Admin: 1,
    Manager: 2,
    Teacher: 4,
    Tutor: 8,
    Editor: 16,
    Zoomeri: 32,
    Department: 64,
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4,
  },

  TypeMsg: {
    SEND_TO_ALL: 1,
    SEND_TO_SOCI: 2,
    SEND_TO_SOCIO_RESIDENTE: 3,
    SEND_TO_CONSIGLIO: 5,
    SEND_TO_NON_SOCI: 10,
    SEND_TO_PAOLO: 20,
  },

  TypeMsg_Actions: {
    NORMAL: 0,
    YESNO: 1,
    OPZ1_2: 2,
  },

  CallFunz: {
    SOSTITUISCI: 345,
    AGGIUNGI_NUOVO_IMBARCO: 380,
    CANCELLA_IMBARCO: 385,
    DAMMI_PRIMO_UTENTE_LIBERO: 390,
    GET_VALBYTABLE: 400,
    SET_VALBYTABLE: 410,
    ZOOM_GIA_PARTECIPATO: 510,
  },

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

  OrderStatusView: {
    CHECKOUT_SENT: 2,
    ORDER_CONFIRMED: 3,
    PAYED: 4,
    RECEIVED: 6,
    CANCELED: 10,
  },

  fieldsUserToChange() {
    return ['_id', 'index', 'username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'ipaddr', 'lasttimeonline', 'profile', 'calcstat', 'news_on', 'aportador_solidario', 'made_gift', 'ind_order', 'old_order', 'numinvitati', 'numinvitatiattivi', 'qualified']
  },

};
