#!/bin/bash
curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/
sudo apt update
sudo apt install elasticsearch
sudo systemctl start elasticsearch
git clone git@github.com:multicalor/express
npm install
npm run dev
