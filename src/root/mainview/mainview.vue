<template>
  <q-page class="">

        <span>{{
            setmeta({
              title: $t('ws.sitename'),
              description: $t('ws.siteshortname'),
              keywords: $t('ws.keywords'),
            })
          }}
        </span>

    <!--<CChartMap
      title="Mappa"
      subtitle="cartina..."
      serie1="Serie 1"
    >

    </CChartMap>-->

    <!--<CMapsEsempio></CMapsEsempio>-->

    <q-banner
      v-if="globalStore.isNewVersionAvailable"
      rounded
      dense
      class="bg-green text-white"
      color="primary q-title"
      style="text-align: center;">
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="yellow" size="xs" />
      </template>
      <span class="mybanner">Per Aggiornare alla nuova versione, chiudere e riaprire la APP (o il browser)</span>

    </q-banner>

    <q-banner
      v-if="tools.isTest()"
      rounded
      dense
      class="bg-negative text-white"
      color="primary q-title"
      style="text-align: center;">
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="yellow" size="xs" />
      </template>
      <span class="mybanner">Questo è l'AMBIENTE DI TEST !<br> Solo per prove.</span>

    </q-banner>

    <div v-if="tools.isLogged()">
      <div v-if="!tools.isUserOk()">
        <CUserNonVerif></CUserNonVerif>
      </div>
      <div v-else>
        <CMainView></CMainView>

        <CDashboard></CDashboard>

        <div class="row justify-evenly items-center q-pa-sm q-ma-sm">
          <q-btn
            icon="fas fa-share-alt"
            color="blue" type="a"
            size="md"
            rounded
            :label="$t('reg.link_reg_and_msg')"
            @click="tools.sendMsgTelegramCmd($q, $t, shared_consts.MsgTeleg.SHARE_MSGREG)">
          </q-btn>
        </div>

        <!--<CCopyBtn v-if="userStore.my.username" :title="$t('reg.link_reg')" :texttocopy="getRefLink(userStore.my.username)">

        </CCopyBtn>-->

        <CStatusReg>

        </CStatusReg>

        <div>Versione: {{tools.getvers()}}</div>

      </div>

    </div>
    <div v-else>
      <CPresentazione></CPresentazione>
      <CCheckIfIsLogged></CCheckIfIsLogged>

      <!--
                <div v-if="!isLogged && static_data.functionality.ENABLE_REGISTRATION" align="center" style="margin:20px;">
                  <q-btn rounded size="lg" color="primary" to="/signup">{{$t('reg.submit')}}
                  </q-btn>
                </div>
      -->

    </div>

    <Footer></Footer>
  </q-page>

</template>
<script lang="ts" src="./mainview.ts">
</script>
<style lang="scss" scoped>
@import './mainview.scss';
</style>
