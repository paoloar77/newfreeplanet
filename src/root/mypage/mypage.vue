<template>
  <div v-if="isfinishLoading && !!rec">
    <CMyPage
      :title="rec.title" :imgbackground="`` + rec.imgback"
      :mypath="rec.path"
      :sizes="`max-height: ` + rec.heightimg + `px`">

      <span>{{
          setmeta({
            title: rec.title,
            description: rec.description,
            keywords: rec.keywords,
          })
        }}
      </span>

    </CMyPage>
  </div>
</template>
<script lang="ts" src="./mypage.ts">

</script>
<style lang="scss" scoped>
@import 'mypage.scss';
</style>
