<template>
  <div v-if="tools.isUserOk()">
    <div class="q-gutter-sm q-pa-sm q-pb-md">
      <div v-if="myuser.date_reg" class="fit column no-wrap justify-evenly items-center content-start">

        <div class="">
          <q-avatar size="140px">
            <q-img :src="getImgUser()" :alt="username" img-class="imgprofile" height="140px" @click="showPic = true"/>
          </q-avatar>
        </div>

        <div v-if="static_data.functionality.SHOW_NAMESURNAME">
          <div class="text-h6">
            <span v-if="checkifShow('name')"> {{ myuser.name }}</span> <span v-if="checkifShow('surname')">{{
              myuser.surname
            }}</span>
          </div>
        </div>
        <div class="col-12 text-h7 text-blue text-shadow-2">
          {{ myuser.username }}
        </div>

        <div class="col-12 text-h7">
          <span v-if="myuser.profile && myuser.profile.born_city_id">
              <CMyFieldRec
                title=""
                table="users"
                tablesel="cities"
                :id="myuser._id"
                :rec="myuser"
                field="profile.born_city_id"
                :canEdit="false"
                :canModify="false">
              </CMyFieldRec>


            {{ myuser.profile.born_city_str }}</span> <span
          v-if="myuser.profile && myuser.profile.nationality && myuser.profile.nationality !== 'Italia'">({{
            myuser.profile.nationality
          }})</span>
        </div>
        <div v-if="myuser._id" class="col-12 text-h8 q-mt-sm">
        <span v-if="myuser.profile.qualifica">
          <em><span class="qualifica">{{ myuser.profile.qualifica }}</span></em>
        </span>
        </div>
        <div v-if="myuser._id" class="col-12 text-h8 q-mt-sm">
          {{ myuser.profile.biografia }}
        </div>

        <div v-if="!isMyRecord(myuser.username)">
          <q-btn
            v-if="userStore.IsReqFriendByUsername(myuser.username)"
            icon="fas fa-user-plus"
            color="primary" :label="$t('friends.accept_friend')"
            @click="tools.addToMyFriends($q, userStore.my.username, myuser.username)"
          />
          <div v-else>
            <q-btn
              v-if="!userStore.IsMyFriendByUsername(myuser.username) && !userStore.IsAskedFriendByUsername(myuser.username)"
              icon="fas fa-user-plus"
              color="primary" :label="$t('friends.ask_friend')"
              @click="tools.setRequestFriendship($q, userStore.my.username, myuser.username, true)"
            />
          </div>

          <q-btn v-if="userStore.IsMyFriendByUsername(myuser.username)" rounded icon="fas fa-ellipsis-h">
            <q-menu>
              <q-list v-if="true" style="min-width: 150px">
                <q-item clickable
                        icon="fas fa-user-minus"
                        v-close-popup @click="tools.removeFromMyFriends($q, userStore.my.username, myuser.username)">
                  <q-item-section>{{ $t('friends.remove_from_myfriends') }}</q-item-section>
                </q-item>
                <q-item clickable
                        icon="fas fa-ban"
                        v-close-popup @click="tools.blockUser($q, userStore.my.username, myuser.username)">
                  <q-item-section>{{ $t('friends.block_user') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            v-if="userStore.IsAskedFriendByUsername(myuser.username) && !userStore.IsMyFriendByUsername(myuser.username)"
            icon="fas fa-user-minus"
            :label="$t('friends.cancel_ask_friend_short')"
            @click="tools.cancelReqFriends($q, userStore.my.username, myuser.username)"
          />

        </div>


        <q-btn
          v-if="myuser.username === myusername()" icon="fas fa-pencil-alt"
          color="blue"
          size="md"
          :label="$t('otherpages.modifprof')"
          to="/editprofile">
        </q-btn>

        <div class="myrow justify-evenly items-center q-pa-sm q-ma-sm">

          <div class="col-md-6 col-sm-6 q-ma-xs col-xs-12">
            <q-btn
              v-if="getLinkUserTelegram()" icon="fab fa-telegram"
              color="blue" type="a"
              size="md"
              rounded
              :label="$t('msgs.telegrammsg')"
              :href="getLinkUserTelegram()" target="__blank">
            </q-btn>

          </div>
          <div v-if="myuser._id" class="col-md-6 col-sm-6 q-ma-xs col-xs-12">
            <q-btn
              v-if="getLinkWebSite()" icon="fas fa-globe"
              color="blue" type="a"
              size="md"
              rounded
              :label="$t('reg.website')"
              :href="getLinkWebSite()" target="__blank">
            </q-btn>
          </div>

          <CCopyBtn v-if="myuser.username === myusername()" :title="$t('reg.link_reg')"
                    :texttocopy="getRefLink(username)">

          </CCopyBtn>

        </div>
      </div>
      <div v-else class="fit column no-wrap justify-evenly items-center content-start">
        <q-skeleton type="QAvatar" size="140px" height="140px" animation="fade"/>
        <q-card flat bordered style="width: 250px">
          <div class="text-h6">
            <q-skeleton :animation="animation"/>
          </div>
          <div class="col-12 text-h7 text-grey text-center">
            {{ username }}
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

      <!--
      <CTitleBanner
        class="" title="Competenze e Talenti" bgcolor="bg-positive" clcolor="text-white"
        myclass="myshad" :canopen="true">

        <CSkill
          :filtercustom="filtroutente"
          :butt_modif_new="isMyRecord(myuser.username)"

        >

        </CSkill>


      </CTitleBanner>
      -->

      <div v-if="myuser._id && (userStore.IsMyFriendByUsername(myuser.username) || isMyRecord(myuser.username))">
        <CTitleBanner
          class="" :title="$t('dashboard.info')" bgcolor="bg-primary" clcolor="text-white"
          myclass="myshad" :canopen="true">

          <div v-if="myuser.profile" class="fit column no-wrap justify-evenly content-start">

            <div class="col-md-6 col-sm-6 q-ma-xs col-xs-12">

              <CDateTime
                v-if="checkifShow('profile.dateofbirth') && !!myuser.profile.dateofbirth"
                v-model:value="myuser.profile.dateofbirth"
                :label="$t('reg.dateofbirth')"
                :canEdit="false">
              </CDateTime>
              <CLabel
                v-if="!!myuser.profile.cell"
                v-bind="$attrs"
                :copy="true"
                :value="myuser.profile.intcode_cell + myuser.profile.cell"
                label="Cellulare"
              />

              <!--
              <CMyFieldRec
                table="users"
                :id="myuser._id"
                :rec="myuser"
                field="profile.cell"
                class="cursor-pointer"
                :canEdit="false"
                :disable="true"
                :canModify="false">
              </CMyFieldRec>
              -->


            </div>

          </div>

        </CTitleBanner>
      </div>


    </div>
    <q-dialog
      v-model="showPic"
      full-height full-width
    >

      <img :src="getImgUser()" :alt="username" class="full-width">

    </q-dialog>
  </div>
  <div v-else>
    <CUserNonVerif></CUserNonVerif>
  </div>

</template>

<script lang="ts" src="./myprofile.ts">
</script>

<style lang="scss" scoped>
@import './myprofile.scss';
</style>

