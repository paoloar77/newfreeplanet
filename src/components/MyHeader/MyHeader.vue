<template>
  <div>
    <q-header reveal elevated :class="getClassColorHeader()">
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
        class="toolbar">

        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <div v-if="$q.platform.is.desktop">
          <!--I'm only rendered on desktop!-->
        </div>

        <div v-if="$q.platform.is.mobile">
          <!--I'm only rendered on mobile!-->
        </div>

        <div v-if="$q.platform.is.electron">
          <!--I'm only rendered on Electron!-->
        </div>

        <q-btn
          size="md"
          id="newvers" v-if="isNewVersionAvailable()" color="secondary" rounded icon="refresh"
          class="btnNewVersShow" @click="RefreshApp()" :label="t('notification.newVersionAvailable')">
        </q-btn>

        <q-toolbar-title class="row items-center">
          <q-avatar>
            <img :src="imglogo()" height="27" alt="Immagine Logo">
          </q-avatar>
          <div class="q-mx-sm titlesite">{{ getappname() }}</div>
        </q-toolbar-title>

        <!--
                        <div v-if="isAdmin">
                            <q-btn flat dense round aria-label="">
                                <q-icon :class="clCloudUpload" nametranslate="cloud_upload"></q-icon>
                            </q-btn>

                            <q-btn flat dense round aria-label="">
                                <q-icon :class="clCloudUp_Indexeddb" nametranslate="arrow_upward"></q-icon>
                            </q-btn>

                        </div>
        -->

        <q-btn
          v-if="!isonline() && static_data.functionality.SHOW_IF_IS_SERVER_CONNECTION"
          flat
          dense
          round
          aria-label="Connection"
        >
          <q-icon :name="iconConn" :class="clIconConn"></q-icon>
          <q-icon v-if="isUserNotAuth" name="device_unknown"></q-icon>
        </q-btn>

        <q-btn-dropdown
          stretch
          v-if="static_data.lang_available.length > 1"
          flat
          :label="langshort"
          auto-close
        >
          <q-list bordered>
            <q-item
              clickable v-ripple

              v-for="langrec in static_data.lang_available" :key="langrec.value"
              @click="lang = langrec.value">
              <q-item-section avatar>
                <img :src="langrec.image" class="flagimg" alt="flag">
              </q-item-section>
              <q-item-section>
                {{ langrec.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div v-if="static_data.functionality.SHOW_MESSAGES">
          <message-popover></message-popover>
        </div>
        <div v-if="static_data.functionality.SHOW_NOTIF">
          <notif-popover></notif-popover>
        </div>

        <!--
        <div class="right-itens">
            <label>{{ t('msg.hello') }}</label> <span v-model="prova"></span> !
        </div>-->

        <!-- BUTTON USER BAR -->

        <q-btn
          class="q-mx-xs" v-if="static_data.functionality.ENABLE_ECOMMERCE && tools.isLogged()" round dense flat
          @click="rightCartOpen = !rightCartOpen" icon="fas fa-shopping-cart">

          <q-badge v-if="getnumItemsCart() > 0" color="red" floating transparent>
            {{ getnumItemsCart() }}
          </q-badge>
        </q-btn>

        <q-btn
          class="q-mx-xs" v-if="static_data.functionality.ENABLE_ECOMMERCE && tools.isLogged() && getnumOrdersCart() > 0"
          round dense flat
          to="/orderinfo" icon="fas fa-list-ol">

          <q-badge v-if="getnumOrdersCart() > 0" color="blue" floating transparent>
            {{ getnumOrdersCart() }}
          </q-badge>
        </q-btn>

        <q-btn
          class="q-mx-xs" v-if="static_data.functionality.SHOW_USER_MENU && !tools.isLogged()" dense flat round
          icon="menu"
          @click="rightDrawerOpen = !rightDrawerOpen">
        </q-btn>
        <q-avatar v-else-if="static_data.functionality.SHOW_USER_MENU && tools.isLogged() && getMyImg()"
                  size="36px" class="center_img cursor-pointer"
                  @click="rightDrawerOpen = !rightDrawerOpen">
          <q-img ratio="1" fit="conver" :src="getMyImg()" :alt="Username()" img-class="imgprofile_small" stretch="false"
                 />
        </q-avatar>
        <q-btn
          v-else
          class="q-mx-xs iconprofile_small" round dense flat
          @click="rightDrawerOpen = !rightDrawerOpen" :icon="getMyImgforIcon()" :color="getcolormenu()">
        </q-btn>

        <!--<q-btn
          class="q-mx-xs iconprofile_small" v-if="static_data.functionality.SHOW_USER_MENU && isLogged()" round dense flat
          @click="rightDrawerOpen = !rightDrawerOpen" :icon="getMyImgforIcon()" :color="getcolormenu()">
        </q-btn>-->

      </q-toolbar>

    </q-header>

    <q-drawer
      side="left"
      bordered
      show-if-above
      :breakpoint="500"
      v-model="leftDrawerOpen"
      :content-class="['bg-grey-1', 'q-pa-sm']"
      :content-style="{padding: '0px'}"
    >
      <drawer :clBase="clBase"></drawer>

    </q-drawer>

    <!-- USER BAR -->
    <q-drawer v-if="static_data.functionality.ENABLE_ECOMMERCE" v-model="rightCartOpen" side="right" elevated>
      <q-btn
        class="absolute-top-right" style="margin-right: 10px; color: white;"
        dense flat round icon="close" @click="rightCartOpen = !rightCartOpen">
      </q-btn>
      <div v-if="tools.isLogged()" class="text-weight-bold text-cart">Carrello
      </div>
      <CMyCart></CMyCart>
    </q-drawer>
    <!-- USER BAR -->
    <q-drawer v-if="static_data.functionality.SHOW_USER_MENU" v-model="rightDrawerOpen" side="right" elevated>
      <div id="profile">
        <q-img
          class="absolute-top" src="images/landing_first_section.png"
          style="height: 150px" alt="section page">
        </q-img>
        <div class="absolute-top bg-transparent text-black center_img" style="margin-top: 10px;">
          <div class="text-center q-ma-xs boldhigh text-white text-h7">Area Personale</div>

          <q-avatar size="80px" class="center_img q-ma-md">
            <q-img fit="cover" :src="getMyImg()" :alt="Username()" img-class="imgprofile" height="80px"/>
          </q-avatar>

          <!--<CMyAvatar :myimg="getMyImg()"></CMyAvatar>-->

          <q-btn
            class="absolute-top-right" style="margin-right: 10px; color: white;"
            dense flat round icon="close" @click="rightDrawerOpen = !rightDrawerOpen">
          </q-btn>

          <div v-if="tools.isLogged()" class="text-weight-bold text-user">{{ Username() }}<span v-if="myName()"> - {{ myName() }}</span>
          </div>
          <div class="row justify-evenly q-pa-xs-sm">
            <div v-if="tools.isLogged() && isAdmin()" class="text-weight-bold text-user bg-red q-px-xs">Admin</div>
            <div v-if="isSocio" class="text-weight-bold text-user q-px-xs">Socio</div>
            <div v-if="isSocioResidente()" class="text-weight-bold text-user q-px-xs bg-amber">Residente</div>
            <div v-if="isConsiglio()" class="text-weight-bold text-user q-px-xs bg-deep-orange-10">Consiglio</div>
            <div v-if="isManager()" class="text-weight-bold text-user bg-blue q-px-xs">Segreteria</div>
            <div v-if="isTutor()" class="text-weight-bold text-user q-px-xs">Facilitatore</div>
            <div v-if="isTratuttrici()" class="text-weight-bold text-user q-px-xs">Editor</div>
          </div>
          <div v-if="!tools.isLogged()" class="text-user text-italic bg-red">
            {{ t('user.loggati') }}
          </div>

          <div v-if="tools.isLogged() && !tools.isVerified()" class="text-verified">{{
              t('components.authentication.email_verification.verify_email')
            }}
          </div>

          <div v-if="tools.isLogged()"
            class="text-verified">
            <!-- <span class="text-white" v-if="Verificato()"> {{t('reg.verificato')}} </span> -->
            <span class="text-user text-italic bg-red" v-if="!tools.Verificato()"> {{t('reg.non_verificato')}} </span>
          </div>

          <div v-if="tools.isLogged()" id="user-actions" class="column justify-center q-gutter-sm q-ma-sm center-150">
            <q-btn rounded color="primary" icon="person" :to="`/my/`+getMyUsername()">{{ t('pages.profile') }}</q-btn>
            <!--<q-btn round color="warning" icon="lock"></q-btn>-->
            <q-btn rounded color="negative" icon="exit_to_app" @click='logoutHandler'>{{ t('login.esci') }}</q-btn>
          </div>

        </div>
        <div style="margin-top:120px;"></div>
        <div v-show="!tools.isLogged()">

          <div class="q-ma-md" style="">
            <CSigninNoreg :showregbutt="static_data.functionality.SHOW_REG_BUTTON">

            </CSigninNoreg>
          </div>
        </div>

      </div>
      <div v-if="tools.isLogged()" class="q-mt-lg"></div>

      <slot></slot>

    </q-drawer>
  </div>
</template>

<script lang="ts" src="./MyHeader.ts">
</script>

<style lang="scss" scoped>
@import './MyHeader.scss';
</style>
