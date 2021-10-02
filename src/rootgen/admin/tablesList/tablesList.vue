<template>
  <CMyPage img="" :title="$t('otherpages.admin.tableslist')" keywords="" description="">

    <CGridTableRec
      :prop_mytitle="$t('otherpages.admin.tableslist')"
      :nodataLabel="$t('grid.nodata')"
      noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
      :tablesList="gettablesList()"
    >

    </CGridTableRec>


    <!--
    <CGridTableRec
      prop_mytable="sites"
      prop_mytitle="Lista Siti"
      :prop_mycolumns="colTableSites"
      prop_colkey="name"
      nodataLabel="Nessun Sito"
      noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

    </CGridTableRec>
    -->

  </CMyPage>
</template>
<script lang="ts" src="./tablesList.ts">
</script>

<style lang="scss" scoped>
@import './tablesList.scss';
</style>
