<template>
  <CMyPage title="Pagine" imgbackground="../../public/images/calendario_eventi.jpg" sizes="max-height: 120px">
        <span>{{
            setmeta({
              title: 'Pagine',
              description: '',
              keywords: '',
            })
          }}
        </span>

    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Pagine"></CTitleBanner>
      <CGridTableRec
        prop_mytable="mypage"
        prop_mytitle="Lista Pagine"
        :prop_mycolumns="colmypage"
        prop_colkey="title"
        nodataLabel="Nessuna Pagina"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./pages.ts">

</script>
<style lang="scss" scoped>
@import 'pages.scss';
</style>
