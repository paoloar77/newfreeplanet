<template>
  <CMyPage img="" :title="$t('otherpages.admin.circuitslist')" keywords="" description="Lista Circuiti">
    <CGridTableRec
      prop_mytable="circuits"
      prop_mytitle="Lista Circuiti"
      :prop_mycolumns="fieldsTable.circuitslist()"
      prop_colkey="_id"
      nodataLabel="Nessun Circuito"
      noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
      :arrfilters="arrfilterand">

    </CGridTableRec>
  </CMyPage>
</template>
<script lang="ts" src="./circuitsList.ts">
</script>

<style lang="scss" scoped>
@import './circuitsList.scss';
</style>


