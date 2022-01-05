
if [ "$site" = "" ]; then
   echo "Lancio senza Parametri !"
else
  echo "TERMINA DI LAVORARE SU $site: (Sovrascrivo !)"
  echo "TERMINA DI LAVORARE SU $site: (Sovrascrivo !)" > now.txt

  rmdir __$site

  cp -R _ALL_SITES/$site _BAK/4/

  cp -R src/db _ALL_SITES/$site/
  cp -R src/statics _ALL_SITES/$site/
  cp -R ./quasar.conf.js _ALL_SITES/$site/
  cp -R ./package.json _ALL_SITES/$site/
  cp -R ./.env.development _ALL_SITES/$site/
  cp -R ./.env.production _ALL_SITES/$site/
  cp -R ./.env.test _ALL_SITES/$site/

fi
