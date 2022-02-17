#!/bin/bash

source ./.env.test

cp .env.test .env.production

echo "Sincronizzazione in remoto $SERVERDIR_WEBSITE ..."
sshpass -p $SERVERPW_WEBSITE rsync -e 'ssh -p 8855' -a dist/pwa/ ftpadmin@servereng:/var/www/$SERVERDIR_WEBSITE/
echo "Finito $SERVERDIR_WEBSITE"

cp .env.prod.bak .env.production
