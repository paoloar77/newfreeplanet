<template>
  <div>
    <div v-if="tools.isLogged() && tools.getUsername()" class="text-center">
      <q-banner
        rounded
        class="bg-green text-white"
        style="text-align: center;"
      >
        <span class="mybanner">
        {{ tools.getUsername() }} sei già correttamente registrato ed hai accesso alla Piattaforma<br>
        </span>
      </q-banner>

      <div class="row q-ma-sm q-pa-sm justify-center">
        <q-btn class="q-ma-sm" color="primary" icon="fas fa-home" label="Vai alla Home" to="/"></q-btn>

        <q-btn class="q-ma-sm" color="accent" icon="fas fa-sign" label="Voglio vedere la pagina di Registrazione" @click="visureg = true"></q-btn>
        <br>
      </div>

    </div>
    <div v-if="!tools.isLogged() || visureg"
         class="text-center">
      <div>

        <p>
          <logo></logo>

          <q-btn class="q-ma-sm" color="positive" icon="fas fa-home" label="Se sei già Registrato CLICCA QUI" to="/"></q-btn>

          <CTitleBanner :title="$t('pages.SignUp')"></CTitleBanner>

          <q-banner
            rounded
            class="bg-warning text-black"
            style="text-align: center;"
          >
            <span class="mybanner" v-html="t('pages.need_Telegram')"></span>
          </q-banner>
        </p>
      </div>

      <div class="q-gutter-sm">

        <q-input
          v-if="showaportador && signup.aportador_solidario !== tools.APORTADOR_NONE"
          bg-color="lightblue"
          :readonly="true"
          v-model="signup.aportador_solidario"
          rounded outlined
          @blur="v$.aportador_solidario.$touch"
          :error="v$.aportador_solidario.$error"
          :error-message="tools.errorMsg('aportador_solidario', v$.aportador_solidario)"
          maxlength="20"
          debounce="1000"

          :label="$t('reg.aportador_solidario')">

          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>

        <!--<q-input
          v-model="signup.email"
          rounded outlined
          @blur="v$.email.$touch"
          @update:model-value="changeemail()"
          :error="v$.email.$invalid"
          :error-message="tools.errorMsg( 'email', v$.email)"
          maxlength="50"
          debounce="2000"
          :label="$t('reg.email')">

          <template v-slot:prepend>
            <q-icon name="email"/>
          </template>

        </q-input> -->

        <q-input
          v-model="signup.username"
          :readonly="true"
          rounded outlined
          @blur="v$.username.$touch"
          @update:model-value="changeusername"
          :error="v$.username.$error"
          @keydown.space="(event) => event.preventDefault()"
          maxlength="20"
          debounce="1000"
          :error-message="tools.errorMsg( 'username', v$.username)"
          :label="$t('reg.username_reg')">

          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>

        <q-input
          v-model="signup.email"
          rounded outlined
          @update:model-value="changeemail()"
          maxlength="50"
          debounce="3000"
          :rules="[ myRuleEmail ]"
          lazy-rules
          :label="$t('reg.email_reg')">

          <template v-slot:prepend>
            <q-icon name="email"/>
          </template>

        </q-input>

        <div v-if="show_namesurname">
          <q-input
            v-model="signup.name"
            rounded outlined
            @blur="v$.name.$touch"
            :error="v$.name.$error"
            maxlength="30"
            debounce="1000"
            :error-message="tools.errorMsg( 'name', v$.name)"
            :label="$t('reg.name')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

          <q-input
            v-model="signup.surname"
            rounded outlined
            :error="v$.surname.$error"
            @blur="v$.surname.$touch"
            maxlength="30"
            debounce="1000"
            :error-message="tools.errorMsg( 'surname', v$.surname)"
            :label="$t('reg.surname')">

            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>

          </q-input>

        </div>

        <q-input
          v-model="signup.password"
          type="password"
          rounded outlined
          @blur="v$.password.$touch"
          :error="v$.password.$error"
          :error-message="`${tools.errorMsg( 'password', v$.password)}`"
          maxlength="30"
          debounce="1000"
          :label="$t('reg.password_reg')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <q-input
          v-model="signup.repeatPassword"
          type="password"
          maxlength="30"
          rounded outlined
          @blur="v$.repeatPassword.$touch"
          :error="v$.repeatPassword.$error"
          :error-message="`${tools.errorMsg( 'repeatpassword', v$.repeatPassword)}`"

          :label="$t('reg.repeatPassword')">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <q-input
          v-if="shownationality"
          v-model="countryname"
          :readonly="true"
          rounded outlined

          debounce="1000"
          :label="$t('reg.nationality')">

          <template v-slot:prepend>
            <!--<vue-country-code
              @onSelect="selectcountry"
              :preferredCountries="tools.getprefCountries"
              :dropdownOptions="{ disabledDialCode: true }"
            >

            </vue-country-code>-->
          </template>

        </q-input>

        <!--<vue-tel-input
          v-if="showcell"
          @country-changed="intcode_change()"
          :value="signup.profile.cell"
          :placeholder="$t('reg.cell')"
          maxlength="20"
          :enabledCountryCode="true"
          inputClasses="clCell"
          wrapperClasses="clCellCode">
        </vue-tel-input>-->

        <div class="text-center">
          <q-btn label="Mostra Privacy" @click="showpolicy = true"></q-btn>
        </div>

        <q-dialog v-model="showpolicy">
          <q-card class="dialog_card">
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title>
                Privacy Policy
              </q-toolbar-title>
              <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section class="inset-shadow">
              <PagePolicy
                owneremail="info@riso.app"
                SiteName="Riso.app"
                ownerDataName="RISO"
                managerData="Paolo Arena"
                includeData="recapiti (indirizzo email, telefono (facoltativo))"
                url="riso.app"
                lastdataupdate="12/03/2022"
                country="Italia"
              >

              </PagePolicy>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-checkbox
          v-model="signup.terms"
          color="secondary"
          @blur="v$.terms.$touch"
          :error="v$.terms.$error"
          :error-message="`${tools.errorMsg( 'terms', v$.terms)}`"
          :label="$t('reg.terms')">

        </q-checkbox>

        <q-checkbox
          v-if="showadultcheck"
          v-model="iamadult"
          color="secondary"
          :label="$t('reg.onlyadult')">
        </q-checkbox>

        <div v-if="showadultcheck">
          <br>
        </div>

        <div class="wrapper">
          <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit()'
                 :label="$t('reg.submit')">
          </q-btn>
        </div>
        <br/><br/><br/>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./CSignUp.ts">
</script>
<style lang="scss" scoped>
@import './CSignUp.scss';
</style>
