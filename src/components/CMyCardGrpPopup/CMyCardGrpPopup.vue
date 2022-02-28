<template>

  <q-card class="dialog_card q-mb-lg" v-if="myrec">
    <q-footer
      class="bg-white small-screen-only text-center"
      bordered
    >
      <q-btn push rounded color="primary" icon="close" label="Chiudi" v-close-popup></q-btn>

    </q-footer>
    <q-bar dense class="bg-primary text-white">
      {{ myrec.title }} ({{ myrec.groupname }})
      <q-space/>
      <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
    </q-bar>
    <q-card-section class="inset-shadow">
      <!-- Per ora visualizzo solo la Prima Immagine -->
      <div class="text-center">

        <q-img
          v-if="tools.getValue(myrec, 'photos', '')"
          :src="tools.getFullFileName(tools.getValue(myrec, 'photos', ''), table, myrec.username, myrec.groupname)"
          class="img"
          alt="immagine del gruppo"></q-img>
      </div>

      <!--:title="t(mycol.label_trans)"-->

      <div v-for="(mycol, index) of col" :key="index">
        <div
          v-if="(mycol.visible && (tools.checkIfShowField(mycol, tools.TIPOVIS_SHOW_RECORD, false, tools.getValue(myrec, mycol.field, mycol.subfield))))">
          <div v-if="mycol.fieldtype === costanti.FieldType.html && tools.getValue(myrec, mycol.field, mycol.subfield)">
            <div class="note-bacheca"
                 v-html="tools.getValue(myrec, mycol.field, mycol.subfield)">

            </div>
          </div>
          <div v-else-if="mycol.name === 'descr'">
            <div class="text-bacheca">
              {{ tools.getValue(myrec, mycol.field, mycol.subfield) }}
            </div>
          </div>
          <div v-else-if="mycol.name === 'photos' && myrec.photos.length <= 1">
          </div>
          <div v-else-if="mycol.name === 'admins'">
            <CMyFieldRec
              title="Amministratori:"
              :table="table"
              :id="myrec._id"
              :rec="myrec"
              :field="mycol.field"
              :canEdit="false"
              :canModify="false">
            </CMyFieldRec>

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

      <div class="row q-ma-sm q-pa-sm justify-center">
        <div class="q-ma-sm">
          <q-btn
            icon="far fa-file-alt" label="Apri Pagina" color="primary" text-color="white"
            :to="tools.getToByCol(col, table, myrec)"
          />

        </div>
        <div class="q-ma-sm">
          <q-btn
            color="primary" text-color="white" icon="fas fa-copy" label="Condividi Pagina"
            @click="condividipag"></q-btn>
        </div>
      </div>

      <br><br>
    </q-card-section>

  </q-card>
</template>

<script lang="ts" src="./CMyCardGrpPopup.ts">
</script>

<style lang="scss" scoped>
@import './CMyCardGrpPopup.scss';
</style>

