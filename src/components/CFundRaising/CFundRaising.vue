<template>
  <q-page class="text-white">

    <div class="landing">

      <section class="bg-primary">
        <div class=" row justify-between items-start q-col-gutter-sm">
          <div class="col-12">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-hands-holding"> </i>
              <div class="text-big" v-html="t('homepage.freesostieni.title')"></div>
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
