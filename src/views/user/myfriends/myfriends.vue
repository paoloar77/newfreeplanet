<template>
  <div class="q-gutter-sm q-pa-sm q-pb-md">
    <div>
      <q-btn-toggle
        v-model="filter"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: $t('mypages.friends') + ' (' + numFriends + ')', value: costanti.FRIENDS},
          {label: $t('mypages.request_trust') + ' (' + numAskTrust + ')', value: costanti.ASK_TRUST},
          {label: $t('mypages.trusted') + ' (' + numAskTrusted + ')', value: costanti.TRUSTED}
        ]"
      />
    </div>

    <q-list bordered>
      <q-item v-for="(contact, index) in listfriendsfiltered" :key="index" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="getImgUser(contact)" :alt="contact.username">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }} {{ contact.surname }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
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

