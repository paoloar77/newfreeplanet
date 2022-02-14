<template>
  <div class="q-py-xs centermydiv" :style="`min-width: `+ (tools.getwidth($q) - 20) +`px;`">
    <q-item v-if="myskill" clickable v-ripple class="shadow-2 q-btn--rounded bg-teal-1">
      <q-item-section avatar @click="naviga(`/my/` + myskill.username)">
        <q-badge class="q-my-xs self-center" :color="fieldsTable.getColByAdType(myskill.adType)">
          {{ fieldsTable.getValByTabAndId('myskills', 'adType', myskill.adType) }}
          <q-icon :name="fieldsTable.getIconByAdType(myskill.adType)" color="white"
                  class="q-ml-xs"/>
        </q-badge>
        <q-avatar size="60px">
          <q-img :src="getImgUser(myskill)" :alt="myskill.username" img-class="imgprofile" height="60px"/>
        </q-avatar>
      </q-item-section>

      <q-item-section @click="naviga(`/mypage/` + myskill._id)">
        <q-item-label class="full-width">
          <span v-for="(rec, ind) of myskill.recSkill" :key="ind"> <q-chip
            dense
            class="text-center shadow-5 glossy bg-blue chipmodif">{{ rec.descr }}</q-chip></span>
          <span v-for="(rec, ind) of myskill.myskill" :key="ind"> <q-chip
            dense
            class="text-center shadow-5 glossy bg-green chipmodif">{{ rec.descr }}</q-chip></span>

          <!--<span> - {{ myskill.profile.qualifica }}</span>-->
        </q-item-label>
        <q-item-label lines="3">{{ myskill.descr }}<br>
        </q-item-label>
        <q-item-label overline lines="1" style="text-align: right">
          <span class="text-weight-bold">{{ myskill.username }}</span> -
          <span v-for="(rec, ind) of myskill.mycities" :key="ind">{{ rec.comune }}</span>
        </q-item-label>
      </q-item-section>

    </q-item>
    <q-separator inset="item"/>
  </div>

</template>

<script lang="ts" src="./CMySkill.ts">
</script>

<style lang="scss" scoped>
@import './CMySkill.scss';
</style>
