<template>
  <div class="q-py-xs centermydiv" :style="`min-width: `+ (tools.getwidth($q) - 20) +`px;`">

    <q-item v-if="myrec" clickable v-ripple class="shadow-2 q-btn--rounded bg-teal-1">
      <q-item-section v-if="(table === toolsext.TABMYGOODS) && (myrec.photos.length > 0)" avatar @click="cmdExt(costanti.CMD_SHOW_PAGE, myrec)">
        <q-avatar size="60px">
          <q-img :src="tools.getFullFileName(myrec.photos, table, myrec.username)" :alt="myrec.descr" img-class="imgprofile" height="60px"/>
        </q-avatar>
      </q-item-section>
      <q-item-section v-else avatar @click="naviga(`/my/` + myrec.username)">
        <q-badge class="q-my-xs self-center" :color="fieldsTable.getColByAdType(myrec.adType)">
          {{ fieldsTable.getValByTabAndId(table, 'adType', myrec.adType) }}
          <q-icon :name="fieldsTable.getIconByAdType(myrec.adType)" color="white"
                  class="q-ml-xs"/>
        </q-badge>
        <q-avatar size="60px">
          <q-img :src="getImgUser(myrec)" :alt="myrec.username" img-class="imgprofile" height="60px"/>
        </q-avatar>
      </q-item-section>

      <q-item-section @click="cmdExt(costanti.CMD_SHOW_PAGE, myrec)">
        <q-item-label class="full-width">
          <span v-for="(rec, ind) of myrec.recSkill" :key="ind"> <q-chip
            dense
            class="text-center shadow-5 glossy bg-blue chipmodif">{{ rec.descr }}</q-chip></span>
          <span v-for="(rec, ind) of myrec.myskill" :key="ind"> <q-chip
            dense
            class="text-center shadow-5 glossy bg-green chipmodif">{{ rec.descr }}</q-chip></span>

          <!--<span> - {{ myrec.profile.qualifica }}</span>-->
        </q-item-label>
        <q-item-label lines="3" v-if="myrec.descr">{{ myrec.descr }}<br>
        </q-item-label>
        <q-item-label overline lines="1" style="text-align: right">
          <span class="text-weight-bold">{{ myrec.username }}</span> -
          <span v-for="(rec, ind) of myrec.mycities" :key="ind"><span v-if="ind > 0">, </span>{{ rec.comune }}</span>
        </q-item-label>

      </q-item-section>
      <q-item-section side v-if="myrec.userId === userStore.my._id">
        <q-item-label>
          <q-btn rounded icon="fas fa-ellipsis-h">
            <q-menu>
              <q-list style="min-width: 150px">
                <q-item clickable icon="fas fa-pencil-alt" v-close-popup
                        @click="cmdExt(costanti.CMD_MODIFY, myrec._id)">
                  <q-item-section>{{ $t('reg.edit') }}</q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 150px">
                <q-item clickable icon="fas fa-trash-alt" v-close-popup @click="cmdExt(costanti.CMD_DELETE, myrec._id)">
                  <q-item-section>{{ $t('reg.elimina') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-label>
      </q-item-section>

    </q-item>
    <q-separator inset="item"/>
  </div>

</template>

<script lang="ts" src="./CMyRecCard.ts">
</script>

<style lang="scss" scoped>
@import './CMyRecCard.scss';
</style>
