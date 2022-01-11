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
          {label: $t('mypages.find_people'), value: costanti.FIND_PEOPLE},
          {label: $t('mypages.friends') + ' (' + numFriends + ')', value: costanti.FRIENDS},
          {label: $t('mypages.request_trust') + ' (' + numAskTrust + ')', value: costanti.ASK_TRUST},
          {label: $t('mypages.trusted') + ' (' + numTrusted + ')', value: costanti.TRUSTED},
          {label: $t('mypages.rejected') + ' (' + numRejected + ')', value: costanti.REEJECTED}
        ]"
      />
    </div>

    <div v-if="filter === costanti.FIND_PEOPLE">
      <CGridTableRec
        prop_mytable="users"
        prop_mytitle=""
        :prop_mycolumns="colmyUserPeople"
        prop_colkey="_id"
        col_title="username"
        :vertical="true"
        nodataLabel=" "
        :prop_search="true"
        hint="Username da trovare"
        :finder="true"
        :finder_noNull="true"
        :options="shared_consts.OPTIONS_SEARCH_ONLY_FULL_WORDS"
        :butt_modif_new="false"
        noresultLabel="Username non trovato"
        :arrfilters="arrfilterand"
        :filtercustom="filtercustom"
        :prop_searchList="searchList"
        :showType="costanti.SHOW_USERINFO"
        keyMain=""
        :extraparams="extraparams()">

      </CGridTableRec>
    </div>
    <div v-else>
      <q-list>
        <span v-for="(contact, index) in listfriendsfiltered" :key="index" class="q-my-sm" clickable>
          <CMyUser
            :mycontact="contact"
            @setCmd="setCmd"
            :visu="filter">
          </CMyUser>
        </span>
      </q-list>
    </div>

  </div>
</template>

<script lang="ts" src="./myfriends.ts">
</script>

<style lang="scss" scoped>
@import './myfriends.scss';
</style>

