<template>
  <q-page class="">
    <CTitlePage :ind="1" />

    <div v-if="isLogged()">

      <div v-if="isUserOk()">

        <CFinder
          :table="toolsext.TABMYSKILLS"
        />

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

  </q-page>

</template>
<script lang="ts" src="./services.ts">
</script>
<style lang="scss" scoped>
@import './services.scss';
</style>
