<template>
  <q-page>
    <CMyPage title="Home">
      <div class="landing">
        <section>
          <div class="landing__hero maxwidth1200 text-white">
            <q-carousel
              animated
              :autoplay="animare"
              swipeable
              infinite
              navigation
              transition-next="slide-left"
              transition-prev="slide-right"
              v-model="slide"
              :height="getheightgallery()"
              width="100%"
            >
              <q-carousel-slide name="first"
                                :img-src="getsrcbyimg(firstimagehome())"  class="carousel_img">
                <div class="landing__header"></div>
                <div class="landing__hero-content row justify-center q-gutter-xs clgutter">
                  <div class="flex justify-end">
                    <div class="q-gutter-xs testo-banda clgutter">
                      <h1 class="text-h1 shadow-max">{{ tools.getappname() }}</h1>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="second"
                                :img-src="getsrcbyimg('images/foto2.jpg')" alt=""  class="carousel_img">
                <div class="landing__header"></div>
                <div class="landing__hero2-content row justify-center q-gutter-xs clgutter">
                  <div class="flex justify-end">
                    <div class="q-gutter-xs testo-banda clgutter">
                      <h1 class="text-h1 shadow-max">{{ tools.getappname() }}</h1>
                    </div>
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="third"
                                :img-src="getsrcbyimg('images/foto3.jpg')"  class="carousel_img">
                <div class="landing__header"></div>
                <div class="landing__hero2-content row justify-center q-gutter-xs clgutter">
                  <div class="flex justify-end">
                    <div class="q-gutter-xs testo-banda clgutter">
                      <div class="text-h1 shadow-max">{{ tools.getappname() }}</div>

                    </div>
                  </div>
                </div>
              </q-carousel-slide>
            </q-carousel>
            <div class="text-grey-9">
              <h2 class="text-subtitle1 shadow text-italic q-pl-sm">
                {{ $t('msg.sottoTitoloApp') }}
              </h2>
              <h2 class="text-subtitle1 shadow-max big text-italic q-pl-sm">
                <strong>{{ $t('msg.sottoTitoloApp2') }}</strong>
              </h2>
              <h2 class="text-subtitle1 shadow text-italic q-pl-sm bg-home ">
                {{ $t('msg.sottoTitoloApp3') }}
              </h2>

            </div>

          </div>
        </section>

        <div class="q-pa-md q-gutter-md">
          <!--<div v-if="tools.isLogged() && !tools.isVerified()" class="text-verified">{{
              $t('components.authentication.email_verification.link_sent') }}
          </div>-->

        </div>


        <CCardCarousel :myarr="getArrDisciplines()" directory="upload/disciplines/">

        </CCardCarousel>

        <CEventsCalendar :mysingleevent="null" :showfirstN="getValDb('SHOW_LAST_EVENTS', false, 3)">

        </CEventsCalendar>


        <div v-if="getValDb('VIDEO_HOME', false)" class="row justify-evenly items-center q-gutter-md ">

          <div class="text-center">
            <h4 class="subtitle text-blue" v-html="getValDb('VIDEO_TITLE', false)"></h4>
            <div class="">
              <video :width="tools.getwidthscale(mythis, 320, 800)"
                     :height="tools.getheightbywidth(mythis, 320, 180, 800)" controls>
                <source :src="getValDb('VIDEO_HOME', false)" type="video/mp4">
              </video>
            </div>
            <!--<q-video src="../../statics/video/Intervista_Cristina_Barattoni.mp4">-->

            <!--</q-video>-->
          </div>

        </div>

        <div v-if="getValDb('YT_VIDEO', false)" class="row justify-evenly items-center q-gutter-md ">

          <div class="text-center">
            <h4 class="subtitle text-blue" v-html="getValDb('YT_TITLE', false)"></h4>
            <div class="">

              <div class="">
                <iframe
                  :width="tools.getwidthscale(mythis, getValDb('YT_W', false), 800)"
                  :height="tools.getheightbywidth(mythis, getValDb('YT_W', false), getValDb('YT_H', false), 800)"
                  :src="getValDb('YT_VIDEO', false)"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <!--<q-video src="../../statics/video/Intervista_Cristina_Barattoni.mp4">-->

            <!--</q-video>-->
          </div>

        </div>


        <section class="padding_gallery bg-white text-grey-10 text-center">

          <q-carousel
            swipeable
            animated
            :autoplay="8000"
            v-model="slide2"
            arrows
            thumbnails
            infinite
            >
            <q-carousel-slide v-for="(rec, index) in getArrImgSlideHome()" :key="index" :name="index"
                              :img-src="getdirectory() + '/' + rec.imagefile"
                              :alt="rec.description"
                              class="carousel_slide">
              <div class="absolute-bottom custom-caption" style="margin-bottom: 70px">
                <div class="text-h5"><span
                  class="text-h6 text-grey-1 shadow-max">{{ index + 1 }}. </span><span
                  class="text-h6 text-grey-2 shadow">{{ rec.description }}</span></div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </section>
        <div v-if="!tools.isMobile()" style="margin: 60px 60px;"></div>

        <COpenStreetMap v-if="false" :imgmap="getValDb('IMGMAP', false)" :urlmap="getValDb('URLMAP', false)" :title="getValDb('MAP_TITLE', false)"
                        :coordinates="getValDb('COORD_MAP_1', false)" :coord_big="getValDb('COORD_MAP_BIG', false)">

        </COpenStreetMap>

        <div class="q-ma-md"></div>
      </div>
    </CMyPage>
  </q-page>
</template>

<script lang="ts" src="./home_tdv.ts">
</script>

<style lang="scss" scoped>
@import './home_tdv.scss';
</style>
