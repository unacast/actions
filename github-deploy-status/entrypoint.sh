#!/bin/sh

DEPLOY_EVENT_PATH=${DEPLOY_EVENT_PATH:-'/github/workflow/deploy-status.json'}

# This must be started from a deploy event
if [ "$GITHUB_EVENT_NAME" != "deployment" ]; then
    echo "GITHUB_EVENT_NAME can only be deployment, was: '${GITHUB_EVENT_NAME}'"
    exit 2
fi



if [ ! -f "$DEPLOY_EVENT_PATH" ]; then
    echo "Could not find result file: ${DEPLOY_EVENT_PATH}"
    exit 2
fi


DEPLOYMENT_ID=$(jq '.deployment.id' "${GITHUB_EVENT_PATH}")

source $DEPLOY_EVENT_PATH
echo "Updating status for ${DEPLOYMENT_ID} to ${state}"

jq '{description: .deployment.description, environment: .deployment.environment}' "${GITHUB_EVENT_PATH}" > /tmp/event-info.json
jq -s -R '[ split("\n")[] | select(length > 0) | split("=") | {(.[0]|tostring):.[1]} ] | add' "$DEPLOY_EVENT_PATH"> /tmp/deploy-result.json
jq -s '.[0] * .[1]' /tmp/event-info.json /tmp/deploy-result.json > /tmp/deploy-event.json

cat /tmp/deploy-event.json
curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" --data-binary @/tmp/data-event.json https://api.github.com/repos/unacast/Action-Force/deployments/"${DEPLOYMENT_ID}"/statuses