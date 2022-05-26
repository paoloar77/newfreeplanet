<template>
  <CMyPage title="Discipline" imgbackground="images/calendario_eventi.jpg" sizes="max-height: 120px">
        <span>{{
            setmeta({
              title: 'disciplines',
              description: '',
              keywords: '',
            })
          }}
        </span>

    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Discipline"></CTitleBanner>
      <CGridTableRec
        prop_mytable="disciplines"
        prop_mytitle="Lista Discipline"
        :prop_mycolumns="fieldsTable.colDisciplines()"
        prop_colkey="_id"
        nodataLabel="Nessuna Disciplina"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./disciplines.ts">

</script>
<style lang="scss" scoped>
@import 'disciplines.scss';
</style>
