<template>
  <CMyPage
    :title='myskill.subTitle' imgbackground="images/calendario_eventi.jpg"
    sizes="max-height: 100px" styleadd="bottom: -16px !important;">

    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <div v-if="!!myskill.note" v-html="myskill.note"></div>

      <div v-for="(photo, index) in myskill.photos" :key="index">
        <div v-if="!!photo.imagefile" class="text-center">

          <q-img :src="'upload/profile/'+myskill.username+'/myskills/'+photo.imagefile" class="img"></q-img>
        </div>
      </div>

      <div class="row justify-evenly">
        <CSkill
          :filtercustom="filtroutente"
          :visuinpage="true"
        >

        </CSkill>
      </div>

      <div class="row justify-evenly q-mt-md">
        <q-btn
          type="a" rounded size="md"
          color="white" text-color="blue" :icon="`img:`+userStore.getImgByUsername(myskill.username)"
          :to="'/my/'+myskill.username"
          :label="myskill.username"
        >
        </q-btn>

      </div>

    </div>



    <br>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./mypageskill.ts">
</script>

<style lang="scss" scoped>
@import './mypageskill.scss';
</style>

