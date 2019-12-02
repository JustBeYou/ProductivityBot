#!/bin/sh
if [[ -f "functions/.runtimeconfig.json" ]]; then
    echo "Runtime already configured."
else
    firebase functions:config:get > functions/.runtimeconfig.json
fi
firebase serve --only hosting,functions
