<template>
  <div class="mypanel">
    <form @submit.prevent.stop="submit" class="q-col-gutter-lg row justify-center text-center padding q-pa-md">

      <div v-if="!emailsent">
        <q-banner
          rounded
          dense
          class="bg-primary text-white"
          style="text-align: center;">
          <span class="mybanner">{{ $t('reset.title_update_pwd') }}</span>
        </q-banner>

        <div class="q-my-lg"></div>

        <div class="column">

          <q-input
            v-model="form.password"
            type="password"
            dense
            rounded outlined
            @blur="v$.password.$touch"
            :error="v$.password.$error"
            :error-message="`${tools.errorMsg('password', v$.password)}`"
            maxlength="30"
            :label="$t('reg.password')">

            <template v-slot:prepend>
              <q-icon name="vpn_key"/>
            </template>

          </q-input>

          <div class="q-my-sm"></div>

          <q-input
            v-model="form.repeatPassword"
            type="password"
            dense
            maxlength="30"
            rounded outlined
            @blur="v$.repeatPassword.$touch"
            :error="v$.repeatPassword.$error"
            :error-message="`${tools.errorMsg('repeatpassword', v$.repeatPassword)}`"

            :label="$t('reg.repeatPassword')">

            <template v-slot:prepend>
              <q-icon name="vpn_key"/>
            </template>

          </q-input>

          <div class="q-my-sm"></div>

          <div align="center">
            <q-btn rounded size="lg" color="primary" type="submit" :disable="v$.$error">
              {{ $t('reset.update_password') }}
            </q-btn>
          </div>
        </div>

        <pre>{{ v$.$errors }}</pre>

      </div>
      <div v-else>
        <q-banner
          rounded
          class="bg-primary text-white"
          style="text-align: center;">
          <span class="mybanner">{{ $t('reset.email_sent') }}</span>
        </q-banner>
        <br>

        <div>
          {{ $t('reset.check_email') }}
        </div>

      </div>


    </form>
  </div>
</template>

<script lang="ts" src="./updatepassword.ts">
</script>

<style lang="scss" scoped>
@import './updatepassword';
</style>
