<template>
  <div>
    <div class="text-center">
      <p>
        <logo></logo><CTitleBanner :title="$t('pages.SignUp')"></CTitleBanner>
      </p>
    </div>

    <!--Prova URL :  {{env('PROVA_PAOLO')}}-->

    <div class="q-gutter-sm">

      <q-input
        v-model="signup.email"
        rounded outlined
        @blur="v$.email.$touch"
        @update:model-value="changeemail()"
        :error="v$.email.$error"
        :error-message="tools.errorMsg( 'email', v$.email)"
        maxlength="50"
        debounce="3000"
        :label="$t('reg.email')">

        <template v-slot:prepend>
          <q-icon name="email"/>
        </template>

      </q-input>

      <q-input
        v-model="signup.username"
        rounded outlined
        @blur="v$.username.$touch"
        @update:model-value="changeusername"
        :error="v$.username.$error"
        @keydown.space="(event) => event.preventDefault()"
        maxlength="20"
        debounce="1000"
        :error-message="tools.errorMsg( 'username', v$.username)"
        :label="$t('reg.username')">

        <template v-slot:prepend>
          <q-icon name="person"/>
        </template>

      </q-input>

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

      <q-input
        v-model="signup.password"
        type="password"
        rounded outlined
        @blur="v$.password.$touch"
        :error="v$.password.$error"
        :error-message="`${tools.errorMsg( 'password', v$.password)}`"
        maxlength="30"
        debounce="1000"
        :label="$t('reg.password')">

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

      <div v-if="!tools.isMobile()"><br></div>


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
        <q-btn rounded size="lg" color="positive" @click="submitOk" :disabled='!allowSubmit()' :label="$t('reg.submit')">
        </q-btn>
      </div>
    </div>

  </div>
</template>

<script lang="ts" src="./CSignUp.ts">
</script>
<style lang="scss" scoped>
  @import './CSignUp.scss';
</style>
