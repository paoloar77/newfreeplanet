<template>
  <div>
    <q-btn flat round dense icon="fas fa-bell" class="q-mx-xs" @click="open = !open">
      <q-badge v-if="getNumNotifUnread() > 0" floating color="red">{{ getNumNotifUnread() }}</q-badge>
    </q-btn>
    <q-btn v-if="false" flat round dense icon="fas fa-bell">
      <q-badge v-if="getNumNotifUnread() > 0" floating color="red">{{ getNumNotifUnread() }}</q-badge>
    </q-btn>

    <q-drawer v-model="open" side="right" elevated class="text-black">

      <q-bar class="bg-primary text-white">
        {{ $t('notifs.notifs') }}
        <q-space/>
        <q-btn flat round color="white" icon="close" @click="open = false"></q-btn>
      </q-bar>

      <div class="">
        <CTitleBanner
          class="q-pa-xs"
          title="Imposta notifiche"
          bgcolor="bg-green" clcolor="text-white"
          mystyle="" myclass="myshad" :canopen="true">

          <div>
            <div>Avvisami se nuovo annuncio:</div>

            <CMyFieldDb
              title=""
              table="users"
              mykey="profile"
              mysubkey="notifs"
              jointable="usernotifs"
              tablesel="usernotifs"
              :type="costanti.FieldType.binary">
            </CMyFieldDb>

          </div>
        </CTitleBanner>

      </div>
      <div class="clBorderSperator"></div>

      <div class="q-ma-xs">
        <q-list bordered class="rounded-borders">

          <div v-if="getNumNotif() === 0">
            <q-item>
              <q-item-label lines="1">{{ $t('notifs.nonotif') }}</q-item-label>

            </q-item>
          </div>


          <q-item clickable v-ripple v-for="(notif, index) in lasts_notifs()" :key="index" @click="clickChat(notif)">

            <q-item-section avatar>
              <q-avatar>
                <q-item-label lines="1">{{ getTypeNotif(notif) }}</q-item-label>
              </q-avatar>
            </q-item-section>

            <!--<q-item-section avatar>
                <q-avatar>
                    <img :src="getImgByNotif(notif)" :alt="getUsernameChatByNotif(notif)">
                </q-avatar>
            </q-item-section>-->

            <q-item-section>
              <q-item-label lines="1">{{ getUsernameChatByNotif(notif) }}</q-item-label>
              <q-item-label caption lines="2">
                {{ getNotifText(notif, false) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              {{ tools.getstrDateTimeShort(notif.datenotif) }}
            </q-item-section>
          </q-item>
          <q-separator/>
        </q-list>
      </div>
    </q-drawer>
  </div>
</template>

<script lang="ts" src="./notifPopover.ts">
</script>
