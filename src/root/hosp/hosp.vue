<template>
  <q-page class="">

    <div v-if="tools.isLogged()">

      <div v-if="tools.isUserOk()">
        <CTitlePage :ind="2" />

        <CFinder
          :ind="2"
          :table="toolsext.TABMYHOSPS">

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
<script lang="ts" src="./hosp.ts">
</script>
<style lang="scss" scoped>
@import './hosp.scss';
</style>
