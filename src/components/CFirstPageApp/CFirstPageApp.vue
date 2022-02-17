<template>
  <div v-if="tools.isTest()">
    <q-banner
      rounded
      dense
      class="bg-primary text-white"
      color="primary q-title"
      style="text-align: center;">
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="yellow" size="xs" />
      </template>
      <span class="mybanner">Ambiente di Test</span>
    </q-banner>
  </div>
</template>

<script lang="ts" src="./CFirstPageApp.ts">
</script>

<style lang="scss" scoped>
@import './CFirstPageApp.scss';
</style>
