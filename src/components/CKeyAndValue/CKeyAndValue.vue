<template>
  <div class="text-center">
    <div class="row items-center justify-center q-gutter-md q-ma-xs">

      <div class="q-ma-xs">
        <q-field rounded outlined bg-color="blue-1" dense style="min-width:110px;">
          <template v-slot:control>
            <div class="centermydiv">
              <div class="self-center full-width no-outline text-center" tabindex="0">{{ mykey }}</div>
            </div>
          </template>
        </q-field>
      </div>

      <div :class="` q-ma-sm q-pa-sm col-grow `">
        <span :style="color ? `background-color: ${color} !important; color: white;` : ``">
          <span v-if="mydate">
                <CDateTime
                  v-model:value="mydate"
                  label=""
                  :canEdit="false">
                </CDateTime>
          </span>
          <span v-else>
            {{myvalue}}
          </span>

        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CKeyAndValue.ts">
</script>

<style lang="scss" scoped>
@import './CKeyAndValue.scss';
</style>
