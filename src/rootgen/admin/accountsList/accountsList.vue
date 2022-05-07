<template>
  <CMyPage img="" :title="$t('otherpages.admin.accountsList')" keywords="" description="Lista Conti">
    <CGridTableRec
      prop_mytable="accounts"
      prop_mytitle="Lista Conti"
      :prop_mycolumns="fieldsTable.accountslist()"
      prop_colkey="_id"
      nodataLabel="Nessun Conto"
      noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
      :arrfilters="arrfilterand">

    </CGridTableRec>
  </CMyPage>
</template>
<script lang="ts" src="./accountsList.ts">
</script>

<style lang="scss" scoped>
@import './accountsList.scss';
</style>


