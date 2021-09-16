<template>
  <div>
    <div class="text-center">
      <p>
        <logo></logo>
      </p>
    </div>

    <!--Prova URL :  {{env('PROVA_PAOLO')}}-->
    <q-form
      ref="myForm"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="q-gutter-xs">

        <q-input
          ref="refUsername"
          v-model="signin.username"
          rounded outlined dense
          lazy-rules
          :label="$t('reg.username_login')"
          :rules="[
            val => !!val || $t('reg.err.required'),
            val => val.length > 6 || $t('reg.err.atleast') + ' 6 ' + $t('reg.err.char'),
          ]">

          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>

        </q-input>
        <q-input
          ref="refPassword"
          v-model="signin.password"
          type="password"
          rounded outlined dense
          lazy-rules
          v-on:keyup.enter="onSubmit()"
          :label="$t('reg.password')"
          :rules="[
            val => !!val || $t('reg.err.required'),
            val => val.length > 6 || $t('reg.err.atleast') + ' 6 ' + $t('reg.err.char'),
          ]">

          <template v-slot:prepend>
            <q-icon name="vpn_key"/>
          </template>

        </q-input>

        <div style="text-align: center;">
          <q-btn
            type="submit"
            rounded size="md" color="primary"
            :label="$t('login.enter')">
          </q-btn>
        </div>

        <br>

        <div class="text-center" style="margin-bottom: 10px;">
          <a :href="getlinkforgetpwd()" style="color:gray;">{{ $t('reg.forgetpassword') }}</a>
        </div>

        <div
          v-if="static_data.functionality.ENABLE_REGISTRATION && showregbutt"
          style="margin-top:10px; text-align: center;">
          Se non sei ancora Registrato:<br>
          <q-btn rounded size="md" color="primary" to="/signup" :label="$t('reg.submit')">
          </q-btn>
        </div>

      </div>
    </q-form>
  </div>
</template>

<script lang="ts" src="./CSignIn.ts">
</script>

<style lang="scss" scoped>
@import './CSignIn.scss';
</style>
