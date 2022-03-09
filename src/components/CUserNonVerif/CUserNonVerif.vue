<template>
  <div class="q-ma-md">
    <CVerifyTelegram v-if="!tools.TelegVerificato()">

    </CVerifyTelegram>

    <!--<CVerifyEmail v-if="!tools.isEmailVerified() && !tools.TelegVerificato()">

    </CVerifyEmail>-->
    <div v-if="tools.isTelegOk()" class="centeritems">

      <q-banner
        v-if="!tools.isUsernameTelegOk()"
        inline-actions rounded class="bg-green-4 text-black">
        <br>🔑 Ora torna su Telegram ed imposta l'<b>Username di Telegram</b>:<br>
        <br>
        💬 In questo modo le persone potranno contattarti su Telegram senza aver bisogno del tuo numero di cellulare, e potranno farlo anche dalla APP.<br>
        <br>
        👉🏻 1. Su telegram premi sull'icona (tre linee orizzontali) del menu principale in alto a sinistra.<br>
        👉🏻 2. Seleziona la voce <b>Impostazioni</b> nel menu.<br>
        👉🏻 3.Premi su <b>Username</b> nella sezione account.<br>
        👉🏻 4. Digita il tuo username. (deve essere un nome ancora libero e non già usato da altri).<br>
        👉🏻 5. Per confermare premi sull'icona con la spunta (V) in alto a destra.<br>

        🏁 Infine vai sul <b>BOT RISO</b> Telegram e scrivi OK nel messaggio.
        <q-btn rounded color="primary" icon="fab fa-telegram" label="Apri il BOT"
               type="a"
               :href="tools.getLinkBotTelegram()" target="_blank"></q-btn>
        <br><br>

        Se non ci riesci vedi la <a href="https://www.nigiara.it/telegram/come-impostare-uno-username-su-telegram.htm" target="_blank">GUIDA PER IMPOSTARE
        L'USERNAME SU TELEGRAM</a><br>
        <br>

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
