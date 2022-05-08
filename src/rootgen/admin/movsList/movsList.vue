<template>
  <CMyPage img="" :title="$t('otherpages.admin.movsList')" keywords="" description="Lista Movimenti">
    <CGridTableRec
      prop_mytable="movements"
      prop_mytitle="Lista Movimenti"
      :prop_mycolumns="fieldsTable.movslist()"
      prop_colkey="_id"
      nodataLabel="Nessun Movimento"
      noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
      :arrfilters="arrfilterand">

    </CGridTableRec>
  </CMyPage>
</template>
<script lang="ts" src="./movsList.ts">
</script>

<style lang="scss" scoped>
@import './movsList.scss';
</style>


