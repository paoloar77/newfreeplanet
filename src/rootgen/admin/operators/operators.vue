<template>
  <CMyPage title="Operatori" imgbackground="images/calendario_eventi.jpg" sizes="max-height: 120px">
        <span>{{
            setmeta({
              title: 'operators',
              description: '',
              keywords: '',
            })
          }}
        </span>

    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Operatori"></CTitleBanner>
      <CGridTableRec
        prop_mytable="operators"
        prop_mytitle="Lista Operatori"
        :prop_mycolumns="fieldsTable.colOperators()"
        prop_colkey="_id"
        nodataLabel="Nessun Operatore"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./operators.ts">

</script>
<style lang="scss" scoped>
@import 'operators.scss';
</style>
