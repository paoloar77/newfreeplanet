<template>
  <div>
    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CGridTableRec
        prop_mytable="myskills"
        prop_mytitle=""
        :prop_mycolumns="colmySkills"
        prop_colkey="idSkill"
        col_title="subTitle"
        :vertical="true"
        nodataLabel="Nessuna Competenza inserita"
        :prop_search="false"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
        :defaultnewrec="getdefaultnewrec">

      </CGridTableRec>
    </div>
  </div>

</template>

<script lang="ts" src="./CSkill.ts">
</script>
<style lang="scss" scoped>
@import './CSkill.scss';
</style>
