<template>
    <q-page padding class="signup">
        <CSignUp :showcell="false" :showaportador="true" :show_namesurname="false" :need_Telegram="true">

        </CSignUp>
    </q-page>

</template>

<script lang="ts" src="./signup.ts">
</script>
<style lang="scss" scoped>
    @import './signup.scss';
</style>
