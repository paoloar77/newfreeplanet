<template>
  <div class="text-center">
    <div v-if="multiselect_by_server">
      <q-select
        v-bind="$attrs"
        :model-value="myarrvalue"
        label-color="primary"
        :label="label"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        @update:model-value="changeval"
        input-debounce="300"
        rounded
        outlined
        multiple
        options-dense
        map-options
        stack-label
        emit-value
        :readonly="sola_lettura"
        :use-input="useinput"
        :dense="dense"
        :input-class="myclass"
        :options="valori"
        :option-value="optval"
        class="combowidth"
      >

        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:selected-item="scope">
          <div v-if="scope.opt[fieldsTable.getLabelByTable(tablesel)]">
            <q-chip
              :removable="!sola_lettura"
              dense
              @remove="scope.removeAtIndex(scope.index)"
              v-if="checkIfShowRec(scope.opt)"
              color="white"
              text-color="mycol"
              class="q-my-none q-ml-xs q-mr-none"
            >
              <q-avatar color="primary" text-color="white" icon="" size="12px"/>
              {{ scope.opt[fieldsTable.getLabelByTable(tablesel)] }}
            </q-chip>
          </div>
        </template>

        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">

            <q-item-section>
              <q-item-label>{{ opt[fieldsTable.getLabelByTable(tablesel)] }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)"/>
            </q-item-section>
          </q-item>
        </template>

      </q-select>

    </div>
    <div v-else-if="useinput">
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
        map-options
        emit-value
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
            <q-item-section>
              <q-item-label> {{ scope.opt[optlab] }}</q-item-label>
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
        class="combowidth"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon ? scope.opt.icon : ''"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt[optlab] }}</q-item-label>
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
