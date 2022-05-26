<template>
  <div v-if="myop">
    <div class="q-pa-md">
      <div class="column justify-center" style="min-width: 300px">
        <q-img
          :src="mydir + myop.img" class="img_effetto_3d" :alt="`${myop.name} ${myop.surname}`">
        </q-img>
        <div class="q-ma-sm title_shadow">{{ myop.name }} {{ myop.surname ? myop.surname : '' }}</div>

        <div v-if="myop.qualification" class="text-subtitle-carica text-trans">{{ myop.qualification }}</div>
        <div v-if="myop.disciplines" class="text-subtitle-carica">{{ myop.disciplines }}</div>
        <div v-if="myop.cell" class="op__cell">
          <q-icon v-if="myop.cell" class="flex-icon" name="mobile_friendly"></q-icon>
          <span v-if="myop.cell" class="q-mx-sm">{{ myop.cell }}</span>
        </div>

        <div class="row justify-center margin_buttons">
          <q-btn
            v-if="myop.email" fab-mini icon="fas fa-envelope"
            color="blue-grey-6" type="a"
            size="sm"
            :href="tools.getemailto(myop.email)" target="__blank">
          </q-btn>
          <q-btn
            v-if="tools.getHttpForWhatsapp(myop.cell)" fab-mini icon="fab fa-whatsapp"
            color="green" type="a"
            size="sm"
            :href="tools.getHttpForWhatsapp(myop.cell)" target="__blank">
          </q-btn>

          <q-btn
            v-if="tools.getHttpForTelegram(myop.usertelegram)" fab-mini icon="fab fa-telegram"
            color="blue" type="a"
            size="sm"
            :href="tools.getHttpForTelegram(myop.usertelegram)" target="__blank">
          </q-btn>
        </div>
        <div v-if="myop.email" class="op__email">
          <q-icon class="flex-icon" name="contact_mail"></q-icon>&nbsp;
          <a :href="tools.getemailto(myop.email)" target="_blank">{{ myop.email }}
          </a>
        </div>

        <div class="op__facebook" v-if="myop.paginafb">
          <a :href="myop.paginafb" target="_blank">
            <i aria-hidden="true" class="q-icon fab fa-facebook-f icon_contact links"></i> Pagina
            Facebook
          </a>
        </div>

        <div v-if="myop.info" class="text-normal op__storia" v-html="myop.info"></div>
        <br>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./COperators.ts">
</script>

<style lang="scss" scoped>
@import './COperators.scss';
</style>
