#!/bin/zsh

this_pwd="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo $this_pwd

echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

echo "Installing latest node"
nvm install --lts

echo "Installing angular"
npm install -g @angular/cli

echo "Installing other dependencies"
npm install