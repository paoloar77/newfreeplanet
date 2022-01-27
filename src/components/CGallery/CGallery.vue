<template>
  <!--<div class="q-pa-md items-start " style="display: inline-flex; width: 800px;"> -->
  <div v-if="!edit">
    <div class="q-pa-md q-gutter-md">
      <q-card :class="getclass()" @click="apri">
        <div v-for="(mygallery, index) in getlistimages()" :key="index">
          <div v-if="index === 0">
            <q-img
              :src="getsrcimg(mygallery)" :class="getclimg()"
              :alt="mygallery.alt">
              <div v-if="getnumimages() > 1" class="absolute-bottom text-shadow no-padding">
                ({{ getnumimages() }})
              </div>
            </q-img>

          </div>
        </div>
      </q-card>
    </div>
  </div>
  <div v-else>
    <div v-if="getnumimages() <= 0">
      <q-btn
        flat round color="blue" icon="fas fa-tools" size="md"
        @click="apri"></q-btn>
    </div>
    <div v-else>
      <div class=" row">
        <!--<q-draggable-rows
                v-model="order">-->

        <div v-for="(mygallery, index) in getlistimages()" :key="index">
          <div
            class="q-pa-sm q-gutter-sm"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"

            @dragover="onDragOver">
            <q-card
              :id="mygallery._id" :class="getclass()"
              :draggable="canModify"
              @dragstart="onDragStart"
              @drop="onDrop"
            >

              <q-img
                :src="getsrcimg(mygallery)"
                :class="getclimg()"
                :alt="mygallery.alt">
                <div class="absolute-bottom text-shadow">
                  <!-- <div class="text-h6 text-trans">{{ mygallery.description }} </div> -->
                  <div class="text-subtitle-carica text-trans">{{ mygallery.description }}</div>
                </div>
              </q-img>


              <q-field
                stack-label
                dense
                label="Nome File">
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ mygallery.imagefile }}</div>
                </template>

              </q-field>

              <q-input
                v-model="mygallery.description"
                dense
                :label="$t('proj.longdescr')"
                @keyup.enter.stop
                @update:model-value="save"
                debounce="1000"
                autofocus>
              </q-input>

              <q-card-actions align="center">
                <q-btn
                  v-if="canModify"
                  flat round color="blue" icon="fas fa-copy" size="sm"
                  @click="copytoclipboard(mygallery)"></q-btn>
                <q-btn
                  v-if="canModify"
                  flat round color="red" icon="fas fa-trash-alt" size="sm"
                  @click="deleteFile(mygallery)"></q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div class="q-pa-sm">
          <div v-if="edit" class="q-gutter-sm " style="max-height: 200px; width: 208px;">
            <q-uploader
              label="Aggiungi Immagine"
              accept="image/jpeg, image/jpg, image/png, .pdf"
              :url="getUrl()"
              :headers="tools.getheaders()"
              :max-file-size="3000000"
              multiple
              auto-upload
              hide-upload-btn
              no-thumbnails
              @uploaded="uploaded"
              @rejected="onRejected"
              style="width: 208px"
            ></q-uploader>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog
    v-model="displayGall"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-space/>

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class=" row">

          <div v-for="(mygallery, index) in getlistimages()" :key="index">
            <div
              class="q-pa-sm barwidth"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @dragover="onDragOver"
            >
              <q-bar
                class="bg-primary text-white"
              >
                <q-btn flat round dense icon="menu" class="q-mr-sm"/>
                <q-btn
                  v-if="canModify"
                  flat round icon="fas fa-copy" size="sm"
                  @click="copytoclipboard(mygallery)"></q-btn>
                <div>
                  Foto {{ index + 1 }}
                </div>
                <q-space></q-space>
                <q-btn v-if="canModify" flat round color="red" icon="fas fa-trash-alt" @click="deleteFile(mygallery)"></q-btn>
              </q-bar>

              <q-card
                :id="mygallery._id" :class="getclass()"
                :data-ind="index"
                :draggable="canModify"
                @dragstart="onDragStart"
                @drop="onDrop"
              >
                <q-img
                  :src="getsrcimg(mygallery)"
                  :class="getclimg()"
                  @click="ImgFullScreen(mygallery)"
                  :alt="mygallery.alt">
                  <div v-if="mygallery.description" class="absolute-bottom text-shadow">
                    <!-- <div class="text-h6 text-trans">{{ mygallery.description }} </div> -->
                    <div class="text-subtitle-carica text-trans">{{ mygallery.description }}</div>
                  </div>
                </q-img>
                <q-card-section>
                  <q-field
                    stack-label
                    dense
                    label="Nome File">
                    <template v-slot:control>
                      <div class="self-center full-width no-outline" tabindex="0">{{ mygallery.imagefile }}</div>
                    </template>

                  </q-field>
                  <q-input
                    v-model="mygallery.description"
                    dense
                    :label="$t('proj.longdescr')"
                    @keyup.enter.stop
                    @update:model-value="save"
                    debounce="1000"
                    autofocus>
                  </q-input>
                </q-card-section>

              </q-card>
            </div>
          </div>
          <div
            v-if="canModify"
            class="q-pa-sm">
            <div class="q-gutter-sm " style="max-height: 200px; width: 208px;">
              <q-uploader
                label="Aggiungi Immagine"
                accept="image/jpeg, image/jpg, image/png, .pdf"
                :url="getUrl()"
                :headers="tools.getheaders()"
                :max-file-size="2000000"
                multiple
                auto-upload
                hide-upload-btn
                no-thumbnails
                @uploaded="uploaded"
                @rejected="onRejected"
                style="width: 208px"
              ></q-uploader>
            </div>
          </div>
        </div>


        <q-card-actions align="right">

          <q-btn v-if="canModify" flat label="Annulla" color="primary" v-close-popup/>
          <q-btn v-if="canModify" label="salva" color="primary" v-close-popup @click="save"/>
          <q-btn v-if="!canModify" label="Chiudi" color="primary" v-close-popup/>
        </q-card-actions>

      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="fullscreen"
    :maximized="false"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="my-card">
      <q-img v-if="fullscreensrc" alt="fullscreen" :src="fullscreensrc" @click="fullscreen = false"></q-img>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" src="./CGallery.ts">
</script>

<style lang="scss" scoped>
@import './CGallery.scss';
</style>
