<template>
  <CMyPage img="" :title="$t('otherpages.admin.userpanel')" keywords="" :description="$t('otherpages.admin.userpanel')">

    <div
      class="row justify-center vertical-middle">

      <div class="q-mr-sm full-width">
        <q-input
          v-model="search" filled dense type="search" debounce="500"
          label="Cerca"

          v-on:keyup.enter="doSearch"
        >
          <template v-slot:after>
            <q-btn dense label="" color="primary" @click="doSearch" icon="search"></q-btn>
          </template>
        </q-input>
      </div>

      <q-space></q-space>
      <q-select
        v-model="colVisib"
        rounded
        outlined
        multiple
        dense
        options-dense
        :display-value="$t('grid.columns')"
        emit-value
        map-options
        :options="mycolumns"
        option-value="name"
        @update:model-value="changeCol">

      </q-select>

    </div>

    <div v-if="!!myuser">
      username cercato: <em>"{{ search }}"</em><br>
      <br>

      <div v-if="myuser.verified_by_aportador">
        <q-banner
          rounded
          class="bg-green text-white"
          style="text-align: center;"
        >
        <span class="mybanner">
        Verificato da {{ myuser.aportador_solidario }}<br>
        </span>
        </q-banner>
      </div>
      <div v-else>
        <q-banner
          rounded
          class="bg-red text-white"
          style="text-align: center;"
        >
        <span class="mybanner">
        NON Verificato da {{ myuser.aportador_solidario }}<br>
        </span>
        </q-banner>
      </div>

      <CKeyAndValue mykey="Username:" :myvalue="myuser.username"></CKeyAndValue>

      <div v-if="!!myuser.profile">
        <CKeyAndValue mykey="Email:" :myvalue="myuser.email"></CKeyAndValue>
        <div class="q-ml-xs bg-blue text-white text-h6">
          <q-banner
            dense
            rounded class="bg-blue text-white"
            style="text-align: center;">
            <span class="mybanner">Telegram<br></span>
          </q-banner>

          <CKeyAndValue mykey="Username Telegram:" :myvalue="myuser.profile.username_telegram"></CKeyAndValue>
          <CKeyAndValue mykey="Telegram ID:" :myvalue="myuser.profile.teleg_id"></CKeyAndValue>
          <span v-if="myuser.profile.firstname_telegram">
          <CKeyAndValue mykey="Nome e Cognome Telegram:" :myvalue="myuser.profile.firstname_telegram + ` ` + myuser.profile.lastname_telegram"></CKeyAndValue>
        </span>
        </div>
        <CKeyAndValue mykey="Invitato da:" :myvalue="myuser.aportador_solidario"></CKeyAndValue>
        <CKeyAndValue mykey="Online il:" :mydate="myuser.lasttimeonline"></CKeyAndValue>

        <CKeyAndValue mykey="Città di Nascita:" :myvalue="myuser.profile.born_city"></CKeyAndValue>
        <CKeyAndValue mykey="Data di Nascita:" :mydate="myuser.profile.dateofbirth"></CKeyAndValue>
        <CKeyAndValue mykey="Biografia:" :myvalue="myuser.profile.biografia"></CKeyAndValue>
        <CKeyAndValue mykey="qualifica:" :myvalue="myuser.profile.qualifica"></CKeyAndValue>
      </div>
    </div>

    <br>

  </CMyPage>
</template>
<script lang="ts" src="./userPanel.ts">
</script>

<style lang="scss" scoped>
@import './userPanel.scss';
</style>


