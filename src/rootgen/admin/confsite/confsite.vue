<template>
  <CMyPage title="Configura Sito" imgbackground="images/calendario_eventi.jpg" sizes="max-height: 120px">

    <div class="q-ma-sm q-gutter-sm q-pa-xs">

      <div v-if="mysite">
        <q-banner
          rounded
          class="bg-primary text-white"
          color="primary q-title"
          style="text-align: center;">
          <p class="mybanner">{{mysite.name}}</p>
        </q-banner>


        <CMyFieldRec
          title="Opzioni Sito"
          table="sites"
          :id="mysite._id"
          :rec="mysite"
          field="confsite.options"
          :canEdit="true"
          :canModify="true">
        </CMyFieldRec>

      </div>


    </div>
  </CMyPage>
</template>
<script lang="ts" src="./confsite.ts">

</script>
<style lang="scss" scoped>
@import 'confsite.scss';
</style>
