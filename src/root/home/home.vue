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
        <CFinder/>
      </div>

    </div>
    <div v-else>
      <div v-if="!isLogged() && static_data.functionality.ENABLE_REGISTRATION" style="margin:20px; text-align: center;">
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
<script lang="ts" src="./home.ts">
</script>
<style lang="scss" scoped>
@import './home.scss';
</style>
