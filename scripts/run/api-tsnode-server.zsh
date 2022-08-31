#!/bin/zsh # Boilerplate snippet - go to root, include aldyn-lib.sh & return to script dir
WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh

cd $ROOT/apps/api-tsnode-server

npx ts-node-dev api-server-main.ts
