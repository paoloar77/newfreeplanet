<template>
    <div v-if="contact">
      <q-item class="q-my-sm" clickable>
        <q-item-section avatar @click="naviga(`/my/` + contact.username)">
          <q-avatar size="60px">
            <q-img :src="getImgUser(contact)" :alt="contact.username" img-class="imgprofile" height="60px"/>
          </q-avatar>
        </q-item-section>

        <q-item-section @click="naviga(`/my/` + contact.username)">
          <q-item-label><strong>{{ contact.name }} {{ contact.surname }}</strong> ({{ contact.username }})
          </q-item-label>
          <q-item-label caption lines="1"><em>{{ contact.profile.qualifica }}</em></q-item-label>
        </q-item-section>

        <q-item-section side v-if="visu === costanti.FRIENDS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="setCmd(shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS, contact.username)">
                    <q-item-section>{{ $t('friends.remove_from_myfriends') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-ban" v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.BLOCK_USER, contact.username)">
                    <q-item-section>{{ $t('friends.block_user') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.REQ_FRIENDS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list v-if="true" style="min-width: 150px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.SETFRIEND, contact.username)">
                    <q-item-section>{{ $t('friends.accept_friend') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="setCmd(shared_consts.FRIENDSCMD.REQFRIEND, contact.username, false)">
                    <q-item-section>{{ $t('friends.reject_ask_friend') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.ASK_SENT_FRIENDS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="setCmd(shared_consts.FRIENDSCMD.CANCEL_REQ_FRIEND, contact.username)">
                    <q-item-section>{{ $t('friends.cancel_ask_friend') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.ASK_TRUST">
          <q-item-label>
            <q-btn color="positive" :label="$t('friends.accept_trust')" @click="setCmd(shared_consts.FRIENDSCMD.SETTRUST, contact.username, true)"/>
          </q-item-label>
          <q-item-label>
            <q-btn color="negative" :label="$t('friends.refuse_trust')" @click="setCmd(shared_consts.FRIENDSCMD.SETTRUST, contact.username, false)"/>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.TRUSTED">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list v-if="!userStore.IsMyFriendByUsername(contact.username)" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.REQFRIEND, contact.username, true)">
                    <q-item-section>{{ $t('friends.ask_friend') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 200px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.SETTRUST, contact.username, false)">
                    <q-item-section>{{ $t('friends.reject_trust') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.FIND_PEOPLE">
          <q-item-label>
            <q-btn v-if="contact.username !== userStore.my.username" rounded :icon="userStore.IsMyFriendByUsername(contact.username) ? `fas fa-ellipsis-h` : `fas fa-user`">
              <q-menu>
                <q-list v-if="(!userStore.IsMyFriendByUsername(contact.username) && !userStore.IsAskedFriendByUsername(contact.username))" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.REQFRIEND, contact.username, true)">
                    <q-item-section>{{ $t('friends.ask_friend') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list v-else-if="(!userStore.IsMyFriendByUsername(contact.username) && userStore.IsAskedFriendByUsername(contact.username))" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.REQFRIEND, contact.username, false)">
                    <q-item-section>{{ $t('friends.cancel_ask_friend') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list v-else-if="userStore.IsMyFriendByUsername(contact.username)" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="setCmd(shared_consts.FRIENDSCMD.REMOVE_FROM_MYFRIENDS, contact.username)">
                    <q-item-section>{{ $t('friends.remove_from_myfriends') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.REJECTED">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 200px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="setCmd(shared_consts.FRIENDSCMD.SETTRUST, contact.username, true)">
                    <q-item-section>{{ $t('friends.accept_trust') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
</template>

<script lang="ts" src="./CMyUser.ts">
</script>

<style lang="scss" scoped>
    @import './CMyUser.scss';
</style>
