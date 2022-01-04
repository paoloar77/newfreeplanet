#!/bin/bash

site=freeplanet.app

echo "TERMINA DI LAVORARE SU $site: (Sovrascrivo !)" > now.txt

rmdir NEWFREEPLANET
rmdir POPOLODELNUOVOMONDO

cp -R _ALL_SITES/$site _BAK/4/

cp -R src/statics _ALL_SITES/$site/
cp -R src/db _ALL_SITES/$site/
cp -R ./quasar.conf.js _ALL_SITES/$site/
cp -R ./package.json _ALL_SITES/$site/


