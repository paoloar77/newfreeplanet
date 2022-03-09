<template>
  <div v-if="!tools.isLogged()">
    <div class="q-pa-md q-gutter-sm">

      <div id="logo" class="text-center">
        <img id="logoimg" :src="tools.getimglogo()" alt="logo APP">
      </div>

      <q-banner rounded class="bg-primary text-white">
        <div class="text-h6 text-center">
          Accedi al menu inserendo le tue credenziali per entrare 🔑<br>
          <div class="text-center">
            <q-btn push color="white" text-color="blue" label="Clicca qui per Accedere" @click="tools.openrighttoolbar()"/>
          </div>
          <br>
          📝 Non sei <strong>Registrato</strong>?<br>
          👉🏻 Chiedi in chat il link a chi ti ha <strong>invitato</strong><br>
          oppure chiedi sul <a href="https://riso.app/gruppi_territoriali">Gruppo Territoriale di RISO</a> scegliendo la tua provincia !
        </div>
        <br>
      </q-banner>
      <q-banner rounded class="bg-green-8 text-white">
        <div class="text-h6 text-center">
          Visualizza le FAQ (Risposte alle domande più frequenti)<br>
          <div class="text-center">
            <q-btn color="white" push glossy text-color="black" label="Apri le FAQ" to="/faq"/>
          </div>
        </div>
      </q-banner>
    </div>

    <div
      v-if="!tools.isLogged() && static_data.functionality.ENABLE_REGISTRATION && static_data.functionality.SHOW_REG_BUTTON"
      style="margin:20px; text-align: center;">

      <q-btn rounded size="lg" color="primary" @click="tools.openrighttoolbar()">{{ $t('login.enter') }}
      </q-btn>
    </div>

  </div>
</template>

<script lang="ts" src="./CCheckIfIsLogged.ts">
</script>

<style lang="scss" scoped>
@import './CCheckIfIsLogged.scss';
</style>
