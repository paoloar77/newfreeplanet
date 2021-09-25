#!/bin/bash

source ./.env.production

msg="*** TUTTI I SERVER !!!  ****  SEI SICURO DI INVIARE GLI AGGIORNAMENTI FRONTEND E BACKEND - SU TUTTI SERVER ??? $DIRECTORY_LOCAL e $DIRECTORY_SERVER (Y/N) ? "

if [ "$1" = "" ]; then
  read -p "$msg" risposta
else
  risposta=$1
fi


if [[ $risposta == "Y" || $risposta == "y" ]]; then
  cd /home/paolo/myproject/$DIRECTORY_LOCAL/
  ./deploy_frontend.sh $risposta
  cd /home/paolo/myproject/$DIRECTORY_SERVER/
  ./deploy_backend.sh $risposta
else
  echo "Annullato"
fi
