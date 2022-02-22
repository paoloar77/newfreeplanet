<template>
  <div class="">
    <CMyFriends
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
        :prop_searchList="searchList"
        :showType="costanti.SHOW_USERINFO"
        :showCol="false"
        :extraparams="extraparams()">

      </CGridTableRec>
    </CMyFriends>
  </div>
</template>

<script lang="ts" src="./myfriends.ts">
</script>

<style lang="scss" scoped>
@import './myfriends.scss';
</style>

