<template>
  <CMyPage title="Pagina:"
           imgbackground="images/calendario_eventi.jpg"
           sizes="max-height: 120px" styleadd="bottom: -20px !important;">

    <div v-if="!tools.isLogged()">
      <CCheckIfIsLogged></CCheckIfIsLogged>
    </div>

    <CMyCardPopup
      v-if="!!idBacheca"
      :table="toolsext.TABMYBACHECAS"
      :idRec="idBacheca">

    </CMyCardPopup>

    <br>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./mypagebacheca.ts">
</script>

<style lang="scss" scoped>
@import './mypagebacheca.scss';
</style>

