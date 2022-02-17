#!/bin/bash

source ./.env.production

msg="*** IN PRODUZIONE !!!!!   SEI SICURO DI INVIARE GLI AGGIORNAMENTI SUL SERVER DI PRODUZIONE ?? $SERVERDIR_WEBSITE  (Y/N) ? "

if [ "$1" = "" ]; then
  read -p "$msg" risposta
else
  echo $msg
  risposta=$1
fi


if [[ $risposta == "Y" || $risposta == "y" ]]; then

  npm run buildpwa

  echo "Sincronizzazione in remoto..."

  echo "Sincronizzazione in remoto $SERVERDIR_WEBSITE ..."
  sshpass -p $SERVERPW_WEBSITE rsync -e 'ssh -p 8855' -a dist/pwa/ ftpadmin@servereng:/var/www/$SERVERDIR_WEBSITE/
  echo "Finito $SERVERDIR_WEBSITE "

fi
