#!/usr/bin/env bash

# cd ./dist/apps/jefftopia && zip ./dist.zip -r * && cd ../../..
# mv ./dist/apps/jefftopia/dist.zip ./dist.zip
cp robots.txt sitemap.xml ./dist/apps/jefftopia
source .env && aws s3 cp ./dist/apps/jefftopia $BUCKET --recursive --acl public-read --profile jeff
