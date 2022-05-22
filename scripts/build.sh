#!/bin/sh

set -x 
echo "here"
ls -l /app
ls -l /app/pages
ls -l /app/lib
ls -l /app/content
cd /app && npm install

