<template>
  <div v-if="tools.isUserOk()">
    <div v-if="grp">
      <q-item class="q-my-sm" clickable>
        <q-item-section avatar @click="naviga(tools.getPathByGroup(grp, table))">
          <q-avatar size="60px">
            <q-img :src="getImgGroup(grp)" :alt="grp.groupname" img-class="imgprofile" height="60px"/>
          </q-avatar>
        </q-item-section>

        <q-item-section @click="naviga(tools.getPathByGroup(grp, table))">
          <q-item-label><strong>{{ grp.title }}</strong> ({{ grp.groupname }})
          </q-item-label>
          <q-item-label v-if="grp.descr" caption lines="1"><em>{{ grp.descr }}</em></q-item-label>
        </q-item-section>

        <q-item-section side v-if="visu === costanti.MY_GROUPS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="tools.setCmd($q, shared_consts.GROUPSCMD.REMOVE_FROM_MYGROUP, myusername(), '', grp.groupname)">
                    <q-item-section>{{ $t('groups.remove_from_mygroups') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-ban" v-close-popup @click="tools.setCmd($q, shared_consts.GROUPSCMD.BLOCK_GROUP, myusername(), '', grp.groupname)">
                    <q-item-section>{{ $t('groups.block_group') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.REQ_GROUP">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="tools.setCmd($q, shared_consts.GROUPSCMD.REQGROUP, myusername(), false, grp.groupname)">
                    <q-item-section>{{ $t('groups.reject_ask_group') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.ASK_SENT_GROUPS">
          <q-item-label>
            <q-btn rounded icon="fas fa-ellipsis-h">
              <q-menu>
                <q-list style="min-width: 150px">
                  <q-item clickable icon="fas fa-user-minus" v-close-popup
                          @click="tools.setCmd($q, shared_consts.GROUPSCMD.CANCEL_REQ_GROUP, myusername(), '', grp.groupname)">
                    <q-item-section>{{ $t('groups.cancel_ask_group') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="visu === costanti.FIND_GROUP">
          <q-item-label>
            <q-btn rounded :icon="userStore.IsMyGroupByGroupname(grp.groupname) ? `fas fa-ellipsis-h` : `fas fa-user`">
              <q-menu>
                <q-list v-if="(!userStore.IsMyGroupByGroupname(grp.groupname) && !userStore.IsAskedGroupByGroupname(grp.groupname))" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="tools.setCmd($q, shared_consts.GROUPSCMD.REQGROUP, myusername(), true, grp.groupname)">
                    <q-item-section>{{ $t('groups.ask_group') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list v-else-if="(!userStore.IsMyGroupByGroupname(grp.groupname) && userStore.IsAskedGroupByGroupname(grp.groupname))" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="tools.setCmd($q, shared_consts.GROUPSCMD.REQGROUP, myusername(), false, grp.groupname)">
                    <q-item-section>{{ $t('groups.cancel_ask_group') }}</q-item-section>
                  </q-item>
                </q-list>
                <q-list v-else-if="userStore.IsMyGroupByGroupname(grp.groupname)" style="min-width: 200px">
                  <q-item clickable v-close-popup @click="tools.setCmd($q, shared_consts.GROUPSCMD.REMOVE_FROM_MYGROUPS, myusername(), '', grp.groupname)">
                    <q-item-section>{{ $t('groups.remove_from_mygroups') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
  <div v-else>
    <CUserNonVerif></CUserNonVerif>
  </div>
</template>

<script lang="ts" src="./CMyGroup.ts">
</script>

<style lang="scss" scoped>
    @import './CMyGroup.scss';
</style>
