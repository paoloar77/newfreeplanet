<template>
  <CMyPage img="" title="Invio Push Notifiche" keywords="" description="">
    <div class="q-ma-sm">

      <q-tabs v-model="mytab" class="text-teal">
        <q-tab label="Telegram" name="telegram"></q-tab>
        <q-tab label="Notifiche Push" name="push"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="mytab" animated>
        <q-tab-panel name="telegram">
          <div class="row center_img clBorderSteps" style="max-width: 600px;">
            <q-select
              rounded outlined v-model="whatMsg"
              :options="shared_consts.selectwhatMsgToSend"
              label="Quale Messaggio" emit-value map-options>
            </q-select>
            <div v-if="whatMsg === shared_consts.whatMsgToSend.MSG_TEXT"
                 class="row">
              <q-input
                v-model="mymsg" type="textarea" autofocus label="Messaggio"
                input-class="myinput-area"
                style="height: 100px; width: 500px;"></q-input>
            </div>
            <div v-if="whatMsg === shared_consts.whatMsgToSend.MSG_OF_TEMPLATE">
              <q-select
                rounded outlined v-model="templmsgid"
                :options="arrTemplate"
                label="Scegli il Template di Msg da inviare" emit-value map-options>
              </q-select>

              <CMyEditor v-if="mymsg"
                         v-model:value="mymsg" :showButtons="false" :canModify="true">

              </CMyEditor>

            </div>
            <div class="q-ma-xs q-pa-xs" style="border-color: darkred; border-width: 3px;">
              <q-banner
                rounded
                dense
                class="bg-positive text-white"
                color="primary q-title"
                style="text-align: center;">
                <template v-slot:avatar>
                  <q-icon name="fas fa-bullhorn" color="yellow" size="xs" />
                </template>
                <span class="mybanner">MESSAGGIO DA INVIARE:</span>
              </q-banner>
              <div v-html="mymsg"></div>
            </div>
            <q-select
              rounded outlined v-model="destination"
              :options="shared_consts.selectDestination"
              label="Destinazione" emit-value map-options>
            </q-select>
            <q-select
              rounded outlined v-model="sendreally"
              :options="shared_consts.selectSendReally"
              label="Destinazione" emit-value map-options>
            </q-select>
            <br/>
            <div class="">
              <q-btn label="Invia Msg" color="primary" @click="SendMsgToAll(shared_consts.TypeSend.TELEGRAM)"></q-btn>
            </div>
          </div>
          <q-inner-loading id="spinner" :showing="incaricamento">
            <q-spinner-tail
              color="primary"
              size="4em">
            </q-spinner-tail>
          </q-inner-loading>

        </q-tab-panel>
        <q-tab-panel name="push">
          <div class="row center_img clBorderSteps" style="max-width: 600px;">
            <div class="row">
              <q-input v-model="title" autofocus label="Titolo" style="width: 300px;"></q-input>
            </div>
            <div class="row">
              <q-input
                v-model="content" type="textarea" autofocus label="Contenuto"
                input-class="myinput-area"
                style="height: 100px; width: 500px;"></q-input>
            </div>
            <div class="row">
              <q-input v-model="openUrl" autofocus label="openUrl" style="width: 200px;"></q-input>
              <q-input v-model="openUrl2" autofocus label="openUrl2" style="width: 200px;"></q-input>
              <q-input v-model="tag" autofocus label="tag" style="width: 100px;"></q-input>
            </div>
            <q-select
              rounded outlined v-model="actiontype"
              :options="shared_consts.selectActions"
              label="Tipo Msg" emit-value map-options>
            </q-select>
            <q-select
              rounded outlined v-model="destination"
              :options="shared_consts.selectDestination"
              label="Destinazione" emit-value map-options>
            </q-select>
            <q-select
              rounded outlined v-model="sendreally"
              :options="shared_consts.selectSendReally"
              label="Destinazione" emit-value map-options>
            </q-select>
            <div v-if="actiontype === shared_consts.TypeMsg_Actions.OPZ1_2" class="row">
              <q-input v-model="opz1" autofocus label="Opzione 1" style="width: 100px;"></q-input>
              <q-input v-model="opz2" autofocus label="Opzione 2" style="width: 100px;"></q-input>
            </div>
            <br/>
            <div class="">
              <q-btn label="Invia Msg" color="primary" @click="SendMsgToAll(shared_consts.TypeSend.PUSH_NOTIFICATION)"></q-btn>
            </div>
          </div>
          <q-inner-loading id="spinner2" :showing="incaricamento">
            <q-spinner-tail
              color="primary"
              size="4em">
            </q-spinner-tail>
          </q-inner-loading>

        </q-tab-panel>
      </q-tab-panels>
    </div>

  </CMyPage>
</template>
<script lang="ts" src="./sendpushnotif.ts">
</script>

<style lang="scss" scoped>
@import './sendpushnotif.scss';
</style>
