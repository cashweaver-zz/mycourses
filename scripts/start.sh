#!/usr/bin/env bash
# Start the server

NODE_ENV=dev ./node_modules/.bin/nodemon -L --watch ./public --watch ./server ./server/server.js
