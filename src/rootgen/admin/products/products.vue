<template>
  <CMyPage title="Prodotti" imgbackground="images/prodotti.jpg" sizes="max-height: 120px">
        <span>{{
            setmeta({
              title: 'Prodotti',
              description: '',
              keywords: '',
            })
          }}
        </span>


    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Prodotti"></CTitleBanner>
      <CGridTableRec
        prop_mytable="products"
        prop_mytitle="Lista Prodotti"
        :prop_mycolumns="colTableProducts"
        prop_colkey="name"
        nodataLabel="Nessun Prodotto"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./products.ts">

</script>
<style lang="scss" scoped>
@import 'products.scss';
</style>
