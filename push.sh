#! /bin/bash
# 格式化
npm run prettier
npm run coverage
git config user.email daixiongsheng@gmail.com
git add .
date=$(date "+%Y-%m-%d-%H:%M:%S")
git commit -m "$date $1"
git push origin master