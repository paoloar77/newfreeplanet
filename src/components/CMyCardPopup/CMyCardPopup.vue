<template>
  <q-card class="dialog_card" v-if="mybacheca">
    <q-bar dense class="bg-primary text-white">
      {{ mybacheca.username }}
      <q-space/>
      <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
    </q-bar>
    <q-card-section class="inset-shadow">

      <div class="text-center">
        <q-chip :icon="fieldsTable.getIconByAdType(mybacheca.adType)"
                :color="fieldsTable.getColByAdType(mybacheca.adType)"
                text-color="white">{{
            fieldsTable.getValByTabAndId(table, 'adType', mybacheca.adType)
          }}
        </q-chip>
      </div>

      <!--:title="t(mycol.label_trans)"-->

      <div v-for="(mycol, index) of col" :key="index">
        <div
          v-if="(mycol.visible && (tools.checkIfShowField(mycol, tools.TIPOVIS_SHOW_RECORD, false, tools.getValue(mybacheca, mycol.field, mycol.subfield))))">
          <div v-if="mycol.fieldtype === costanti.FieldType.html">
            <div class="note-bacheca"
                 v-html="tools.getValue(mybacheca, mycol.field, mycol.subfield)">

            </div>
          </div>
          <div v-else-if="mycol.name === 'descr'">
            <div class="text-bacheca">
              {{ tools.getValue(mybacheca, mycol.field, mycol.subfield) }}
            </div>
          </div>
          <CMyFieldRec
            v-else
            :table="table"
            :id="mybacheca._id"
            :rec="mybacheca"
            :field="mycol.field"
            :canEdit="false"
            :canModify="false">
          </CMyFieldRec>
        </div>
      </div>


    </q-card-section>

  </q-card>
</template>

<script lang="ts" src="./CMyCardPopup.ts">
</script>

<style lang="scss" scoped>
@import './CMyCardPopup.scss';
</style>

