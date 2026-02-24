#!/bin/sh
set -e

if [ "$NODE_ENV" = "production" ]; then
    echo "Starting Production Server..."
    exec node src/server.js
else
    echo "Starting Development Server with Nodemon..."
    # We use exec so nodemon handles OS signals (like SIGTERM)
    exec nodemon ./src/server.js
fi