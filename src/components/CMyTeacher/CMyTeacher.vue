<template>
    <span>
        <q-dialog v-model="showuserdetails" v-if="myop" :maximized="$q.screen.lt.sm">
            <q-card class="dialog_card">
                <q-toolbar class="bg-primary text-white">
                    <q-toolbar-title>
                        {{ myop.name }} {{ myop.surname ? myop.surname : '' }}
                    </q-toolbar-title>
                    <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
                </q-toolbar>
                <q-card-section class="text-center inset-shadow">
                  <div class="column justify-center" style="min-width: 280px">
                    <q-img
                      :src="`images/` + myop.img" class="img_effetto_3d" :alt="`${myop.name} ${myop.surname}`">
                    </q-img>

                    <div class="title_shadow">{{ myop.name }} {{ myop.surname ? myop.surname : '' }}</div>
                    <div class="text-subtitle-carica text-trans">{{ myop.qualification }}</div>
                    <div class="text-subtitle-carica">{{ myop.disciplines }}</div>
                    <div v-if="myop.certifications" class="text-subtitle-certificato">{{ myop.certifications }}</div>
                    <div class="op__cell">
                        <q-icon class="flex-icon" name="mobile_friendly" v-if="myop.cell"></q-icon>
                        <span class="q-mx-sm">{{ myop.cell }}</span>

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
                    </div>
                    <div class="op__email">
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

                    <br>
                    <div class="op__storia" v-html="myop.info"></div>
                  </div>

                </q-card-section>
                <q-card-actions align="center">
                    <q-btn rounded dense :label="$t('dialog.close')" color="primary" v-close-popup></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-chip
          clickable
          v-if="getImgTeacherByUsername(username) && isValidUsername(username)" @click="executeclick"
          class="mybase__teacher-content">
            <CMyAvatar :myimg="getImgTeacherByUsername(username)"></CMyAvatar>
            <span>{{ getTeacherByUsername(username) }}</span>
        </q-chip>
    </span>
</template>

<script lang="ts" src="./CMyTeacher.ts">
</script>

<style lang="scss" scoped>
@import './CMyTeacher.scss';
</style>
