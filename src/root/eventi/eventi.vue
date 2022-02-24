<template>
  <q-page class="">

    <div v-if="isLogged()">

      <div v-if="isUserOk()">
        <CTitlePage :ind="4" />

        <CFinder
          :table="toolsext.TABMYBACHECAS">

        </CFinder>

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

  </q-page>

</template>
<script lang="ts" src="./eventi.ts">
</script>
<style lang="scss" scoped>
@import './eventi.scss';
</style>
