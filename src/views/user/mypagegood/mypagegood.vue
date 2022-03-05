<template>
  <CMyPage title="Bene"
           imgbackground="images/calendario_eventi.jpg"
           sizes="max-height: 120px" styleadd="bottom: -20px !important;">

    <div v-if="!tools.isLogged()">
      <CCheckIfIsLogged></CCheckIfIsLogged>
    </div>

    <CMyCardPopup
      v-if="!!idGood"
      :table="toolsext.TABMYGOODS"
      :nopopup="true"
      :idRec="idGood">

    </CMyCardPopup>

    <br>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./mypagegood.ts">
</script>

<style lang="scss" scoped>
@import './mypagegood.scss';
</style>

