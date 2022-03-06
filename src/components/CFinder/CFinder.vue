<template>
  <div class="bi-border-all">
    <div class="q-ma-xs q-gutter-xs q-pa-xs">

      <div v-if="showFilterPersonal"
           class="text-center">
        <q-btn-toggle
          v-model="myrecfiltertoggle"
          push
          glossy
          toggle-color="primary"
          :options="[
          {label: 'Tutti', value: tools.FILTER_ALL},
          {label: 'Personali', value: tools.FILTER_MYREC},
          // {label: 'Seguo', value: tools.FILTER_MYFOLLOW},
        ]"
        />
      </div>
      <div v-if="false" class="q-mr-sm">
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
        :prop_mytable="table"
        prop_mytitle=""
        :prop_mycolumns="col"
        :prop_colkey="prop_colkey"
        :col_title="col_title"
        :col_footer="col_footer"
        :col_tabfooter="col_tabfooter"
        :vertical="costanti.VISUTABLE_LISTA"
        :prop_pagination="mypagination"
        :showType="showType"
        :hint="hint"
        :nodataLabel="noMsgRecord"
        :prop_search="true"
        :finder="true"
        :choose_visutype="visuType"
        :butt_modif_new="true"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
        :arrfilters="arrfilterand"
        :filtercustom="filtercustom"
        :prop_searchList="searchList"
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
