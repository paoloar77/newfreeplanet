<template>
  <div :class="getclassCol(col)">
    <div v-if="visulabel" class="flex">
      <div v-if="visInNewRec(col)" style="flex-grow: 1;">
        <div v-if="col.fieldtype === costanti.FieldType.string">
          <q-input
            v-model="myvalue"
            autogrow
            @keyup.enter.stop
            @input="changevalRec"
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
            @input="changevalRec"
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
            @input="changevalRec"
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
            @input="changevalRec"
            :label="col.label"
          >

          </q-input>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.hours">
          <div class="row">
            <q-input
              v-model="myvalue" type="number"
              autofocus
              @input="changevalRec"
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
                   @input="changevalRec"
                   :label="col.label">
          </q-input>
          -->

        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.listimages">
          <CGallery
            :gall="row" :listimages="myvalue" :edit="isviewfield()"
            @showandsave="Savedb"
            @input="changevalRec"
          >

          </CGallery>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.image">
          <CGallery
            :gall="row" :listimages="myvalue" :edit="isviewfield()"
            @input="changevalRec"
            @showandsave="Savedb">

          </CGallery>
        </div>
        <div v-if="col.fieldtype === costanti.FieldType.binary">
          <CMyChipList
            :type="costanti.FieldType.binary"
            :value="myvalue"
            @input="changevalRec"
            :options="globalStore.getTableJoinByName(col.jointable)"
            :optval="fieldsTable.getKeyByTable(col.jointable)"
            :optlab="fieldsTable.getLabelByTable(col.jointable)"
            :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
        </div>
        <!-- Show Value -->
        <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
          <CMyChipList
            @input="changevalRec"
            :type="costanti.FieldType.multiselect"
            :value="myvalue"
            :options="globalStore.getTableJoinByName(col.jointable)"
            :optval="fieldsTable.getKeyByTable(col.jointable)"
            :optlab="fieldsTable.getLabelByTable(col.jointable)"
            :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
        </div>
        <div v-else-if="col.fieldtype === costanti.FieldType.select">
          <CMyChipList
            @input="changevalRec"
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
        <CGallery
          :gall="row" :listimages="myvalue" :edit="isviewfield()"
          @showandsave="Savedb">

        </CGallery>
      </div>
      <div v-else-if="col.fieldtype === costanti.FieldType.image">
        <CGallery
          :gall="row" :listimages="myvalue" :edit="isviewfield()"
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
          Data4:
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
              <div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true">

              </div>
            </div>
            <div v-else>
              {{ visuValByType(myvalue, col, row) }}

            </div>

            <div v-if="col.fieldtype === costanti.FieldType.html">

              <!--<q-dialog v-model="showeditor">-->
              <CMyEditor
                v-if="visueditor" v-model:value="myvalue" :title="col.title" @keyup.enter.stop
                @showandsave="Savedb" @annulla="visueditor=false">

              </CMyEditor>
              <!--</q-dialog>-->
            </div>

            <q-popup-edit
              v-if="canEdit && col.fieldtype !== costanti.FieldType.html"
              v-model="myvalue"
              :disable="col.disable"
              :title="col.title"
              buttons
              persistent
              @save="SaveValueInt"
              @show="OpenEdit"
              v-slot="scope">

              <div v-if="col.fieldtype === costanti.FieldType.boolean">
                Boolean:
                <q-checkbox v-model="scope.value" :label="col.title">
                </q-checkbox>
                {{ visuValByType(myvalue, col, row) }}
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
                <q-input
                  v-model="scope.value" type="number"
                  autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.binary">
                <CMyToggleList
                  :label="col.title"
                  :options="globalStore.getTableJoinByName(col.jointable)"
                  v-model:value="myvalue"
                  :optval="fieldsTable.getKeyByTable(col.jointable)"
                  :optlab="fieldsTable.getLabelByTable(col.jointable)">
                </CMyToggleList>
              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.select">
                <CMySelect
                  :label="col.title"
                  v-model:value="myvalue"
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
                  >

                    <template v-slot:prepend>
                      <div style="font-size: 1rem;">
                        <!--<vue-country-code
                          :defaultCountry="myvalue"
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
                  :value="myvalue"
                  @input="oninput"
                  :placeholder="$t('reg.cell')"
                  :enabledCountryCode="true"
                  inputClasses="clCell"
                  wrapperClasses="clCellCode">
                </vue-tel-input>
                -->

              </div>
              <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
                <div>join: {{ col.jointable }}</div>

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
                  :option-label="fieldsTable.getLabelByTable(col.jointable)"
                  :option-value="fieldsTable.getKeyByTable(col.jointable)"
                  style="min-width: 150px"
                  @input="changeCol">

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
