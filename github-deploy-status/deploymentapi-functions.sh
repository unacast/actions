#!/bin/sh

# We expect JSON.sh to have been copied to /github/home/JSON.sh
update_deployment_api_status(){
    # TODO: Assert status is within success, failure etc
    echo $DIR
    #curl -X POST -H "Authorization: token ${GITHUB_TOKEN}" --data-binary @/tmp/data-event.json https://api.github.com/repos/unacast/Action-Force/deployments/"${DEPLOYMENT_ID}"/statuses
}

echo "$@"