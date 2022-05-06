<template>
  <div class="bordo_stondato_blu">
    <CTitleBanner class="column" title="Tipi di ospitalità"></CTitleBanner>

    <div class="">
      <q-btn
        v-if="isInModif"
        rounded label="Aggiungi Letti" color="positive" @click="add_newbed()">
      </q-btn>

      <div v-for="(myaccom, index) in getlist()" :key="index">
        <div v-if="isInModif" class="row justify-center bordo_stondato_small">
          <div>
            <CMySelect
              v-if="myaccom.num"
              :label="$t('hosps.accomodation.num')"
              v-model:value="myaccom.num"
              optval="value"
              optlab="label"
              :sola_lettura="!isInModif"
              :options="shared_consts.People" :useinput="false"
            >
            </CMySelect>
          </div>
          <div>
            <CMySelect
              v-if="myaccom.type"
              :label="$t('hosps.accomodation.type')"
              v-model:value="myaccom.type"
              optval="value"
              optlab="label"
              :sola_lettura="!isInModif"
              :options="shared_consts.TypeAccom" :useinput="false">
            </CMySelect>
          </div>
          <div>
            <CMySelect
              v-if="myaccom.location"
              :label="$t('hosps.accomodation.location')"
              v-model:value="myaccom.location"
              optval="value"
              optlab="label"
              :sola_lettura="!isInModif"
              :options="shared_consts.LocationAccom" :useinput="false">
            </CMySelect>
            <q-btn v-if="isInModif && myaccom.num > 0" flat round color="red" icon="fas fa-trash-alt" @click="deleteRec(myaccom)"></q-btn>
          </div>
        </div>
        <div v-else class="row justify-start q-px-xs q-ma-xs">

          <div class="accom_num">{{ myaccom.num }}</div>

          <div class="accom_type">
            {{ shared_consts.getLabelByValueAndArr(myaccom.type, shared_consts.TypeAccom) }}
          </div>
          <div>
            <div class="accom_location"> ({{shared_consts.getLabelByValueAndArr(myaccom.location, shared_consts.LocationAccom) }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CAccomodation.ts">
</script>

<style lang="scss" scoped>
@import './CAccomodation.scss';
</style>

