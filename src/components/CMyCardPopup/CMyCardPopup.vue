<template>
  <q-card class="dialog_card q-mb-lg" v-if="myrec">
    <q-footer
      class="bg-white small-screen-only text-center"
      bordered
    >
      <q-btn push rounded color="primary" icon="close" label="Chiudi" v-close-popup></q-btn>

    </q-footer>
    <q-bar dense class="bg-primary text-white">
      {{ myrec.username }}
      <q-space/>
      <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
    </q-bar>
    <q-card-section class="inset-shadow">
      <!-- Per ora visualizzo solo la Prima Immagine -->
      <div class="text-center">

        <q-img
          v-if="tools.getValue(myrec, 'photos', '')"
        :src="tools.getFullFileName(tools.getValue(myrec, 'photos', ''), table, myrec.username)" class="img" alt="immagine bene"></q-img>
      </div>

      <div class="text-center">
        <q-chip :icon="fieldsTable.getIconByAdType(myrec.adType)"
                :color="fieldsTable.getColByAdType(myrec.adType)"
                text-color="white">{{
            fieldsTable.getValByTabAndId(table, 'adType', myrec.adType)
          }}
        </q-chip>
      </div>

      <!--:title="t(mycol.label_trans)"-->

      <div v-for="(mycol, index) of col" :key="index">
        <div
          v-if="(mycol.visible && (tools.checkIfShowField(mycol, tools.TIPOVIS_SHOW_RECORD, false, tools.getValue(myrec, mycol.field, mycol.subfield))))">
          <div v-if="mycol.fieldtype === costanti.FieldType.html">
            <div class="note-bacheca"
                 v-html="tools.getValue(myrec, mycol.field, mycol.subfield)">

            </div>
          </div>
          <div v-else-if="mycol.name === 'descr'">
            <div class="text-bacheca">
              {{ tools.getValue(myrec, mycol.field, mycol.subfield) }}
            </div>
          </div>
          <CMyFieldRec
            v-else
            :table="table"
            :id="myrec._id"
            :rec="myrec"
            :field="mycol.field"
            :canEdit="false"
            :canModify="false">
          </CMyFieldRec>
        </div>
      </div>

      <br><br>
    </q-card-section>

  </q-card>
</template>

<script lang="ts" src="./CMyCardPopup.ts">
</script>

<style lang="scss" scoped>
@import './CMyCardPopup.scss';
</style>

