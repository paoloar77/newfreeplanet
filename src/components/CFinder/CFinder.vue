<template>
  <div class="q-pa-sm bi-border-all">
    <div class="q-ma-sm q-gutter-sm q-pa-xs bg-green">
      <CGridTableRec
        v-if="searchList.length > 0"
        prop_mytable="myskills"
        prop_mytitle=""
        :prop_mycolumns="colmySkills"
        prop_colkey="idSkill"
        col_title="subTitle"
        :vertical="true"
        nodataLabel="Nessuna Competenza trovata"
        :prop_search="true"
        :finder="true"
        :choose_visutype="true"
        :butt_modif_new="false"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
        :arrfilters="arrfilterand"
        :filtercustom="filtercustom"
        :prop_searchList="searchList"
        keyMain="idSkill"
        :defaultnewrec="getdefaultnewrec"
        :extraparams="extraparams()">

      </CGridTableRec>
    </div>
  </div>

</template>

<script lang="ts" src="./CFinder.ts">
</script>
<style lang="scss" scoped>
@import './CFinder.scss';
</style>
