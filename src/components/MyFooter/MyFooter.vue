<template>
  <q-footer
    v-if="tools.isUserOk()"
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
        v-if="static_data.functionality.ENABLE_VIEW_GROUPS"
        to="/groups"
        icon="fas fa-users"
      />
      <q-route-tab
        v-if="static_data.functionality.ENABLE_VIEW_USERS"
        to="/friends"
        icon="fas fa-user-friends"
      />
      <q-route-tab
        v-if="static_data.functionality.ENABLE_VIEW_BOOKINGS"
        to="/admin/eventlist"
        icon="fas fa-calendar-plus"
      />
      <q-route-tab
        v-if="static_data.functionality.ENABLE_VIEW_PROFILE"
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
