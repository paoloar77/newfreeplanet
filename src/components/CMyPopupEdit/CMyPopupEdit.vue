<template>
  <div :class="getclassCol(col)">
    <div v-if="tools.checkIfShowField(col, insertMode ? tools.TIPOVIS_NEW_RECORD : (isInModif ? tools.TIPOVIS_EDIT_RECORD : tools.TIPOVIS_SHOW_RECORD), visulabel, myvalue)" style="flex-grow: 1;">
      <div
        :class="{ flex: !isInModif, 'justify-center': true }">
        <div>
          <!-- Edit Value -->
          <div v-if="col.fieldtype === costanti.FieldType.boolean">
            <div v-if="isInModif">
              <span v-if="insertMode">
                <q-checkbox
                  v-model="myvalue"
                  @update:model-value="changevalRec"
                  :label="col.label">
                </q-checkbox>
              </span>
              <span v-else>
                <q-checkbox
                  v-model="myvalue"
                  @update:model-value="changevalRec"
                  :label="col.title">
                </q-checkbox>
                <span v-html="visuValByType(myvalue, col, row)"></span>
              </span>
            </div>
            <div v-else>
              <q-toggle
                dark color="green" v-model="myvalue" :label="col.title"
                :disable="disable && col.name !== 'profile.saw_zoom_presentation'"
                @update:model-value="Savedb"></q-toggle>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.string || col.fieldtype === costanti.FieldType.crypted">
            <div v-if="visulabel || isInModif" :class="{ flex: !isInModif}">
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
            <div v-else>

              <q-btn v-if="col.tipovisu === costanti.TipoVisu.LINK && myvalue"
                     type="a" rounded size="md"
                     :class="{disabled: disable }"
                     color="white" text-color="blue" :icon="`img:`+userStore.getImgByUsername(myvalue)" :to="col.link.replace(col.name, myvalue)"
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
                @update:model-value="Savedb"
                :label="visulabel ? col.label : ''"
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
                @update:value="changevalRec"
                autofocus>

              </q-input>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.listimages" style="text-align: center;">
            <p v-if="isInModif">
              {{ $t('reg.image') }}:
            </p>
            <CGallery
              :title="getTitleGall()"
              :directory="getDirectoryGall()"
              :imgGall="myvalue"
              :edit="isviewfield() && isInModif"
              :canModify="canModify && isInModif"
              @showandsave="Savedb">
            </CGallery>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.image">
            <div v-if="canEdit">
              {{ $t('reg.photo') }}
              <CGallery
                :title="getTitleGall()"
                :directory="getDirectoryGall()"
                :imgGall="[{ imagefile: myvalue }]"
                :edit="isviewfield()"
                :canModify="canModify"
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
                  src="images/noimg-user.svg"
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
                :label="col.label"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :tablesel="tablesel"
                :pickup="pickup"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :label="col.label"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :tablesel="tablesel"
                :pickup="pickup"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.date">
            <CDateTime
              :label="col.label"
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
              :label="col.label"
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
                {{ col.label }}:
              </span>
              <CMyToggleList
                :label="col.titlepopupedit"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)">
              </CMyToggleList>
            </div>
            <div v-else>
              <CMyChipList
                :type="costanti.FieldType.binary"
                :value="myvalue"
                @update:value="changevalRec"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :label="col.label"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                v-model:arrvalue="myvalue"
                @update:arrvalue="changevalRec"
                :addall="false"
                label-color="primary"
                class="combowidth"
                color="primary"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                class="combowidth"
                :option-value="fieldsTable.getKeyByTable(col.jointable)"
                @update:model-value="changevalRec">

                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps">

                    <q-item-section>
                      <q-item-label>{{ opt[fieldsTable.getLabelByTable(col.jointable)] }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle :model-value="selected" @update:value="toggleOption(opt)"/>
                    </q-item-section>
                  </q-item>
                </template>

              </q-select>-->

            </div>
            <div v-else>
              <CMyChipList
                :type="col.fieldtype"
                :type_out="col.field_outtype"
                @update:value="changevalRec"
                :value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :label="col.label"
                v-model:value="myvalue"
                :pickup="col.fieldtype === costanti.FieldType.select_by_server"
                :tablesel="col.type === costanti.FieldType.select_by_server ? tablesel : ''"
                @update:value="changevalRec"
                :newvaluefunc="addNewValue"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                :useinput="col.allowNewValue">
              </CMySelect>
            </div>
            <div v-else>
              <CMyChipList
                myclass="text-center"
                :type="col.fieldtype"
                :type_out="col.field_outtype"
                @update:value="changevalRec"
                v-model:value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
              :label="col.label"
              v-model:arrvalue="myvalue"
              @update:arrvalue="changevalRec"
              :addall="false"
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
              :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
              :sola_lettura="!isInModif"
              :useinput="isInModif">
            </CMySelect>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.star5">
            <div v-if="isInModif">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label"
                v-model:value="myvalue"
                @update:value="changevalRec"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :max="5"
                :readonly="true"
              />
            </div>
          </div>
          <div v-else-if="col.fieldtype === costanti.FieldType.html">
            <div v-if="isInModif">
              <p v-if="isInModif" class="text-center">
                {{ $t('event.testo_di_spiegazione') }}:
              </p>
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
                  :to="getToByCol(col)"
                >
                </q-btn>
              </div>
              <!--<div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true"></div>-->

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
            <div v-else-if="col.fieldtype === costanti.FieldType.string || col.fieldtype === costanti.FieldType.crypted">
              <q-input
                v-bind="$attrs"
                counter
                :type="col.fieldtype === costanti.FieldType.crypted ? 'password' : 'text'"
                :maxlength="col.maxlength ? col.maxlength : undefined"
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
                  autofocus
                  @update:model-value="changevalRec"
                  style="max-width: 100px;"
                  :label="col.label">
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
                :label="col.label"
                v-model:value="scope.value"
                :pickup="col.fieldtype === costanti.FieldType.select_by_server"
                :tablesel="col.type === costanti.FieldType.select_by_server ? tablesel : ''"
                :filter_table="col.filter_table"
                :filter_field="col.filter_field"
                :value_extra="value_extra"
                :newvaluefunc="addNewValue"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                :useinput="col.allowNewValue">
              </CMySelect>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.multiselect_by_server">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :multiselect_by_server="true"
                :label="col.label"
                v-model:arrvalue="scope.value"
                @update:arrvalue="changevalRec"
                :addall="false"
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
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
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
                  :label="col.label"
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
                  :label="col.label"
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
            <div v-else-if="col.fieldtype === costanti.FieldType.binary">

              <CMyToggleList
                :label="col.titlepopupedit"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                v-model:value="scope.value"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)">
              </CMyToggleList>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.star5">
              <CMySelect
                :type_out="col.field_outtype"
                :col="col"
                :row="row"
                :label="col.label"
                v-model:value="scope.value"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :options="globalStore.getTableJoinByName(col.jointable, col.addall, col.filter)"
                :useinput="false">
              </CMySelect>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.password">
              <q-input
                v-model="scope.value"
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
            </div>          </q-popup-edit>
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
