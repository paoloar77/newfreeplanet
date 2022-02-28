<template>
  <CMyPage title="Configura Sito" imgbackground="images/calendario_eventi.jpg" sizes="max-height: 120px">

    <div class="q-ma-sm q-gutter-sm q-pa-xs">

      <div v-if="mysite">
        <q-banner
          rounded
          class="bg-primary text-white"
          color="primary q-title"
          style="text-align: center;">
          <p class="mybanner">{{mysite.name}}</p>
        </q-banner>


        <CMyFieldRec
          title="Opzioni Sito"
          table="sites"
          :id="mysite._id"
          :rec="mysite"
          field="confsite.options"
          :canEdit="true"
          :canModify="true">
        </CMyFieldRec>

        <CMyFieldDb title="BOT Telegram"
                    mykey="TELEG_BOT_LINK"
                    :serv="false"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb title="Nome del BOT Telegram"
                    mykey="TELEG_BOT_NAME"
                    :serv="false"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb title="BOT Telegram (per Test)"
                    mykey="TELEG_BOT_LINK_TEST"
                    :serv="false"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb title="Chat di Supporto (Help)"
                    mykey="TELEGRAM_SUPPORT"
                    :serv="false"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb title="Sito ONLINE"
                    mykey="SITO_ONLINE"
                    :serv="false"
                    :type="costanti.FieldType.boolean">
        </CMyFieldDb>

      </div>


    </div>
  </CMyPage>
</template>
<script lang="ts" src="./confsite.ts">

</script>
<style lang="scss" scoped>
@import 'confsite.scss';
</style>
