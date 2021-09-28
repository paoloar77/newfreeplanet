#!/bin/bash

source ./.env.production

msg="*** TUTTI I SERVER FRONTEND !!!  ****  SEI SICURO DI INVIARE GLI AGGIORNAMENTI FRONTEND - SU TUTTI SERVER ??? $DIRECTORY_LOCAL  (Y/N) ? "

if [ "$1" = "" ]; then
  read -p "$msg" risposta
else
  risposta=$1
fi

if [[ $risposta == "Y" || $risposta == "y" ]]; then
  cd /home/paolo/myproject/$DIRECTORY_LOCAL/
  ./deploy_on_production.sh $risposta
  ./deploy_on_test_server.sh $risposta
fi
