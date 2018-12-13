#!/bin/sh

DEPLOYMENT_ID=`jq '.deployment.id' ${GITHUB_EVENT_PATH}`

echo "Trying to deploy ${DEPLOYMENT_ID}"

curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" --data "{\"state\":\"${1}\", \"description\": \"The deploy was a ${1}\"}" https://api.github.com/repos/unacast/Action-Force/deployments/${DEPLOYMENT_ID}/statuses