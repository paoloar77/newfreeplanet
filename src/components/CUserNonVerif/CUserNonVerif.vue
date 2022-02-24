<template>
  <div class="q-ma-md">
    <CVerifyTelegram v-if="!TelegVerificato()">

    </CVerifyTelegram>

    <CVerifyEmail v-if="!isEmailVerified() && !TelegVerificato()">

    </CVerifyEmail>
    <div v-if="tools.isTelegOk()">
      <q-banner inline-actions rounded class="bg-orange text-black">
        <template v-slot:avatar>
          <q-icon name="info" color="primary"/>
        </template>
        <strong>A breve sarai abilitato, altrimenti avvisa il tuo invitante che ti sei Registrato.<br>Ti arriverà un messaggio su Telegram quando verrai abilitato dal tuo invitante.</strong>

      </q-banner>
    </div>
  </div>
</template>

<script lang="ts" src="./CUserNonVerif.ts">
</script>

<style lang="scss" scoped>
@import './CUserNonVerif.scss';
</style>
