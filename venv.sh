#!/usr/bin/env bash

# Setup venv
# TODO: Ensure python 3.10
[ -d "./venv" ] && python3 -m venv venv

# Activate venv
./venv/bin/activate