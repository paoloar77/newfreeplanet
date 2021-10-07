<template>
  <div>
    Competenze:<br>
    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CGridTableRec
        prop_mytable="myskills"
        prop_mytitle="Mie Competenze"
        :prop_mycolumns="colmySkills"
        prop_colkey="idSkill"
        nodataLabel="Nessuna Competenza inserita"
        noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

      </CGridTableRec>
    </div>

    <div class="row">
      <!--
      <q-btn
        flat dense color="primary"
        :label="$t('grid.addrecord')"
        @click="createNewRecordInUserTable">

      </q-btn>

      <CMyFieldDb
        title="Competenza"
        table="users"
        mykey="profile"
        mysubkey="myskills"
        indrec=0
        mysubsubkey="idSkill"
        :type="costanti.FieldType.binary">
      </CMyFieldDb>
      -->
    </div>
  </div>

  Servizi:<br>

</template>

<script lang="ts" src="./CSkill.ts">
</script>
<style lang="scss" scoped>
@import './CSkill.scss';
</style>
