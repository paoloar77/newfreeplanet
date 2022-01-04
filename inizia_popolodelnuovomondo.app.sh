#!/bin/bash

site=popolodelnuovomondo.app

echo "INIZIA A LAVORARE SU $site: (Sovrascrivo !)"  > now.txt

rmdir NEWFREEPLANET
mkdir POPOLODELNUOVOMONDO

cp -R src/sites _BAK/1/
cp -R quasar.conf.js _BAK/1/
cp -R package.json _BAK/1/
cp -R .env.development _BAK/1/
cp -R .env.production _BAK/1/
cp -R .env.test _BAK/1/

cp -R _ALL_SITES/$site/statics src/
cp -R _ALL_SITES/$site/db src/
cp -R _ALL_SITES/$site/quasar.conf.js .
cp -R _ALL_SITES/$site/.env.development .
cp -R _ALL_SITES/$site/.env.production .
cp -R _ALL_SITES/$site/.env.test .

