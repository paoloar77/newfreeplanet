<template>
  <q-page class="">

    <div v-if="isLogged()">

      <div v-if="isUserOk()">

        <CFinder>

        </CFinder>

        <CDashboard></CDashboard>

      </div>
      <div v-else>
        <CUserNonVerif></CUserNonVerif>
      </div>

    </div>

  </q-page>

</template>
<script lang="ts" src="./work.ts">
</script>
<style lang="scss" scoped>
@import './work.scss';
</style>
