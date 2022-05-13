#!/bin/bash

site=terradellavisione.app

if [ -d "__newfreeplanet.app" ]; then
  rmdir __newfreeplanet.app
fi

if [ -d "__insiemesipuo.app" ]; then
  rmdir __insiemesipuo.app
fi

if [ -d "__popolodelnuovomondo.app" ]; then
  rmdir __popolodelnuovomondo.app
fi

source __inizia.sh
