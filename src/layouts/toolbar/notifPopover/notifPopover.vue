<template>
  <div>
    <q-btn flat round dense icon="fas fa-bell" class="q-mx-xs" @click="open = !open">
      <q-badge v-if="num_notifs_unread > 0" floating color="red">{{ num_notifs_unread }}</q-badge>
    </q-btn>
    <q-btn v-if="false" flat round dense icon="fas fa-bell">
      <q-badge v-if="num_notifs_unread > 0" floating color="red">{{ num_notifs_unread }}</q-badge>
    </q-btn>


    <q-drawer v-model="open" side="right" elevated class="text-black">

      <q-bar class="bg-primary text-white">
        {{ $t('notifs.notifs') }}
        <q-space/>
        <q-btn round dense icon="fas fa-pencil-alt" class="q-mx-xs">
          <q-menu style="min-width: 200px">
            <q-list style="">
              <q-item clickable v-close-popup to="/notifs">
                <q-item-section side>
                  <q-icon name="fas fa-cog"/>
                </q-item-section>
                <q-item-section>{{ $t('notifs.settings') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="notifStore.setAllRead(username)">
                <q-item-section side>
                  <q-icon name="fas fa-check"/>
                </q-item-section>
                <q-item-section>{{ $t('notifs.setallread') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat round color="white" icon="close" @click="open = false"></q-btn>
      </q-bar>

      <div class="row justify-center margin_buttons q-gutter-lg">
        <q-btn-toggle
          v-model="show_all"
          class="my-custom-toggle"
          no-caps
          rounded
          dense
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
          {label: t('notifs.all'), value: true},
          {label: t('notifs.notread'), value: false}
        ]"
        />
      </div>

      <div class="clBorderSperator"></div>

      <div class="q-ma-xs">
        <q-list bordered class="rounded-borders">

          <div v-if="num_notifs_unread === 0">
            <q-item>
              <q-item-label lines="1">{{ $t('notifs.nonotif') }}</q-item-label>

            </q-item>
          </div>


          <q-item clickable v-for="(notif, index) in lasts_notifs" :key="index" @click="clickNotif(notif)">

            <!--<q-item-section avatar>
              <q-avatar>
                <q-item-label lines="1">{{ getTypeNotif(notif) }}</q-item-label>
              </q-avatar>
            </q-item-section>-->

            <q-item-section avatar>
              <q-avatar>
                <img :src="getImgByNotif(notif)" :alt="getUsernameChatByNotif(notif)">
              </q-avatar>
            </q-item-section>

            <q-item-section v-ripple >
              <q-item-label lines="1" :class="(!notif.read) ? 'unread' : 'read'">{{ getNotifText(notif, false) }}</q-item-label>
              <q-item-label caption lines="2">
                {{ tools.getstrDateTimeShort(notif.datenotif) }}
                <!--{{ // getUsernameChatByNotif(notif) }}-->
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn rounded icon="fas fa-pencil-alt">
                  <q-menu>
                    <q-list style="min-width: 150px">
                      <q-item clickable v-close-popup @click="notifStore.deleteRec(notif._id)">
                        <q-item-section side>
                          <q-icon name="fas fa-trash-alt"/>
                        </q-item-section>
                        <q-item-section>{{ $t('notifs.delete_notif') }}</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="notifStore.deactivateRec(notif._id)">
                        <q-item-section side>
                          <q-icon name="fas fa-trash-alt"/>
                        </q-item-section>
                        <q-item-section>{{ $t('notifs.deactivate_notif') }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-label>
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
<style lang="scss" scoped>
@import './notifPopover.scss';
</style>
