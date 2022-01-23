<template>
  <div class="q-gutter-sm q-pa-sm q-pb-md">

    <div v-if="myuser.profile" class="fit column no-wrap justify-evenly items-center content-start">

      <div class="">
        <q-avatar size="140px">
          <q-img :src="getImgUser()" :alt="username" img-class="imgprofile" height="140px" @click="showPic = true"/>
        </q-avatar>
      </div>

      <div class="text-h6">
        <span v-if="checkifShow('name')"> {{ myuser.name }}</span> <span v-if="checkifShow('surname')">{{
          myuser.surname
        }}</span>
      </div>
      <div class="col-12 text-h7 text-blue text-shadow-2">
        {{ myuser.username }}
      </div>
      <div class="col-12 text-h7">
        <span v-if="myuser.profile.born_city">{{ myuser.profile.born_city }}</span> <span
        v-if="myuser.profile.nationality && myuser.profile.nationality !== 'Italia'">({{
          myuser.profile.nationality
        }})</span>
      </div>

      <div v-if="myuser.username !== userStore.my.username">
        <q-btn
          v-if="!userStore.IsMyFriendByUsername(myuser.username) && !userStore.IsAskedFriendByUsername(myuser.username)"
          icon="fas fa-user-plus"
          color="primary" :label="$t('friends.ask_friend')"
          @click="tools.setRequestFriendship($q, userStore.my.username, myuser.username, true)"
        />
        <q-btn
          v-if="userStore.IsAskedFriendByUsername(myuser.username) && !userStore.IsMyFriendByUsername(myuser.username)"
          icon="fas fa-user-minus"
          flat :label="$t('friends.cancel_ask_friend_short')"
          @click="tools.cancelReqFriends($q, userStore.my.username, myuser.username)"
        />
      </div>

      <div class="col-12 text-h8 q-mt-sm">
        <em><span class="qualifica">{{ myuser.profile.qualifica }}</span></em>
      </div>
      <div class="col-12 text-h8 q-mt-sm">
        {{ myuser.profile.biografia }}
      </div>

      <q-btn
        v-if="myuser.username === myusername()" icon="fas fa-pencil-alt"
        color="blue"
        size="md"
        :label="$t('otherpages.modifprof')"
        to="/editprofile">
      </q-btn>

      <div class="row justify-evenly q-pa-sm q-ma-sm">

        <div class="col-md-6 q-mx-sm">
          <q-btn
            v-if="getLinkUserTelegram()" icon="fab fa-telegram"
            color="blue" type="a"
            size="md"
            rounded
            :label="$t('msgs.message')"
            :href="getLinkUserTelegram()" target="__blank">
          </q-btn>

        </div>
        <div class="col-md-6 q-mx-sm">
          <q-btn
            v-if="getLinkWebSite()" icon="fas fa-globe"
            color="blue" type="a"
            size="md"
            rounded
            :label="$t('reg.website')"
            :href="getLinkWebSite()" target="__blank">
          </q-btn>
        </div>
      </div>
    </div>
    <div v-else class="fit column no-wrap justify-evenly items-center content-start">
      <q-skeleton type="QAvatar" size="140px" height="140px" animation="fade"/>
      <q-card flat bordered style="width: 250px">
        <div class="text-h6">
          <q-skeleton :animation="animation"/>
        </div>
        <div class="col-12 text-h7 text-grey text-center">
          {{ username }}
        </div>
        <div class="col-12 text-h7">
          <q-skeleton :animation="animation"/>
        </div>

        <div class="col-12 text-h8 q-mt-sm">
          <q-skeleton :animation="animation"/>
        </div>
        <div class="col-12 text-h8 q-mt-sm">
          <q-skeleton :animation="animation"/>
        </div>
      </q-card>
    </div>

    <CTitleBanner
      class="" :title="$t('dashboard.info')" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <div v-if="myuser.profile" class="fit column no-wrap justify-evenly content-start">

        <div class="col-6 text-h6">
          <CDateTime
            v-if="checkifShow('profile.dateofbirth') && !!myuser.profile.dateofbirth"
            v-model:value="myuser.profile.dateofbirth"
            :label="$t('reg.dateofbirth')"
            :canEdit="false">
          </CDateTime>

        </div>

      </div>

    </CTitleBanner>

    <CTitleBanner
      class="" title="Competenze e Talenti" bgcolor="bg-positive" clcolor="text-white"
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

