<template>
  <div>
    Esempio:
    <!-- <v-chart
    class="echarts" id="logo" :option="logo" :init-options="initOptions" autoresize /> -->
    <h1><a href="https://github.com/ecomfe/vue-echarts">Vue-ECharts</a></h1>
    <p class="desc">
      Vue.js component for Apache ECharts. (<a
        href="https://github.com/ecomfe/vue-echarts#readme"
        >docs</a
      >)
    </p>

    <h2 id="bar">
      <a href="">Bar chart <small>(with async data &amp; custom theme)</small></a
      >
      <button
        :class="{
          round: true,
          expand: expand.bar
        }"
        @click="expand.bar = !expand.bar"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.bar">
      <figure>
        <v-chart
          :option="bar"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
          :loading="barLoading"
          :loadingOptions="barLoadingOptions"
          @zr:click="handleZrClick"
          @click="handleClick"
        />
      </figure>
      <p v-if="seconds <= 0"><small>Loaded.</small></p>
      <p v-else>
        <small
          >Data coming in <b>{{ seconds }}</b> second{{
            seconds > 1 ? "s" : ""
          }}...</small
        >
      </p>
      <p><button @click="refresh" :disabled="seconds > 0">Refresh</button></p>
    </section>

    <h2 id="pie">
      <a href="#pie">Pie chart <small>(with action dispatch)</small></a>
      <button
        :class="{
          round: true,
          expand: expand.pie
        }"
        @click="expand.pie = !expand.pie"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.pie">
      <figure>
        <v-chart
          :option="pie"
          :init-options="initOptions"
          ref="pie"
          autoresize
        />
      </figure>
    </section>

    <h2 id="polar">
      <a href="#polar">Polar plot <small>(with built-in theme)</small></a>
      <button
        :class="{
          round: true,
          expand: expand.polar
        }"
        @click="expand.polar = !expand.polar"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.polar">
      <figure :style="polarTheme === 'dark' ? 'background-color: #100c2a' : ''">
        <v-chart
          :option="polar"
          :init-options="initOptions"
          :theme="polarTheme"
          autoresize
        />
      </figure>
      <p>
        Theme
        <select v-model="polarTheme">
          <option :value="null">Default</option>
          <option value="dark">Dark</option>
        </select>
      </p>
    </section>

    <h2 id="scatter">
      <a href="#scatter">Scatter plot <small>(with gradient)</small></a>
      <button
        :class="{
          round: true,
          expand: expand.scatter
        }"
        @click="expand.scatter = !expand.scatter"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.scatter">
      <figure>
        <v-chart :option="scatter" :init-options="initOptions" autoresize />
      </figure>
    </section>

    <h2 id="map">
      <a href="#map">Map <small>(with GeoJSON &amp; image converter)</small></a>
      <button
        :class="{
          round: true,
          expand: expand.map
        }"
        @click="expand.map = !expand.map"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.map">
      <figure style="background-color: #404a59">
        <v-chart
          :option="map"
          :init-options="initOptions"
          ref="map"
          autoresize
        />
      </figure>
      <p><button @click="convert">Convert to image</button></p>
    </section>

    <!-- <h2 id="radar">
      <a href="#radar">Radar chart <small>(with Vuex integration)</small></a>
      <button
        :class="{
          round: true,
          expand: expand.radar
        }"
        @click="expand.radar = !expand.radar"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.radar">
      <figure>
        <v-chart
        class="echarts" :option="scoreRadar" :init-options="initOptions" autoresize />
      </figure>
      <p>
        <select v-model="metricIndex">
          <option v-for="(metric, index) in metrics" :value="index" :key="index"
            >{{ metric }}
          </option>
        </select>
        <button @click="increase(1)" :disabled="isMax">Increase</button>
        <button @click="increase(-1)" :disabled="isMin">Decrease</button>
        <input id="async" type="checkbox" v-model="asyncCount" />
        <label for="async">Async</label>
      </p>
    </section> -->

    <h2 id="connect">
      <a href="#connect">Connectable charts</a>
      <button
        :class="{
          round: true,
          expand: expand.connect
        }"
        @click="expand.connect = !expand.connect"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.connect">
      <figure class="half">
        <v-chart
          :option="c1"
          :init-options="initOptions"
          group="radiance"
          ref="c1"
          autoresize
        />
      </figure>
      <figure class="half">
        <v-chart
          :option="c2"
          :init-options="initOptions"
          group="radiance"
          ref="c2"
          autoresize
        />
      </figure>
      <p>
        <label>
          <input type="checkbox" v-model="connected" />
          Connected
        </label>
      </p>
    </section>

    <h2 id="flight">
      <a href="#flight">Manual updates</a>
      <button
        :class="{
          round: true,
          expand: expand.flight
        }"
        @click="expand.flight = !expand.flight"
        aria-label="toggle"
      ></button>
    </h2>
    <section v-if="expand.flight">
      <p>
        <small
          >You may use <code>manual-update</code> prop for performance critical
          use cases.</small
        >
      </p>
      <p><button :disabled="flightLoaded" @click="loadFlights">Load</button></p>
      <figure style="background-color: #003">
        <v-chart
          ref="flight"
          :init-options="initOptions"
          :option="flight"
          autoresize
          :loading="flightLoading"
          :loading-options="flightLoadingOptions"
        />
      </figure>
    </section>

    <footer>
      <a href="//github.com/Justineo">@Justineo</a>|<a
        href="//github.com/ecomfe/vue-echarts/blob/master/LICENSE"
        >MIT License</a
      >|<a href="//github.com/ecomfe/vue-echarts">View on GitHub</a>
    </footer>

    <aside :class="{ modal: true, open }" @click="open = false">
      <img v-if="img.src" :src="img.src" :width="img.width" />
    </aside>

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
      >
        SVG
      </button>
    </aside>
  </div>
</template>

<script lang="ts" src="./CMapsEsempio.ts">
</script>

<style lang="scss" scoped>
@import './CMapsEsempio.scss';
</style>
