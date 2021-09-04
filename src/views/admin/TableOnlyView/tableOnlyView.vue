<template>
    <q-page padding class="docs-table">
        <p class="caption">TableOnlyView</p>
        <q-table
                ref="table"
                color="primary"
                title="Parametri di Configurazione Server"
                :data="serverData"
                :columns="columns"
                :filter="filter"
                selection="multiple"
                v-model:selected="selected"
                row-key="chiave"
                v-model:pagination="serverPagination"
                @request="request"
                :loading="loading"
        >
            <template v-slot:top-right="props" >
                <q-search hide-underline v-model="filter" />
            </template>
        </q-table>
    </q-page>
</template>
<script lang="ts" src="tableOnlyView.ts">
</script>

<style lang="scss" scoped>
    @import 'tableOnlyView';
</style>
