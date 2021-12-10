<template>
  <div class="text-center">
    <div v-if="useinput">
      <q-select
        :multiple="multiple"
        rounded
        outlined
        :input-class="myclass"
        :model-value="myvalue"
        :use-input="useinput"
        input-debounce="0"
        @new-value="newvaluefunc"
        new-value-mode="add-unique"
        :options="valori"
        :option-value="optval"
        :option-label="optlab"
        @update:model-value="changeval"
        :label="label"
        :dense="dense">
      </q-select>
    </div>
    <div v-else>
      <q-select
        :multiple="multiple"
        rounded
        outlined
        :dense="dense"
        :input-class="myclass"
        :model-value="myvalue"
        :options="valori"
        :option-value="optval"
        :option-label="optlab"
        @update:model-value="changeval"
        :label="label"
        emit-value
        map-options
        style="min-width: 170px; max-width: 400px;">
      </q-select>
    </div>
  </div>
</template>

<script lang="ts" src="./CMySelect.ts">
</script>

<style lang="scss" scoped>
@import './CMySelect.scss';
</style>
