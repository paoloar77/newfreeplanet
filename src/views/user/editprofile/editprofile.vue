<template>
  <div class="q-gutter-sm q-pa-xs q-pb-md">

    <CTitleBanner
      class="q-pa-xs" :title="$t('pages.profile')" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <div class="column">
        <div class="myrow">
          <div v-if="static_data.functionality.SHOW_NAMESURNAME">
            <CMyFieldDb
              :title="$t('reg.name')"
              table="users"
              mykey="name"
              :type="costanti.FieldType.string">
            </CMyFieldDb>
            <CMyFieldDb
              :title="$t('reg.surname')"
              table="users"
              mykey="surname"
              :type="costanti.FieldType.string">
            </CMyFieldDb>
          </div>
        </div>
        <div class="myrow">
          <CMyFieldDb
            :title="$t('reg.username')"
            table="users"
            mykey="username"
            :disable="true"
            :readonly="true"
            :type="costanti.FieldType.string">
          </CMyFieldDb>
          <CMyFieldDb
            :title="$t('reg.username_telegram')"
            table="users"
            mykey="profile"
            mysubkey="username_telegram"
            :type="costanti.FieldType.string">
          </CMyFieldDb>
        </div>
        <div class="myrow">
          <CMyFieldDb
            :title="$t('reg.email')"
            table="users"
            mykey="email"
            :disable="true"
            :type="costanti.FieldType.string">
          </CMyFieldDb>
          <CMyFieldDb
            :title="$t('reg.website')"
            table="users"
            mykey="profile"
            mysubkey="website"
            :type="costanti.FieldType.string">
          </CMyFieldDb>
        </div>

        <br/>
        <div class="myrow justify-center">
          <q-btn
            push
            rounded
            color="white"
            text-color="blue"
            size="md"
            to="/requestresetpwd"
            :label="$t('reg.modificapassword')">
          </q-btn>
        </div>
      </div>

    </CTitleBanner>


    <!--
    <CTitleBanner
      class="q-pa-xs" title="Competenze Personali (Offerte)" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <CSkill
        :filtercustom="filtroutente">

      </CSkill>


    </CTitleBanner>
    -->

    <CTitleBanner
      class="q-pa-xs" title="Informazioni su di te" bgcolor="bg-primary" clcolor="text-white"
      myclass="myshad" :canopen="true">

      <div class="myrow">
        <CMyFieldDb
          :title="$t('reg.photo')"
          table="users"
          mykey="profile"
          mysubkey="img"
          :type="costanti.FieldType.image">
        </CMyFieldDb>
      </div>

      <CMyFieldDb
        title="Qualifica"
        table="users"
        mykey="profile"
        mysubkey="qualifica"
        maxlength="40"
        :showall="true"
        :type="costanti.FieldType.string">
      </CMyFieldDb>

      <CMyFieldDb
        title="Biografia"
        table="users"
        mykey="profile"
        mysubkey="biografia"
        maxlength="300"
        hint="Scrivi chi sei e quale percorso formativo hai fatto"
        :showall="true"
        :type="costanti.FieldType.string">
      </CMyFieldDb>

      <div class="myrow">
        <CMyFieldDb
          :title="$t('reg.nationality')"
          table="users"
          tablesel="countries"
          mykey="profile"
          :useinput="false"
          mysubkey="nationality"
          :pickup="true"
          :type="costanti.FieldType.nationality">
        </CMyFieldDb>

        <CMyFieldDb
          :title="$t('reg.residency_city')"
          table="users"
          tablesel="cities"
          mykey="profile"
          :useinput="false"
          mysubkey="born_city"
          :pickup="true"
          :type="costanti.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb
          :title="$t('reg.dateofbirth')"
          table="users"
          mykey="profile"
          mysubkey="dateofbirth"
          :type="costanti.FieldType.date">
        </CMyFieldDb>
      </div>

      <div class="myrow">

        <CMyFieldDb
          :title="$t('reg.intcode_cell')"
          table="users"
          mykey="profile"
          mysubkey="intcode_cell"
          :type="costanti.FieldType.intcode"
          tablesel="phones"
          :pickup="true">
        </CMyFieldDb>
        <CMyFieldDb
          :title="$t('reg.cell')"
          table="users"
          mykey="profile"
          mysubkey="cell"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>


    </CTitleBanner>

    <!--
    <div class="column">
      <div class="myrow">
        <CMyFieldDb
          title="Motivazioni"
          table="users"
          mykey="profile"
          mysubkey="motivazioni"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
      <div class="myrow">
        <CMyFieldDb
          title="Competenze e Professionalità"
          table="users"
          mykey="profile"
          mysubkey="competenze_professionalita"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
      <div class="myrow">
        <CMyFieldDb
          title="Cosa potrei offrire?"
          table="users"
          mykey="profile"
          mysubkey="cosa_offrire"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
      <div class="myrow">
        <CMyFieldDb
          title="Cosa vorrei ricevere?"
          table="users"
          mykey="profile"
          mysubkey="cosa_ricevere"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
      <div class="myrow">
        <CMyFieldDb
          title="Altre Comunicazioni"
          table="users"
          mykey="profile"
          mysubkey="altre_comunicazioni"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
      <div class="myrow">
        <CMyFieldDb
          title="Come ci hai conosciuto?"
          table="users"
          mykey="profile"
          mysubkey="come_ci_hai_conosciuto"
          :type="costanti.FieldType.string">
        </CMyFieldDb>
      </div>
    </div>
    -->

    <!--
    <CTitleBanner class="q-pa-xs" :title="$t('pages.payment')" bgcolor="bg-primary" clcolor="text-white"
                   myclass="myshad" :canopen="true">
      <div class="myrow fa-border justify-center items-center">

        <CMyFieldDb v-if="costanti.isselectPayeer()"
                    :title="$t('reg.payeer_id')"
                    table="users"
                    mykey="profile"
                    myimg="statics/images/payeer.jpg"
                    mysubkey="payeer_id"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb v-if="costanti.isselectAdvCash()"
                    :title="$t('reg.advcash_id')"
                    table="users"
                    mykey="profile"
                    mysubkey="advcash_id"
                    myimg="statics/images/advcash.jpg"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>
        <CMyFieldDb v-if="costanti.isselectRevolut()"
                    :title="$t('reg.revolut')"
                    table="users"
                    mykey="profile"
                    mysubkey="revolut"
                    myimg="statics/images/revolut.jpg"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb v-if="costanti.isselectPaypal()"
                    :title="$t('reg.email_paypal')"
                    table="users"
                    mykey="profile"
                    mysubkey="email_paypal"
                    myimg="statics/images/paypal.jpg"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb v-if="costanti.isselectPaypal()"
                    :title="$t('reg.link_payment')"
                    table="users"
                    mykey="profile"
                    mysubkey="link_payment"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>

        <CMyFieldDb :title="$t('reg.country_pay')"
                    table="users"
                    mykey="profile"
                    mysubkey="country_pay"
                    :type="costanti.FieldType.nationality">
        </CMyFieldDb>
        <CMyFieldDb :title="$t('reg.note_payment')"
                    table="users"
                    mykey="profile"
                    mysubkey="note_payment"
                    :type="costanti.FieldType.string">
        </CMyFieldDb>

      </div>

      <CMyFieldDb :title="$t('reg.paymenttype')"
                  table="users"
                  mykey="profile"
                  mysubkey="paymenttypes"
                  :type="costanti.FieldType.multiselect"
                  jointable="paymenttypes">
      </CMyFieldDb>

    </CTitleBanner>
    -->

    <br><br>
    <div class="text-center">
      <q-btn rounded size="md" color="negative" @click="eliminaAccount" :label="$t('reg.cancella_account')">
      </q-btn>
    </div>

  </div>
</template>

<script lang="ts" src="./editprofile.ts">
</script>

<style lang="scss" scoped>
@import './editprofile.scss';
</style>


<!--<CMyFieldDb :title="$t('reg.username_telegram')"
              table="users"
              mykey="profile"
              mysubkey="username_telegram"
              :type="costanti.FieldType.string">
  </CMyFieldDb>-->
<!--<CMyFieldDb title="Telegram Id"
            table="users"
            :readonly="true"
            mykey="profile"
            mysubkey="teleg_id"
            :type="costanti.FieldType.number">
</CMyFieldDb>-->
