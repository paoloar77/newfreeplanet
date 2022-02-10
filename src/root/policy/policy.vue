<template>
    <q-page class="">
        <div class="landing">
            <PagePolicy
                    owneremail=""
                    SiteName=""
                    ownerDataName=""
                    managerData=""
                    includeData="dati anagrafici (ragione sociale, nome, cognome), recapiti (telefono, indirizzo email)"
                    url=""
                    lastdataupdate=""
                    country="Italia"
            >

            </PagePolicy>

            <Footer></Footer>
        </div>

    </q-page>


</template>
<script lang="ts" src="./policy.ts">
</script>
<style lang="scss" scoped>
    @import './policy.scss';
</style>
