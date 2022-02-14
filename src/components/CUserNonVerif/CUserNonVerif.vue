<template>
  <div class="q-ma-md">
    <q-banner inline-actions rounded class="bg-orange text-white">
      <template v-slot:avatar>
        <q-icon name="info" color="primary" />
      </template>
      <strong>La verifica è in corso. Ti arriverà un messaggio sul Bot Telegram quando verrai abilitato dal tuo invitante.</strong>

    </q-banner>
  </div>
</template>

<script lang="ts" src="./CUserNonVerif.ts">
</script>

<style lang="scss" scoped>
@import './CUserNonVerif.scss';
</style>
