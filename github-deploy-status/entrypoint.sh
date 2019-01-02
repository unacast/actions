#!/bin/sh

DEPLOY_EVENT_PATH='/github/workflow/deploy-status.json'

# This must be started from a deploy event
if [ "$GITHUB_EVENT_NAME" != "deployment" ]; then
    echo "GITHUB_EVENT_NAME can only be deployment, was: '${GITHUB_EVENT_NAME}'"
    exit 2
fi



STATE=$(jq -e '.state' ${DEPLOY_EVENT_PATH})
result=$?
if [ ${result} != 0 ]; then
    echo "State field is required in ${DEPLOY_EVENT_PATH}"
    exit ${result}
fi

DEPLOYMENT_ID=$(jq '.deployment.id' "${GITHUB_EVENT_PATH}")

echo "Updating status for ${DEPLOYMENT_ID} to ${STATE}"

jq '{description: .deployment.description, environment: .deployment.environment}' "${GITHUB_EVENT_PATH}" > /tmp/template.json
jq -s '.[0] * .[1]' /tmp/template.json ${DEPLOY_EVENT_PATH} > /tmp/deploy-event.json

cat /tmp/deploy-event.json
curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" --data-binary @/tmp/data-event.json https://api.github.com/repos/unacast/Action-Force/deployments/"${DEPLOYMENT_ID}"/statuses