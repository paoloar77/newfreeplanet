
if [ "$site" = "" ]; then
   echo "Lancio senza Parametri !"
else
  echo "INIZIO DI $site ... "
  mkdir __$site

  cp -R src/db _BAK/1/
  cp -R quasar.conf.js _BAK/1/
  cp -R package.json _BAK/1/
  cp -R .env.development _BAK/1/
  cp -R .env.production _BAK/1/
  cp -R .env.test _BAK/1/

  cp -R _ALL_SITES/$site/db src/
  cp -R _ALL_SITES/$site/quasar.conf.js .
  cp -R _ALL_SITES/$site/package.json .
  cp -R _ALL_SITES/$site/.env.development .
  cp -R _ALL_SITES/$site/.env.production .
  cp -R _ALL_SITES/$site/.env.test .

fi
