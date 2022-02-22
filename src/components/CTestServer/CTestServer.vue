<template>
  <div class="bi-border-all">

    <q-banner
      rounded
      class="bg-primary text-white"
      color="primary q-title"
      style="text-align: center;">
      <p class="mybanner">Server: {{tools.getServerHost()}}</p>
      <p class="mybanner">Risposta: {{testServer}}</p>
    </q-banner>

    <q-btn-toggle
      v-model="myrecfiltertoggle"
      push
      glossy
      toggle-color="primary"
      :options="getoptions"
    />

    <div class="text-center q-ma-lg">
      <q-btn push size="lg" color="primary" rounded label="Ricarica" @click="ricarica"></q-btn>
    </div>


  </div>

</template>

<script lang="ts" src="./CTestServer.ts">
</script>
<style lang="scss" scoped>
@import './CTestServer.scss';
</style>
