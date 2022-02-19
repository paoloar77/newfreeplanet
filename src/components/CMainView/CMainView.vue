<template>
  <div>
    <div class="row q-ma-xs shadow justify-center" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">
        <CBigBtn
          v-for="(card, ind) of cardsbig" :key="ind"
          :label="card.title" :to="card.to" :icon="card.icon" :color="card.color" :text-color="!!card.textcolor ? card.textcolor : ''"
          :small="card.small"
          :numcol="2"
          :hint="card.hint" :disable="card.disable">
        </CBigBtn>
    </div>
    <div class="row shadow justify-center" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">
        <CBigBtn
          v-for="(card, ind) of cardssmall" :key="ind"
          :label="card.title" :to="card.to" :icon="card.icon" :color="card.color" :text-color="!!card.textcolor ? card.textcolor : ''"
          :small="card.small"
          :numcol="3"
          :hint="card.hint" :disable="card.disable">
        </CBigBtn>
    </div>
  </div>
  <!--<div class="row justify-center">
    <CBigBtn
      label="Info" to="" @click="showInfo = true" icon="fas fa-info" color="primary"
      :numcol="3"
      >
    </CBigBtn>
  </div>
  <div v-if="showInfo">

  </div>-->
</template>

<script lang="ts" src="./CMainView.ts">
</script>

<style lang="scss" scoped>
@import './CMainView.scss';
</style>
