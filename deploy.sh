#!/bin/sh

if [ -z "$1" ]
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi
git subtree push --prefix $1 origin gh-pages
echo "'$1' folder reployed to GitHub Pages."