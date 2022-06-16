<template>
  <div>
    <div v-if="visustat">
      <CTitleBanner class="q-pa-xs" :title="$t('pages.status')" bgcolor="bg-primary" clcolor="text-white"
                    mystyle="" myclass="myshad" :canopen="true">


        <div class="flex flex-center">

          <CCardState :mytext="$t('pages.statusreg.reg')" :myval="datastat.num_teleg_attivo"
                      mycolor="blue"
                      :myperc="(datastat.num_teleg_attivo / datastat.num_reg) * 100"></CCardState>

          <CCardState :mytext="$t('pages.statusreg.online_today')" :myval="datastat.online_today"
                      mycolor="green" :myperc="(datastat.online_today / datastat.num_reg) * 100"></CCardState>

          <CCardState :mytext="$t('pages.statusreg.autorizzare')" :myval="datastat.num_autorizzare"
                      mycolor="yellow" :myperc="(datastat.num_autorizzare / datastat.num_teleg_attivo) * 100"></CCardState>

          <div class="q-pa-xs" v-if="datastat.num_part_accepted > 1">
            <CCardStat :mytext="$t('stat.accepted')" :myval="datastat.num_part_accepted"></CCardStat>
            <!--<CCardStat :mytext="$t('stat.modalita_pagamento')"
                       :myval="datastat.num_modalita_pagamento"></CCardStat>-->
            <!--<CCardStat :mytext="$t('stat.requisiti')" :myval="datastat.num_requisiti"></CCardStat>-->
            <!--<CCardStat :mytext="$t('stat.qualificati')" :myval="datastat.num_qualificati"></CCardStat>-->
            <!--<CCardStat v-if="emailnonverif" :mytext="$t('stat.email_not_verif')" :myval="emailnonverif"
                       mycol="negative"></CCardStat>
            <CCardStat v-if="telegnonattivi" :mytext="$t('stat.telegram_non_attivi')"
                       :myval="telegnonattivi"
                       mycol="negative"></CCardStat>
            <CCardStat v-if="datastat.num_teleg_pending > 0" :mytext="$t('stat.telegram_pendenti')"
                       :myval="datastat.num_teleg_pending" mycol="negative"></CCardStat>-->
          </div>

          <div class="column animazione">
            <div class="text-center">{{$t('pages.statusreg.newreg')}}</div>
            <transition-group name="fade" mode="out-in"
                              appear
                              enter-active-class="animazione fadeIn"
                              leave-active-class="animazione fadeOut">

              <q-item v-for="(user, index) in lastsreg" :key="index" class="q-mb-xs animated"
                      v-ripple>

                <!--
                <q-item-section avatar>
                  <q-avatar v-if="tools.geticon(user.profile.nationality)"
                            :class="tools.geticon(user.profile.nationality)">

                  </q-avatar>
                  <q-avatar v-else color="primary" text-color="white" class="text-center">
                    {{ tools.capitalize(user.profile.nationality) }}
                  </q-avatar>
                </q-item-section>-->

                <q-item-section>
                  <q-item-label lines="1">
                    <CMyFieldRec
                      table="users"
                      :id="user._id"
                      :rec="user"
                      field="username"
                      :canEdit="false"
                      :canModify="false"
                      :type="costanti.FieldType.username_chip">
                    </CMyFieldRec>

                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ tools.getstrDateTimeShort(user.date_reg) }}</q-item-label>
                  <q-chip outline color="green" text-color="white" icon-right="fas fa-user-plus"
                          size="xs"></q-chip>
                </q-item-section>
              </q-item>
            </transition-group>
          </div>

          <!--<CGeoChart :mydata="datastat.arr_nations">

          </CGeoChart>-->

          <div class="row q-pa-sm text-center justify-center">
            <!--
            <div class="clBorderZoom">
              <CListNationality :mydata="datastat.arr_nations">

              </CListNationality>
            </div>-->
            <div class="clBorderTutor">
              <CLineChart :mydata="datastat.reg_daily" :title="$t('stat.reg_daily')" color="blue" bordercolor="blue" :sum="true">

              </CLineChart>

              <!--<CLineChart :mydata="datastat.reg_weekly" :title="$t('stat.reg_weekly')" color="blue" bordercolor="green" :sum="true">

              </CLineChart>-->


              <!--<CLineChart :mydata="datastat.reg_daily" :title="$t('stat.reg_total')"
                          :offset="datastat.numreg_untilday" :sum="true"
                          :mycolors="['#0b0', '#666']">

              </CLineChart>-->
            </div>
          </div>
        </div>
      </CTitleBanner>
    </div>
  </div>
</template>

<script lang="ts" src="./CStatusReg.ts">
</script>

<style lang="scss" scoped>
  @import './CStatusReg.scss';
</style>
