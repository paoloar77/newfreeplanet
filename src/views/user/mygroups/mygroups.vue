<template>
  <div class="">
    <CMyGroups
      v-model="filter"
      :finder="true"
    >
      <CGridTableRec
        prop_mytable="mygroups"
        prop_mytitle=""
        :prop_mycolumns="colmyUserGroup"
        prop_colkey="_id"
        col_title="groupname"
        :vertical="costanti.VISUTABLE_LISTA"
        nodataLabel=" Nessun Gruppo"
        :prop_search="true"
        hint="nome del gruppo da trovare"
        :finder="true"
        :choose_visutype="true"
        :finder_noNull="false"
        :options="shared_consts.OPTIONS_SEARCH_ONLY_FULL_WORDS"
        :butt_modif_new="true"
        noresultLabel="nome del gruppo non trovato"
        :arrfilters="arrfilterand"
        :filtercustom="filtercustom"
        :prop_searchList="searchList"
        :showType="costanti.SHOW_GROUPINFO"
        keyMain=""
        :showCol="false"
        :extraparams="extraparams()">

      </CGridTableRec>
    </CMyGroups>

    <div v-if="filter === costanti.CREATE_GROUP">
      Nuovo Gruppo:
    </div>
  </div>
</template>

<script lang="ts" src="./mygroups.ts">
</script>

<style lang="scss" scoped>
@import './mygroups.scss';
</style>

