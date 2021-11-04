<template>
  <div :class="getclassCol(col)">
    <div v-if="visulabel" class="flex">
      <div v-if="visInNewRec(col)" style="flex-grow: 1;">
        <div v-if="col.fieldtype === costanti.FieldType.string">
          <q-input
            v-model="myvalue"
            autogrow
            @keyup.enter.stop
            @update:model-value="changevalRec"
            autofocus
            :label="col.label">
          </q-input>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.date">
          <CDateTime
            :label="col.label"
            class="cursor-pointer"
            v-model:value="myvalue"
            :readonly="false"
            :minuteinterval="minuteinterval"
            :dense="true"
            @update:model-value="changevalRec"
            canEdit="true"
            @savetoclose="SaveValueInt"
            @show="OpenEdit">
          </CDateTime>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.onlydate">
          <CDateTime
            :label="col.label"
            class="cursor-pointer"
            :valueDate="myvalue"
            :readonly="false"
            :minuteinterval="minuteinterval"
            :dense="true"
            @update:model-value="changevalRec"
            canEdit="true"
            @savetoclose="SaveValueInt"
            @show="OpenEdit"
            view="date">
          </CDateTime>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.number">
          <q-input
            v-model="myvalue" type="number"
            autofocus
            @update:model-value="changevalRec"
            :label="col.label"
          >

          </q-input>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.hours">
          <div class="row">
            <q-input
              v-model="myvalue" type="number"
              autofocus
              @update:model-value="changevalRec"
              style="max-width: 100px;"
              :label="col.label"
            >

            </q-input>

            <CMySelect
              label="Ore" v-model:value="myvalue"
              optval="value" optlab="label"
              :dense="false"
              :use-input="false"
              @changeval="changevalRecHours"
              style="max-width: 100px;"
              :options="tools.SelectHours">
            </CMySelect>
          </div>

          <!--<q-input v-model="myvalue" type="number"
                   autofocus
                   @update:model-value="changevalRec"
                   :label="col.label">
          </q-input>
          -->

        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.listimages">
          gall1:
          <CGallery
            v-if="myvalue"
            :title="getTitleGall()"
            :directory="getDirectoryGall()"
            :imgGall="myvalue" :edit="isviewfield()"
            @showandsave="Savedb"
            @update:model-value="changevalRec"
          >

          </CGallery>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.image">
          <div v-if="canEdit">
            gall2:
            <CGallery
              v-if="myvalue"
              :title="getTitleGall()"
              :directory="getDirectoryGall()"
              :imgGall="myvalue" :edit="isviewfield()"
              :single="isFieldDb()"
              @update:model-value="changevalRec"
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
        <div v-if="col.fieldtype === costanti.FieldType.binary">
          <CMyChipList
            :type="costanti.FieldType.binary"
            :value="myvalue"
            @update:model-value="changevalRec"
            :options="globalStore.getTableJoinByName(col.jointable)"
            :optval="fieldsTable.getKeyByTable(col.jointable)"
            :optlab="fieldsTable.getLabelByTable(col.jointable)"
            :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
        </div>
        <!-- Show Value -->
        <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
          <CMyChipList
            @update:model-value="changevalRec"
            :type="costanti.FieldType.multiselect"
            v-model:value="myvalue"
            :options="globalStore.getTableJoinByName(col.jointable)"
            :optval="fieldsTable.getKeyByTable(col.jointable)"
            :optlab="fieldsTable.getLabelByTable(col.jointable)"
            :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.select">
          myvalue: {{ myvalue }}
          <CMyChipList
            @update:model-value="changevalRec"
            myclass="text-center"
            :type="costanti.FieldType.select"
            v-model:value="myvalue"
            :options="globalStore.getTableJoinByName(col.jointable)"
            :optval="fieldsTable.getKeyByTable(col.jointable)"
            :optlab="fieldsTable.getLabelByTable(col.jointable)"
            :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.boolean">
          <q-toggle
            dark color="green"
            v-model:value="myvalue" :label="col.title"
            :disable="disable && col.name !== 'profile.saw_zoom_presentation'"
            @update:model-value="changevalRec"></q-toggle>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.html">
          <div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true">
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="col.fieldtype === costanti.FieldType.listimages">
        gall3:
        <CGallery
          v-if="myvalue"
          :title="getTitleGall()"
          :directory="getDirectoryGall()"
          :imgGall="myvalue" :edit="isviewfield()"
          @showandsave="Savedb">

        </CGallery>
      </div>
      <div v-else-if="col.fieldtype === costanti.FieldType.image">
        gall4:
        <CGallery
          v-if="myvalue"
          :title="getTitleGall()"
          :directory="getDirectoryGall()"
          :single="isFieldDb()"
          :imgGall="myImgGall" :edit="isviewfield()"
          @showandsave="Savedb">

        </CGallery>
      </div>
      <div v-else-if="col.fieldtype === costanti.FieldType.nationality">
        <div>
          {{ myvalue }}
        </div>
      </div>
      <div v-else-if="col.fieldtype === costanti.FieldType.intcode">
        <div>
          {{ myvalue }}
        </div>
      </div>
      <div v-else>
        <!-- Edit Value -->
        <span v-if="col.fieldtype === costanti.FieldType.date">
                <CDateTime
                  v-if="myvalue"
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
            </span>
        <span v-else-if="col.fieldtype === costanti.FieldType.onlydate">

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
            </span>
        <div v-else>
          <div>
            <div v-if="col.fieldtype === costanti.FieldType.binary">
              <CMyChipList
                :type="costanti.FieldType.binary"
                :value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <!-- Show Value -->
            <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
              <CMyChipList
                :type="costanti.FieldType.multiselect"
                :value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.select">
              <CMyChipList
                myclass="text-center"
                :type="costanti.FieldType.select"
                :value="myvalue"
                :options="globalStore.getTableJoinByName(col.jointable)"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.boolean">
              <q-toggle
                dark color="green" v-model="myvalue" :label="col.title"
                :disable="disable && col.name !== 'profile.saw_zoom_presentation'"
                @update:model-value="Savedb"></q-toggle>
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.html">
              <div v-if="isFieldDb()">
                <div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true"></div>
              </div>
              <div v-else>
                <q-dialog v-model="visueditor" no-backdrop-dismiss persistent full-height full-width>
                  <q-card :style="`min-width: `+ tools.myheight_dialog() + `px;`">
                    <q-card-section>
                      <CMyEditor
                        v-if="visueditor" v-model:value="myvalue" :title="col.title" @keyup.enter.stop
                        @showandsave="Savedb" @annulla="visueditor=false">

                      </CMyEditor>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </div>
            </div>
            <div v-else>
              <span v-html="visuValByType(myvalue, col, row)"></span>
            </div>

            <q-popup-edit
              v-if="canEdit && col.fieldtype !== costanti.FieldType.html"
              v-model="myvalue"
              :disable="col.disable"
              :title="col.title ? col.title : col.titlepopupedit"
              buttons
              persistent
              @save="SaveValueInt"
              @show="OpenEdit"
              v-slot="scope">

              <div v-if="col.fieldtype === costanti.FieldType.boolean">
                <q-checkbox v-model="scope.value" :label="col.title">
                </q-checkbox>
                <span v-html="visuValByType(myvalue, col, row)"></span>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.string">
                <q-input
                  v-model="scope.value"
                  autogrow
                  @keyup.enter.stop
                  autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.password">
                <q-input
                  v-model="scope.value"
                  type="password"
                  @keyup.enter="scope.set"
                  autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.number">
                <q-input
                  v-model="scope.value" type="number"
                  autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.hours">
                <div v-if="isFieldDb()">
                  <CMySelect
                    label="Ore" v-model:value="myvalue"
                    optval="_id" optlab="label"
                    :useinput="false"
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
              <div v-else-if="col.fieldtype === costanti.FieldType.binary">

                <CMyToggleList
                  :label="col.titlepopupedit"
                  :options="globalStore.getTableJoinByName(col.jointable)"
                  v-model:value="scope.value"
                  :optval="fieldsTable.getKeyByTable(col.jointable)"
                  :optlab="fieldsTable.getLabelByTable(col.jointable)">
                </CMyToggleList>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.select">
                <CMySelect
                  :label="col.label"
                  v-model:value="scope.value"
                  :optval="fieldsTable.getKeyByTable(col.jointable)"
                  :optlab="fieldsTable.getLabelByTable(col.jointable)"
                  :options="globalStore.getTableJoinByName(col.jointable)"
                  :useinput="false">
                </CMySelect>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.nationality">
                <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                  <q-input
                    v-model="countryname"
                    :readonly="true"
                    rounded dense
                    debounce="1000"
                    @keyup.enter="scope.set"
                    :label="title"
                  >

                    <template v-slot:prepend>
                      <div style="font-size: 1rem;">
                        <!--<vue-country-code
                          :defaultCountry="scope.value"
                          :disabledFetchingCountry="true"
                          @onSelect="selectcountry"
                          :preferredCountries="tools.getprefCountries"
                          :dropdownOptions="{ disabledDialCode: true }">

                        </vue-country-code>-->
                      </div>
                    </template>
                  </q-input>
                  <div style="height: 180px;">

                  </div>
                </div>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.intcode">

                <!--                <vue-tel-input
                                  @country-changed="intcode_change"
                                  :value="scope.value"
                                  @update:model-value="oninput"
                                  :placeholder="$t('reg.cell')"
                                  :enabledCountryCode="true"
                                  inputClasses="clCell"
                                  wrapperClasses="clCellCode">
                                </vue-tel-input>
                                -->

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
                  :options="globalStore.getTableJoinByName(col.jointable)"
                  style="min-width: 150px"
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
            </q-popup-edit>
          </div>
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
