<template>
  <div class="q-ma-md">
    <div class="row q-my-md shadow" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_4" style="border-left: 1px solid #efefef;"
           v-bind:class="{'border-top': $q.platform.is.mobile}">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ calcstat.numUsersReg }}</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Persone Iscritte</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="o_people" class="box_4" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-4" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3" style="border-left: 1px solid #efefef;"
           v-bind:class="{'border-top': $q.platform.is.mobile}">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ calcstat.numMySkills }}</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Competenze</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="engineering" class="box_3" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-3" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3" style="border-left: 1px solid #efefef;"
           v-bind:class="{'border-top': $q.platform.is.mobile}">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ calcstat.numMyBachecas }}</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Eventi</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="engineering" class="box_3" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-3" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3" style="border-left: 1px solid #efefef;"
           v-bind:class="{'border-top': $q.platform.is.mobile}">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ calcstat.numMyGoods }}</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Beni</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="engineering" class="box_3" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-3" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div v-if="true" class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_1">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">{{ calcstat.numGroups }}</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Gruppi Creati</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="fas fa-users" class="box_1" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-1" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div v-if="false" class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_2" style="border-left: 1px solid #efefef;"
           v-bind:class="{'border-top': $q.platform.is.mobile}">
        <q-card class="no-shadow q-pa-sm">
          <q-item class="q-pb-none q-pt-xs">
            <q-item-section>
              <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">0</q-item-label>
              <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" style="letter-spacing: 1px;">Uscite</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="o_account_balance_wallet" class="box_2" size="60px"></q-icon>
            </q-item-section>
          </q-item>
          <q-item class="q-py-xs" style="min-height: unset">
            <q-item-section>
              <div class="progress-base q-my-sm">
                <div class="progress-bar-2" style="width:100%"></div>
              </div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CDashboard.ts">
</script>

<style lang="scss" scoped>
@import './CDashboard.scss';
</style>
