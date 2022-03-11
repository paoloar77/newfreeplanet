<template>
  <div class="">
    <q-banner
      rounded
      dense
      class="bg-warning text-white"
      color="primary q-title"
      style="text-align: center;">
      <template v-slot:avatar>
        <q-icon name="fas fa-exclamation-triangle" color="yellow" size="xs" />
      </template>
      <span class="mybanner">Questa sezione è ancora in fase di miglioramento.</span>

    </q-banner>
    <CMyFriends
      v-if="searchList.length > 0"
      v-model="filter"
      :finder="true"
    >
      <CGridTableRec
        prop_mytable="users"
        prop_mytitle=""
        :prop_mycolumns="colmyUserPeople"
        prop_colkey="_id"
        col_title="username"
        :vertical="costanti.VISUTABLE_LISTA"
        nodataLabel=" "
        :prop_search="true"
        hint="Username da trovare"
        :finder="true"
        :choose_visutype="true"
        :finder_noNull="true"
        :options="shared_consts.OPTIONS_SEARCH_USER_ALL_WORDS"
        :butt_modif_new="false"
        noresultLabel="Username non trovato"
        :arrfilters="arrfilterand"
        :filtercustom="filtercustom"
        :showType="costanti.SHOW_USERINFO"
        :showCol="false"
        :extraparams="extraparams()">

      </CGridTableRec>
    </CMyFriends>
  </div>
</template>
<!--:prop_searchList="searchList"-->

<script lang="ts" src="./myfriends.ts">
</script>

<style lang="scss" scoped>
@import './myfriends.scss';
</style>

