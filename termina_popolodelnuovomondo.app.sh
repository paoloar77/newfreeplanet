#!/bin/bash

site=popolodelnuovomondo.app

echo "TERMINA A LAVORARE SU $site: (Sovrascrivo !)"  > now.txt

rmdir NEWFREEPLANET
rmdir POPOLODELNUOVOMONDO

cp -R _ALL_SITES/$site _BAK/2/

cp -R src/statics _ALL_SITES/$site/
cp -R src/db _ALL_SITES/$site/
cp -R ./quasar.conf.js _ALL_SITES/$site/
cp -R ./package.json _ALL_SITES/$site/
cp -R ./.env.development _ALL_SITES/$site/
cp -R ./.env.production _ALL_SITES/$site/
cp -R ./.env.test _ALL_SITES/$site/

