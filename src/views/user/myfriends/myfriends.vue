<template>
  <div class="q-gutter-sm q-pa-sm q-pb-md">
    <div>
      <q-btn-toggle
        v-model="filter"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        push
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: $t('mypages.friends') + ' (' + numFriends + ')', value: costanti.FRIENDS},
          {label: $t('mypages.request_trust') + ' (' + numAskTrust + ')', value: costanti.ASK_TRUST},
          {label: $t('mypages.trusted') + ' (' + numTrusted + ')', value: costanti.TRUSTED},
          {label: $t('mypages.rejected') + ' (' + numRejected + ')', value: costanti.REEJECTED}
        ]"
      />
    </div>

    <q-list>
      <q-item v-for="(contact, index) in listfriendsfiltered" :key="index" class="q-my-sm" clickable>
        <q-item-section avatar @click="naviga(`/my/` + contact.username)">
          <q-avatar size="60px">
            <q-img :src="getImgUser(contact)" :alt="contact.username" img-class="imgprofile" height="60px" />
          </q-avatar>
        </q-item-section>

        <q-item-section @click="naviga(`/my/` + contact.username)">
          <q-item-label><strong>{{ contact.name }} {{ contact.surname }}</strong> ({{ contact.username }})
          </q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>


        <q-item-section side v-if="filter === costanti.FRIENDS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup @click="removeFromMyFriends(contact.username)">
                    <q-item-section>{{$t('friends.remove_from_myfriends')}}</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-ban" v-close-popup @click="blockUser(contact.username)">
                    <q-item-section>{{$t('friends.block_user')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="filter === costanti.ASK_TRUST">
          <q-item-label>
            <q-btn color="positive" :label="$t('friends.accept')" @click="setRequestTrust(contact.username, true)"/>
          </q-item-label>
          <q-item-label>
            <q-btn color="negative" :label="$t('friends.reject')" @click="setRequestTrust(contact.username, false)"/>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="filter === costanti.TRUSTED">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 200px">
                  <q-item clickable v-close-popup @click="removeFromMyFriends(contact.username)">
                    <q-item-section>{{$t('friends.reject')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="filter === costanti.REEJECTED">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 200px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup @click="setRequestTrust(contact.username, false)">
                    <q-item-section>{{$t('friends.accept')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script lang="ts" src="./myfriends.ts">
</script>

<style lang="scss" scoped>
@import './myfriends.scss';
</style>

