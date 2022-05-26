#!/bin/bash
echo "BRANCH:"
git rev-parse --abbrev-ref HEAD
echo
echo "LOG:"
git log --pretty=format:"%h - %an (%ae): %s" --shortstat -10
echo
echo "REF:"
git show-ref --head

