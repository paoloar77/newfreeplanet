<template>
  <div class="text-center">
    <div class="row items-center justify-center q-gutter-md q-ma-xs">

      <q-list bordered class="rounded-borders">
        <q-expansion-item v-for="(rec, index) in shared_consts.typeNotifs"
                          :key="index"
                          expand-separator
                          icon="perm_identity"
                          :label="t(rec.labeltrans)"
        >
          <q-card>
            <q-card-section>
              <div>{{ t(rec.descr) }}</div>

              <CMyFieldDb
                title=""
                table="users"
                mykey="profile"
                mysubkey="notifs"
                :specialField="{
                  findsubkey: (myrec) => myrec.dir === rec.value,
                  paramtosetsubkey: 'value',
                  paramdef: rec.value,
                  defaultnewrec: { dir: rec.value},
                }"
                jointable="usernotifs"
                tablesel="usernotifs"
                :filter="(myrec) => myrec.directory === rec.value"
                :type="costanti.FieldType.binary">
              </CMyFieldDb>

            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" src="./CNotifSettings.ts">
</script>

<style lang="scss" scoped>
@import './CNotifSettings.scss';
</style>
