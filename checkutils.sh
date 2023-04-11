#!/bin/bash

if command -v node > /dev/null && command -v npm > /dev/null; then
    echo "Node.js and npm are installed"
else
    echo "Node.js and/or npm are not installed, would you like to install them? (y/n)"
    read -r answer
    if [ "$answer" = "y" ]; then
        echo "Installing Node.js and npm..."
        sudo apt-get install nodejs npm
    else
        echo "Node.js and npm are required to run this script"
        exit 1
    fi
fi