<template>
  <div class="q-gutter-sm q-pa-sm q-pb-md">
    <div v-if="mygrp.descr" class="fit column no-wrap justify-evenly items-center content-start">

      <div class="">
        <q-avatar size="140px">
          <q-img :src="getImgGrp()" :alt="username" img-class="imgprofile" height="140px" @click="showPic = true"/>
        </q-avatar>
      </div>

      <div class="text-h6">
        <span v-if="checkifShow('name')"> {{ mygrp.title }}</span>
      </div>
      <div class="col-12 text-h7 text-blue text-shadow-2">
        {{ mygrp.groupname }}
      </div>
      <div class="col-12 text-h7">
        <span v-if="checkifShow('descr')">{{ mygrp.descr }}</span>
      </div>

      <div v-if="mygrp.admins && !mygrp.admins.includes(userStore.my.username)">
        <q-btn
          v-if="!userStore.IsMyGroupByGroupname(mygrp.groupname) && !userStore.IsAskedGroupByGroupname(mygrp.groupname)"
          icon="fas fa-user-plus"
          color="primary" :label="$t('groups.ask_group')"
          @click="tools.setRequestGroup($q, userStore.my.username, mygrp.groupname, true)"
        />

        <q-btn
          v-if="userStore.IsAskedGroupByGroupname(mygrp.groupname) && !userStore.IsMyGroupByGroupname(mygrp.groupname)"
          icon="fas fa-user-minus"
          flat :label="$t('groups.cancel_ask_group_short')"
          @click="tools.cancelReqGroups($q, userStore.my.username, mygrp.groupname)"
        />
      </div>

      <div v-if="mygrp.title">
        <br>
      </div>

      <q-btn
        v-if="mygrp.admins.includes(userStore.my.username)" icon="fas fa-pencil-alt"
        color="blue"
        size="md"
        :label="$t('otherpages.modifgrp')"
        to="/editgrp">
      </q-btn>

      <div v-if="mygrp.title" class="myrow justify-evenly items-center q-pa-sm q-ma-sm">

        <div class="col-6 q-ma-xs">
          <q-btn
            v-if="getLinkGrpTelegram()" icon="fab fa-telegram"
            color="blue" type="a"
            size="md"
            rounded
            :label="$t('msgs.telegrammsg')"
            :href="getLinkGrpTelegram()" target="__blank">
          </q-btn>

        </div>
        <div class="col-6 q-ma-xs">
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
          {{ groupname }}
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

  </div>
  <q-dialog
    v-model="showPic"
    full-height full-width
  >

    <img :src="getImgGrp()" :alt="groupname" class="full-width">

  </q-dialog>

</template>

<script lang="ts" src="./mygroup.ts">
</script>

<style lang="scss" scoped>
@import './mygroup.scss';
</style>

