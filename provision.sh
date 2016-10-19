#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive;

# Install Node.js
# ref: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y nodejs

# Update npm
npm install -g npm
npm install -g yarn

# build-essential and g++ for npm install
# sqlite3 for database
apt-get -y install build-essential g++ sqlite3

# Install dependencies
cd /vagrant
yarn
