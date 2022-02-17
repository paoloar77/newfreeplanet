<template>
  <div class="text-center">
    <div v-if="multiselect_by_server">
      <q-select
        :model-value="myarrvalue"
        @update:model-value="changeval"
        v-bind="$attrs"
        label-color="primary"
        :label="label"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        input-debounce="600"
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
        options-selected-class="text-deep-blue"
        class="combowidth"
        style="min-width: 250px"
      >
        <template v-if="getIcon() && !sola_lettura" v-slot:prepend>
          <q-icon :name="getIcon()" />
        </template>

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
    <div v-else-if="pickup">
      <q-select
        v-if="pickup"
        :model-value="myvalue"
        @update:model-value="changeval"
        clearable
        rounded
        outlined
        options-dense
        use-input
        input-debounce="300"
        :dense="dense"
        :input-class="myclass"
        :options="valori"
        :option-value="optval"
        :option-label="optlab"
        map-options
        @filter="filterFn"
        :label="label"
        options-selected-class="text-deep-blue"
        v-bind="$attrs"
        class="combowidth"
      >
        <template v-if="getIcon()" v-slot:prepend>
          <q-icon :name="getIcon()" />
        </template>
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
              <q-item-label> {{ tools.getValueByFunzOrVal(scope.opt,optlab) }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div v-else-if="multiple">
      <q-select
        :multiple="true"
        :model-value="myarrvalue"
        label-color="primary"
        :label="label"
        @update:model-value="changeval"
        rounded
        outlined
        @filter="filterFn"
        v-bind="$attrs"
        :input-class="myclass"
        :use-input="useinput"
        input-debounce="0"
        @new-value="newvaluefuncfirst"
        map-options
        emit-value
        stack-label
        :options="valori"
        options-selected-class="text-deep-blue"
        :option-value="optval"
        :option-label="optlab"
        :dense="dense">

        <template v-if="getIcon()" v-slot:prepend>
          <q-icon :name="getIcon()" />
        </template>
        <template
          v-slot:selected-item="scope">
          <div v-if="tools.getValueByFunzOrVal(scope.opt,optlab)">
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              v-if="checkIfShowRec(scope.opt)"
              color="white"
              class="q-my-none q-ml-xs q-mr-none"
            >
              <q-avatar color="primary" text-color="white" :icon="scope.opt.icon ? scope.opt.icon : ''" size="12px"/>
              {{ tools.getValueByFunzOrVal(scope.opt, optlab) }}
            </q-chip>
          </div>
        </template>
        <template
          v-if="withToggle"
          v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label>{{ tools.getValueByFunzOrVal(opt,optlab) }}</q-item-label>
              <q-item-label v-if="'hint' in opt" class="hint">{{ opt['hint'] }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)"/>
            </q-item-section>
          </q-item>
        </template>

      </q-select>

    </div>
    <div v-else>
      <q-select
        :multiple="false"
        rounded
        outlined
        :dense="dense"
        :input-class="myclass"
        :model-value="myvalue"
        :options="valori"
        :option-value="optval"
        :option-label="optlab"
        @update:model-value="changeval"
        @filter="filterFn"
        :label="label"
        :use-input="useinput"
        @new-value="newvaluefuncfirst"
        emit-value
        input-debounce="0"
        options-selected-class="text-deep-blue"
        map-options
        v-bind="$attrs"
        class="combowidth">
        <template v-if="getIcon()" v-slot:prepend>
          <q-icon :name="getIcon()" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon ? scope.opt.icon : ''"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ tools.getValueByFunzOrVal(scope.opt,optlab) }}</q-item-label>
              <q-item-label v-if="'hint' in scope.opt" class="hint">{{ scope.opt['hint'] }}</q-item-label>
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
