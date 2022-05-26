<template>
  <CMyPage title="Operatori" imgbackground="images/calendario_eventi.jpg" sizes="max-height: 120px">
    <div class="q-ma-xs q-gutter-xs q-pa-xs">
      <q-card-section class="row justify-center">
        <div
          v-for="(myop, index) in getOperatorsInHome()" :key="index">

          <COperators :myop="myop" />
        </div>
      </q-card-section>

    </div>
  </CMyPage>
</template>
<script lang="ts" src="./operators.ts">

</script>
<style lang="scss" scoped>
@import 'operators.scss';
</style>
