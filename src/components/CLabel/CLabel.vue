<template>
  <div>
    <q-field
      :label="label"
      stack-label
      outlined
      color="blue-6"
      >

      <template v-slot:prepend>
        <q-btn round dense flat icon="far fa-copy" @click="copytoclip"/>
      </template>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ value }}
        </div>
      </template>
    </q-field>
  </div>
</template>

<script lang="ts" src="./CLabel.ts">
</script>

<style lang="scss" scoped>
@import './CLabel.scss';
</style>
