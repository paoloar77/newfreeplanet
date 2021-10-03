<template>
  <div class="text-center">
    <div class="row items-center justify-center q-gutter-md q-ma-xs">

      <div class="q-ma-xs">
        <q-field rounded outlined bg-color="blue-1" dense style="min-width:110px;">
          <template v-slot:control>
            <div class="centermydiv">
              <div v-if="myimg" class="text-center">
                <q-img
                  :src="myimg"
                  class="text-center"
                  style="height: 50px; width: 50px;"
                  :alt="title">
                </q-img>
              </div>
              <div class="self-center full-width no-outline text-center" tabindex="0">{{ title }}</div>
            </div>
          </template>
        </q-field>
      </div>
      <div :class="getclassCol(col) + ` q-ma-sm q-pa-sm col-grow rounded-borders`" style="border: 1px solid #bbb">
        <div v-if="type === costanti.FieldType.date">
          Date10:
          <CDateTime
            :label="col.label"
            class="cursor-pointer"
            v-model:value="myvalue"
            :readonly="false"
            :dense="true"
            :canEdit="canEdit"
          >
          </CDateTime>
        </div>
        <div v-else-if="type === costanti.FieldType.onlydate">
          Date11:
          <CDateTime
            :label="col.label"
            class="cursor-pointer"
            v-model:value="myvalue"
            :readonly="false"
            :dense="true"
            :canEdit="canEdit"
            view="date"
          >
          </CDateTime>
        </div>
        <div v-else :class="mycl">
          <div v-if="type === costanti.FieldType.binary">
            <CMyChipList
              :type="costanti.FieldType.binary"
              :value="myvalue"
              :options="globalStore.getTableJoinByName(col.jointable)"
              :optval="fieldsTable.getKeyByTable(col.jointable)"
              :optlab="fieldsTable.getLabelByTable(col.jointable)"
              :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
          </div>
          <!-- Show Value -->
          <div v-else-if="type === costanti.FieldType.nationality">
            <q-input
              input-class="cursor-pointer text-center"
              :readonly="true"
              v-model="countryname"
              rounded
              dense
              debounce="1000"
            >

              <div class="hidden">
                <!--<vue-country-code
                  :defaultCountry="myvalue"
                  :disabledFetchingCountry="true"
                  @onSelect="selectcountry"
                  :preferredCountries="tools.getprefCountries"
                  :dropdownOptions="{ disabledDialCode: true }">

                </vue-country-code>-->
              </div>

            </q-input>
          </div>
          <div v-else-if="type === costanti.FieldType.intcode">

            <div v-html="myvalprinted()"></div>

          </div>
          <div v-else-if="((type === costanti.FieldType.multiselect) || (type === costanti.FieldType.multioption))">
            <CMyChipList
              :type="type"
              :value="myvalue"
              :options="globalStore.getTableJoinByName(col.jointable)"
              :optval="fieldsTable.getKeyByTable(col.jointable)"
              :optlab="fieldsTable.getLabelByTable(col.jointable)"
              :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
          </div>
          <div v-else-if="type === costanti.FieldType.select">
            <CMyChipList
              myclass="text-center"
              :type="costanti.FieldType.select"
              :value="myvalue"
              :options="globalStore.getTableJoinByName(col.jointable)"
              :optval="fieldsTable.getKeyByTable(col.jointable)"
              :optlab="fieldsTable.getLabelByTable(col.jointable)"
              :opticon="fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
          </div>
          <div v-else-if="type === costanti.FieldType.html">
            <div v-html="myvalprinted()">

            </div>
          </div>
          <div v-else-if="type === costanti.FieldType.boolean">
            <q-toggle
              dark color="green" v-model="myvalue" :label="col.title"
              @update:model-value="savefieldboolean"></q-toggle>
          </div>
          <div v-else>
            <div v-html="myvalprinted()"></div>
          </div>

          <q-popup-edit
            v-if="(canEdit && type !== costanti.FieldType.boolean) && !disable"
            v-model="myvalue"
            :disable="col.disable"
            :title="col.title"
            @save="(val, initialValue) => savefield(val, initialValue, myq)"
            buttons
            v-slot="scope"
          >

            <div v-if="type === costanti.FieldType.boolean">
              <q-checkbox v-model="scope.value" :label="col.title">
              </q-checkbox>
              <div v-html="visuValByType(myvalue)">
              </div>
            </div>
            <div v-else-if="type === costanti.FieldType.string">
              <q-input
                v-model="scope.value"
                autogrow
                @keyup.enter.stop
                autofocus>

              </q-input>
            </div>
            <div v-else-if="type === costanti.FieldType.password">
              <q-input
                v-model="scope.value"
                type="password"
                @keyup.enter="scope.set"
                autofocus>

              </q-input>
            </div>
            <div v-else-if="type === costanti.FieldType.number">
              <q-input
                v-model="scope.value" type="number"
                @keyup.enter="scope.set"
                autofocus>

              </q-input>
            </div>
            <div v-else-if="type === costanti.FieldType.hours">
              <CMySelect
                label="Ore" v-model:value="myvalue"
                optval="_id" optlab="label"
                :useinput="false"
                :options="tools.SelectHours">
              </CMySelect>
            </div>
            <div v-else-if="type === costanti.FieldType.binary">
              <CMyToggleList
                :label="col.title"
                :options="globalStore.getTableJoinByName(col.jointable)"
                v-model:value="myvalue"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)">
              </CMyToggleList>
            </div>
            <div v-else-if="type === costanti.FieldType.html">
              <CMyEditor v-model:value="myvalue" :title="title" @keyup.enter.stop>

              </CMyEditor>
            </div>
            <div v-else-if="type === costanti.FieldType.select">
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
                  @keyup.enter="scope.set"
                  :label="title">

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

              <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                <!--<vue-tel-input
                  @country-changed="intcode_change"
                  :value="myvalue"
                  @input="onInput"
                  :disabledFetchingCountry="true"
                  :preferredCountries="tools.getprefCountries"
                  :placeholder="$t('reg.cell')"
                  :enabledCountryCode="true"
                  inputClasses="clCell"
                  wrapperClasses="clCellCode">
                </vue-tel-input>-->
                <div style="height: 180px;">

                </div>
              </div>

            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.multiselect">
              <CMyToggleList
                :label="col.title"
                :options="globalStore.getTableJoinByName(col.jointable)"
                v-model:value="myvalue"
                :optval="fieldsTable.getKeyByTable(col.jointable)"
                :optlab="fieldsTable.getLabelByTable(col.jointable)"
                :isarray="true">
              </CMyToggleList>

              <!--
                            <q-select
                              v-model="scope.value"
                              rounded
                              dense
                              outlined
                              multiple
                              options-dense
                              :display-value="fieldsTable.getTitleByTable(col.jointable)"
                              emit-value
                              map-options
                              :options="globalStore.getTableJoinByName(col.jointable)"
                              :option-label="fieldsTable.getLabelByTable(col.jointable)"
                              :option-value="fieldsTable.getKeyByTable(col.jointable)"
                              style="min-width: 150px"
                            >

                            </q-select>
                            -->
            </div>
            <div v-else-if="col.fieldtype === costanti.FieldType.multioption">
            </div>

          </q-popup-edit>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CMyFieldDb.ts">
</script>

<style lang="scss" scoped>
@import './CMyFieldDb.scss';
</style>
