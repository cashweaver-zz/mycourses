#!/usr/bin/env bash
# Run all tests

find . -path ./node_modules -prune -o -type f -path '*.test.js' | grep -ve '^\\.\\/node_modules$' | xargs ./node_modules/.bin/mocha --reporter=progress --bail
