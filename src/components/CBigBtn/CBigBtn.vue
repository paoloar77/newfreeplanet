<template>
  <div v-if="numcol === 3" class="col-xs-4 col-sm-4 col-md-3 col-lg-2">
    <div class="q-ma-xs">
      <q-btn v-if="!small" class="mybox_3" :color="color" rounded :to="to" v-bind="$attrs">
        <q-icon class="q-ma-sm" :name="icon"/>
        <div class="q-ma-sm my-text_3">{{ label }}</div>
      </q-btn>
      <q-btn v-if="small" class="mybox_small" :color="color" rounded :to="to" v-bind="$attrs">
        <q-icon class="q-ma-xs" :name="icon" size="sm"/>
        <div class="q-ma-xs my-text-small">{{ label }}</div>
      </q-btn>
    </div>
  </div>
  <div v-else class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
    <div class="q-ma-sm">
      <q-btn v-if="!small" class="mybox" :color="color" rounded :to="to" v-bind="$attrs">
        <q-icon class="q-ma-sm" size="4.5rem" :name="icon"/>
        <div class="q-ma-sm text-h5">{{ label }}</div>
      </q-btn>
      <q-btn v-if="small" class="mybox_small" :color="color" rounded :to="to" v-bind="$attrs">
        <q-icon class="q-ma-xs" :name="icon" size="sm"/>
        <div class="q-ma-xs my-text-small">{{ label }}</div>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./CBigBtn.ts">
</script>

<style lang="scss" scoped>
@import './CBigBtn.scss';
</style>
