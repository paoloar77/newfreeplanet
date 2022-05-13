<template>
  <CMyPage title="Bot" imgbackground="images/bot.jpg" sizes="max-height: 120px">

    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Bot"></CTitleBanner>
      <CGridTableRec
        prop_mytable="bots"
        prop_mytitle="Configura Bot"
        :prop_mycolumns="colmybot"
        prop_colkey="_id"
        nodataLabel="Nessun Bot Configurato"
        :defaultnewrec="getdefaultnewrec"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./bot.ts">

</script>
<style lang="scss" scoped>
@import 'bot.scss';
</style>
