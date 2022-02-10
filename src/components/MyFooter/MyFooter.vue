<template>
  <q-footer
    class="bg-white small-screen-only"
    bordered
  >
    <q-tabs
      class="text-grey-10 text-h6"
      active-color="primary"
      indicator-color="transparent"
    >
      <q-route-tab
        to="/"
        icon="fas fa-home"
      />
      <q-route-tab
        to="/groups"
        icon="fas fa-users"
      />
      <q-route-tab
        to="/friends"
        icon="fas fa-user-friends"
      />
      <q-route-tab
        :to="`/my/`+getMyUsername()"
        icon="person"
      />
    </q-tabs>
  </q-footer>
</template>

<script lang="ts" src="./MyFooter.ts">
</script>

<style lang="scss" scoped>
@import './MyFooter.scss';
</style>
