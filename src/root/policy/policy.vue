<template>
    <q-page class="">
        <div class="landing">
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

            <LandingFooter></LandingFooter>
        </div>

    </q-page>


</template>
<script lang="ts" src="./policy.ts">
</script>
<style lang="scss" scoped>
    @import './policy.scss';
</style>
