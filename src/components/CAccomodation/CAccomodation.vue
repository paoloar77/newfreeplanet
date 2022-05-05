<template>
  <!--<div class="q-pa-md items-start " style="display: inline-flex; width: 800px;"> -->
  1) Accom:
  <div v-for="(myaccom, index) in getlist()" :key="index">
    myaccom: {{ myaccom}}

    <CMySelect
      :label="$t('hosps.accomodation.type')" v-model:value="myaccom.type"
      optval="value"
      optlab="label"
      :options="shared_consts.TypeAccom" :useinput="false">
    </CMySelect>

    <CMySelect
      :label="$t('hosps.accomodation.location')" v-model:value="myaccom.location"
      optval="value"
      optlab="label"
      :options="shared_consts.LocationAccom" :useinput="false">
    </CMySelect>

  </div>

</template>

<script lang="ts" src="./CAccomodation.ts">
</script>

<style lang="scss" scoped>
@import './CAccomodation.scss';
</style>
