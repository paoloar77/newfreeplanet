<template>
  <div>
    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CGridTableRec
        v-if="filtercustom.length > 0"
        prop_mytable="myskills"
        prop_mytitle=""
        :prop_mycolumns="colmySkills"
        prop_colkey="idSkill"
        col_title="descr"
        col_footer="idCity"
        :vertical="-1"
        :choose_visutype="!visuinpage"
        :butt_modif_new="!visuinpage"
        nodataLabel="Nessuna Competenza inserita"
        :prop_search="false"
        :visuinpage="visuinpage"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
        :defaultnewrec="getdefaultnewrec"
        :filtercustom="filtercustom"
        v-bind="$attrs"
        :extraparams="extraparams()">

      </CGridTableRec>
    </div>
  </div>

</template>

<script lang="ts" src="./CSkill.ts">
</script>
<style lang="scss" scoped>
@import './CSkill.scss';
</style>
