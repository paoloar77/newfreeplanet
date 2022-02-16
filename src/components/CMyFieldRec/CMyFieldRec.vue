<template>
  <div class="text-center">
    <div v-if="visuElem()"  class="row items-center justify-center q-ma-xs">

      <div v-if="mytitle" class="q-ma-xs">
        <q-field rounded outlined bg-color="blue-1" dense style="min-width:110px;">
          <template v-slot:control>
            <div class="centermydiv">
              <div v-if="myimg" class="text-center">
                <q-img
                  :src="myimg"
                  class="text-center"
                  style="height: 50px; width: 50px;"
                  :alt="mytitle">
                </q-img>
              </div>
              <div v-if="mytitle" class="self-center full-width no-outline text-center" tabindex="0">{{ mytitle }}</div>
            </div>
          </template>
        </q-field>
      </div>

      <div :class="` col-grow popupedit `" :style="withBorder() ? `` : ``">
        <CMyPopupEdit
          v-bind="$attrs"
          :isrec="true"
          :table="table"
          :title="mytitle"
          :field="mykey"
          :subfield="mysubkey"
          :mysubsubkey="mysubsubkey"
          :type="col.fieldtype"
          :serv="false"
          :disable="disable"
          :jointable="jointable"
          :myimg="myimg"
          :canModify="canModify"
          :canEdit="canEdit"
          :id="id"
          :idmain="idmain"
          :visulabel="!!mytitle"
          :mycol="col"
          :tablesel="tablesel"
          :pickup="pickup"
          v-model:row="rec"
          minuteinterval="1"
          @showandsave="showandsel"
        >

        </CMyPopupEdit>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./CMyFieldRec.ts">
</script>

<style lang="scss" scoped>
@import './CMyFieldRec.scss';
</style>
