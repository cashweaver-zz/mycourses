#!/usr/bin/env bash
# Run all tests

# Start up the test server
NODE_ENV=test PORT=3001 node /vagrant/server/server.js &
NODE_PID=$!

# Run tests
find . -path ./node_modules -prune -o -type f -path '*.test.js' | grep -ve '^\\.\\/node_modules$' | NODE_ENV=test xargs ./node_modules/.bin/mocha --reporter=progress --bail

# Kill test server
kill $NODE_PID
