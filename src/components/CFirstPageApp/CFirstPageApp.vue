<template>
  <div v-if="globalStore.serverError">
    <q-banner
      rounded
      dense
      class="bg-negative text-white"
      color="primary q-title"
      style="text-align: center;">
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="yellow" size="xs" />
      </template>
      <span class="mybanner">Errore di Connessione al Server</span>
      <p v-if="globalStore.serverMsgError" class="errore">{{globalStore.getMsgServerError()}}</p>

      <q-btn
        size="md"
        color="secondary" rounded icon="refresh"
        class="btnNewVersShow" @click="reloadPage" label="Riprova">
      </q-btn>
    </q-banner>
  </div>
</template>

<script lang="ts" src="./CFirstPageApp.ts">
</script>

<style lang="scss" scoped>
@import './CFirstPageApp.scss';
</style>
