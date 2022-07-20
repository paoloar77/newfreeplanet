<template>
  <CMyPage :title="$t('pages.notifs')"
           imgbackground="images/calendario_eventi.jpg"
           sizes="max-height: 120px" styleadd="bottom: -20px !important;">


    <CNotifSettings>

    </CNotifSettings>
    <br>

  </CMyPage>
</template>

<script lang="ts" src="./usernotifs.ts">
</script>

<style lang="scss" scoped>
@import './usernotifs.scss';
</style>

