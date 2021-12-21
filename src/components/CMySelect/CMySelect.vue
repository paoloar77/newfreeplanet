<template>
  <div class="text-center">
    <div v-if="useinput">
      <q-select
        :multiple="multiple"
        rounded
        outlined
        v-bind="$attrs"
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
        v-if="pickup"
        filled
        :model-value="myvalue"
        clearable
        use-input
        hide-selected
        fill-input
        input-debounce="300"
        :dense="dense"
        :input-class="myclass"
        :options="valori"
        :option-value="optval"
        :option-label="optlab"
        map-options
        @filter="filterFn"
        @update:model-value="changeval"
        :label="label"
        options-selected-class="text-deep-orange"
        v-bind="$attrs"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              {{ scope.opt.flag }}
            </q-item-section>
            <q-item-section>
              <q-item-label> {{ scope.opt.value }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-else
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
        options-selected-class="text-deep-orange"
        map-options
        v-bind="$attrs"
        style="min-width: 170px; max-width: 400px;">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon ? scope.opt.icon : ''"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.descr }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

      </q-select>
    </div>
  </div>
</template>

<script lang="ts" src="./CMySelect.ts">
</script>

<style lang="scss" scoped>
@import './CMySelect.scss';
</style>
