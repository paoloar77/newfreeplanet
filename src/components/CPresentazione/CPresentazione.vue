<template>
  <q-page class="text-white">

    <div class="landing">
      <section>
        <div class="landing__hero">
          <q-carousel
            animated
            :autoplay="animare"
            swipeable
            infinite
            navigation
            transition-next="slide-left"
            transition-prev="slide-right"
            v-model="slide"
            height="100%"
            width="100%"
          >
            <q-carousel-slide name="first" img-src="images/cover.jpg" class="carousel_img_3">
              <div class="landing__header"></div>
              <div class="landing__hero-content row justify-center q-gutter-xs clgutter">
                <div class="row">
                  <logo></logo>
                </div>
                <div class="flex justify-end">
                  <div class="q-gutter-xs testo-banda clgutter">
                    <div class="text-h1 shadow-max">{{ t('msg.myAppName') }}</div>
                    <div class="text-subtitle1 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp') }}
                    </div>
                    <div class="text-subtitle1 shadow-max big text-italic q-pl-sm"><strong>{{
                        t('msg.sottoTitoloApp2')
                      }}</strong>
                    </div>
                    <div class="text-subtitle2 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp3') }}
                    </div>

                    <div>
                      <div v-if="!tools.isLogged()" style="margin: 5px; padding: 5px;" class="home">
                        <q-btn
                          rounded size="lg" color="primary" @click="PagLogin"
                          class="btn-start">
                          {{ $t('login.enter') }}
                        </q-btn>
                        <!--<q-btn
                          rounded size="lg" color="positive" @click="PagReg"
                          class="btn-start">
                          {{ $t('reg.submit') }}
                        </q-btn>-->
                      </div>
                    </div>

                    <div v-if="tools.isLogged()">
                      <div>
                        <!--<q-field-->
                        <!--v-if="getPermission() === 'granted'"-->
                        <!--icon="notifications"-->
                        <!--class="shadow"-->
                        <!--:label="t('notification.titlegranted')"-->
                        <!--:helper="t('notification.statusnot')">-->
                        <!--</q-field>-->
                        <q-field
                          v-if="NotServiceWorker()"
                          class="shadow"
                          icon="notifications"
                          label="Service Worker not present"
                        >
                        </q-field>
                      </div>

                      <div>
                        <q-btn
                          v-if="getPermission() !== 'granted'"
                          class="enable-notifications shadow"
                          color="primary" rounded
                          size="md"
                          icon="notifications" @click="tools.askfornotification($q)"
                          :label="t('notification.ask')"/>
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>-->
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="second" img-src="images/hand_people.jpg" class="carousel_img_3">
              <div class="landing__header"></div>
              <div class="landing__hero-content row justify-center q-gutter-xs clgutter">
                <div class="row">
                  <logo></logo>
                </div>
                <div class="flex justify-end">
                  <div class="q-gutter-xs testo-banda clgutter">
                    <div class="text-h1 shadow-max">{{ t('msg.myAppName') }}</div>
                    <div class="text-subtitle1 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp') }}
                    </div>
                    <div class="text-subtitle1 shadow-max big text-italic q-pl-sm"><strong>{{
                        t('msg.sottoTitoloApp2')
                      }}</strong>
                    </div>
                    <div class="text-subtitle2 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp3') }}
                    </div>

                    <div>
                      <div v-if="!tools.isLogged()" style="margin: 5px; padding: 5px;" class="home">
                        <q-btn
                          rounded size="lg" color="primary" @click="PagLogin"
                          class="btn-start">
                          {{ $t('login.enter') }}
                        </q-btn>
                        <!--<q-btn
                          rounded size="lg" color="positive" @click="PagReg"
                          class="btn-start">
                          {{ $t('reg.submit') }}
                        </q-btn>-->
                      </div>
                    </div>

                    <div v-if="tools.isLogged()">
                      <div>
                        <!--<q-field-->
                        <!--v-if="getPermission() === 'granted'"-->
                        <!--icon="notifications"-->
                        <!--class="shadow"-->
                        <!--:label="t('notification.titlegranted')"-->
                        <!--:helper="t('notification.statusnot')">-->
                        <!--</q-field>-->
                        <q-field
                          v-if="NotServiceWorker()"
                          class="shadow"
                          icon="notifications"
                          label="Service Worker not present"
                        >
                        </q-field>
                      </div>

                      <div>
                        <q-btn
                          v-if="getPermission() !== 'granted'"
                          class="enable-notifications shadow"
                          color="primary" rounded
                          size="md"
                          icon="notifications" @click="tools.askfornotification($q)"
                          :label="t('notification.ask')"/>
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>-->
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <!--<div class="absolute-bottom custom-caption">-->
              <!--<div class="text-h2">Second stop</div>-->
              <!--<div class="text-subtitle1">Famous City</div>-->
              <!--</div>-->
            </q-carousel-slide>
            <q-carousel-slide name="third" img-src="images/cibo_sano.jpg" class="carousel_img_3">
              <div class="landing__header"></div>
              <div class="landing__hero-content row justify-center q-gutter-xs clgutter">
                <div class="row">
                  <logo></logo>
                </div>
                <div class="flex justify-end">
                  <div class="q-gutter-xs testo-banda clgutter">
                    <div class="text-h1 shadow-max">{{ t('msg.myAppName') }}</div>
                    <div class="text-subtitle1 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp') }}
                    </div>
                    <div class="text-subtitle1 shadow-max big text-italic q-pl-sm"><strong>{{
                        t('msg.sottoTitoloApp2')
                      }}</strong>
                    </div>
                    <div class="text-subtitle2 shadow text-italic q-pl-sm">
                      {{ t('msg.sottoTitoloApp3') }}
                    </div>

                    <div>
                      <div v-if="!tools.isLogged()" style="margin: 5px; padding: 5px;" class="home">
                        <q-btn
                          rounded size="lg" color="primary" @click="PagLogin"
                          class="btn-start">
                          {{ $t('login.enter') }}
                        </q-btn>
                        <!--<q-btn
                          rounded size="lg" color="positive" @click="PagReg"
                          class="btn-start">
                          {{ t('reg.submit') }}
                        </q-btn>-->
                      </div>
                    </div>

                    <div v-if="tools.isLogged()">
                      <div>
                        <!--<q-field-->
                        <!--v-if="getPermission() === 'granted'"-->
                        <!--icon="notifications"-->
                        <!--class="shadow"-->
                        <!--:label="t('notification.titlegranted')"-->
                        <!--:helper="t('notification.statusnot')">-->
                        <!--</q-field>-->
                        <q-field
                          v-if="NotServiceWorker()"
                          class="shadow"
                          icon="notifications"
                          label="Service Worker not present"
                        >
                        </q-field>
                      </div>

                      <div>
                        <q-btn
                          v-if="getPermission() !== 'granted'"
                          class="enable-notifications shadow"
                          color="primary" rounded
                          size="md"
                          icon="notifications" @click="tools.askfornotification($q)"
                          :label="t('notification.ask')"/>
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>-->
                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="absolute-bottom custom-caption">-->
              <!--<div class="text-h2">Third stop</div>-->
              <!--<div class="text-subtitle1">Famous Bridge</div>-->
              <!--</div>-->
            </q-carousel-slide>
          </q-carousel>
        </div>
      </section>

      <section class="padding bg-white text-grey-10 text-center">
        <div class="landing__features row items-start q-col-gutter-sm">
          <div class="col-12 text-center">
            <div class="feature-item q-mx-md">
              <img
                src="images/group-together.jpg"
                alt="together"
                class="doc-img">
            </div>
          </div>
          <div class="col-12 text-center"><h4>{{ t('homepage.descrapp_title1') }}</h4>
            <p v-html="t('homepage.descrapp_pag1')"></p>
            <p v-html="t('homepage.descrapp_pag2')"></p>
          </div>
        </div>
      </section>

      <section class="padding bg-primary landing__swirl-bg">
        <div class="landing__features row justify-between items-start q-col-gutter-sm">
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-users"> </i><h4>
              {{ t('homepage.freesocial.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.freesocial.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-house-user"> </i><h4>
              {{ t('homepage.freetalent.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.freetalent.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-street-view"> </i><h4>
              {{ t('homepage.freeliving.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.freeliving.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-universal-access"> </i><h4>
              {{ t('homepage.coin.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.coin.descr')"></p></div>
          </div>
        </div>
      </section>
      <section class="padding bg-primary">
        <div class="landing__features row justify-between items-start q-col-gutter-sm">
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-people-carry"> </i><h4>
              {{ t('homepage.freecollabora.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.freecollabora.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-hands-helping"> </i><h4>
              {{ t('homepage.freesostieni.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.freesostieni.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-browser"> </i>
              <div class="q-gutter-sm">
                <i aria-hidden="true" class="q-icon fab fa-chrome"> </i>
                <i aria-hidden="true" class="q-icon fab fa-firefox"> </i>
                <i aria-hidden="true" class="q-icon fab fa-safari"> </i>
                <i aria-hidden="true" class="q-icon fab fa-android"> </i>
              </div>

              <h4>{{ t('homepage.multiplatform.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.multiplatform.descr')"></p></div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="feature-item"><i
              aria-hidden="true"
              class="q-icon fas fa-universal-access"> </i><h4>
              {{ t('homepage.free.title') }}</h4>
              <p class="feat-descr" v-html="t('homepage.free.descr')"></p></div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  </q-page>
</template>

<script lang="ts" src="./CPresentazione.ts">
</script>

<style lang="scss" scoped>
@import './CPresentazione.scss';
</style>
