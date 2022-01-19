<template>
  <CMyPage img="" title="Import Data" keywords="" description="">
    <div class="q-ma-sm">
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
      {{risultato}}
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
