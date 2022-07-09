<template>
  <q-page class="">

    <div v-if="tools.isLogged()">

      <div v-if="tools.isUserOk()">
        <CTitlePage :ind="4" />

        <CFinder
          :ind="4"
          :table="toolsext.TABMYBACHECAS">

        </CFinder>

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

    <LandingFooter></LandingFooter>
  </q-page>

</template>
<script lang="ts" src="./eventi.ts">
</script>
<style lang="scss" scoped>
@import './eventi.scss';
</style>
