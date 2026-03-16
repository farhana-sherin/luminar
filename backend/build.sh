#!/usr/bin/env bash

# Install backend dependencies
pip install -r requirements.txt

# Collect static files (includes the built React app)
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

