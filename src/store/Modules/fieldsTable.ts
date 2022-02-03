import { IColGridTable } from '@model'
import { useUserStore } from '@store/UserStore'
import { lists } from './lists'
import { costanti } from './costanti'

const DeleteRec = {
  name: 'deleterec',
  label_trans: 'reg.elimina',
  align: 'right',
  field: costanti.NOFIELD,
  sortable: false,
  icon: 'fas fa-trash-alt',
  action: lists.MenuAction.DELETE_RECTABLE,
  askaction: 'db.deletetherecord',
  // required: true,
  visuonlyEditVal: true,
}

const ModifRec = {
  name: 'modifrec',
  label_trans: 'reg.edit',
  align: 'right',
  field: costanti.NOFIELD,
  sortable: false,
  icon: 'fas fa-pencil-alt',
  action: lists.MenuAction.CAN_EDIT_TABLE,
  askaction: '',
  // required: true,
  visuonlyEditVal: true,
}

const DuplicateRec = {
  name: 'copyrec',
  label_trans: 'event.duplicate',
  align: 'right',
  field: costanti.NOFIELD,
  sortable: false,
  icon: 'fas fa-copy',
  action: lists.MenuAction.DUPLICATE_RECTABLE,
  askaction: 'db.duplicatedrecord',
  visuonlyEditVal: true,
  visible: true,
}

function AddCol(params: IColGridTable) {
  return {
    name: params.name,
    required: (params.required === undefined) ? false : params.required,
    label: (params.label === undefined) ? '' : params.label,
    label_trans: (params.label_trans === undefined) ? '' : params.label_trans,
    align: (params.align === undefined) ? 'left' : params.align,
    field: (params.field === undefined) ? params.name : params.field,
    subfield: (params.subfield === undefined) ? '' : params.subfield,
    sortable: (params.sortable === undefined) ? true : params.sortable,
    disable: (params.disable === undefined) ? false : params.disable,
    titlepopupedit: (params.titlepopupedit === undefined) ? '' : params.titlepopupedit,
    field_extra1: (params.field_extra1 === undefined) ? '' : params.field_extra1,
    subfield_extra1: (params.subfield_extra1 === undefined) ? '' : params.subfield_extra1,
    allowNewValue: (params.allowNewValue === undefined) ? false : params.allowNewValue,
    visible: (params.visible === undefined) ? true : params.visible,
    icon: (params.icon === undefined) ? '' : params.icon,
    action: (params.action === undefined) ? '' : params.action,
    foredit: (params.foredit === undefined) ? true : params.foredit,
    fieldtype: (params.fieldtype === undefined) ? costanti.FieldType.string : params.fieldtype,
    tipovisu: (params.tipovisu === undefined) ? costanti.TipoVisu.TESTO : params.tipovisu,
    link: (params.link === undefined) ? '' : params.link,
    askaction: (params.askaction === undefined) ? '' : params.askaction,
    tablesel: (params.tablesel === undefined) ? '' : params.tablesel,
    jointable: (params.jointable === undefined) ? '' : params.jointable,
    addall: (params.addall === undefined) ? false : params.addall,
    filter: (params.filter === undefined) ? null : params.filter,
    showWhen: (params.showWhen === undefined) ? costanti.showWhen.NewRec + costanti.showWhen.InEdit + costanti.showWhen.InView : params.showWhen,
    noshowlabel: (params.noshowlabel === undefined) ? false : params.noshowlabel,
    notsave: (params.notsave === undefined) ? false : params.notsave,
    filter_table: (params.filter_table === undefined) ? '' : params.filter_table,
    remote_table: (params.remote_table === undefined) ? '' : params.remote_table,
    remote_key: (params.remote_key === undefined) ? '' : params.remote_key,
    remote_field: (params.remote_field === undefined) ? '' : params.remote_field,
    maxlength: (params.maxlength === undefined) ? 0 : params.maxlength,
    filter_field: (params.filter_field === undefined) ? '' : params.filter_field,
  }
}

export const colmailinglist = [
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'email', label_trans: 'reg.email' }),
  AddCol({ name: 'statesub', label_trans: 'newsletter.statesub', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'wrongerr', label_trans: 'newsletter.wrongerr', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'lastid_newstosent', label_trans: 'reg.lastid_newstosent', fieldtype: costanti.FieldType.string }),
  AddCol(DeleteRec),
]

export const colgallery = [
  AddCol({ name: 'author_username', label_trans: 'gallery.author_username' }),
  AddCol({ name: 'title', label_trans: 'gallery.title' }),
  AddCol({ name: 'directory', label_trans: 'gallery.directory' }),
  AddCol({
    name: 'list',
    label_trans: 'gallery.list',
    fieldtype: costanti.FieldType.listimages,
    jointable: '',
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colmsg_templates = [
  AddCol({ name: 'title', label_trans: 'pages.title' }),
  AddCol({ name: 'typemsg', label_trans: 'TypeMsg', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'title_it', label_trans: 'Tit Ita', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_it', label_trans: 'ITA', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'title_si', label_trans: 'Tit SLO', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_si', label_trans: 'SLO', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'title_enUs', label_trans: 'Tit ENG', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_enUs', label_trans: 'ENG', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'title_es', label_trans: 'Tit ESP', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_es', label_trans: 'ESP', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'title_pt', label_trans: 'Tit POR', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_pt', label_trans: 'POR', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'title_fr', label_trans: 'Tit FRA', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'msg_fr', label_trans: 'FRA', fieldtype: costanti.FieldType.html }),
]

export const colmypage = [
  AddCol({ name: 'title', label_trans: 'pages.title' }),
  AddCol({ name: 'path', label_trans: 'pages.path' }),
  AddCol({ name: 'img1', label_trans: 'pages.img1' }),
  AddCol({ name: 'content', label_trans: 'pages.contentfield', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'video1', label_trans: 'pages.video1' }),
  AddCol({ name: 'ratio1', label_trans: 'pages.ratio1' }),
  AddCol({ name: 'img2', label_trans: 'pages.img2' }),
  AddCol({ name: 'content2', label_trans: 'pages.content2', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'video2', label_trans: 'pages.video2' }),
  AddCol({ name: 'ratio2', label_trans: 'pages.ratio2' }),
  AddCol({ name: 'img3', label_trans: 'pages.img3' }),
  AddCol({ name: 'content3', label_trans: 'pages.content3', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'video3', label_trans: 'pages.video3' }),
  AddCol({ name: 'ratio3', label_trans: 'pages.ratio3' }),
  AddCol({ name: 'content4', label_trans: 'pages.content4', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'lang', label_trans: 'pages.lang' }),
  AddCol({ name: 'icon', label_trans: 'pages.icon' }),
  AddCol({ name: 'order', label_trans: 'pages.order', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'keywords', label_trans: 'pages.keywords' }),
  AddCol({ name: 'description', label_trans: 'pages.description' }),
  AddCol({ name: 'heightimg', label_trans: 'pages.heightimg', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'color', label_trans: 'pages.color', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'onlyif_logged', label_trans: 'pages.onlyif_logged', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'only_residenti', label_trans: 'pages.only_residenti', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'only_consiglio', label_trans: 'pages.only_consiglio', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'imgback', label_trans: 'pages.imgback', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'active', label_trans: 'pages.active', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'inmenu', label_trans: 'pages.inmenu', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'submenu', label_trans: 'pages.submenu', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'l_par', label_trans: 'pages.l_par', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'l_child', label_trans: 'pages.l_child', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'infooter', label_trans: 'pages.infooter', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'internalpage', label_trans: 'pages.internalpage', fieldtype: costanti.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colmybot = [
  AddCol({ name: 'page', label_trans: 'bot.page', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'riga', label_trans: 'bot.riga', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'index', label_trans: 'bot.index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'active', label_trans: 'bot.active', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'lang', label_trans: 'bot.lang', fieldtype: costanti.FieldType.select, jointable: 'lang'  }),
  AddCol({ name: 'main', label_trans: 'bot.main', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'label', label_trans: 'bot.label' }),
  AddCol({ name: 'type', label_trans: 'bot.type', fieldtype: costanti.FieldType.select, jointable: 'bottype' }),
  AddCol({ name: 'value', label_trans: 'bot.value' }),
  AddCol({ name: 'visibility', label_trans: 'bot.visibility', fieldtype: costanti.FieldType.binary, jointable: 'visibility' }),
  AddCol({ name: 'date_updated', label_trans: 'bot.date_updated', fieldtype: costanti.FieldType.date }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colopzemail = [
  AddCol({ name: 'key', label_trans: 'col.key' }),
  AddCol({ name: 'label_it', label_trans: 'col.label' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const coltemplemail = [
  AddCol({ name: 'subject', label_trans: 'templemail.subject' }),
  AddCol({ name: 'testoheadermail', label_trans: 'templemail.testoheadermail', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'content', label_trans: 'templemail.content', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'img', label_trans: 'templemail.img' }),
  AddCol({ name: 'content2', label_trans: 'templemail.content2', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'img2', label_trans: 'templemail.img2' }),
  AddCol({
    name: 'options',
    label_trans: 'templemail.options',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'opzemail',
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]
// SHOW_LAST_N_EV
export const colnewstosent = [
  AddCol({ name: 'label', label_trans: 'event.title' }),
  AddCol({ name: 'templemail_str', label_trans: 'newsletter.templemail' }),
  AddCol({ name: 'datetoSent', label_trans: 'newsletter.datetoSent', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'activate', label_trans: 'newsletter.activate', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'numemail_tot', label_trans: 'newsletter.numemail_tot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'numemail_sent', label_trans: 'newsletter.numemail_sent', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'datestartJob', label_trans: 'newsletter.datestartJob', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'datefinishJob', label_trans: 'newsletter.datefinishJob', fieldtype: costanti.FieldType.date }),
  AddCol({
    name: 'lastemailsent_Job',
    label_trans: 'newsletter.lastemailsent_Job',
    fieldtype: costanti.FieldType.date
  }),
  AddCol({ name: 'starting_job', label_trans: 'newsletter.starting_job', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'finish_job', label_trans: 'newsletter.finish_job', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'processing_job', label_trans: 'newsletter.processing_job', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'error_job', label_trans: 'newsletter.error_job', fieldtype: costanti.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colTableWhere = [
  AddCol({ name: 'code', label_trans: 'where.code' }),
  AddCol({ name: 'placename', label_trans: 'cal.where' }),
  AddCol({ name: 'whereicon', label_trans: 'where.whereicon' }),
  AddCol(DeleteRec),
]

export const colTableProducer = [
  AddCol({ name: 'name', label_trans: 'producer.name' }),
  AddCol({ name: 'description', label_trans: 'producer.description' }),
  AddCol({ name: 'referent', label_trans: 'producer.referent' }),
  AddCol({ name: 'username', label_trans: 'producer.username' }),
  AddCol({ name: 'region', label_trans: 'producer.region' }),
  AddCol({ name: 'city', label_trans: 'producer.city' }),
  AddCol({ name: 'img', label_trans: 'producer.img' }),
  AddCol({ name: 'website', label_trans: 'producer.website' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const getcolorderscart = [
  AddCol({ name: 'numorder', label_trans: 'order.numorder' }),
  AddCol({ name: 'created_at', label_trans: 'order.created_at', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'status', label_trans: 'order.status' }),
  AddCol({ name: 'items', label_trans: 'order.items' }),
  AddCol({
    name: 'userId', label_trans: 'order.users', fieldtype: costanti.FieldType.select, jointable: 'users',
  }),
  AddCol({ name: 'note', label_trans: 'order.note' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableShareWithUs = [
  AddCol({ name: 'description', label_trans: 'share.description' }),
  AddCol({ name: 'numshared', label_trans: 'share.numshared', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'rating', label_trans: 'share.rating', fieldtype: costanti.FieldType.number }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableHours = [
  // AddCol({ name: 'userId', label_trans: 'hours.userId' }),
  // AddCol({ name: 'todoId', label_trans: 'hours.todoId' }),
  AddCol({ name: 'date', label_trans: 'hours.date', fieldtype: costanti.FieldType.onlydate }),
  AddCol({ name: 'hours', label_trans: 'hours.hours', fieldtype: costanti.FieldType.hours }),
  // AddCol({ name: 'time_start', label_trans: 'hours.time_start', fieldtype: costanti.FieldType.number }),
  // AddCol({ name: 'time_end', label_trans: 'hours.time_end', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'hours.note' }),
  AddCol({ name: 'username', label_trans: 'reg.username_short', showWhen: costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTablegroups = [
  AddCol({ name: 'descr', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'resp', label_trans: 'reg.resp' }),
  AddCol({ name: 'viceResp', label_trans: 'reg.viceResp' }),
  AddCol({
    name: 'assignedToUsers',
    label_trans: 'reg.userslist',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'workers',
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTabledepartments = [
  AddCol({ name: 'name', label_trans: 'store.name' }),
  AddCol({ name: 'username', label_trans: 'store.username' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableStorehouse = [
  AddCol({ name: 'name', label_trans: 'store.name' }),
  AddCol({ name: 'description', label_trans: 'store.description' }),
  AddCol({ name: 'referent', label_trans: 'store.referent' }),
  AddCol({ name: 'address', label_trans: 'store.address' }),
  AddCol({ name: 'city', label_trans: 'store.city' }),
  AddCol({ name: 'region', label_trans: 'store.region' }),
  AddCol({ name: 'img', label_trans: 'store.img' }),
  AddCol({ name: 'website', label_trans: 'store.website' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colSectors = [
  AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'store.description' }),
  AddCol({
    name: 'idSector',
    label_trans: 'sectors.name',
    fieldtype: costanti.FieldType.select,
    jointable: 'sectors',
  }),
  AddCol({ name: 'main', label_trans: 'store.main', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'theme', label_trans: 'products.theme' }),
  AddCol({ name: 'img', label_trans: 'store.img' }),
  AddCol({ name: 'icon', label_trans: 'store.icon' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]


export const colLevels = [
  AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'store.description' }),
  AddCol({ name: 'years_of_exp', label_trans: 'years_of_exp', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'theme', label_trans: 'products.theme' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colCitys = [
  AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'comune', label_trans: 'city.comune' }),
  AddCol({ name: 'prov', label_trans: 'city.prov' }),
  AddCol({ name: 'reg', label_trans: 'city.reg' }),
  AddCol({ name: 'pref', label_trans: 'city.pref' }),
  AddCol({ name: 'cap', label_trans: 'city.cap' }),
  // AddCol({ name: 'abitanti', label_trans: 'city.abitanti', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'country', label_trans: 'city.country' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colProvinces = [
  // AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'label', label_trans: 'store.description' }),
  AddCol({ name: 'value', label_trans: 'city.prov' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableCountry = [
  AddCol({ name: 'id', label_trans: 'index', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'value', label_trans: 'city.country' }),
  AddCol({ name: 'flag', label_trans: 'city.flag' }),
]
export const colTablePhones = [
  AddCol({ name: 'id', label_trans: 'index', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'value', label_trans: 'city.country' }),
  AddCol({ name: 'flag', label_trans: 'city.flag' }),
]

export const colTableUsersGeneric = [
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'date', label_trans: 'reg.date', fieldtype: costanti.FieldType.onlydate,
    showWhen: costanti.showWhen.InPage + costanti.showWhen.InView_OnlyifExist }),
]

export const colTableMyGroup = [
  AddCol({ name: 'groupname', label_trans: 'reg.groupname' }),
  AddCol({ name: 'date', label_trans: 'reg.date', fieldtype: costanti.FieldType.onlydate,
    showWhen: costanti.showWhen.InPage + costanti.showWhen.InView_OnlyifExist }),
]

export const colSkills = [
  // AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'store.description' }),
  AddCol({ name: 'img', label_trans: 'store.img' }),
  AddCol({ name: 'icon', label_trans: 'store.icon' }),
  AddCol({
    name: 'idSector',
    label_trans: 'sectors.name',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'sectors',
  }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'theme', label_trans: 'products.theme' }),
  AddCol(DuplicateRec),
  AddCol(DeleteRec),
]

export const colSubSkills = [
  // AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'store.description' }),
  AddCol({ name: 'img', label_trans: 'store.img' }),
  AddCol({ name: 'icon', label_trans: 'store.icon' }),
  AddCol({
    name: 'idSkill',
    label_trans: 'skill.name',
    fieldtype: costanti.FieldType.select,
    jointable: 'skills',
  }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'theme', label_trans: 'products.theme' }),
  AddCol(DuplicateRec),
  AddCol(DeleteRec),
]

export const colmyUserPeople = [
  // AddCol({ name: '_id', label_trans: 'reg.id' }),
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({
    name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false,
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
  }),
  // AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: costanti.FieldType.boolean }),
  // AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
]

export const colmyUserGroup = [
  // AddCol({ name: '_id', label_trans: 'reg.id' }),
  AddCol({ name: 'groupname', label_trans: 'reg.groupname', required: true }),
  AddCol({ name: 'title', label_trans: 'reg.name', required: true }),
  AddCol({
    name: 'idSector',
    label_trans: 'sectors.name',
    fieldtype: costanti.FieldType.select,
    required: true,
    jointable: 'sectors',
    visible: true,
    icon: 'category',
  }),
  AddCol({ name: 'descr', label_trans: 'proj.longdescr', required: true }),
  AddCol({ name: 'visibility', label_trans: 'bot.visibility', fieldtype: costanti.FieldType.select, jointable: 'visibilGroup', required: true }),
  AddCol({
    name: 'admins',
    label_trans: 'groups.admins',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'friendsandme',
  }),
  AddCol({
    name: 'photos',
    label_trans: 'skill.photos',
    fieldtype: costanti.FieldType.listimages,
    jointable: '',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
  }),
  AddCol({
    name: 'idCity',
    label_trans: 'skill.city',
    fieldtype: costanti.FieldType.multiselect_by_server,
    jointable: 'cities',
    tablesel: 'cities',
    noshowlabel: true,
    icon: 'fas fa-map-marker-alt',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView,
    remote_table: 'comune',
    remote_key: '_id',
    remote_field: 'comune',
  }),
  AddCol({ name: 'date_created', label_trans: 'reg.date_created', fieldtype: costanti.FieldType.onlydate,
    showWhen: costanti.showWhen.InPage + costanti.showWhen.InView_OnlyifExist }),
]



export const colmySkills = [
  /*AddCol({
    name: 'userId', label_trans: 'order.users', fieldtype: costanti.FieldType.string, jointable: 'users',
    visible: false
  }), */
  //AddCol({ name: 'name', label_trans: 'reg.name', fieldtype: costanti.FieldType.string }),
  //AddCol({ name: 'surname', label_trans: 'reg.surname', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'subTitle', label_trans: 'event.title', fieldtype: costanti.FieldType.string,
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit , maxlength: 70, noshowlabel: true }),
  AddCol({ name: 'descr', label_trans: 'proj.shortdescr', fieldtype: costanti.FieldType.string,
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist, noshowlabel: true, maxlength: 200 }),
  AddCol({
    name: 'photos',
    label_trans: 'skill.photos',
    fieldtype: costanti.FieldType.listimages,
    jointable: '',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
  }),
  AddCol({
    name: 'idSector',
    label_trans: 'sectors.name',
    fieldtype: costanti.FieldType.select,
    required: true,
    jointable: 'sectors',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InEdit,
    visible: true,
    icon: 'category',
  }),
  AddCol({
    name: 'idSkill',
    label_trans: 'skill.name',
    fieldtype: costanti.FieldType.select,
    required: true,
    jointable: 'skills',
    filter_table: 'sectors',
    filter_field: 'idSector',
    noshowlabel: true,
    icon: 'engineering',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView,
    allowNewValue: true,
  }),
  AddCol({
    name: 'idSubSkill',
    label_trans: 'skill.subskill',
    fieldtype: costanti.FieldType.multiselect,
    required: false,
    jointable: 'subskills',
    filter_table: 'skills',
    filter_field: 'idSkill',
    noshowlabel: true,
    icon: 'far fa-id-card',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView,
    allowNewValue: true,
  }),
  AddCol({
    name: 'numLevel',
    label_trans: 'level.name',
    fieldtype: costanti.FieldType.star5,
    required: false,
    jointable: 'levels',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
    noshowlabel: true,
    icon: 'grading',
  }),
  AddCol({
    name: 'idStatusSkill',
    label_trans: 'statusSkill.name',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'statusSkills',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
    noshowlabel: true,
    icon: 'mood',
  }),
  AddCol({
    name: 'idContribType',
    label_trans: 'contribtype.name',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'contribtypes',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
    noshowlabel: true,
    icon: 'currency_exchange',
    //icon: 'fas fa-hands-helping',
  }),
  AddCol({
    name: 'idCity',
    label_trans: 'skill.city',
    fieldtype: costanti.FieldType.multiselect_by_server,
    jointable: 'cities',
    tablesel: 'cities',
    noshowlabel: true,
    icon: 'fas fa-map-marker-alt',
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView,
  }),
  AddCol({ name: 'username', label_trans: 'reg.username', foredit: false, tipovisu: costanti.TipoVisu.LINK, link: '/my/username', noshowlabel: true }),
  AddCol({ name: 'note', label_trans: 'proj.longdescr', fieldtype: costanti.FieldType.html,
    showWhen: costanti.showWhen.NewRec + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
    titlepopupedit: 'Dettagli', field_extra1: 'username', subfield_extra1: '' }),
  AddCol(DuplicateRec),
  AddCol(ModifRec),
  AddCol(DeleteRec),
]

export const colStatusSkills = [
  AddCol({ name: '_id', label_trans: 'index', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'store.description' }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'theme', label_trans: 'products.theme' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableSites = [
  AddCol({ name: 'active', label_trans: 'sites.active', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'idapp', label_trans: 'sites.idapp', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'name', label_trans: 'sites.name', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'adminemail', label_trans: 'sites.adminemail', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'manageremail', label_trans: 'sites.manageremail', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'replyTo', label_trans: 'sites.replyTo', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'host', label_trans: 'sites.host', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'host_test', label_trans: 'sites.host_test', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'portapp', label_trans: 'sites.portapp', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'dir', label_trans: 'sites.dir' }),
  AddCol({ name: 'dir_test', label_trans: 'sites.dir_test', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'email_from', label_trans: 'sites.email_from', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'email_pwd', label_trans: 'sites.email_pwd', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'telegram_key', label_trans: 'sites.telegram_key', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'telegram_bot_name', label_trans: 'sites.telegram_bot_name', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'telegram_key_test', label_trans: 'sites.telegram_key_test', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'telegram_bot_name_test', label_trans: 'sites.telegram_bot_name_test', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'pathreg_add', label_trans: 'sites.pathreg_add', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'ask_to_verify_reg', label_trans: 'sites.ask_to_verify_reg', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'who', label_trans: 'sites.who', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'status', label_trans: 'sites.status', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'note', label_trans: 'sites.note', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'domain_provider', label_trans: 'sites.domain_provider', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'domain_expiring', label_trans: 'reg.domain_expiring', fieldtype: costanti.FieldType.onlydate }),
  AddCol({ name: 'next_payment', label_trans: 'reg.next_payment', fieldtype: costanti.FieldType.onlydate }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableIscrittiConacreis = [
  AddCol({ name: 'annoTesseramento', label_trans: 'reg.annoTesseramento', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'numTesseraInterna', label_trans: 'reg.numTesseraInterna', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'codiceConacreis', label_trans: 'reg.codiceConacreis', fieldtype: costanti.FieldType.string }),
  AddCol({
    name: 'metodo_pagamento',
    label_trans: 'reg.metodo_pagamento',
    fieldtype: costanti.FieldType.select,
    jointable: 'metodo_pagamento',
  }),
  AddCol({ name: 'ha_pagato', label_trans: 'reg.ha_pagato', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'name', label_trans: 'reg.name', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'surname', label_trans: 'reg.surname', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'dateofreg', label_trans: 'reg.dateofreg', fieldtype: costanti.FieldType.onlydate }),
  AddCol({ name: 'dateofapproved', label_trans: 'reg.dateofapproved', fieldtype: costanti.FieldType.onlydate }),
  AddCol({ name: 'email', label_trans: 'reg.email', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'fiscalcode', label_trans: 'reg.fiscalcode', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'residency_address', label_trans: 'reg.residency_address', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'residency_city', label_trans: 'reg.residency_city', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'residency_province', label_trans: 'reg.residency_province', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'residency_country', label_trans: 'reg.residency_country', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'residency_zipcode', label_trans: 'reg.residency_zipcode', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'dateofbirth', label_trans: 'reg.dateofbirth', fieldtype: costanti.FieldType.onlydate }),
  AddCol({ name: 'born_city', label_trans: 'reg.born_city', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'born_province', label_trans: 'reg.born_province', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'born_country', label_trans: 'reg.born_country', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'cell_phone', label_trans: 'reg.cell_phone', fieldtype: costanti.FieldType.string }),
  AddCol({
    name: 'iscrizione_compilata',
    label_trans: 'reg.iscrizione_compilata',
    fieldtype: costanti.FieldType.boolean
  }),
  AddCol({ name: 'motivazioni', label_trans: 'reg.motivazioni', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'newsletter_on', label_trans: 'reg.newsletter_on', fieldtype: costanti.FieldType.boolean }),
  AddCol({
    name: 'competenze_professionalita',
    label_trans: 'reg.competenze_professionalita',
    fieldtype: costanti.FieldType.string,
  }),
  AddCol({ name: 'cosa_potrei_offrire', label_trans: 'reg.cosa_potrei_offrire', fieldtype: costanti.FieldType.string }),
  AddCol({
    name: 'cosa_vorrei_ricevere',
    label_trans: 'reg.cosa_vorrei_ricevere',
    fieldtype: costanti.FieldType.string
  }),
  AddCol({ name: 'altre_comunicazioni', label_trans: 'reg.altre_comunicazioni', fieldtype: costanti.FieldType.string }),
  AddCol({
    name: 'come_ci_hai_conosciuto',
    label_trans: 'reg.come_ci_hai_conosciuto',
    fieldtype: costanti.FieldType.string,
  }),
  AddCol({ name: 'note', label_trans: 'reg.note', fieldtype: costanti.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const colTableProducts = [
  AddCol({ name: 'active', label_trans: 'products.active', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'code', label_trans: 'products.code' }),
  AddCol({ name: 'name', label_trans: 'products.name' }),
  AddCol({ name: 'description', label_trans: 'products.description', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'icon', label_trans: 'products.icon' }),
  AddCol({ name: 'img', label_trans: 'products.img' }),
  // AddCol({ name: 'idProducer', label_trans: 'products.idProducer' }),
  AddCol({
    name: 'idProducer',
    label_trans: 'products.producer',
    fieldtype: costanti.FieldType.select,
    jointable: 'producers',
  }),
  AddCol({
    name: 'idStorehouses',
    label_trans: 'storehouses.name',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'storehouses',
  }),
  AddCol({
    name: 'department',
    label_trans: 'products.department',
    fieldtype: costanti.FieldType.select,
    jointable: 'departments',
  }),
  // AddCol({ name: 'department', label_trans: 'products.department' }),
  AddCol({ name: 'category', label_trans: 'products.category' }),
  AddCol({ name: 'price', label_trans: 'products.price', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'after_price', label_trans: 'products.after_price' }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'size', label_trans: 'products.size' }),
  AddCol({
    name: 'quantityAvailable',
    label_trans: 'products.quantityAvailable',
    fieldtype: costanti.FieldType.number
  }),
  AddCol({ name: 'canBeShipped', label_trans: 'products.canBeShipped', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'canBeBuyOnline', label_trans: 'products.canBeBuyOnline', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'weight', label_trans: 'products.weight', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'stars', label_trans: 'products.stars', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'date', label_trans: 'products.date', fieldtype: costanti.FieldType.date }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colcontribtype = [
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'showprice', label_trans: 'event.showprice', fieldtype: costanti.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colpaymenttype = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'key', label_trans: 'reg.key' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colworkers = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'username', label_trans: 'reg.username' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colflotte = [
  AddCol({ name: 'index', label_trans: 'others.value' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col_prima', label_trans: 'ColPrima' }),
  AddCol({ name: 'col_ultima', label_trans: 'ColUltima' }),
]
const colnavi = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'idListaIngresso', label_trans: 'idListaIngresso' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col', label_trans: 'reg.col' }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'created', label_trans: 'cal.data', fieldtype: costanti.FieldType.date }),
  // AddCol({ name: 'date_start', label_trans: 'date_start', fieldtype: costanti.FieldType.date }),
  // AddCol({ name: 'date_gift_chat_open', label_trans: 'date_gift_chat_open', fieldtype: costanti.FieldType.date }),
  // AddCol({ name: 'link_chat', label_trans: 'reg.link_chat' }),
  AddCol({ name: 'parent_id', label_trans: 'parent_id' }),
  AddCol({
    name: 'sent_msg_howto_make_gift',
    label_trans: 'sent_msg_howto_make_gift',
    fieldtype: costanti.FieldType.boolean,
  }),
  // AddCol({ name: 'provvisoria', label_trans: 'reg.provvisoria', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'received_gift', label_trans: 'reg.received_gift', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'date_made_gift', label_trans: 'date_made_gift', fieldtype: costanti.FieldType.date }),
  // AddCol({ name: 'received_gift', label_trans: 'received_gift', fieldtype: costanti.FieldType.boolean }),
  // AddCol({ name: 'date_received_gift', label_trans: 'date_received_gift', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'offerta_al_fondo', label_trans: 'offerta_al_fondo', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'note', label_trans: 'note', fieldtype: costanti.FieldType.string }),
  // AddCol({ name: 'note_interne', label_trans: 'note_interne', fieldtype: costanti.FieldType.string }),
  // AddCol({ name: 'tutor', label_trans: 'tutor', fieldtype: costanti.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]
const colnavepersistente = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col', label_trans: 'reg.col' }),
  AddCol({
    name: 'date_gift_chat_open',
    label_trans: 'dashboard.nave_in_partenza',
    fieldtype: costanti.FieldType.date
  }),
  AddCol({ name: 'date_start', label_trans: 'dashboard.nave_in_chiusura', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'link_chat', label_trans: 'reg.link_chat' }),
  AddCol({ name: 'provvisoria', label_trans: 'reg.provvisoria', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'DoniAttesaDiConferma', label_trans: 'note_bot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'DoniMancanti', label_trans: 'note_bot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'DoniConfermati', label_trans: 'note_bot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'DoniConfermati', label_trans: 'note_bot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'DoniTotali', label_trans: 'note_bot', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'note_interne', label_trans: 'note_interne', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'tutor', label_trans: 'tutor', fieldtype: costanti.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const collistaingresso = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'invitante_username', label_trans: 'reg.aportador_solidario' }),
  AddCol({ name: 'date_added', label_trans: 'date_added', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'added', label_trans: 'Aggiunto', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'navestr', label_trans: 'Nave', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'note', label_trans: 'reg.note', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
  AddCol(DuplicateRec),
  AddCol(DeleteRec),
]

const colgraduatoria = [
  AddCol({ name: 'index', label_trans: 'index' }),
  AddCol({ name: 'punteggio', label_trans: 'Punt', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'numNaviEntrato', label_trans: 'Navi', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'indimbarco', label_trans: 'Imbarco', fieldtype: costanti.FieldType.number }),
  // AddCol({ name: 'numinvitati', label_trans: 'Inv.', fieldtype: costanti.FieldType.number }),
  // AddCol({ name: 'numinvitatiattivi', label_trans: 'Att.', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'numinvitatiTot', label_trans: 'Inv (Tot)', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'numinvitatiattiviTot', label_trans: 'Att. Tot', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'invitante_username', label_trans: 'reg.aportador_solidario' }),
  AddCol({ name: 'navestr', label_trans: 'Nave', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'note', label_trans: 'note', fieldtype: costanti.FieldType.string }),
  AddCol({ name: 'date_added', label_trans: 'date_added', fieldtype: costanti.FieldType.date }),
  AddCol(DuplicateRec),
  AddCol(DeleteRec),
]

const coldisciplines = [
  AddCol({ name: 'typol_code', label_trans: 'disc.typol_code' }),
  AddCol({ name: 'order', label_trans: 'disc.order', fieldtype: costanti.FieldType.number }),
  AddCol({ name: 'label', label_trans: 'event.title' }),
  AddCol({ name: 'description', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'linkpage', label_trans: 'event.linkpage' }),
  AddCol({ name: 'color', label_trans: 'event.color' }),
  AddCol({ name: 'icon', label_trans: 'event.icon' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'img_small', label_trans: 'event.img_small' }),
  AddCol({ name: 'showinhome', label_trans: 'event.showinhome', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'showinnewsletter', label_trans: 'event.showinnewsletter', fieldtype: costanti.FieldType.boolean }),
  AddCol({
    name: 'teachers',
    label_trans: 'event.teacher',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'operators',
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colTablePermission = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colTableGeneric = [
  AddCol({ name: 'value', label_trans: 'others.value' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
]

const colTableOperator = [
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'email', label_trans: 'reg.email' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'cell', label_trans: 'reg.cell' }),
  AddCol({ name: 'usertelegram', label_trans: 'op.usertelegram' }),
  AddCol({ name: 'qualification', label_trans: 'op.qualification' }),
  AddCol({ name: 'disciplines', label_trans: 'op.disciplines' }),
  AddCol({ name: 'certifications', label_trans: 'op.certifications' }),
  AddCol({ name: 'intro', label_trans: 'op.intro', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'info', label_trans: 'op.info', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'webpage', label_trans: 'op.webpage' }),
  AddCol({ name: 'days_working', label_trans: 'op.days_working' }),
  AddCol({ name: 'facebook', label_trans: 'op.facebook' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

const colTableEvents = [
  AddCol({ name: '_id', label_trans: 'event._id' }),
  AddCol({
    name: 'typol', label_trans: 'event.typol', fieldtype: costanti.FieldType.select, jointable: 'disciplines',
  }),
  AddCol({ name: 'short_tit', label_trans: 'event.short_tit' }),
  AddCol({ name: 'title', label_trans: 'event.title' }),
  AddCol({ name: 'details', label_trans: 'event.details', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'bodytext', label_trans: 'event.bodytext', fieldtype: costanti.FieldType.html }),
  AddCol({ name: 'dateTimeStart', label_trans: 'event.dateTimeStart', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'dateTimeEnd', label_trans: 'event.dateTimeEnd', fieldtype: costanti.FieldType.date }),
  AddCol({ name: 'bgcolor', label_trans: 'event.bgcolor' }),
  AddCol({ name: 'icon', label_trans: 'event.icon' }),
  AddCol({ name: 'img_small', label_trans: 'event.img_small' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({
    name: 'wherecode', label_trans: 'event.where', fieldtype: costanti.FieldType.select, jointable: 'wheres',
  }),
  AddCol({
    name: 'contribtype',
    label_trans: 'event.contribtype',
    fieldtype: costanti.FieldType.select,
    jointable: 'contribtypes',
  }),
  AddCol({ name: 'price', label_trans: 'event.price' }),
  AddCol({ name: 'infoafterprice', label_trans: 'event.infoafterprice' }),
  AddCol({
    name: 'teacher', label_trans: 'event.teacher', fieldtype: costanti.FieldType.select, jointable: 'operators',
  }),
  AddCol({
    name: 'teacher2',
    label_trans: 'event.teacher2',
    fieldtype: costanti.FieldType.select,
    jointable: 'operators',
  }),
  AddCol({
    name: 'teacher3',
    label_trans: 'event.teacher3',
    fieldtype: costanti.FieldType.select,
    jointable: 'operators',
  }),
  AddCol({
    name: 'teacher4',
    label_trans: 'event.teacher4',
    fieldtype: costanti.FieldType.select,
    jointable: 'operators',
  }),
  AddCol({ name: 'infoextra', label_trans: 'event.infoextra' }),
  AddCol({ name: 'linkpage', label_trans: 'event.linkpage' }),
  AddCol({ name: 'facebook', label_trans: 'event.facebook' }),
  AddCol({ name: 'linkpdf', label_trans: 'event.linkpdf' }),
  AddCol({ name: 'note', label_trans: 'event.note' }),
  AddCol({ name: 'nobookable', label_trans: 'event.nobookable', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'internal', label_trans: 'event.internal', fieldtype: costanti.FieldType.boolean }),

  AddCol({
    name: 'pagefooter',
    label_trans: 'event.pagefooter',
    fieldtype: costanti.FieldType.multiselect,
    jointable: 'internalpage',
  }),

  AddCol({ name: 'news', label_trans: 'event.news', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'canceled', label_trans: 'event.canceled', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'deleted', label_trans: 'event.deleted', fieldtype: costanti.FieldType.boolean }),
  AddCol({ name: 'dupId', label_trans: 'event.dupId' }),
  AddCol({ name: 'modified', label_trans: 'event.modified', fieldtype: costanti.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec),
]

export const fields = {
  colSettings: [
    AddCol({ name: 'key', label_trans: 'col.label' }),
    AddCol({
      name: 'type', label_trans: 'col.type', fieldtype: costanti.FieldType.select, jointable: 'fieldstype',
    }),
    AddCol({ name: 'value_str', label_trans: 'col.value', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'value_date', label_trans: 'cal.data', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'value_num', label_trans: 'cal.num', fieldtype: costanti.FieldType.number }),
    AddCol({ name: 'value_bool', label_trans: 'cal.bool', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'serv', label_trans: 'cal.serv', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'crypted', label_trans: 'cal.crypted', fieldtype: costanti.FieldType.boolean }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

}

export const fieldsTable = {
  getrecTableList(mytable: string) {
    return this.tablesList.find((rec) => rec.value === mytable)
  },
  getColByTable(mytable: string, namecol: string) {
    const tablerec: any = this.tablesList.find((rec) => rec.value === mytable)
    if (tablerec) {
      // console.log('tablerec', tablerec.columns)
      const mycol = tablerec.columns.find((col: any) => col.name === namecol)
      // console.log('mycol = ', mycol)
      return mycol
    } else
      return null
  },
  getKeyByTable(mytable: string): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec) return ((myrec.colkey) ? myrec.colkey : '_id')
    return '_id'
  },
  getLabelByTable(mytable: string): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec) { // @ts-ignore
      return ((myrec.collabel) ? myrec.collabel : 'label')
    }
    return 'label'
  },
  getTitleByTable(mytable: string): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec) return myrec.label
    return ''
  },
  getTitleImgByTable(mytable: string): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec) return myrec.label
    return ''
  },
  getIconByTable(mytable: string): string {
    const myrec: any = this.getrecTableList(mytable)
    if (myrec) return ((myrec.icon) ? myrec.icon : '')
    return ''
  },

  colTableCalZoom: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'title', label_trans: 'event.title' }),
    AddCol({ name: 'lang', label_trans: 'pages.lang' }),
    AddCol({ name: 'typeconf', label_trans: 'zoom.typeconf' }),
    AddCol({ name: 'date_start', label_trans: 'event.dateTimeStart', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'date_end', label_trans: 'event.dateTimeEnd', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'benvenuto', label_trans: 'event.benvenuto', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'icon', label_trans: 'event.icon', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'color', label_trans: 'event.color', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'id_conf_zoom', label_trans: 'zoom.id_conf_zooom' }),
    AddCol({ name: 'note', label_trans: 'zoom.note' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  colTableUsersBase: [
    AddCol({ name: 'index', label_trans: 'reg.index' }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: costanti.FieldType.boolean }),
    AddCol({
      name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality',
    }),
    AddCol({
      name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell',
    }),
    AddCol({
      name: 'perm', label_trans: 'reg.perm', fieldtype: costanti.FieldType.binary, jointable: 'permissions',
    }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  // IColGridTable
  colTableUsers: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'index', label_trans: 'reg.index', fieldtype: costanti.FieldType.number }),
    // AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'old_order', label_trans: 'old_order' }),
    AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'subaccount', label_trans: 'SubAccount', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'navinonpresenti', label_trans: 'Navi Non Presenti', fieldtype: costanti.FieldType.boolean }),
    AddCol({
      name: 'non_voglio_imbarcarmi',
      label_trans: 'non_voglio_imbarcarmi',
      fieldtype: costanti.FieldType.boolean
    }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'profile.dateofbirth', label_trans: 'reg.dateofbirth', fieldtype: costanti.FieldType.onlydate }),
    AddCol({ name: 'profile.born_city', label_trans: 'reg.born_city', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'profile.born_province', label_trans: 'reg.born_province', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'profile.born_country', label_trans: 'reg.born_country', fieldtype: costanti.FieldType.string }),
    AddCol({
      name: 'profile.resplist',
      field: 'profile',
      subfield: 'resplist',
      label_trans: 'reg.resplist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.workerslist',
      field: 'profile',
      subfield: 'workerslist',
      label_trans: 'reg.workerslist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id',
    }),
    AddCol({
      name: 'profile.saw_and_accepted',
      field: 'profile',
      subfield: 'saw_and_accepted',
      label_trans: 'reg.saw_and_accepted',
      fieldtype: costanti.FieldType.binary,
      jointable: 'accepted',
    }),
    AddCol({
      name: 'profile.saw_zoom_presentation',
      field: 'profile',
      subfield: 'saw_zoom_presentation',
      label_trans: 'reg.saw_zoom_presentation',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.ask_zoom_partecipato',
      field: 'profile',
      subfield: 'ask_zoom_partecipato',
      label_trans: 'reg.ask_zoom_partecipato',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.qualified',
      field: 'profile',
      subfield: 'qualified',
      label_trans: 'reg.qualified',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.qualified_2invitati',
      field: 'profile',
      subfield: 'qualified_2invitati',
      label_trans: '2_Inv',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.my_dream', field: 'profile', subfield: 'my_dream', label_trans: 'reg.my_dream',
    }),
    AddCol({
      name: 'profile.email_paypal',
      field: 'profile',
      subfield: 'email_paypal',
      label_trans: 'reg.email_paypal',
    }),
    AddCol({
      name: 'profile.payeer_id',
      field: 'profile',
      subfield: 'payeer_id',
      label_trans: 'reg.payeer_id',
    }),
    AddCol({
      name: 'profile.advcash_id',
      field: 'profile',
      subfield: 'advcash_id',
      label_trans: 'reg.advcash_id',
    }),
    AddCol({
      name: 'profile.revolut',
      field: 'profile',
      subfield: 'revolut',
      label_trans: 'revolut',
    }),
    AddCol({
      name: 'profile.link_payment',
      field: 'profile',
      subfield: 'link_payment',
      label_trans: 'reg.link_payment',
    }),
    AddCol({
      name: 'profile.note_payment',
      field: 'profile',
      subfield: 'note_payment',
      label_trans: 'reg.note_payment',
    }),
    AddCol({
      name: 'profile.paymenttypes',
      field: 'profile',
      subfield: 'paymenttypes',
      label_trans: 'reg.paymenttype',
      fieldtype: costanti.FieldType.multiselect,
      jointable: 'paymenttypes',
    }),
    // AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    // AddCol({ name: 'aportador_solidario_ind_order', label_trans: 'reg.aportador_solidario_ind_order' }),
    // AddCol({ name: 'aportador_solidario_nome_completo', label_trans: 'reg.aportador_solidario_nome_completo' }),
    AddCol({ name: 'aportador_solidario', label_trans: 'reg.aportador_solidario' }),
    AddCol({
      name: 'profile.special_req',
      field: 'profile',
      subfield: 'special_req',
      label_trans: 'reg.special_req',
      fieldtype: costanti.FieldType.boolean,
    }),
    // AddCol({ name: 'profile.vuole_ritessersi', field: 'profile', subfield: 'vuole_ritessersi', label_trans: 'reg.vuole_ritessersi', fieldtype: costanti.FieldType.boolean  }),
    AddCol({ name: 'lang', field: 'lang', label_trans: 'reg.lang' }),
    AddCol({
      name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality',
    }),
    AddCol({
      name: 'profile.intcode_cell',
      field: 'profile',
      subfield: 'intcode_cell',
      label_trans: 'reg.intcode_cell',
    }),
    AddCol({
      name: 'profile.iso2_cell', field: 'profile', subfield: 'iso2_cell', label_trans: 'reg.iso2_cell',
    }),
    AddCol({
      name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell',
    }),
    AddCol({
      name: 'profile.country_pay', field: 'profile', subfield: 'country_pay', label_trans: 'reg.country_pay',
    }),
    AddCol({
      name: 'profile.teleg_id_old',
      field: 'profile',
      subfield: 'teleg_id_old',
      label_trans: 'reg.teleg_id_old',
    }),
    AddCol({
      name: 'profile.teleg_checkcode',
      field: 'profile',
      subfield: 'teleg_checkcode',
      label_trans: 'reg.teleg_checkcode',
    }),
    AddCol({
      name: 'profile.manage_telegram',
      field: 'profile',
      subfield: 'manage_telegram',
      label_trans: 'reg.manage_telegram',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.myshares',
      field: 'profile',
      subfield: 'myshares',
      label_trans: 'reg.myshares',
    }),
    AddCol({
      name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false,
    }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'lasttimeonline', label_trans: 'reg.lasttimeonline', fieldtype: costanti.FieldType.date }),
    // AddCol({ name: 'idapp', label_trans: 'reg.idapp', fieldtype: costanti.FieldType.string }),
    AddCol({
      name: 'perm', label_trans: 'reg.perm', fieldtype: costanti.FieldType.binary, jointable: 'permissions', titlepopupedit: 'Permessi'
    }),
    AddCol({ name: 'ipaddr', label_trans: 'reg.ipaddr' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  colTableUsersCNM: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    // AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: costanti.FieldType.boolean }),
    // AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    // AddCol({ name: 'aportador_solidario', label_trans: 'reg.aportador_solidario' }),
    AddCol({
      name: 'profile.resplist',
      field: 'profile',
      subfield: 'resplist',
      label_trans: 'reg.resplist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.workerslist',
      field: 'profile',
      subfield: 'workerslist',
      label_trans: 'reg.workerslist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.special_req',
      field: 'profile',
      subfield: 'special_req',
      label_trans: 'reg.special_req',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.my_dream', field: 'profile', subfield: 'my_dream', label_trans: 'reg.my_dream',
    }),
    AddCol({ name: 'lang', field: 'lang', label_trans: 'reg.lang' }),
    AddCol({
      name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality',
    }),
    AddCol({
      name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell',
    }),
    AddCol({
      name: 'profile.email_paypal',
      field: 'profile',
      subfield: 'email_paypal',
      label_trans: 'reg.email_paypal',
    }),
    /* AddCol({
      name: 'profile.payeer_id',
      field: 'profile',
      subfield: 'payeer_id',
      label_trans: 'reg.payeer_id'
    }),
    AddCol({
      name: 'profile.advcash_id',
      field: 'profile',
      subfield: 'advcash_id',
      label_trans: 'reg.advcash_id'
    }),
    AddCol({
      name: 'profile.revolut',
      field: 'profile',
      subfield: 'revolut',
      label_trans: 'revolut'
    }), */
    AddCol({
      name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id',
    }),

    AddCol({
      name: 'profile.teleg_checkcode',
      field: 'profile',
      subfield: 'teleg_checkcode',
      label_trans: 'reg.teleg_checkcode',
    }),
    AddCol({
      name: 'profile.manage_telegram',
      field: 'profile',
      subfield: 'manage_telegram',
      label_trans: 'reg.manage_telegram',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.socio',
      field: 'profile',
      subfield: 'socio',
      label_trans: 'reg.socio',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.socioresidente',
      field: 'profile',
      subfield: 'socioresidente',
      label_trans: 'reg.socioresidente',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.consiglio',
      field: 'profile',
      subfield: 'consiglio',
      label_trans: 'reg.consiglio',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({ name: 'profile.motivazioni', field: 'profile', subfield: 'motivazioni', label_trans: 'reg.motivazioni', }),
    AddCol({ name: 'profile.biografia', field: 'profile', subfield: 'biografia', label_trans: 'reg.biografia', }),
    AddCol({
      name: 'profile.competenze_professionalita',
      field: 'profile',
      subfield: 'competenze_professionalita',
      label_trans: 'reg.competenze_professionalita',
    }),
    AddCol({
      name: 'profile.cosa_offrire',
      field: 'profile',
      subfield: 'cosa_offrire',
      label_trans: 'reg.cosa_offrire',
    }),
    AddCol({
      name: 'profile.cosa_ricevere',
      field: 'profile',
      subfield: 'cosa_ricevere',
      label_trans: 'reg.cosa_ricevere',
    }),
    AddCol({
      name: 'profile.altre_comunicazioni',
      field: 'profile',
      subfield: 'altre_comunicazioni',
      label_trans: 'reg.altre_comunicazioni',
    }),
    AddCol({
      name: 'profile.come_ci_hai_conosciuto',
      field: 'profile',
      subfield: 'come_ci_hai_conosciuto',
      label_trans: 'reg.come_ci_hai_conosciuto',
    }),
    AddCol({
      name: 'profile.come_aiutare',
      field: 'profile',
      subfield: 'come_aiutare',
      label_trans: 'reg.come_aiutare',
    }),
    AddCol({
      name: 'profile.paymenttypes',
      field: 'profile',
      subfield: 'paymenttypes',
      label_trans: 'reg.paymenttype',
      fieldtype: costanti.FieldType.multiselect,
      jointable: 'paymenttypes',
    }),
    AddCol({
      name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false,
    }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'lasttimeonline', label_trans: 'reg.lasttimeonline', fieldtype: costanti.FieldType.date }),
    // AddCol({ name: 'idapp', label_trans: 'reg.idapp', fieldtype: costanti.FieldType.string }),
    AddCol({
      name: 'perm', label_trans: 'reg.perm', fieldtype: costanti.FieldType.binary, jointable: 'permissions', titlepopupedit: 'Permessi'
    }),
    AddCol({ name: 'ipaddr', label_trans: 'reg.ipaddr' }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  colTableUsersISP: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    // AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    AddCol({ name: 'aportador_solidario', label_trans: 'reg.aportador_solidario' }),
    AddCol({ name: 'verified_by_aportador', label_trans: 'reg.verified_by_aportador', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'trust_modified', label_trans: 'reg.trust_modified', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'blocked', label_trans: 'reg.blocked', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'username_who_block', label_trans: 'reg.username_who_block' }),
    AddCol({
      name: 'profile.resplist',
      field: 'profile',
      subfield: 'resplist',
      label_trans: 'reg.resplist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.workerslist',
      field: 'profile',
      subfield: 'workerslist',
      label_trans: 'reg.workerslist',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.special_req',
      field: 'profile',
      subfield: 'special_req',
      label_trans: 'reg.special_req',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.my_dream', field: 'profile', subfield: 'my_dream', label_trans: 'reg.my_dream',
    }),
    AddCol({ name: 'lang', field: 'lang', label_trans: 'reg.lang' }),
    AddCol({
      name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality',
    }),
    AddCol({ name: 'profile.dateofbirth', label_trans: 'reg.dateofbirth', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'profile.born_city', label_trans: 'reg.born_city', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'profile.born_province', label_trans: 'reg.born_province', fieldtype: costanti.FieldType.string }),
    AddCol({ name: 'profile.born_country', label_trans: 'reg.born_country', fieldtype: costanti.FieldType.string }),
    AddCol({
      name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell',
    }),
    AddCol({
      name: 'profile.email_paypal',
      field: 'profile',
      subfield: 'email_paypal',
      label_trans: 'reg.email_paypal',
    }),
    /* AddCol({
      name: 'profile.payeer_id',
      field: 'profile',
      subfield: 'payeer_id',
      label_trans: 'reg.payeer_id'
    }),
    AddCol({
      name: 'profile.advcash_id',
      field: 'profile',
      subfield: 'advcash_id',
      label_trans: 'reg.advcash_id'
    }),
    AddCol({
      name: 'profile.revolut',
      field: 'profile',
      subfield: 'revolut',
      label_trans: 'revolut'
    }), */
    AddCol({
      name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id',
    }),

    AddCol({
      name: 'profile.teleg_checkcode',
      field: 'profile',
      subfield: 'teleg_checkcode',
      label_trans: 'reg.teleg_checkcode',
    }),
    AddCol({
      name: 'profile.manage_telegram',
      field: 'profile',
      subfield: 'manage_telegram',
      label_trans: 'reg.manage_telegram',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.username_telegram',
      field: 'profile',
      subfield: 'username_telegram',
      label_trans: 'reg.username_telegram',
    }),
    AddCol({
      name: 'profile.firstname_telegram',
      field: 'profile',
      subfield: 'firstname_telegram',
      label_trans: 'reg.firstname_telegram',
    }),
    AddCol({
      name: 'profile.lastname_telegram',
      field: 'profile',
      subfield: 'lastname_telegram',
      label_trans: 'reg.lastname_telegram',
    }),
    AddCol({
      name: 'profile.socio',
      field: 'profile',
      subfield: 'socio',
      label_trans: 'reg.socio',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.socioresidente',
      field: 'profile',
      subfield: 'socioresidente',
      label_trans: 'reg.socioresidente',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({
      name: 'profile.consiglio',
      field: 'profile',
      subfield: 'consiglio',
      label_trans: 'reg.consiglio',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({ name: 'profile.motivazioni', field: 'profile', subfield: 'motivazioni', label_trans: 'reg.motivazioni', }),
    AddCol({ name: 'profile.biografia', field: 'profile', subfield: 'biografia', label_trans: 'reg.biografia', }),
    AddCol({ name: 'profile.qualifica', field: 'profile', subfield: 'qualifica', label_trans: 'reg.qualifica', }),
    AddCol({
      name: 'profile.paymenttypes',
      field: 'profile',
      subfield: 'paymenttypes',
      label_trans: 'reg.paymenttype',
      fieldtype: costanti.FieldType.multiselect,
      jointable: 'paymenttypes',
    }),
    AddCol({
      name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false,
      showWhen: costanti.showWhen.NewRec + costanti.showWhen.InPage + costanti.showWhen.InEdit + costanti.showWhen.InView_OnlyifExist,
    }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'lasttimeonline', label_trans: 'reg.lasttimeonline', fieldtype: costanti.FieldType.date }),
    AddCol({
      name: 'perm', label_trans: 'reg.perm', fieldtype: costanti.FieldType.binary, jointable: 'permissions', titlepopupedit: 'Permessi'
    }),
    AddCol({ name: 'ipaddr', label_trans: 'reg.ipaddr' }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: costanti.FieldType.boolean }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  colTableExtraList: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'registered', label_trans: 'reg.registered', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: costanti.FieldType.date }),
    AddCol({ name: 'name_complete', label_trans: 'reg.name_complete' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    AddCol({ name: 'contacted', label_trans: 'reg.contacted', fieldtype: costanti.FieldType.boolean }),
    AddCol({
      name: 'saw_zoom_presentation',
      label_trans: 'reg.saw_zoom_presentation',
      fieldtype: costanti.FieldType.boolean,
    }),
    AddCol({ name: 'num_invitati', label_trans: 'reg.num_invitati', fieldtype: costanti.FieldType.number }),
    AddCol({ name: 'is_in_whatsapp', label_trans: 'reg.is_in_whatsapp', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'is_in_telegram', label_trans: 'reg.is_in_telegram', fieldtype: costanti.FieldType.boolean }),
    AddCol({ name: 'cell_complete', label_trans: 'reg.cell_complete' }),
    AddCol({ name: 'nationality', label_trans: 'reg.nationality', fieldtype: costanti.FieldType.nationality }),
    AddCol({ name: 'aportador_solidario_name_surname', label_trans: 'reg.aportador_solidario_nome_completo' }),
    AddCol({ name: 'aportador_solidario_ind_order', label_trans: 'reg.aportador_solidario_ind_order' }),
    AddCol({
      name: 'aportador_solidario_originale_name_surname',
      label_trans: 'reg.aportador_solidario_nome_completo_orig',
    }),
    AddCol({ name: 'col_b', label_trans: 'reg.col_b', fieldtype: costanti.FieldType.number }),
    AddCol({ name: 'col_h', label_trans: 'reg.col_h', fieldtype: costanti.FieldType.number }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  colTableCash:
    [],

  colTableCashCategory: [
    AddCol({ name: 'descr', label_trans: 'pages.description' }),
    AddCol({ name: 'notes', label_trans: 'reg.note' }),
  ],

  colTableSubCashCategory: [
    AddCol({
      name: 'idCashCategory',
      label_trans: 'Category.idCashCategory',
      fieldtype: costanti.FieldType.select,
      jointable: 'cashcategory',
    }),
    AddCol({ name: 'descr', label_trans: 'pages.description' }),
    AddCol({ name: 'notes', label_trans: 'reg.note' }),
  ],

  tableForUsers: [
    'myskills',
  ],

  tableRemotePickup: [
    'countries',
    'phones',
    'cities',
  ],

  tableWithUsername: [
    'myskills',
  ],

  tablesList: [
    {
      value: 'operators',
      label: 'Insegnanti',
      columns: colTableOperator,
      colkey: 'username',
      collabel: (rec: any) => `${rec.name} ${rec.surname}`,
    },
    {
      value: 'internalpages',
      label: 'Pagine Interne',
      columns: colmypage,
      colkey: 'path',
      collabel: 'title',
    },
    {
      value: 'products',
      label: 'Prodotti',
      columns: colTableProducts,
      colkey: '_id',
      collabel: 'name',
    },
    {
      value: 'producers',
      label: 'Produttori',
      columns: colTableProducer,
      colkey: '_id',
      collabel: 'name',
    },
    {
      value: 'departments',
      label: 'Uffici',
      columns: colTabledepartments,
      colkey: 'username',
      collabel: 'name',
    },
    {
      value: 'storehouses',
      label: 'Magazzini',
      columns: colTableStorehouse,
      colkey: '_id',
      collabel: (rec: any) => `${rec.name} (${rec.city})`,
    },
    {
      value: 'sharewithus',
      label: 'Condividi con Noi',
      columns: colTableShareWithUs,
      colkey: '_id',
      collabel: 'description',
    },
    {
      value: 'wheres',
      label: 'Luoghi',
      columns: colTableWhere,
      colkey: 'code',
      collabel: 'placename',
    },
    {
      value: costanti.TABEVENTS,
      label: 'Eventi',
      columns: colTableEvents,
      colkey: '_id',
      collabel: 'title',
    },
    {
      value: 'contribtypes',
      label: 'Tipi di Contributi',
      columns: colcontribtype,
      colkey: '_id',
      collabel: 'label',
    },
    {
      value: 'paymenttypes',
      label: 'Tipi di Pagamenti',
      columns: colpaymenttype,
      colkey: 'key',
      collabel: 'label',
    },
    {
      value: 'workers',
      label: 'Lavoratori Attivi',
      columns: colworkers,
      colkey: '_id',
      collabel: (rec: any) => `${rec.name} ${rec.surname}`,
    },
    {
      value: 'navi',
      label: 'Navi',
      columns: colnavi,
      colkey: '_id',
      collabel: (rec: any) => `${rec.riga}.${rec.col}`,
    },
    {
      value: 'flotte',
      label: 'Flotte',
      columns: colflotte,
      colkey: '_id',
      collabel: (rec: any) => `${rec.riga}.${rec.col_prima} ${rec.riga}.${rec.col_ultima}`,
    },
    {
      value: 'navepersistente',
      label: 'Navi Persistenti',
      columns: colnavepersistente,
      colkey: '_id',
      collabel: (rec: any) => `${rec.riga}.${rec.col}`,
    },
    {
      value: 'listaingressos',
      label: 'Lista Ingresso',
      columns: collistaingresso,
      colkey: '_id',
      collabel: 'ind_order',
    },
    {
      value: 'graduatorias',
      label: 'Graduatoria',
      columns: colgraduatoria,
      colkey: '_id',
      collabel: 'index',
    },
    {
      value: 'disciplines',
      label: 'Discipline',
      columns: coldisciplines,
      colkey: 'typol_code',
      collabel: 'label',
    },
    {
      value: 'newstosent',
      label: 'Newsletter da Inviare',
      columns: colnewstosent,
      colkey: '_id',
      collabel: 'label',
      onlyAdmin: true,
    },
    {
      value: 'gallery',
      label: 'Gallerie',
      columns: colgallery,
      colkey: '_id',
      collabel: 'title',
    },
    {
      value: 'templemail',
      label: 'Template Email',
      columns: coltemplemail,
      colkey: '_id',
      collabel: 'subject',
      onlyAdmin: true,
    },
    {
      value: 'opzemail',
      label: 'Opzioni Email',
      columns: colopzemail,
      colkey: 'key',
      collabel: (rec: any) => rec.label_it,
      onlyAdmin: true,
    },
    {
      value: 'mailinglist',
      label: 'MailingList',
      columns: colmailinglist,
      colkey: '_id',
      collabel: (rec: any) => `${rec.name} ${rec.surname}`,
    },
    {
      value: 'permissions',
      label: 'Permessi',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'bottype',
      label: 'Tipo di Bot',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'visibility',
      label: 'Visibilità Permessi',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'visibilGroup',
      label: 'Visibilità',
      columns: colTableGeneric,
      colkey: 'value',
      collabel: 'label',
      noshow: true,
    },
    {
      value: 'lang',
      label: 'Lingua',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'regions',
      label: 'Regioni',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'accepted',
      label: 'Condizioni',
      colkey: 'value',
      collabel: 'label',
      noshow: true,
    },
    {
      value: 'fieldstype',
      label: 'Tipi di Campi',
      colkey: 'value',
      collabel: 'label',
      noshow: true,
    },
    {
      value: 'metodo_pagamento',
      label: 'Metodi di Pagamento',
      colkey: 'value',
      collabel: 'label',
      noshow: true,
    },
    {
      value: 'settings',
      label: 'Impostazioni',
      columns: fields.colSettings,
      colkey: 'key',
      collabel: 'key',
    },
    {
      value: 'myskills',
      label: 'Mie Competenze',
      columns: colmySkills,
      colkey: '_id',
      collabel: (rec: any) => `${rec.name} ${rec.surname}`,
    },
    {
      value: 'skills',
      label: 'Competenze',
      columns: colSkills,
      colkey: '_id',
      collabel: 'descr',
    },
    {
      value: 'subskills',
      label: 'Specializzazione',
      columns: colSubSkills,
      colkey: '_id',
      collabel: 'descr',
    },
    {
      value: 'statusSkills',
      label: 'Stato Attuale',
      columns: colStatusSkills,
      colkey: '_id',
      collabel: 'descr',
    },
    {
      value: 'sectors',
      label: 'Settori',
      columns: colSectors,
      colkey: '_id',
      collabel: 'descr',
    },
    {
      value: 'levels',
      label: 'Livello',
      columns: colLevels,
      colkey: '_id',
      collabel: 'descr',
    },
    {
      value: 'cities',
      label: 'Comune',
      columns: colCitys,
      colkey: '_id',
      collabel: 'comune',
      // collabel: (rec: any) => `${rec.comune} (${rec.prov})`,
      remote: true,
    },
    {
      value: 'provinces',
      label: 'Provincia',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      remote: true,
    },
    {
      value: 'countries',
      label: 'Nazione',
      columns: colTableCountry,
      colkey: 'id',
      collabel: 'value',
      remote: true,
    },
    {
      value: 'phones',
      label: 'Prefisso Int.',
      columns: colTablePhones,
      colkey: 'id',
      collabel: 'value',
      remote: true,
    },
    {
      value: 'friends',
      label: 'Amici',
      columns: colTableUsersGeneric,
      colkey: 'username',
      collabel: 'username',
    },
    {
      value: 'friendsandme',
      label: 'Amici',
      columns: colTableUsersGeneric,
      colkey: 'username',
      collabel: 'username',
    },
    {
      value: 'mygroups',
      label: 'Gruppi',
      columns: colTableMyGroup,
      colkey: 'groupname',
      collabel: 'groupname',
    },
  ],
}

export const func = {
  gettablesList() {
    const userStore = useUserStore()
    if (fieldsTable.tablesList) {
      const mylist = fieldsTable.tablesList.filter((rec) => ((rec.onlyAdmin === userStore.isAdmin) || (!rec.onlyAdmin)) && (!rec.noshow))

      return mylist
    }

    return []
  },
}
