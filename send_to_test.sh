#!/bin/bash

source ./.env.test

echo "Sincronizzazione in remoto $SERVERDIR_WEBSITE ..."
sshpass -p $SERVERPW_WEBSITE rsync -a dist/pwa/ ftpadmin@servereng:/var/www/$SERVERDIR_WEBSITE/
echo "Finito $SERVERDIR_WEBSITE"
