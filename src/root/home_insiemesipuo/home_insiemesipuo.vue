<template>
  <q-page class="">

    <!--<CChartMap
      title="Mappa"
      subtitle="cartina..."
      serie1="Serie 1"
    >

    </CChartMap>-->

    <!--<CMapsEsempio></CMapsEsempio>-->


    <div v-if="isLogged()">
      <CVerifyEmail v-if="!isEmailVerified()">

      </CVerifyEmail>

      <CVerifyTelegram v-if="TelegCode() || !TelegVerificato()">

      </CVerifyTelegram>

      <div v-if="isUserOk()">
        <div v-if="isUserOk()">
          <q-banner rounded class="bg-primary text-white">
            <div class="text-h6 text-center">
              Ora Accedi al Bot Telegram <br>
              per vedere tutti i Menu e le chat !
            </div>
            <template v-slot:action>
              <q-btn icon="fab fa-telegram" flat color="white" label="Accedi al Bot Telegram" type="a" target="__blank" :href="getLinkBotTelegram()"/>
            </template>
          </q-banner>
        </div>
      </div>

    </div>
    <div v-else>
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
        v-if="!isLogged() && static_data.functionality.ENABLE_REGISTRATION && static_data.functionality.SHOW_REG_BUTTON"
        style="margin:20px; text-align: center;">
        <q-btn rounded size="lg" color="primary" @click="openrighttoolbar">{{ $t('login.enter') }}
        </q-btn>
      </div>

      <!--
                <div v-if="!isLogged && static_data.functionality.ENABLE_REGISTRATION" align="center" style="margin:20px;">
                  <q-btn rounded size="lg" color="primary" to="/signup">{{$t('reg.submit')}}
                  </q-btn>
                </div>
      -->

    </div>

  </q-page>

</template>
<script lang="ts" src="./home_insiemesipuo.ts">
</script>
<style lang="scss" scoped>
@import './home_insiemesipuo.scss';
</style>
