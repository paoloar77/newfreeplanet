<template>
  <q-page class="">
    <CTitlePage :ind="1" />

    <div v-if="tools.isLogged()">

      <div v-if="tools.isUserOk()">

        <CFinder
          :ind="1"
          :table="toolsext.TABMYSKILLS"
        />

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

    <LandingFooter></LandingFooter>
  </q-page>

</template>
<script lang="ts" src="./services.ts">
</script>
<style lang="scss" scoped>
@import './services.scss';
</style>
