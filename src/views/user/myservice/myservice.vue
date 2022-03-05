<template>
  <CMyPage
    :title="username" imgbackground="images/calendario_eventi.jpg"
    sizes="max-height: 120px" styleadd="bottom: -20px !important;">

    <div v-if="!tools.isLogged()">
      <CCheckIfIsLogged></CCheckIfIsLogged>
    </div>
    <div v-else>
      <CMyCardPopup
        v-if="!!idSkill"
        :table="toolsext.TABMYSKILLS"
        :nopopup="true"
        :idRec="idSkill">

      </CMyCardPopup>
    </div>

    <!--
    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <div v-if="!!myskill.note" v-html="myskill.note"></div>

      <div v-for="(photo, index) in myskill.photos" :key="index">
        <div v-if="!!photo.imagefile" class="text-center">

          <q-img :src="'upload/profile/'+myskill.username+'/myskills/'+photo.imagefile" class="img"></q-img>
        </div>
      </div>

      <div class="row justify-evenly">
        <CSkill
          :table="table"
          :filtercustom="filtroutente"
          :visuinpage="true"
        >

        </CSkill>
      </div>

    </div>
    -->



    <br>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./myservice.ts">
</script>

<style lang="scss" scoped>
@import './myservice.scss';
</style>

