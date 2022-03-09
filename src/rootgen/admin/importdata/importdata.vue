<template>
  <CMyPage img="" title="Import Data" keywords="" description="">
    <div class="q-ma-sm">

      <q-toggle v-model="caricaDatiToggle" @click="caricadati()"
      label="Carica Dati"></q-toggle>
      <br>
      <q-select rounded outlined v-model="cosafare"
                :options="ListaCmd"
                label="Operazione" emit-value map-options>
      </q-select>
      <label class="text-reader">
        <input type="file"
               @change="loadTextFromFile" />
      </label>
      <br>

      <br>
      <q-btn
      label="Esegui"
      @click="eseguiCmd"></q-btn>

      <br>
      <q-btn
        label="Genera HTML Province Territoriali"
        @click="createProvLink"></q-btn>


      <br><br>

      <div>{{ risraw }}</div>

      <div v-html="risultato"></div>
      <br>
      <br>
    </div>
  </CMyPage>
</template>
<script lang="ts" src="./importdata.ts">
</script>

<style lang="scss" scoped>
@import './importdata.scss';
</style>
