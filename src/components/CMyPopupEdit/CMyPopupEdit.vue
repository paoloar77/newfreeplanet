<template>
  <div :class="getclassCol(col)">
    <div
      v-if="tools.checkIfShowField(col, insertMode ? tools.TIPOVIS_NEW_RECORD : (isInModif ? tools.TIPOVIS_EDIT_RECORD : tools.TIPOVIS_SHOW_RECORD), visulabel, myvalue)"
      style="flex-grow: 1;">
      <div
        :class="{ flex: !isInModif, 'justify-center': true }">
        <div>
          <!-- Edit Value -->
          <div v-if="col.fieldtype === costanti.FieldType.boolean">
            <div v-if="isInModif">
              <q-toggle
                dark color="green" v-model="myvalue" :label="col.title ? col.title : col.label"
                @update:model-value="changevalRec"></q-toggle>
            </div>
            <div v-else>
              <q-toggle
                dark color="green" v-model="myvalue" :label="col.title"
                :disable="disable && col.name !== 'profile.saw_zoom_presentation'"
                @update:model-value="Savedb"></q-toggle>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.link">
            <div v-if="isInModif">
              <q-input
                v-bind="$attrs"
                v-model="myvalue"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                :style="$q.screen.lt.sm ? 'min-width: 300px' : ''"
                :disable="disable"
                :readonly="disable"
                :type="`text`"
                @keyup.enter.stop
                @update:model-value="changevalRec"
                autofocus
                :label="col.label">
              </q-input>
            </div>
            <div v-else>
              <div class="q-ma-xs">
                <q-btn v-if="myvalue"
                       type="a" rounded size="md"
                       :class="{disabled: disable }"
                       color="white" text-color="blue"
                       :icon="col.icon ? col.icon : `fas fa-globe`"
                       :href="tools.getlinkstd(myvalue)"
                       :label="tools.firstchars(myvalue, 40)"
                       target="_blank"
                >
                </q-btn>
              </div>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.username_chip">
            <div class="q-ma-xs">
              <q-btn v-if="col.tipovisu === costanti.TipoVisu.LINK && myvalue"
                     type="a" rounded size="md"
                     :class="{disabled: disable }"
                     color="white" text-color="blue" :icon="`img:`+userStore.getImgUserByUsername(myvalue)"
                     :to="col.link.replace(col.name, myvalue)"
                     :label="myvalue"
              >
              </q-btn>
              <q-avatar v-else-if="col.tipovisu === costanti.TipoVisu.LINKIMG && myvalue" size="60px">

                <q-img :src="getImgUser(contact)" :alt="myvalue" img-class="imgprofile" height="60px"/>
              </q-avatar>
              <q-btn v-else-if="col.tipovisu === costanti.TipoVisu.BUTTON && myvalue" rounded size="sm"
                     color="primary" icon="person" :to="col.link.replace(col.name, myvalue)" :label="myvalue">
              </q-btn>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.string || col.fieldtype === costanti.FieldType.crypted">
            <div v-if="isInModif" :class="{ flex: !isInModif}">
              <q-input
                v-bind="$attrs"
                v-model="myvalue"
                :autogrow="col.fieldtype !== costanti.FieldType.crypted"
                :style="$q.screen.lt.sm ? 'min-width: 300px' : ''"
                counter
                :maxlength="col.maxlength ? col.maxlength : undefined"
                :disable="disable"
                :readonly="disable"
                :type="col.fieldtype === costanti.FieldType.crypted ? `password` : `text`"
                @keyup.enter.stop
                @update:model-value="changevalRec"
                autofocus
                :label="col.label">
              </q-input>
            </div>
            <div v-else-if="col.tipovisu === costanti.TipoVisu.TESTO_BORDATO" :class="{ flex: !isInModif}">
              <CLabel
                v-bind="$attrs"
                :value="myvalue"
                :label="t(col.label_trans)"
              />
            </div>
            <div v-else>
              <q-btn v-if="col.tipovisu === costanti.TipoVisu.LINK && myvalue"
                     type="a" rounded size="md"
                     :class="{disabled: disable }"
                     color="white" text-color="blue" :icon="`img:`+userStore.getImgUserByUsername(myvalue)"
                     :to="col.link.replace(col.name, myvalue)"
                     :label="myvalue"
              >
              </q-btn>
              <q-avatar v-else-if="col.tipovisu === costanti.TipoVisu.LINKIMG && myvalue" size="60px">

                <q-img :src="getImgUser(contact)" :alt="myvalue" img-class="imgprofile" height="60px"/>
              </q-avatar>
              <q-btn v-else-if="col.tipovisu === costanti.TipoVisu.BUTTON && myvalue" rounded size="sm"
                     color="primary" icon="person" :to="col.link.replace(col.name, myvalue)" :label="myvalue">
              </q-btn>
              <span v-else :class="{disabled: disable }" v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.number">
            <div v-if="canEdit || isInModif">
              <q-input
                v-bind="$attrs"
                v-model="myvalue"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                @update:model-value="Savedb"
                :label="visulabel ? t(col.label_trans) : ''"
                type="number"
                autofocus>

              </q-input>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.hours">
            <div v-if="isFieldDb()">
              <CMySelect
                :type_out="col.field_outtype"
                label="Ore"
                v-model:value="myvalue"
                @update:value="changevalRec"
                optval="_id" optlab="label"
                :useinput="false"
                :col="col"
                :row="row"
                :options="tools.SelectHours">
              </CMySelect>
            </div>
            <div v-else>
              <q-input
                v-model="myvalue" type="number"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                @update:value="changevalRec"
                autofocus>

              </q-input>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.listimages" style="text-align: center;">
            <CGallery
              :imagebak="col.showpicprofile_ifnotset ? ((userStore.getImgByProfile(row, true) === '') ? costanti.NESSUN_IMMAGINE : userStore.getImgByProfile(row, true)) : ''"
              :title="getTitleGall()"
              :directory="getDirectoryGall()"
              :imgGall="myvalue"
              :isInModif="isInModif"
              :edit="isviewfield() && isInModif"
              :canModify="canModify && isInModif"
              @showandsave="Savedb">
            </CGallery>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.listobj" style="text-align: center;">
            <CAccomodation
              :mylist="myvalue"
              :isInModif="isInModif"
              :edit="isviewfield() && isInModif"
              :canModify="canModify && isInModif"
              @showandsave="Savedb">
            </CAccomodation>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.image">
            <div v-if="canEdit">
              {{ $t('reg.photo') }}
              <CGallery
                :imagebak="col.showpicprofile_ifnotset ? userStore.getImgByProfile(row['profile'], true) : ''"
                :title="getTitleGall()"
                :directory="getDirectoryGall()"
                :imgGall="[{ imagefile: myvalue }]"
                :edit="isviewfield()"
                :canModify="canModify"
                :isInModif="isInModif"
                :single="isFieldDb()"
                @update:imgGall="changevalRec"
                @showandsave="Savedb">
              </CGallery>
            </div>
            <div v-else>
              <div v-if="myvalue" class="text-center">
                <q-img
                  :src="myvalue"
                  class="text-center"
                  style="height: 100px; width: 100px;"
                  alt="foto">
                </q-img>
              </div>
              <div v-else class="text-center">
                <q-img
                  :src="col.showpicprofile_ifnotset ? userStore.getImgByProfile(row['profile'], true) : 'images/noimg-user.svg'"
                  class="text-center"
                  style="height: 100px; width: 100px;"
                  alt="nessuna immagine">
                </q-img>
              </div>
              <q-btn
                v-if="myvalue"
                label="Rimuovi Foto"
                color="blue" icon="fas fa-trash-alt" size="sm"
                @click="removephoto"></q-btn>

            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.nationality">
            <div v-if="isInModif" class="justify-center q-gutter-sm clgutter q-mt-sm">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :tablesel="tablesel"
                :pickup="pickup"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.intcode">
            <div v-if="isInModif" class="justify-center q-gutter-sm clgutter q-mt-sm">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :tablesel="tablesel"
                :pickup="pickup"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.date">
            <div v-if="myvalue">
              <CDateTime
                :label="col.label ? col.label : t(col.label_trans)"
                class="cursor-pointer"
                v-model:value="myvalue"
                :readonly="false"
                :minuteinterval="minuteinterval"
                :dense="true"
                :canEdit="canEdit"
                @savetoclose="SaveValueInt"
                @show="OpenEdit">
              </CDateTime>
            </div>
            <div v-else-if="canEdit">
              <q-btn
                dense
                color="primary" @click="OpenEditDateToday"
                icon="fas fa-calendar-day"
              />
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.onlydate">
            <CDateTime
              :label="col.label ? col.label : t(col.label_trans)"
              class="cursor-pointer"
              :valueDate="myvalue"
              v-model:value="myvalue"
              :readonly="false"
              :minuteinterval="minuteinterval"
              :dense="true"
              :canEdit="canEdit"
              @savetoclose="SaveValueInt"
              @show="OpenEdit"
              view="date">
            </CDateTime>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.binary">
            <div v-if="isInModif">
              <span v-if="insertMode">
                {{ col.label ? col.label : t(col.label_trans) }}:
              </span>
              <CMyToggleList
                :label="col.titlepopupedit ? col.titlepopupedit : ''"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)">
              </CMyToggleList>
            </div>
            <div v-else>
              <CMyChipList
                :rec="row"
                :type="costanti.FieldType.binary"
                :value="myvalue"
                @update:value="changevalRec"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>

          </div>
          <!-- Show Value -->
          <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
            <div v-if="isInModif">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :multiple="true"
                :withToggle="true"
                :label="col.label ? col.label : t(col.label_trans)"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                v-model:arrvalue="myvalue"
                @update:arrvalue="changevalRec"
                :addall="false"
                :addnone="false"
                label-color="primary"
                class="combowidth"
                color="primary"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :sola_lettura="!isInModif"
                :useinput="col.allowNewValue"
                :newvaluefunc="addNewValue">
              </CMySelect>

              <!--<q-select
                v-model="myvalue"
                rounded
                outlined
                multiple
                dense
                options-dense
                :display-value="fieldsTable.getTitleByTable(col.jointable)"
                emit-value
                map-options
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                class="combowidth"
                :option-value="fieldsTable.getKeyByTable(col.jointable)"
                @update:model-value="changevalRec">

                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps">

                    <q-item-section>
                      <q-item-label>{{ opt[fieldsTable.getLabelByTable(col.jointable)] }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)"/>
                    </q-item-section>
                  </q-item>
                </template>

              </q-select>-->

            </div>
            <div v-else>
              <CMyChipList
                :rec="row"
                :type="col.fieldtype"
                :type_out="col.field_outtype"
                @update:value="changevalRec"
                :value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
          </div>
          <div
            v-else-if="(col.fieldtype === costanti.FieldType.select) || (col.fieldtype === costanti.FieldType.select_by_server)">
            <div v-if="isInModif">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="myvalue"
                :pickup="col.fieldtype === costanti.FieldType.select_by_server"
                :tablesel="col.fieldtype === costanti.FieldType.select_by_server ? tablesel : ''"
                @update:value="changevalRec"
                :newvaluefunc="addNewValue"
                :filter_table="col.filter_table"
                :addnone="col.addnone"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="col.allowNewValue">
              </CMySelect>
            </div>
            <div v-else>

              <!--
              rec: {{rec}}
              row: {{row}}
              col.jointable {{col.jointable}}
              myvalue {{myvalue}}
              opt: {{globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)}}
              val:  {{fieldsTable.getKeyByTable(col.jointable)}}
              lab: {{fieldsTable.getLabelByTable(col.jointable)}}-->
              <CMyChipList
                :rec="row"
                myclass="text-center"
                :type="col.fieldtype"
                :type_out="col.field_outtype"
                @update:value="changevalRec"
                v-model:value="myvalue"
                :labelifblank="canEdit ? 'Selezionare' : '' "
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.multiselect_by_server">

            <CMySelect
              :type_out="col.field_outtype"
              :col="col"
              :row="row"
              :multiselect_by_server="true"
              :label="col.label ? col.label : t(col.label_trans)"
              v-model:arrvalue="myvalue"
              @update:arrvalue="changevalRec"
              :addall="false"
              :addnone="false"
              :tablesel="col.tablesel"
              :pickup="true"
              :filter_table="col.filter_table"
              :filter_field="col.filter_field"
              :value_extra="value_extra"
              label-color="primary"
              class="combowidth"
              color="primary"
              :optval="fieldsTable.getKeyByTable(col.jointable)"
              :optlab="fieldsTable.getLabelByTable(col.jointable)"
              :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
              :sola_lettura="!isInModif"
              :useinput="isInModif">
            </CMySelect>
          </div>
          <div v-else-if="(col.fieldtype === costanti.FieldType.star5 || col.fieldtype === costanti.FieldType.star3)">
            <div v-if="isInModif">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else>
              <q-rating
                :model-value="`${myvalue}` - 1"
                @update:model-value="changevalRec"
                size="1.5rem"
                :color="tools.getColByLevel(myvalue)"
                icon="star_border"
                icon-selected="star"
                :max="col.fieldtype === costanti.FieldType.star5 ? 5 : 3"
                :readonly="true"
              />
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.html">
            <div v-if="isInModif">
              <q-bar v-if="isInModif" dense class="bg-primary text-white">
                <span v-if="col.label_trans">{{ t(col.label_trans) }}</span><span v-else> {{
                  $t('event.testo_di_spiegazione')
                }}: </span>
                <q-space/>
              </q-bar>
              <div v-if="!isFieldDb()">
                <CMyEditor
                  v-model:value="myvalue" :title="!isInModif ? getTitleEditor(col, row) : ''" @keyup.enter.stop
                  :showButtons="false"
                  :canModify="canModify"
                  @update:value="changevalRec"
                  @showandsave="Savedb">
                </CMyEditor>
              </div>
            </div>
            <div v-else>

              <div class="row justify-evenly">
                <q-btn
                  v-if="myvalue"
                  class="q-mx-md"
                  icon="fas fa-info" color="primary" text-color="white"
                  round
                  @click="visuhtml = true">
                </q-btn>

                <q-btn
                  v-if="myvalue && col.field_extra1"
                  icon="far fa-file-alt" :label="col.titlepopupedit" color="primary" text-color="white"
                  :to="tools.getToByCol(col)"
                >
                </q-btn>
              </div>

              <div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true"></div>

              <div v-if="!isFieldDb()">
                <q-dialog v-model="visuhtml" full-height full-width>
                  <q-card>
                    <q-bar dense class="bg-primary text-white">
                      <span> {{ getTitleEditor(col, row) }} </span>
                      <q-space/>
                      <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
                    </q-bar>
                    <q-card-section class="inset-shadow">
                      <q-card class="dialog_card">
                        <div v-html="myvalue" class="wrap_anywhere"></div>
                      </q-card>
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <q-dialog v-model="visueditor" no-backdrop-dismiss persistent full-height full-width>
                  <q-card class="dialog_card">
                    <q-card-section>
                      <CMyEditor
                        v-if="visueditor" v-model:value="myvalue" :title="col.title" @keyup.enter.stop
                        :canModify="canModify"
                        @showandsave="Savedb" @annulla="visueditor=false">

                      </CMyEditor>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </div>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.password">
            <div v-if="isInModif">
              <q-input
                v-model="myvalue"
                @update:model-value="changevalRec"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                type="password"
                @keyup.enter="scope.set"
                autofocus>

              </q-input>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else>
            <span v-html="visuValByType(myvalue, col, row)"></span>
          </div>
          <q-popup-edit
            v-if="(!isInModif && canEdit && noPopupeditByCol(col))"
            v-model="myvalue"
            :disable="col.disable || disable"
            :readonly="col.disable || disable"
            :title="col.title ? col.title : col.titlepopupedit"
            buttons
            persistent
            @save="SaveValueInt"
            @show="OpenEdit"
            v-slot="scope">

            <div v-if="col.fieldtype === costanti.FieldType.boolean">
              <q-checkbox v-model="scope.value" :label="col.title ? col.title : col.titlepopupedit">
              </q-checkbox>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
            <div
              v-else-if="col.fieldtype === costanti.FieldType.string || col.fieldtype === costanti.FieldType.crypted">
              <q-input
                v-bind="$attrs"
                counter
                :type="col.fieldtype === costanti.FieldType.crypted ? 'password' : 'text'"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                :minlength="col.minlength ? col.minlength : undefined"
                v-model="scope.value"
                :autogrow="col.fieldtype !== costanti.FieldType.crypted"
                @keyup.enter.stop
                autofocus>

              </q-input>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.number">
              <div v-if="visulabel">
                <q-input
                  v-model="scope.value" type="number"
                  :maxlength="col.maxlength ? col.maxlength : undefined"
                  autofocus
                  :label="visulabel ? col.label : ''">

                </q-input>
              </div>
              <div v-else>
                <span v-html="visuValByType(myvalue, col, row)"></span>
              </div>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.hours">
              <div v-if="visulabel">
                <q-input
                  v-model="myvalue" type="number"
                  :maxlength="col.maxlength ? col.maxlength : undefined"
                  autofocus
                  @update:model-value="changevalRec"
                  style="max-width: 100px;"
                  :label="col.label ? col.label : t(col.label_trans)">
                </q-input>
              </div>
              <div v-if="isFieldDb()">
                <CMySelect
                  :type_out="col.field_outtype"
                  :col="col"
                  :row="row"
                  label="Ore" v-model:value="myvalue"
                  optval="value" optlab="label"
                  :dense="false"
                  :use-input="false"
                  @changeval="changevalRecHours"
                  style="max-width: 100px;"
                  :options="tools.SelectHours">
                </CMySelect>

              </div>
              <div v-else>
                <q-input
                  v-model="scope.value" type="number"
                  :maxlength="col.maxlength ? col.maxlength : undefined"
                  autofocus>

                </q-input>
              </div>
            </div>
            <div
              v-else-if="(col.fieldtype === costanti.FieldType.select) || (col.fieldtype === costanti.FieldType.select_by_server)">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="scope.value"
                :pickup="col.fieldtype === costanti.FieldType.select_by_server"
                :addnone="col.addnone"
                :tablesel="col.fieldtype === costanti.FieldType.select_by_server ? tablesel : ''"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :newvaluefunc="addNewValue"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="col.allowNewValue">
              </CMySelect>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.multiselect_by_server">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :multiselect_by_server="true"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:arrvalue="scope.value"
                @update:arrvalue="changevalRec"
                :addall="false"
                :addnone="false"
                :tablesel="tablesel"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :pickup="true"
                label-color="primary"
                class="combowidth"
                color="primary"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="true">
              </CMySelect>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
              <q-select
                v-model="scope.value"
                rounded
                outlined
                multiple
                dense
                options-dense
                :display-value="fieldsTable.getTitleByTable(col.jointable)"
                emit-value
                map-options
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                class="combowidth"
                :useinput="col.allowNewValue"
                :newvaluefunc="addNewValue"
                :option-value="fieldsTable.getKeyByTable(col.jointable)"
                @update:model-value="changeval">

                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps">

                    <q-item-section>
                      <q-item-label>{{ opt[fieldsTable.getLabelByTable(col.jointable)] }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)"/>
                    </q-item-section>
                  </q-item>
                </template>

              </q-select>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.nationality">
              <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                <CMySelect
                  :type_out="col.field_outtype"
                  :col="col"
                  :row="row"
                  :label="col.label ? col.label : t(col.label_trans)"
                  v-model:value="scope.value"
                  @update:value="changevalRec"
                  :tablesel="tablesel"
                  :filter_table="col.filter_table"
                  :filter_field="col.filter_field"
                  :value_extra="value_extra"
                  :pickup="pickup"
                  :optval="fieldsTable.getKeyByTable(tablesel)"
                  :optlab="fieldsTable.getLabelByTable(tablesel)"
                  :options="[]"
                  :useinput="false">
                </CMySelect>
              </div>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.intcode">
              <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                <CMySelect
                  :type_out="col.field_outtype"
                  :col="col"
                  :row="row"
                  :label="col.label ? col.label : t(col.label_trans)"
                  v-model:value="scope.value"
                  @update:value="changevalRec"
                  :tablesel="tablesel"
                  :pickup="pickup"
                  :optval="fieldsTable.getKeyByTable(tablesel)"
                  :optlab="fieldsTable.getLabelByTable(tablesel)"
                  :options="[]"
                  :useinput="false">
                </CMySelect>
              </div>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.date">
              <CDateTime
                :label="col.label ? col.label : t(col.label_trans)"
                class="cursor-pointer"
                v-model:value="myvalue"
                :readonly="false"
                :minuteinterval="minuteinterval"
                :dense="true"
                :canEdit="canEdit"
                @savetoclose="SaveValueInt"
                @show="OpenEdit">
              </CDateTime>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.onlydate">
              <CDateTime
                :label="col.label ? col.label : t(col.label_trans)"
                class="cursor-pointer"
                :valueDate="myvalue"
                v-model:value="myvalue"
                :readonly="false"
                :minuteinterval="minuteinterval"
                :dense="true"
                :canEdit="canEdit"
                @savetoclose="SaveValueInt"
                @show="OpenEdit"
                view="date">
              </CDateTime>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.binary">

              <CMyToggleList
                :label="col.titlepopupedit ? col.titlepopupedit : ''"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                v-model:value="scope.value"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)">
              </CMyToggleList>
            </div>
            <div v-else-if="(col.fieldtype === costanti.FieldType.star5 || col.fieldtype === costanti.FieldType.star3)">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label ? col.label : t(col.label_trans)"
                v-model:value="scope.value"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.addnone, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.password">
              <q-input
                v-model="scope.value"
                :maxlength="col.maxlength ? col.maxlength : undefined"
                :minlength="col.minlength ? col.minlength : undefined"
                type="password"
                @keyup.enter="scope.set"
                autofocus>

              </q-input>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.html">
              <div v-if="!isFieldDb()">
                <CMyEditor
                  v-model:value="myvalue" :title="!isInModif ? getTitleEditor(col, row) : ''" @keyup.enter.stop
                  :showButtons="false"
                  :canModify="canModify"
                  @update:value="changevalRec"
                  @showandsave="Savedb">
                </CMyEditor>
              </div>
            </div>
          </q-popup-edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CMyPopupEdit.ts">
</script>

<style lang="scss" scoped>
@import './CMyPopupEdit.scss';
</style>
