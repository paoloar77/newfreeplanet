<template>
  <div class="text-center">
    <div class="row items-center justify-center q-gutter-md q-ma-xs">

      <div v-if="title" class="q-ma-xs">
        <q-field rounded outlined bg-color="blue-1" dense style="min-width:110px;">
          <template v-slot:control>
            <div class="centermydiv">
              <div v-if="myimg" class="text-center">
                <q-img
                  :src="myimg"
                  class="text-center"
                  style="height: 50px; width: 50px;"
                  :alt="title">
                </q-img>
              </div>
              <div class="self-center full-width no-outline text-center" tabindex="0">{{ title }}</div>
            </div>
          </template>
        </q-field>
      </div>

      <div :class="` q-ma-sm q-pa-sm col-grow popupedit `" :style="withBorder() ? `` : ``">

        <CMyPopupEdit
          v-bind="$attrs"
          :rec="rec"
          :isrec="!!rec"
          :table="table"
          :title="title"
          :field="mykey"
          :filter="filter"
          :subfield="mysubkey"
          :specialField="specialField"
          :mysubsubkey="mysubsubkey"
          :indrec="indrec"
          :type="type"
          :serv="serv"
          :disable="disable"
          :jointable="jointable"
          :myimg="myimg"
          :canModify="canModify"
          :canEdit="true"
          :id="id"
          :idmain="idmain"
          :mycol="col"
          :tablesel="tablesel"
          :pickup="pickup"
          v-model:row="row"
          minuteinterval="1"
          @showandsave="showandsel"
        >

        </CMyPopupEdit>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CMyFieldDb.ts">
</script>

<style lang="scss" scoped>
@import './CMyFieldDb.scss';
</style>
