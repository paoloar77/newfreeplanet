#!/bin/bash

source ./.env.test

msg="*** Sincronizzazione ???  $DIRECTORY_LOCAL e $SERVERDIR_WEBSITE (Y/N) ? "

if [ "$1" = "" ]; then
  read -p "$msg" risposta
else
  risposta=$1
fi

cd /home/paolo/myproject/$DIRECTORY_LOCAL/
cp .env.production .env.prod.bak
cp .env.test .env.production

sleep 1

npm run buildpwa

echo "Sincronizzazione $SERVERDIR_WEBSITE in remoto..."
sshpass -p $SERVERPW_WEBSITE rsync -e 'ssh -p 8855' -a dist/pwa/ ftpadmin@servereng:/var/www/$SERVERDIR_WEBSITE/

cp .env.prod.bak .env.production

sleep 1

echo "Finito $SERVERDIR_WEBSITE"
