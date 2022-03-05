<template>
  <div class="q-ma-md">
    <CVerifyTelegram v-if="!tools.TelegVerificato()">

    </CVerifyTelegram>

    <!--<CVerifyEmail v-if="!tools.isEmailVerified() && !tools.TelegVerificato()">

    </CVerifyEmail>-->
    <div v-if="tools.isTelegOk()" class="centeritems">
      <q-banner inline-actions rounded class="bg-orange text-black">
        <template v-slot:avatar>
          <q-icon name="info" color="primary"/>
        </template>
        <strong>Appena sarai abilitato, dal tuo invitante {{tools.getAportadorSolidario()}}, ti arriverà una <strong>notifica su Telegram</strong>.<br><br>
          Se non dovesse arrivarti subito probabilmente {{tools.getAportadorSolidario()}} non ha il cellulare a portata di mano.<br>
        </strong>

        <q-btn
          rounded
          class="q-ma-sm"
          color="primary"
          icon="fas fa-user"
          :to="tools.getLinkProfileAportador()"
          :label="`Profilo di ` + tools.getAportadorSolidario()">
        </q-btn>



      </q-banner>
    </div>
  </div>
</template>

<script lang="ts" src="./CUserNonVerif.ts">
</script>

<style lang="scss" scoped>
@import './CUserNonVerif.scss';
</style>
