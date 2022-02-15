<template>
  <div :class="$q.screen.lt.sm ? `` : `q-pa-xs`" v-if="isfinishLoading">
    <div class="centermydiv q-my-sm" style="text-align: center">
      <q-btn
        v-if="mytable && visButtRow()" rounded dense color="primary"
        size="lg"
        :label="getlabelAddRow()"
        @click="createNewRecordDialog"></q-btn>
    </div>

    <div v-if="butt_modif_new || mytitle" :class="$q.screen.lt.sm ? `` : `q-gutter-md q-ma-xs`  + ` row`">
      <div class="q-table__title" style="min-width: 150px;">{{ mytitle }}</div>
      <q-space></q-space>
      <div v-if="butt_modif_new">
        <q-btn
          v-if="mytable && !shared_consts.TABLES_FINDER.includes(mytable)" rounded dense size="sm" flat
          :color="canEdit ? 'positive' : 'light-gray'"
          :disable="disabilita()"
          :val="lists.MenuAction.CAN_EDIT_TABLE"
          icon="fas fa-pencil-alt" @update:model-value="changefuncAct"
          @click="canEdit = !canEdit">
        </q-btn>
        <q-btn
          v-if="mytable" rounded size="md" color="primary"
          class="centermydiv"
          label="Aggiungi"
          :disable="loading"
          icon="fas fa-plus"
          @click="createNewRecord">

        </q-btn>
      </div>
    </div>
    <q-inner-loading :showing="spinner_visible">
      <q-spinner-tail size="2em" color="primary"/>
    </q-inner-loading>
    <q-table
      :grid="(myvertical === costanti.VISUTABLE_SCHEDA_USER || myvertical === 2 || myvertical === costanti.VISUTABLE_SCHEDA_GROUP)"
      :grid-header="false"
      flat
      bordered
      class="my-sticky-header-table"
      :rows="serverData"
      :columns="mycolumns"
      :filter="myfilter"
      v-model:pagination="pagination"
      :row-key="colkey"
      :loading="loading"
      @request="onRequest"
      @selection="selectionclick"
      binary-state-sort
      :visible-columns="colVisib"
      :no-data-label="nodataLabel"
      :no-results-label="noresultLabel"
      :selected-rows-label="getSelectedString"
      selection="single"
      v-model:selected="selected">


      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
          </q-th>
          <q-th
            v-for="col in props.cols" :key="col.name"
            :props="props"
            class="text-italic text-weight-bold"
          >

            <span v-if="col && showColCheck(col, tools.TIPOVIS_SHOW_RECORD, true)">
              {{ col.label }}
            </span>

          </q-th>
        </q-tr>
      </template>

      <template v-slot:top-right v-if="tablesList || arrfilters">
        <q-select
          v-if="tablesList"
          v-model="tablesel"
          rounded
          outlined
          dense
          :options="tablesList"
          :display-value="mytitle"
          emit-value
          @update:model-value="changeTable"
        >
        </q-select>

        <div class="row">
          <q-toggle
            v-for="(filt, index) of arrfilters"
            :key="index"
            v-model="myfilterand" :disable="filt.hide"
            :val="filt.value"
            :label="filt.label">

          </q-toggle>
        </div>
      </template>

      <template v-slot:top-left>

        <div v-if="searchList"
             :class="$q.screen.lt.sm ? `` : `row`  + ` text-blue `">
          <span v-for="(item, index) in searchList" :key="index">
            <div class="text-center q-my-xs" v-if="(item.type === costanti.FieldType.separator)">
              <q-btn rounded flat size="sm" dense :icon="!showfilteradv ? 'fas fa-arrow-down' : 'fas fa-arrow-up'" label="Filtri Avanzati" @click="showfilteradv = !showfilteradv"></q-btn>
            </div>

            <CMySelect
              :col="fieldsTable.getColByTable(mytable, item.key)"
              v-if="(item.type === costanti.FieldType.select) || (item.type === costanti.FieldType.select_by_server)"
              v-show="(item.filteradv && showfilteradv) || !item.filteradv"
              :label="labelcombo(item)"
              v-model:value="item.value"
              @update:value="searchval(item.value, item.table)"
              :addall="item.addall"
              :tablesel="item.type === costanti.FieldType.select_by_server ? item.tablesel : ''"
              :pickup="item.type === costanti.FieldType.select_by_server"
              label-color="primary"
              class="combowidth"
              color="primary"
              :icon_alternative="item.icon"
              :optval="fieldsTable.getKeyByTable(item.table)"
              :optlab="fieldsTable.getLabelByTable(item.table)"
              :options="valoriopt(item, false)"
              :filter="item.filter"
              :useinput="item.useinput && item.type !== costanti.FieldType.select_by_server">
            </CMySelect>

            <!--<div v-if="item.type === costanti.FieldType.multiselect_by_server">
              item: {{ item}}
            </div>-->

            <CMySelect
              v-if="item.type === costanti.FieldType.multiselect_by_server"
              v-show="(item.filteradv && showfilteradv) || !item.filteradv"
              :col="fieldsTable.getColByTable(mytable, item.key)"
              :multiselect_by_server="true"
              :label="labelcombo(item)"
              v-model:arrvalue="item.arrvalue"
              @update:arrvalue="searchval(item.arrvalue, item.table)"
              :addall="item.addall"
              :tablesel="item.tablesel"
              :pickup="true"
              :param1="item.param1"
              label-color="primary"
              class="combowidth"
              color="primary"
              :icon_alternative="item.icon"
              :optval="fieldsTable.getKeyByTable(item.table)"
              :optlab="fieldsTable.getLabelByTable(item.table)"
              :filter="item.filter"
              :options="valoriopt(item, false)"
              :useinput="true">
            </CMySelect>

            <q-select
              v-if="(item.type === costanti.FieldType.multiselect)"
              v-show="(item.filteradv && showfilteradv) || !item.filteradv"
              v-model="item.arrvalue"
              label-color="primary"
              :label="labelcombo(item)"
              @update:model-value="searchval(item.arrvalue, item.table)"
              rounded
              dense
              outlined
              multiple
              options-dense
              emit-value
              map-options
              stack-label
              :useinput="item.useinput"
              :options="valoriopt(item, item.addall)"
              :filter="item.filter"
              class="combowidth"
              :option-value="fieldsTable.getKeyByTable(item.table)"
            >

              <template v-if="item.icon" v-slot:prepend>
                <q-icon :name="item.icon" />
              </template>
              <template
                v-if="item.arrvalue.length >= 1"
                v-slot:selected-item="scope">
                <div v-if="scope.opt[fieldsTable.getLabelByTable(item.table)] || (scope.opt && checkIfShowRec(scope.opt)) ">
                  <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    v-if="checkIfShowRec(scope.opt)"
                    color="white"
                    text-color="mycol"
                    class="q-my-none q-ml-xs q-mr-none"
                  >
                    <q-avatar color="primary" text-color="white" :icon="item.icon" size="12px"/>
                    {{ scope.opt[fieldsTable.getLabelByTable(item.table)] || (scope.opt) }}
                  </q-chip>
                </div>
              </template>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">

                  <q-item-section>
                    <q-item-label>{{ opt[fieldsTable.getLabelByTable(item.table)] }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)"/>
                  </q-item-section>
                </q-item>
              </template>

            </q-select>
          </span>
        </div>

        <div v-if="(prop_search || canEdit)"
             class="row justify-center vertical-middle">

          <div v-if="prop_search" class="q-mr-sm full-width">
            <q-input
              v-model="search" filled dense type="search" debounce="500" :hint="hint"

              v-on:keyup.enter="doSearch"
            >
              <template v-slot:after>
                <q-btn v-if="mytable" dense label="" color="primary" @click="refresh" icon="search"></q-btn>
              </template>
            </q-input>
          </div>

          <q-space></q-space>
          <q-select
            v-if="mytable && pagination.rowsNumber > 0 && (prop_search || canEdit) && showCol && myvertical === 0"
            v-model="colVisib"
            rounded
            outlined
            multiple
            dense
            options-dense
            :display-value="$t('grid.columns')"
            emit-value
            map-options
            :options="mycolumns"
            option-value="name"
            @update:model-value="changeCol">

          </q-select>

        </div>

        <div v-if="pagination.rowsNumber === 1 && prop_search">{{ pagination.rowsNumber }} elemento trovato</div>
        <div v-if="pagination.rowsNumber > 1 && prop_search">{{ pagination.rowsNumber }} elementi trovati</div>

        <div v-if="choose_visutype" class="">
          <q-radio v-model="myvertical" :val="2" label="Lista"
                   @update:model-value="tools.setCookie('myv_' + prop_mytable, myvertical) "/>
          <q-radio v-if="mytable === toolsext.TAB" v-model="myvertical" :val="costanti.VISUTABLE_SCHEDA_GROUP" label="Scheda"
                   @update:model-value="tools.setCookie('myv_' + prop_mytable, myvertical) "/>
          <q-radio v-else-if="mytable !== toolsext.TABMYGROUPS && !finder" v-model="myvertical" :val="costanti.VISUTABLE_SCHEDA_USER" label="Scheda"
                   @update:model-value="tools.setCookie('myv_' + prop_mytable, myvertical) "/>
          <q-radio v-if="$q.screen.gt.xs" v-model="myvertical" :val="0" label="Tabella"
                   @update:model-value="tools.setCookie('myv_' + prop_mytable, myvertical) "/>
        </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="trclass">
          <q-td auto-width class="tdclass">
            <q-checkbox dense v-model="props.selected"></q-checkbox>
          </q-td>
          <q-td
            v-for="col in mycolumns" :key="col.name" :props="props">
            <div
              v-if="showColCheck(col, tools.TIPOVIS_SHOW_RECORD, true, 1, props.row)" class="tdclass">
              <div :class="getclrow(props.row)">

                <CMyPopupEdit
                  :table="mytable"
                  :canEdit="canEdit"
                  :canModify="canModifyThisRec(props.row)"
                  :disable="disabilita()"
                  :mycol="col"
                  v-model:row="props.row"
                  :field="col.field"
                  :subfield="col.subfield"
                  minuteinterval="1"
                  @save="SaveValue"
                  @show="selItem(props.row, col)"
                  @showandsave="showandsel">

                </CMyPopupEdit>
              </div>
            </div>
          </q-td>
          <q-td
            v-for="col in mycolumns" :key="col.name" :props="props">
            <div
              v-if="colExtra.includes(col.name)"
              class="tdclass">
              <div v-if="col.action && visCol(col)">
                <q-btn
                  flat round color="red" :icon="col.icon" size="sm"
                  @click="clickFunz(props.row, col)"></q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
        <br>
      </template>

      <template v-slot:item="props">
        <div v-if="showType === costanti.SHOW_MYSKILL || (myvertical === costanti.VISUTABLE_LISTA && tablesel === 'myskills') ">
          <CMySkill
            :prop_myskill="props.row"
            @cmdext="cmdExt"
            :visu="visufind"
          >
          </CMySkill>

        </div>
        <div v-else-if="((showType === costanti.SHOW_USERINFO) && myvertical !== costanti.VISUTABLE_SCHEDA_USER) || ((myvertical === 2) && (shared_consts.TABLES_VISU_LISTA_USER.includes(tablesel)))" class="fill-all-width">
          <div>
            <CMyUser
              :mycontact="props.row"
              :visu="visufind"
              :groupname="extrafield"
              :labelextra="col_title ? props.row[col_title] : ''"
              :labelFooter="col_footer ? getLabelFooterByRow(props.row) : ''"
            >
            </CMyUser>

            <!--
            <CMyFriends
              v-model="filter"
              :finder="false"
              :mycontact="props.row"
              :visu="visufind"
              :groupname="extrafield"
              :labelextra="props.row[col_title]"
            />
            -->
            <q-separator></q-separator>
          </div>

        </div>
        <div v-else-if="((showType === costanti.SHOW_GROUPINFO) && myvertical !== costanti.VISUTABLE_SCHEDA_GROUP) || ((myvertical === 2) && (tablesel === 'mygroups'))" class="fill-all-width">
          <div>

            <CMyGroups
              v-model="filtergrp"
              :finder="false"
              :mygrp="props.row"
              :visu="costanti.FIND_GROUP"
            />
          </div>

        </div>
        <div
          v-else
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 "
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >

          <q-card :class="props.selected ? 'bg-grey-2 my-card-withshadow no-padding' : 'my-card-withshadow no-padding'"
                  style="background: radial-gradient(circle, #ffffff 0%, #bbddff 100%)">
            <q-bar v-if="!visuinpage && canModifyThisRec(props.row)" dense class="bg-primary text-white full-height">
              <q-badge v-if="props.row['adType']" :color="fieldsTable.getColByAdType(props.row['adType'])">
                {{ fieldsTable.getValByTabAndId(tablesel, 'adType', props.row['adType']) }}<q-icon :name="fieldsTable.getIconByAdType(props.row['adType'])" color="white" class="q-ml-xs" />
              </q-badge>

              <q-space/>

              <q-btn
                v-if="canModifyThisRec(props.row)"
                flat round color="white" icon="fas fa-pencil-alt" size="sm"
                @click="clickFunz(props.row, prop_mycolumns.find((rec) => rec.action === lists.MenuAction.CAN_EDIT_TABLE))"></q-btn>
              <q-btn
                v-if="canModifyThisRec(props.row)"
                flat round color="white" icon="fas fa-trash-alt" size="sm"
                @click="clickFunz(props.row, prop_mycolumns.find((rec) => rec.action === lists.MenuAction.DELETE_RECTABLE))"></q-btn>
            </q-bar>
            <!--<q-toolbar dense v-if="col_title" class="bg-primary text-white centeritems">
              <q-toolbar-title>
                {{ props.row[col_title] }}
              </q-toolbar-title>
            </q-toolbar>-->

            <q-card-section class="">
              <q-list dense>
                <div v-for="col in mycolumns" :key="col.name">
                  <q-item v-if="showColCheck(col, tools.TIPOVIS_SHOW_RECORD, false, tools.getValue(props.row,col.field, col.subfield))"
                          :class="clByCol(col)" class="riduci_pad">

                    <q-item-section avatar v-if="col.icon">
                      <q-item-label class="q-table__col"><q-icon :name="col.icon"></q-icon></q-item-label>
                    </q-item-section>

                    <q-item-section avatar v-if="visuIntestazCol(col)">
                      <q-item-label class="q-table__col">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <div class="tdclass">
                        <div :class="getclrow(props.row)">

                          <CMyPopupEdit
                            :table="mytable"
                            :canEdit="canEdit"
                            :canModify="canModifyThisRec(props.row)"
                            :disable="disabilita()"
                            :mycol="col"
                            v-model:row="props.row"
                            :field="col.field"
                            :subfield="col.subfield"
                            minuteinterval="1"
                            @save="SaveValue"
                            @show="selItem(props.row, col)"
                            @showandsave="showandsel">

                          </CMyPopupEdit>
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

    <div v-if="rowclicksel">

      <CTitleBanner title="Record:"></CTitleBanner>

      <div
        class="q-ma-xs q-pa-xs text-center rounded-borders q-list--bordered"
        v-for="mycol in mycolumns" :key="mycol.name">
        <div v-if="showColCheck(mycol, tools.TIPOVIS_SHOW_RECORD, false)">
          <div class="row items-center justify-center q-gutter-md q-ma-xs">
            <div class="q-ma-xs">
              <q-field rounded outlined bg-color="orange-3" dense>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ mycol.label }}</div>
                </template>
              </q-field>
            </div>
            <div
              class="q-ma-sm q-pa-sm colmodif col-grow rounded-borders " style="border: 1px solid #bbb"
              @click="colclicksel = mycol">
              <CMyPopupEdit
                :table="mytable"
                :canEdit="true"
                :canModify="canModifyThisRec(rowclicksel)"
                :disable="disabilita()"
                view="field"
                :mycol="mycol"
                :showall="true"
                :row="rowclicksel"
                :tablesel="mycol.tablesel"
                :field="mycol.field"
                :subfield="mycol.subfield"
                @save="SaveValdb"
                @show="selItem(rowclicksel, mycol)"
                @showandsave="showandsel"
                @annulla="annulla">

              </CMyPopupEdit>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="newRecordBool" @hide="hidewindow" :maximized="true">
      <q-card class="dialog_card">
        <q-bar dense class="bg-primary text-white">
          Nuovo:
          <q-space/>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-bar>
        <q-card-section class="inset-shadow">
          <div
            v-for="col in mycolumns" :key="col.name" class="newrec_fields">
            <div
              v-if="showColCheck(col, tools.TIPOVIS_NEW_RECORD, true, 0, newRecord) && col.foredit ">
              <div class="">
                <CMyPopupEdit
                  :table="mytable"
                  :canEdit="true"
                  :canModify="true"
                  :mycol="col"
                  v-model:row="newRecord"
                  :field="col.field"
                  :subfield="col.subfield"
                  :tablesel="col.tablesel"
                  :value_extra="getValueExtra(col, newRecord)"
                  :isInModif="true"
                  minuteinterval="1"
                  :visulabel="true"
                  :insertMode="true"
                  @save="SaveValue"
                  @show="selItem(newRecord, col)"
                  @showandsave="showandsel">

                </CMyPopupEdit>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn :label="$t('dialog.ok')" color="primary" @click="saveNewRecord"></q-btn>
          <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup @click="annulla"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editRecordBool">
      <q-card class="dialog_card">
        <q-bar dense class="bg-primary text-white full-height">
          <span class="ellipsis">{{ recModif[col_title] }}</span>
          <q-space/>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-bar>
        <q-card-section class="inset-shadow">
          <div
            v-for="col in mycolumns" :key="col.name">
            <div
              v-if="showColCheck(col, tools.TIPOVIS_EDIT_RECORD, false) && col.foredit">
              <div>
                <CMyPopupEdit
                  :table="mytable"
                  :canEdit="true"
                  :canModify="canModifyThisRec(recModif)"
                  :tablesel="col.tablesel"
                  :mycol="col"
                  :isInModif="true"
                  v-model:row="recModif"
                  :field="col.field"
                  :subfield="col.subfield"
                  :value_extra="getValueExtra(col, recModif)"
                  minuteinterval="1"
                  @save="SaveValue"
                  @show="selItem(recModif, col, true)"
                  @showandsave="showandsel">

                </CMyPopupEdit>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn :label="$t('dialog.ok')" color="primary" @click="saverecModif"></q-btn>
          <q-btn flat :label="$t('dialog.cancel')" color="primary" @click="cancelrecModif"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts" src="./CGridTableRec.ts">
</script>

<style lang="scss">
@import './CGridTableRec.scss';
</style>
