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
      <p v-if="tools.isCurrentUrlSignUp() && globalStore.isErroreDispositivoServer()" class="errore">Se l'Errore persiste, significa che questo browser non riesce a collegarsi col Server.<br>
        Soluzione: Provare ad installare un altro browser:<br>
        👉🏻 Clicca per installare <a href="https://play.google.com/store/apps/details?id=com.opera.browser&hl=it&gl=IT">Opera per Android</a>. </p>

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
