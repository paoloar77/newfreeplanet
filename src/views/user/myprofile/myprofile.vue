<template>
  <div class="row q-col-gutter-sm q-ma-xs">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card v-if="myuser.date_reg" class="my-card" flat bordered>
        <q-card-section>
          <div class="text-overline" v-if="myuser.profile.qualifica"><em><span
            class="qualifica">{{ myuser.profile.qualifica }}</span></em></div>
          <div class="text-overline"><span
            v-if="myuser.profile && myuser.profile.born_city">{{ myuser.profile.born_city }}</span>
            <span
              v-if="myuser.profile && myuser.profile.nationality && myuser.profile.nationality !== 'Italia'">({{
                myuser.profile.nationality
              }})</span>
          </div>
        </q-card-section>

        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ myuser.username }}</div>
            <div class="text-caption text-blue-grey-10">
              {{ myuser.profile.biografia }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-avatar size="140px" class="rounded-borders">
              <q-img :src="getImgUser()" :alt="username" img-class="imgprofile" height="140px" @click="showPic = true"/>
            </q-avatar>
          </q-card-section>
        </q-card-section>

        <q-separator/>

      </q-card>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card>
        <q-card-section>
          <div v-if="static_data.functionality.SHOW_NAMESURNAME">
            <div class="text-h6">
              <span v-if="checkifShow('name')"> {{ myuser.name }}</span> <span v-if="checkifShow('surname')">{{
                myuser.surname
              }}</span>
            </div>
          </div>

          <div class="col-6 text-h6">
            <CTitleBanner
              class="" title="Info" bgcolor="bg-primary" clcolor="text-white"
              myclass="myshad" :canopen="true">

              <CDateTime
                v-if="checkifShow('profile.dateofbirth') && !!myuser.profile.dateofbirth"
                v-model:value="myuser.profile.dateofbirth"
                :label="$t('reg.dateofbirth')"
                :canEdit="false">
              </CDateTime>

              <q-card-section class="col-md-6 col-sm-6 q-ma-xs col-xs-12 flex flex-center">
                <div>
                  <div v-if="myuser.username !== userStore.my.username">
                    <q-btn
                      v-if="!userStore.IsMyFriendByUsername(myuser.username) && !userStore.IsAskedFriendByUsername(myuser.username)"
                      icon="fas fa-user-plus"
                      color="primary" :label="$t('friends.ask_friend')"
                      @click="tools.setRequestFriendship($q, userStore.my.username, myuser.username, true)"
                    />
                    <q-btn
                      v-if="userStore.IsAskedFriendByUsername(myuser.username) && !userStore.IsMyFriendByUsername(myuser.username)"
                      icon="fas fa-user-minus"
                      flat :label="$t('friends.cancel_ask_friend_short')"
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
                </div>

                <div v-if="myuser._id" class="myrow justify-evenly items-center q-pa-xs q-ma-xs">
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
                  <div class="col-md-6 col-sm-6 q-ma-xs col-xs-12">
                    <q-btn
                      v-if="getLinkWebSite()" icon="fas fa-globe"
                      color="blue" type="a"
                      size="md"
                      rounded
                      :label="$t('reg.website')"
                      :href="getLinkWebSite()" target="__blank">
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

            </CTitleBanner>

          </div>

        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="q-gutter-sm q-pa-sm q-pb-md">
    <div v-if="myuser.date_reg" class="fit column no-wrap justify-evenly items-center content-start">

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

    <CTitleBanner
      class="" title="Competenze e Talenti" bgcolor="bg-positive" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <CSkill
        :filtercustom="filtroutente"
        :butt_modif_new="false"

      >

      </CSkill>


    </CTitleBanner>


  </div>
  <q-dialog
    v-model="showPic"
    full-height full-width
  >

    <img :src="getImgUser()" :alt="username" class="full-width">

  </q-dialog>

</template>

<script lang="ts" src="./myprofile.ts">
</script>

<style lang="scss" scoped>
@import './myprofile.scss';
</style>

