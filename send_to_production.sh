#!/bin/bash


source ./.env.production

read -p "*** IN PRODUZIONE !!!!!   SEI SICURO DI INVIARE GLI AGGIORNAMENTI SUL SERVER DI PRODUZIONE ?? $SERVERDIR_WEBSITE  (Y/N) ? " risposta

if [[ $risposta == "Y" || $risposta == "y" ]]; then


  echo "Sincronizzazione in remoto $SERVERDIR_WEBSITE ..."
  sshpass -p $SERVERPW_WEBSITE rsync -e 'ssh -p 8855' -a dist/pwa/ ftpadmin@servereng:/var/www/$SERVERDIR_WEBSITE/
  echo "Finito $SERVERDIR_WEBSITE "
fi
