<template>
  <div class="bi-border-all">
    <div class="q-ma-xs q-gutter-xs q-pa-xs">

      <div v-if="true" class="q-mr-sm">
        <q-input
          v-model="search" filled dense type="search" debounce="500" :hint="t('finder.search_skill')"
          v-on:keyup.enter="doSearch">
          <template v-slot:after>
            <q-btn dense label="" color="primary" @click="doSearch" icon="search"></q-btn>
          </template>
        </q-input>
      </div>

      <CGridTableRec
        v-if="searchList.length > 0"
        prop_mytable="myskills"
        prop_mytitle=""
        :prop_mycolumns="colmySkills"
        prop_colkey="idSkill"
        col_title="subTitle"
        :vertical="-1"
        :nodataLabel="idSector > 0 ? 'Nessuna Competenza trovata': 'Selezionare un Settore'"
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
