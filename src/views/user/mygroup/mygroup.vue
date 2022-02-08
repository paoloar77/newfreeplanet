<template>

  <div class="q-gutter-sm q-pa-sm q-pb-md">
    <div v-if="mygrp.descr" class="fit column no-wrap justify-evenly items-center content-start">

      <div class="">
        <q-avatar size="140px">
          <q-img :src="getImgGrp()" :alt="mygrpname()" img-class="imgprofile" height="140px" @click="showPic = true"/>
        </q-avatar>
      </div>

      <div class="text-h6">
        <span v-if="checkifShow('name')"> {{ mygrp.title }}</span>
      </div>
      <div class="col-12 text-h7 text-blue text-shadow-2">
        {{ mygrp.groupname }}
      </div>

      <div>
        <q-btn
          v-if="!userStore.IsMyGroupByGroupname(mygrp.groupname) && !userStore.IsAskedGroupByGroupname(mygrp.groupname)"
          icon="fas fa-user-plus"
          color="primary" :label="$t('groups.ask_group')"
          @click="tools.setRequestGroup($q, userStore.my.username, mygrp.groupname, true)"
        />

        <q-btn
          v-if="userStore.IsAskedGroupByGroupname(mygrp.groupname) && !userStore.IsMyGroupByGroupname(mygrp.groupname)"
          icon="fas fa-user-minus"
          flat :label="$t('groups.cancel_ask_group_short')"
          @click="tools.cancelReqGroups($q, userStore.my.username, mygrp.groupname)"
        />
      </div>

      <q-tabs v-model="tabgrp" class="text-blue">
        <q-tab label="Info" name="info" icon="fas fa-info"></q-tab>
        <q-tab v-if="!!mygrp.note && userStore.IsMyGroupByGroupname(mygrp.groupname)" label="Pagina" name="page" icon="fas fa-file-word"></q-tab>
        <q-tab v-if="userStore.IsMyGroupByGroupname(mygrp.groupname)" label="Iscritti" name="membri" icon="fas fa-users"></q-tab>
        <q-tab v-if="tools.iAmAdminGroup(groupname)" label="Richieste" name="rich" icon="fas fa-user-plus"></q-tab>
      </q-tabs>

      <q-tab-panels v-model="tabgrp" animated>
        <q-tab-panel name="info">
          <div>
            <q-card>
              <CMyFieldRec
                title="Visibilità"
                table="mygroups"
                :id="mygrp._id"
                :columns="colmyUserGroup"
                :rec="mygrp"
                field="visibility"
                :canEdit="true"
                :canModify="true">
              </CMyFieldRec>
            </q-card>
            <q-card>
              <div class="members">
                <q-icon name="fas fa-users"></q-icon>
                {{ numUsers() }} {{ numUsers() === 1 ? t('groups.member') : t('groups.members') }}
              </div>
              <div class="admins">
                <q-icon name="fas fa-user-cog"></q-icon>
                {{ numAdmins() }} {{ numAdmins() === 1 ? t('groups.admin') : t('groups.admins') }}
              </div>
              <div v-for="(user, index) of mygrp.admins" :key="index">
                <CMyUser
                  :mycontact="user"
                  :visu="costanti.FIND_PEOPLE"
                  @setCmd="setCmd"
                >
                </CMyUser>
              </div>
            </q-card>

          </div>
          <q-card>
            <br>
            <div class="col-12 text-h7">
              <span v-if="checkifShow('descr')">{{ mygrp.descr }}</span>
            </div>
          </q-card>

          <div v-if="mygrp.title" class="myrow justify-evenly items-center q-pa-sm q-ma-sm">
            <q-card>
              <div class="col-6 q-ma-xs">
                <q-btn
                  v-if="getLinkGrpTelegram()" icon="fab fa-telegram"
                  color="blue" type="a"
                  size="md"
                  rounded
                  :label="$t('msgs.telegrammsg')"
                  :href="getLinkGrpTelegram()" target="__blank">
                </q-btn>

              </div>
              <div class="col-6 q-ma-xs">
                <q-btn
                  v-if="getLinkWebSite()" icon="fas fa-globe"
                  color="blue" type="a"
                  size="md"
                  rounded
                  :label="$t('reg.website')"
                  :href="getLinkWebSite()" target="__blank">
                </q-btn>
              </div>
            </q-card>

          </div>

        </q-tab-panel>

        <q-tab-panel name="page">
          <div v-if="mygrp.title">
            <br>
            <div class="q-ma-sm q-gutter-sm q-pa-xs">
              <div v-if="mygrp.note" v-html="mygrp.note">
              </div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="membri">
          <CGridTableRec
            ref="tabMembri"
            prop_mytable="users"
            prop_mytitle=""
            :prop_mycolumns="colmyUserPeople"
            prop_colkey="_id"
            col_title="username"
            :vertical="costanti.VISUTABLE_LISTA"
            nodataLabel="Nessun Iscritto"
            :prop_search="true"
            hint="Username da trovare"
            :finder="false"
            :choose_visutype="true"
            :finder_noNull="false"
            :options="shared_consts.OPTIONS_SEARCH_USER_ONLY_FULL_WORDS"
            :butt_modif_new="false"
            noresultLabel="Username non trovato"
            :arrfilters="arrfilterand"
            :filtercustom="filtercustom"
            :prop_searchList="searchList"
            :showType="costanti.SHOW_USERINFO"
            keyMain=""
            :showCol="false"
            :extrafield="groupname"
            :extraparams="extraparams()"
            :visufind="tools.iAmAdminGroup(groupname) ? costanti.REQ_REMOVE_USER_TO_GROUP : costanti.FIND_PEOPLE"
          >

          </CGridTableRec>
        </q-tab-panel>
        <q-tab-panel name="rich">

          <CGridTableRec
            prop_mytable="mygroups"
            prop_mytitle=""
            :prop_mycolumns="colmyUserPeople"
            prop_colkey="_id"
            col_title="username"
            :vertical="costanti.VISUTABLE_LISTA"
            nodataLabel="Nessuna Richiesta in sospeso"
            :prop_search="false"
            hint="Username da trovare"
            :finder="false"
            :choose_visutype="false"
            :finder_noNull="false"
            :options="shared_consts.OPTIONS_SEARCH_USER_ONLY_FULL_WORDS"
            :butt_modif_new="false"
            noresultLabel="Username non trovato"
            :arrfilters="arrfilterand"
            :filtercustom="filtercustom_rich"
            :prop_searchList="searchList"
            :showType="costanti.SHOW_USERINFO"
            keyMain=""
            :showCol="false"
            :extraparams="extraparams_rich()"
            :extrafield="groupname"
            :visufind="costanti.REQ_ADD_USER_TO_GROUP"
          >

          </CGridTableRec>
        </q-tab-panel>
      </q-tab-panels>

      <q-btn
        v-if="mygrp.admins.includes(userStore.my.username)" icon="fas fa-pencil-alt"
        color="blue"
        size="md"
        :label="$t('otherpages.modifgrp')"
        to="/editgrp">
      </q-btn>

    </div>
    <div v-else class="fit column no-wrap justify-evenly items-center content-start">
      <q-skeleton type="QAvatar" size="140px" height="140px" animation="fade"/>
      <q-card flat bordered style="width: 250px">
        <div class="text-h6">
          <q-skeleton :animation="animation"/>
        </div>
        <div class="col-12 text-h7 text-grey text-center">
          {{ groupname }}
        </div>
        <div class="col-12 text-h7">
          <q-skeleton :animation="animation"/>
        </div>

        <div class="col-12 text-h8 q-mt-sm">
          <q-skeleton :animation="animation"/>
        </div>
        <div class="col-12 text-h8 q-mt-sm">
          <q-skeleton :animation="animation"/>
        </div>
      </q-card>
    </div>

  </div>
  <q-dialog
    v-model="showPic"
    full-height full-width
  >

    <img :src="getImgGrp()" :alt="groupname" class="full-width">

  </q-dialog>

</template>

<script lang="ts" src="./mygroup.ts">
</script>

<style lang="scss" scoped>
@import './mygroup.scss';
</style>

