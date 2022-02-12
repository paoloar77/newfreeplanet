<template>
  <div class="q-pa-xs col-xs-6 col-sm-6 col-md-4 col-lg-2">
    <div class="q-ma-sm">
      <q-btn :color="color" rounded :to="to" v-bind="$attrs">
        <q-icon class="q-ma-sm" size="4em" :name="icon"/>
        <div class="q-ma-sm text-h5">{{ label }}</div>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./CBigBtn.ts">
</script>

<style lang="scss" scoped>
@import './CBigBtn.scss';
</style>
