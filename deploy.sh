#!/bin/bash

npm run build
cd build
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push --force "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1
