<template>
  <CMyPage
    title='Calendario Eventi' imgbackground="images/calendario_eventi.jpg"
    sizes="max-height: 120px" styleadd="bottom: -16px !important;">

        <span>{{
            setmeta({
              title: 'Calendario Eventi',
              description: 'Calendario degli Eventi che si svolgono all\'Associazione Shen di Lugo (RA)',
              keywords: 'calendario eventi centro olistico',
            })
          }}
        </span>

    <CEventsCalendar :mysingleevent="null">

    </CEventsCalendar>
    <br>
    <p class="cltexth3 text-blue q-ma-md" v-for="(mycal, index) in getarrValDb('EVENTS_CAL')" :key="index">
      <a :href="`../../statics/files/eventi/` + mycal.file" target="_blank">Calendario Eventi {{ mycal.label }}
        (PDF)</a><br>
    </p>
    <br>
  </CMyPage>

</template>
<script lang="ts" src="./calendarioeventi.ts">
</script>
<style lang="scss" scoped>
@import './calendarioeventi.scss';
</style>
