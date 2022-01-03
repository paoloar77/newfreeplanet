<template>
  <div class="q-gutter-sm q-pa-sm q-pb-md">

    <div v-if="myuser.profile" class="fit column no-wrap justify-evenly items-center content-start">

      <div class="">
        <q-avatar size="140px">
          <img :src="getImgUser()" :alt="username" class="imgprofile" @click="showPic = true">
        </q-avatar>
      </div>

      <div class="text-h6">
        <span v-if="checkifShow('name')"> {{ myuser.name }}</span> <span v-if="checkifShow('surname')">{{
          myuser.surname
        }}</span>
      </div>
      <div class="col-12 text-h8 text-grey">
        {{ myuser.username }}
      </div>
      <div class="col-12 text-h7">
        {{ myuser.profile.born_city }} ({{ myuser.profile.nationality }})
      </div>

      <div class="col-12 text-h8 q-mt-sm">
        {{ myuser.profile.biografia }}
      </div>

      <div class="col-12 row justify-evenly q-mt-md">
        <q-btn
          v-if="getLinkUserTelegram()" icon="fab fa-telegram"
          color="blue" type="a"
          size="md"
          rounded
          :label="$t('msgs.message')"
          :href="getLinkUserTelegram()" target="__blank">
        </q-btn>
        <q-btn
          v-if="false"
          icon="fab fa-telegram"
          color="white"
          text-color="black"
          size="md"
          rounded>
        </q-btn>

      </div>
    </div>

    <CTitleBanner
      class="" :title="$t('dashboard.info')" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <div v-if="myuser.profile" class="fit column no-wrap justify-evenly content-start">

        <div class="col-6 text-h6">
          <CDateTime
            v-if="checkifShow('profile.dateofbirth')"
            v-model:value="myuser.profile.dateofbirth"
            :label="$t('reg.dateofbirth')"
            :canEdit="false">
          </CDateTime>

          <div v-if="myuser.profile.born_city"
               class="col-6 text-h7">
            {{ myuser.profile.born_city }}
          </div>
        </div>

      </div>

    </CTitleBanner>

    <CTitleBanner
      class="" title="Competenze e Talenti" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <CSkill
        :filtercustom="filtroutente"
        :butt_modif_new="false"
      >

      </CSkill>


    </CTitleBanner>

  </div>
  <q-dialog
    v-model="showPic"
    full-height full-width
    >

    <img :src="getImgUser()" :alt="username" class="full-width">

  </q-dialog>

</template>

<script lang="ts" src="./myprofile.ts">
</script>

<style lang="scss" scoped>
@import './myprofile.scss';
</style>

