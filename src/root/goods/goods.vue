<template>
  <q-page class="">

    <div v-if="isLogged()">

      <div v-if="isUserOk()">
        <CTitlePage :ind="0" />

        <CFinder
          :table="toolsext.TABMYGOODS"
        />

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

  </q-page>

</template>
<script lang="ts" src="./goods.ts">
</script>
<style lang="scss" scoped>
@import './goods.scss';
</style>
