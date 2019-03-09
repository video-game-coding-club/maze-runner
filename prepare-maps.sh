#!/bin/bash

set -u -e -x

for i in assets/*.tmx; do
  mapname=$(basename ${i} .tmx)
  tiled \
    --embed-tilesets \
    --export-map "assets/${mapname}.tmx" \
    "assets/${mapname}.json"
done
