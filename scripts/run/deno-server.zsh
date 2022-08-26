#!/bin/zsh # Boilerplate snippet - go to root, include aldyn-lib.sh & return to script dir
WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh

cd $ROOT/apps/deno-server

deno run --allow-net --watch deno-server-main.ts
