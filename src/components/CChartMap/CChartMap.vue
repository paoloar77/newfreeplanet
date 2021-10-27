<template>
  <div class="chart">

    <div>{{ title }}</div>
    <figure style="background-color: #404a59">
      <v-chart
        :option="map"
        :init-options="initOptions"
        ref="map"
        autoresize
      />
    </figure>

    <aside class="renderer">
      <button
        :class="{
          active: initOptions.renderer === 'canvas'
        }"
        @click="initOptions.renderer = 'canvas'"
      >
        Canvas
      </button>
      <button
        :class="{
          active: initOptions.renderer === 'svg'
        }"
        @click="initOptions.renderer = 'svg'"
      >SVG
      </button>
    </aside>
  </div>
</template>

<script lang="ts" src="./CChartMap.ts">
</script>

<style lang="scss" scoped>
@import './CChartMap.scss';
</style>
