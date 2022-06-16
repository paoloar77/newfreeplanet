<template>
  <q-page class="text-black">

    <div class="landing">

      <section class="bg-white">
        <div class=" row justify-between items-start q-col-gutter-sm">
          <div class="col-12">
            <div class="feature-item" style="margin-top: 0px !important;">
              <div class="text-big" style="margin: 0px !important; padding: 2px !important;" v-html="t('homepage.freesostieni.title')"></div>
              <p class="feat-descr" v-html="t('homepage.freesostieni.descr')"></p></div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  </q-page>
</template>

<script lang="ts" src="./CFundRaising.ts">
</script>

<style lang="scss" scoped>
@import './CFundRaising.scss';
</style>
