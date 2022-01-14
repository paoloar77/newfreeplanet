<template>
  <div :class="$q.screen.lt.sm ? `` : `q-pa-xs`" v-if="isfinishLoading">
    <div class="centermydiv q-ma-sm" style="text-align: center">
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
          v-if="mytable" rounded dense size="sm" flat :color="canEdit ? 'positive' : 'light-gray'"
          :disable="disabilita()"
          :val="lists.MenuAction.CAN_EDIT_TABLE"
          icon="fas fa-pencil-alt" @update:model-value="changefuncAct"
          @click="canEdit = !canEdit">
        </q-btn>
        <q-btn
          v-if="mytable" rounded dense size="sm" flat color="light-gray"
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
      :grid="vertical"
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
            <span v-if="col && colVisib.includes(col.field + col.subfield)">
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
            v-for="(filter, index) of arrfilters"
            :key="index"
            v-model="myfilterand" :disable="filter.hide"
            :val="filter.value"
            :label="filter.label">

          </q-toggle>
        </div>
      </template>

      <template v-slot:top-left>

        <div v-if="searchList"
             :class="$q.screen.lt.sm ? `` : `row`  + ` text-blue`">
          <span v-for="(item, index) in searchList" :key="index">
            <CMySelect
              v-if="item.type === costanti.FieldType.select"
              :label="labelcombo(item)"
              v-model:value="item.value"
              @update:value="searchval(item.value, item.table)"
              :addall="true"
              label-color="primary"
              class="combowidth"
              color="primary"
              :optval="fieldsTable.getKeyByTable(item.table)"
              :optlab="fieldsTable.getLabelByTable(item.table)"
              :options="valoriopt(item, false)"
              :useinput="false">
            </CMySelect>

            <q-select
              v-if="item.type === costanti.FieldType.multiselect"
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
              :options="valoriopt(item, item.addall)"
              class="combowidth"
              :option-value="fieldsTable.getKeyByTable(item.table)"
            >

              <template
                v-if="item.arrvalue.length >= 1"
                v-slot:selected-item="scope">
                <div v-if="scope.opt[fieldsTable.getLabelByTable(item.table)]">
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
                    {{ scope.opt[fieldsTable.getLabelByTable(item.table)] }}
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

          <div v-if="prop_search" class="q-mr-sm">
            <q-input
              v-model="search" filled dense type="search" debounce="500" :hint="hint"
              v-on:keyup.enter="doSearch">
              <template v-slot:after>
                <q-btn v-if="mytable" dense label="" color="primary" @click="refresh" icon="search"></q-btn>
              </template>
            </q-input>
          </div>

          <q-space></q-space>
          <q-select
            v-if="mytable && pagination.rowsNumber > 0 && (prop_search || canEdit) && showCol"
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

        <div v-if="pagination.rowsNumber > 0 && prop_search">{{ pagination.rowsNumber }} elementi trovati</div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" class="trclass">
          <q-td auto-width class="tdclass">
            <q-checkbox dense v-model="props.selected"></q-checkbox>
          </q-td>
          <q-td
            v-for="col in mycolumns" :key="col.name" :props="props">
            <div
              v-if="colVisib.includes(col.field + col.subfield)" class="tdclass">
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
        <div v-if="showType === costanti.SHOW_USERINFO" class="fill-all-width">
          <div>
            <CMyFriends
              v-model="filter"
              :finder="false"
              :mycontact="props.row"
              :visu="costanti.FIND_PEOPLE"
            />
          </div>

        </div>
        <div
          v-else
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-bar dense class="bg-primary text-white">
              <span class="ellipsis"> {{ props.row[col_title] }} </span>
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
            <q-card-section class="inset-shadow">
              <q-list dense>
                <div v-for="col in mycolumns" :key="col.name">
                  <q-item v-if="colVisib.includes(col.field + col.subfield)" :class="clByCol(col)" class="riduci_pad">
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
        <div v-if="colVisib.includes(mycol.field + mycol.subfield)">
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
    <q-dialog v-model="newRecordBool" @hide="hidewindow">
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
              v-if="colVisib.includes(col.field + col.subfield) && col.foredit">
              <div class="">

                <CMyPopupEdit
                  :table="mytable"
                  :canEdit="true"
                  :canModify="true"
                  :mycol="col"
                  v-model:row="newRecord"
                  :field="col.field"
                  :subfield="col.subfield"
                  :isInModif="true"
                  minuteinterval="1"
                  :visulabel="false"
                  @save="SaveValue"
                  @show="selItem(newRecord, col)"
                  @showandsave="showandsel">

                </CMyPopupEdit>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat :label="$t('dialog.ok')" color="primary" @click="saveNewRecord"></q-btn>
          <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup @click="annulla"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editRecordBool">
      <q-card class="dialog_card">
        <q-bar dense class="bg-primary text-white">
          <span v-if="mytitle">{{ mytitle }}</span>
          <span v-else>{{ recModif[col_title] }}</span>
          <q-space/>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-bar>
        <q-card-section class="inset-shadow">
          <div
            v-for="col in mycolumns" :key="col.name">
            <div
              v-if="colVisib.includes(col.field + col.subfield) && col.foredit">
              <div>
                <CMyPopupEdit
                  :table="mytable"
                  :canEdit="true"
                  :canModify="canModifyThisRec(recModif)"
                  :mycol="col"
                  :isInModif="true"
                  v-model:row="recModif"
                  :field="col.field"
                  :subfield="col.subfield"
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
          <q-btn flat :label="$t('dialog.ok')" color="primary" @click="saverecModif"></q-btn>
          <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup></q-btn>
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
