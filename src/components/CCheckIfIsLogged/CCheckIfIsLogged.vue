<template>
  <div v-if="!tools.isLogged()">
    <div class="q-pa-md q-gutter-sm">
      <q-banner rounded class="bg-primary text-white">
        <div class="text-h6 text-center">
          Accedi al menu inserendo le tue credenziali 🔑<br><br>
          📝 Non sei <strong>Registrato</strong>?<br>
          👉🏻 Chiedi in chat il link a chi ti ha <strong>invitato</strong>.<br>
        </div>
        <template v-slot:action>
          <q-btn flat color="white" label="Accedi al Login" @click="openrighttoolbar"/>
        </template>
      </q-banner>
    </div>

    <div
      v-if="!tools.isLogged() && static_data.functionality.ENABLE_REGISTRATION && static_data.functionality.SHOW_REG_BUTTON"
      style="margin:20px; text-align: center;">
      <q-btn rounded size="lg" color="primary" @click="openrighttoolbar">{{ $t('login.enter') }}
      </q-btn>
    </div>

  </div>
</template>

<script lang="ts" src="./CCheckIfIsLogged.ts">
</script>

<style lang="scss" scoped>
@import './CCheckIfIsLogged.scss';
</style>
