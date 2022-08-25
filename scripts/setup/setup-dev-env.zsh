#!/bin/bash # Boilerplate: go to root, include boilerplate script & return to script dir
WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh

show_commands

install_if_not_exists 'deno' 'brew install deno'
install_if_not_exists 'expo' 'npm install --global expo-cli'

cd ${ROOT}

# git submodule update --init --recursive
# git submodule update --recursive

# cd ${ROOT}/apps/shared && yarn --dev
# cd ${ROOT}/apps/desktop-WordFlower && yarn --dev
# cd ${ROOT}/apps/mobile-WordFlower && yarn --dev && cd ios && pod install
