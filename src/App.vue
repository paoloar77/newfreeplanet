<template>
  <div>
    <!--<q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">--->
    <q-layout view="hHh lpR fFf" class="shadow-2 rounded-borders">
      <app-header></app-header>
      <q-ajax-bar></q-ajax-bar>

      <!--<CPreloadImages :arrimg="static_data.preLoadImages">
      </CPreloadImages>-->

      <app-footer></app-footer>

      <q-page-container id="mypage">
        <div v-if="finishLoading">
          <CFirstPageApp></CFirstPageApp>
          <router-view/>
        </div>
        <q-inner-loading id="spinner" :showing="!finishLoading">
          <q-spinner-tail
            color="primary"
            size="4em">
          </q-spinner-tail>
        </q-inner-loading>
      </q-page-container>
    </q-layout>
  </div>
  <BannerCookies urlInfo="/policy"></BannerCookies>
</template>
<script lang="ts" src="./App.ts">
</script>
<style lang="scss">
@import './App.scss';
</style>
