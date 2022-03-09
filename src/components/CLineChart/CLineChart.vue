<template>
  <div>
    <BarChart v-bind="barChartProps" />
    <!--<DoughnutChart ref="doughnutRef" :chartData="objdata" :options="options" />-->


    <!--<line-chart :width="tools.getwidthscale($q, 350, 400)+`px`" :title="title" :data="getmydata()" :offset="getoffset()"
                :round="0" :colors="mycolors"></line-chart>
                -->

  </div>
</template>

<script lang="ts" src="./CLineChart.ts">
</script>

<style lang="scss" scoped>
@import './CLineChart.scss';
</style>
