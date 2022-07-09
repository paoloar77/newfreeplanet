<template>
  <div v-if="isOpen" class="tothebottomfixed" role="dialog">
    <div class="q-pa-md q-gutter-sm">
      <transition appear name="slide-up" mode="out-in" :duration="2000">
        <q-banner class="bg-primary text-white" transition-show="jump-down">
          {{ t('cookies') }}
          <template v-slot:action>
            <div class="row justify-center margin_buttons_cook q-gutter-lg text-center">
              <q-btn label="INFO" to="/policy"></q-btn>
              <q-btn color="green" label="ACCETTA" @click="accept"></q-btn>
              <q-btn
                color="red" label="RIFIUTA"
                @click="decline">

              </q-btn>
            </div>
          </template>
        </q-banner>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./BannerCookies.ts">
</script>

<style lang="scss" scoped>
@import './BannerCookies.scss';
</style>
