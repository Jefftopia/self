#!/usr/bin/env bash

# cd ./dist/apps/jefftopia && zip ./dist.zip -r * && cd ../../..
# mv ./dist/apps/jefftopia/dist.zip ./dist.zip
source .env && aws s3 cp ./dist/apps/jefftopia $BUCKET --recursive --acl public-read --profile jeff
