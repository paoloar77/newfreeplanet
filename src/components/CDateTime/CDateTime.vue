<template>
  <div class="" :style="mystyle()">
    <q-input
      v-model="myvalue"
      v-show="false"
      color="blue-6"
      hide-bottom-space
      outlined
      borderless
      :label="label"
      :bg-color="bgcolor"
      :readonly="true"
      :dense="dense"
      mask="####-##-## ##:##"
      debounce="500"
      @update:model-value="changeval"
      :input-class="getclass()"
    >
    </q-input>

    <q-field
      :label="label"
      stack-label
      :value="myvalue"
      outlined
      :dense="dense"
      color="blue-6"
      :bg-color="bgcolor"
      debounce="500"
      :input-class="getclass()">

      <template v-slot:control>
        <div style="">
          <div class="self-center full-width no-outline" :style="mystyle()" tabindex="0">
            {{ getstrDate(myvalue) }}
          </div>
        </div>
      </template>
      <template v-slot:append>
        <q-icon v-if="canEdit" name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="flip-up" v-model="showDateTimeScroller" @before-show="Opening" @before-hide="Closing">

            <div class="q-gutter-md row items-start">
              <q-date
                v-model="myvalue" mask="YYYY-MM-DD HH:mm" color="purple"
                @update:model-value="changeval"
                @close="() => { savetoclose();  }"
              />
              <q-time
                v-model="myvalue" mask="YYYY-MM-DD HH:mm" color="purple"
                @update:model-value="changeval"
                @close="() => { savetoclose();  }"
              />
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-field>
  </div>
</template>

<script lang="ts" src="./CDateTime.ts">
</script>

<style lang="scss" scoped>
@import './CDateTime.scss';
</style>
