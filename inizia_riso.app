#!/bin/bash

site=riso.app

if [ -d "__freeplanet.app" ]; then
  rmdir __freeplanet.app
fi

if [ -d "__riso.app" ]; then
  rmdir __riso.app
fi

if [ -d "__popolodelnuovomondo.app" ]; then
  rmdir __popolodelnuovomondo.app
fi

if [ -d "__terradellavisione.app" ]; then
  rmdir __terradellavisione.app
fi


source __inizia.sh
