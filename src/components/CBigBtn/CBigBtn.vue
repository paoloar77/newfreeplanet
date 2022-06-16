<template>
  <div v-if="numcol === 3" class="col-xs-4 col-sm-4 col-md-3 col-lg-2">
    <div class="q-ma-sm">
      <q-btn v-if="!small" :flat="flat" class="mybox_3" :color="color" rounded push :to="to" v-bind="$attrs" :style="tools.getbackgroundGradient(color, 180)">
        <q-icon class="q-ma-sm" :name="icon"/>
        <div class="q-ma-sm my-text_3 text-cls no-wrap"><span v-html="label"></span></div>
      </q-btn>
      <q-btn v-if="small" :flat="flat" class="mybox_small" :color="color" rounded push :to="to" v-bind="$attrs" :style="tools.getbackgroundGradient(color, 180)">
        <q-icon class="q-ma-sm" :name="icon" size="sm"/>
        <div class="q-ma-xs my-text-small text-cls no-wrap"><span v-html="label"></span></div>
      </q-btn>
    </div>
  </div>
  <div v-else class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
    <div class="q-ma-sm">
      <q-btn v-if="!small" :flat="flat" class="mybox" :color="color" rounded push :to="to" v-bind="$attrs" :style="tools.getbackgroundGradient(color, 0)">
        <q-icon class="q-ma-sm" size="3rem" :name="icon"/>
        <div class="q-ma-sm text-h5 text-cls no-wrap"><span v-html="label"></span></div>
      </q-btn>
      <q-btn v-if="small" :flat="flat" class="mybox_small" :color="color" rounded push :to="to" v-bind="$attrs" :style="tools.getbackgroundGradient(color, 0)">
        <q-icon class="q-ma-sm" :name="icon" size="sm"/>
        <div class="q-ma-xs my-text-small text-cls no-wrap"><span v-html="label"></span></div>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" src="./CBigBtn.ts">
</script>

<style lang="scss" scoped>
@import './CBigBtn.scss';
</style>
