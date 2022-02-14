<template>
  <div>
    <div class="row q-ma-sm shadow" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">
      <CBigBtn
        label="Bacheca" to="/bacheca" icon="fas fa-bullhorn" color="blue">
      </CBigBtn>
      <CBigBtn
        label="Scuola" to="/school" icon="fas fa-book-reader" color="orange" disable>
      </CBigBtn>
      <CBigBtn
        label="Luoghi" to="/places" icon="fas fa-map-marker-alt" color="cyan" disable>
      </CBigBtn>
      <CBigBtn
        label="Mobilità" to="/mobility" icon="fas fa-car-side" color="red" disable>
      </CBigBtn>
      <CBigBtn
        label="Alimentari" to="/grocery" icon="fas fa-utensils" color="green" disable>
      </CBigBtn>
      <CBigBtn
        label="Socializza" to="/socialising" icon="fas fa-users" color="purple" disable>
      </CBigBtn>

    </div>
    <div class="text-center">P.S: Attualmente è attivo solo il bottone <b>Lavoro</b>.<br>
      Gli altri verranno attivati nei prossimi giorni.</div>
  </div>
</template>

<script lang="ts" src="./CMainView.ts">
</script>

<style lang="scss" scoped>
@import './CMainView.scss';
</style>
