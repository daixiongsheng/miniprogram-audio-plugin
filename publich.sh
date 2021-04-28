#! /bin/bash
git config user.email daixiongsheng@gmail.com
npm run prettier
npm run build
git add .
date=$(date "+%Y-%m-%d-%H:%M:%S")
git commit -m "$date $1"
tag=`npm version patch`
nrm use npm
npm publish
nrm use taobao
git push origin master
git push origin $tag