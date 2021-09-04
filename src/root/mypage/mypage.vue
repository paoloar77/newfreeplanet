<template>
  <div>
    <CMyPage
      :title="rec.title" :imgbackground="`statics/` + rec.imgback"
      :sizes="`max-height: ` + rec.heightimg + `px`">
            <span>{{
                setmeta({
                  title: rec.title,
                  description: rec.description,
                  keywords: rec.keywords,
                })
              }}
            </span>

      <div class="q-ma-sm q-gutter-sm q-pa-xs">
        <div v-if="!!rec.img1" class="text-center">
          <q-img :src="`statics/`+ rec.img1" class="img"></q-img>
        </div>

        <div v-if="!!rec.content" v-html="rec.content"></div>
        <q-video v-if="!!rec.video1" :src="rec.video1" :ratio="rec.ratio1">
        </q-video>

        <div v-if="!!rec.img2" class="text-center">
          <q-img :src="`statics/`+ rec.img2" class="img"></q-img>
        </div>

        <div v-if="!!rec.content2" v-html="rec.content2"></div>
        <q-video v-if="!!rec.video2" :src="rec.video2" :ratio="rec.ratio2"></q-video>

        <div v-if="!!rec.img3" class="text-center">
          <q-img :src="`statics/`+ rec.img2" class="img"></q-img>
        </div>

        <div v-if="!!rec.content3" v-html="rec.content3"></div>
        <q-video v-if="!!rec.video3" :src="rec.video3" :ratio="rec.ratio3"></q-video>
        <div v-if="!!rec.content4" v-html="rec.content4"></div>

      </div>
    </CMyPage>
  </div>
</template>
<script lang="ts" src="./mypage.ts">

</script>
<style lang="scss" scoped>
@import 'mypage.scss';
</style>
