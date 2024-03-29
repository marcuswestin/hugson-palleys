#!/bin/bash # Boilerplate: go to root, include boilerplate script & return to script dir
WD=`pwd` && cd "$(git rev-parse --show-toplevel)" && . scripts/setup/boilerplate.zsh

show_commands

install_if_not_exists 'node' 'brew install node'
install_if_not_exists 'expo' 'npm install --global expo-cli'
install_if_not_exists 'mongosh' 'brew tap mongodb/brew' 'brew install mongodb-community' 'mongod'

cd ${ROOT}

mkdir -p dev/mongodb-data
mongod --fork --logpath ./dev/mongod.log --dbpath ./dev/mongodb-data

cd ${ROOT}/apps/mobile-expo-app && yarn --dev
cd ${ROOT}/apps/api-tsnode-server && yarn --dev
