#!/usr/bin/env bash

cd ./dist/apps/jefftopia && zip ./dist.zip -r * && cd ../../..
mv ./dist/apps/jefftopia/dist.zip ./dist.zip
# aws s3 cp ./dist.zip $BUCKET --acl public-read
