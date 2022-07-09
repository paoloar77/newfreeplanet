<template>
  <div>
    <q-btn flat round dense icon="fas fa-bell" class="q-mx-xs">
      <q-badge v-if="getNumNotifUnread() > 0" floating color="red">{{ getNumNotifUnread() }}</q-badge>

      <q-menu anchor="bottom right" self="top right">
        <q-bar class="bg-primary text-white">
          {{ $t('notifs.notifs') }}
          <q-space/>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-bar>
        <div>
          Imposta notifiche:<br>

          <q-toggle dark v-model="notifs[0]" :label="$t('notifs.warn_province')"/>


        </div>
        <q-list bordered class="rounded-borders" style="max-width: 350px; min-width: 250px;">

          <q-separator/>

          <div v-if="getNumNotif() === 0">
            <q-item>
              {{ $t('notifs.nonotif') }}

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
      </q-menu>
    </q-btn>
    <q-btn v-if="false" flat round dense icon="fas fa-bell">
      <q-badge v-if="getNumNotifUnread() > 0" floating color="red">{{ getNumNotifUnread() }}</q-badge>
    </q-btn>
  </div>
</template>

<script lang="ts" src="./notifPopover.ts">
</script>
