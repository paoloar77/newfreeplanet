<template>
  <div>
    <CMyPage
      imgbackground="images/calendario_eventi.jpg" :title="gettitle()" sizes="max-height: 110px;"
      styleadd="bottom: -36px !important;">

            <span>{{
                setmeta({
                  title: gettitle(),
                  description: '',
                  keywords: '',
                })
              }}
            </span>

      <CEventsCalendar :mysingleevent="myevent" v-if="myevent">

      </CEventsCalendar>

      <q-separator>
      </q-separator>

      <div class="q-pa-md text-center" style="max-width: 380px; margin: auto auto 2px; " v-if="nextevents().length > 0">
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label overline>PROSSIME DATE:</q-item-label>
            </q-item-section>
          </q-item>
          <div
            v-for="(ev, index) in nextevents()"
            :key="index">
            <q-item
              v-if="isnotmyevent(ev)"
              clickable v-ripple
              :to="`/event/${ev.typol}/${ev._id}`"
            >
              <q-item-section avatar v-if="tools.getimgev(ev)">
                <q-avatar>
                  <img :src="tools.getimgev(ev)" :alt="ev.title">
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ ev.title }}</q-item-section>
              <q-item-section side top>{{ tools.getstrDateTimeEventShort($t, ev) }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>

      <div class="q-ma-md text-center">
        <q-btn
          rounded outline type="a" to="/calendario-eventi" color="primary" icon="event"
          :label="$t('pages.calendarioeventi')">
        </q-btn>

      </div>

    </CMyPage>
  </div>
</template>
<script lang="ts" src="./evento.ts">
</script>
<style lang="scss" scoped>
@import './evento.scss';
</style>
