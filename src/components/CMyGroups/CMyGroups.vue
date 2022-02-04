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
    <div v-if="modelValue === costanti.FIND_GROUP">
      <slot></slot>
    </div>
    <div v-else>
      <q-list>
        <span v-for="(grp, index) in listgroupsfiltered" :key="index" class="q-my-sm" clickable>
          <CMyGroup
            :mygrp="grp"
            @setCmd="setCmd"
            :visu="modelValue">
          </CMyGroup>
        </span>
      </q-list>
    </div>
  </div>
  <div v-else>
    <q-list class="width-container">
      <span class="q-my-sm" clickable>
      <CMyGroup
        :mygrp="mygrp"
        @setCmd="setCmd"
        :visu="visu">
      </CMyGroup>
      </span>
    </q-list>
  </div>
</template>

<script lang="ts" src="./CMyGroups.ts">
</script>

<style lang="scss" scoped>
@import './CMyGroups';
</style>

