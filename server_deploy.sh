#!/bin/bash

cd service/movie
git pull origin development
npm i
npm run deploy-development
pm2 update