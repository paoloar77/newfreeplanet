<template>
  <q-page class="">

    <div v-if="tools.isLogged()">

      <div v-if="tools.isUserOk()">
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
    <Footer></Footer>
  </q-page>

</template>
<script lang="ts" src="./goods.ts">
</script>
<style lang="scss" scoped>
@import './goods.scss';
</style>
