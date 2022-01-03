<template>
  <div>
    <q-card class="dialog_card">
      <q-toolbar v-if="showButtons" class="bg-primary text-white" style="min-height: 30px;">
        <q-toolbar-title>
          Editor
        </q-toolbar-title>
        <q-btn flat round color="white" icon="close" v-close-popup @click="showeditor=false"></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow" style="padding: 4px !important;">

        <CTitleBanner v-if="title" :title="title"></CTitleBanner>
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          >

          <q-btn rounded size="sm" color="primary">
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy>
                <q-color v-model="mycolor" @change="setcolor"></q-color>
              </q-popup-proxy>
            </q-icon>
          </q-btn>
          <q-editor
            ref="editor"
            content-class="wrap_anywhere"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="toolbarcomp"
            :fonts="myfonts"
            @update:model-value="changeval"
            @paste="evt => pasteCapture(evt)"
            @keyup.enter.stop
            v-model="myvalue">
          </q-editor>
        </form>
      </q-card-section>
      <q-card-actions v-if="showButtons" align="center">
        <q-btn v-if="canModify" flat :label="$t('dialog.ok')" color="primary" @click="saveval"></q-btn>
        <q-btn v-if="canModify" flat :label="$t('dialog.cancel')" color="primary" v-close-popup @click="annulla"></q-btn>
        <q-btn v-if="!canModify" :label="$t('dialog.ok')" color="primary" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>

  </div>
</template>

<script lang="ts" src="./CMyEditor.ts">
</script>

<style lang="scss" scoped>
@import './CMyEditor.scss';
</style>
