<template>
  <div v-if="!globalStore.serverError" class="q-ma-md">
    <CVerifyTelegram v-if="!tools.TelegVerificato() || !tools.isUsernameTelegOk()">

    </CVerifyTelegram>

    <!--<CVerifyEmail v-if="!tools.isEmailVerified() && !tools.TelegVerificato()">

    </CVerifyEmail>-->
    <div v-if="tools.isTelegOk()" class="centeritems">

      <q-banner
        v-if="!tools.isUsernameTelegOk()"
        inline-actions rounded class="bg-green-4 text-black">
        <div class="text-subtitle1">🔑 E' necessario ora impostare un <b>Username su Telegram</b>:</div>

        💬 In questo modo le persone potranno contattarti (sia su Telegram sia dalla APP) <strong>senza aver bisogno di condividere il tuo numero di cellulare</strong>.<br>
        <br>
        👉🏻 1. Vai su Telegram, e nella pagina iniziale (dove vedi tutte le chat), premi sull'icona (tre linee orizzontali) del menu principale in alto a sinistra (sull'iPhone si chiama "Impostazioni").<br>
        👉🏻 2. Seleziona la voce <b>Impostazioni</b> nel menu.<br>
        👉🏻 3. Premi su <b>Username</b> nella sezione account.<br>
        👉🏻 4. Digita un <strong>username qualsiasi</strong> a tua scelta (deve essere un nome ancora libero e non già usato da altri, <u>non deve per forza coincidere con l'username che hai scelto per la APP</u>).<br>
        👉🏻 5. Per confermare premi sull'icona con la spunta (V) in alto a destra.<br>

        🏁 Infine vai sul <b>BOT RISO</b> Telegram e scrivi OK nel messaggio. Ti comparirà un <strong>messaggio di Benvenuto</strong>.
        <q-btn rounded color="primary" icon="fab fa-telegram" label="Apri il BOT"
               type="a"
               :href="tools.getLinkBotTelegram()" target="_blank"></q-btn>
        <br><br>

        Se non ci riesci vedi la <a href="https://www.nigiara.it/telegram/come-impostare-uno-username-su-telegram.htm" target="_blank">GUIDA PER IMPOSTARE
        L'USERNAME SU TELEGRAM</a><br>
        <br>

        Se hai difficoltà, contatta la Chat del Supporto Tecnico: "Help - RISO"
        <br><strong>CLICCANDO QUI</strong> 👉🏻 <a href="https://t.me/+dTHFNIwkc_phNmQ8" target="_blank"><strong>Help - RISO</strong></a>
        <br><br>

      </q-banner>
      <q-banner v-else
                inline-actions rounded class="bg-orange text-black">
        <template v-slot:avatar>
          <q-icon name="info" color="primary"/>
        </template>
        <strong>Appena sarai abilitato, dal tuo invitante {{ tools.getAportadorSolidario() }}, ti arriverà una <strong>notifica su Telegram</strong>.<br><br>
          Se non dovesse arrivarti entro 24 ore prova a mandargli un messaggio.<br>
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
