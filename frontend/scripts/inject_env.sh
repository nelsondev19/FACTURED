#!/bin/bash

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
  echo "Please provide enviroment variables like <variable_name>=<value>"
  exit 1
fi

result=""

# Loop through each argument
for arg in "$@"; do
  result+="$arg\n"
done

printf $result > .env