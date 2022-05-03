<template>
  <CMyPage title="Ospitalità"
           imgbackground="images/calendario_eventi.jpg"
           sizes="max-height: 120px" styleadd="bottom: -20px !important;">

    <div v-if="!tools.isLogged()">
      <CCheckIfIsLogged></CCheckIfIsLogged>
    </div>

    <CMyCardPopup
      v-if="!!idHosp"
      :table="toolsext.TABMYHOSPS"
      :nopopup="true"
      :idRec="idHosp">

    </CMyCardPopup>

    <br>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./mypagehosp.ts">
</script>

<style lang="scss" scoped>
@import './mypagehosp.scss';
</style>

