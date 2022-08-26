#!/bin/zsh # Boilerplate snippet - go to root, include aldyn-lib.sh & return to script dir
WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh

cd ${ROOT}/apps/expo-hugson-palleys

expo start --ios # --android
