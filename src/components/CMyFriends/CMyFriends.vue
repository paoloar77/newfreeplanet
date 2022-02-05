<template>
  <div v-if="finder" class="q-gutter-sm q-pa-sm q-pb-sm">
    <q-btn-toggle
      :model-value="modelValue"
      @update:model-value="updateValue"
      class="my-custom-toggle"
      no-caps
      rounded
      unelevated
      push
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="myoptions"
    />
  </div>
  <div v-if="finder" class="">

    <div v-if="modelValue === costanti.FIND_PEOPLE">
      <slot></slot>
    </div>
    <div v-else>
      <q-list>
        <span v-for="(contact, index) in listfriendsfiltered" :key="index" class="q-my-sm" clickable>
          <CMyUser
            :mycontact="contact"
            @setCmd="setCmd"
            :visu="modelValue">
          </CMyUser>
        </span>
      </q-list>
    </div>
  </div>
  <div v-else>
    <q-list class="width-container">
      <span class="q-my-sm" clickable>
      <CMyUser
        :mycontact="mycontact"
        @setCmd="setCmd"
        :visu="visu"
        :groupname="groupname">
      </CMyUser>
      </span>
    </q-list>
  </div>
</template>

<script lang="ts" src="./CMyFriends.ts">
</script>

<style lang="scss" scoped>
@import './CMyFriends';
</style>

