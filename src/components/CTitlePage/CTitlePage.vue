<template>
  <q-banner
    rounded
    dense
    class="text-white"
    :style="`text-align: center; background-color: ${mycolor}`">
    <template v-slot:avatar>
      <q-icon :name="myicon" size="xs" />
    </template>
    <span class="mybanner">{{mytitle}}</span>
  </q-banner>
</template>

<script lang="ts" src="./CTitlePage.ts">
</script>

<style lang="scss" scoped>
@import './CTitlePage.scss';
</style>
