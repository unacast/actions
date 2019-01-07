# github-deploy

This actions adds functions for interacting with Github Deployment API and a Workflow instantiated from a deployment event

## Usage

The action installs functions in `${HOME}/bin`, for which you can use in later `action`s which does the actual deploy. An example workflow might look this:  

```
workflow "On deploy" {
  on = "deployment"
  resolves = ["Deploy"]
}

action "Add deployscripts" {
  uses = "unacast/actions/github-deploy@master"
}

action "Deploy" {
  uses = "docker://alpine"
  secrets = ["GITHUB_TOKEN"]
  args = "./scripts/deploy.sh"
  needs = ["Add deployscripts"]
}
```

Furthermore, in the "`deploy.sh`" of your choice, you can utilize the following script commands from ${HOME}/bin:

### deployment-get-environment
This gets the submitted environment from within ${GITHUB_EVENT_PATH}. For example `production`

### deployment-get-id
This gets the created deployment-id from within ${GITHUB_EVENT_PATH}. Usually you won't have to deal with this, it is for most purposes used by `deployment-set-status`

### deployment-create-status
This function updates the Deployment API with the result of your deploy. For example `${HOME}/bin/deployment-create-status success` creates a success-status on the deployment event.

`success` can be replaced with the other allowed statuses (`error`, `failure`, `inactive`, `in_progress`, `queued` or `pending`) from the [Create a deployment status
 endpoint](https://developer.github.com/v3/repos/deployments/#create-a-deployment-status)   

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE.MIT) and [Apache 2](LICENSE.APACHE2).

It uses the excellent [JSON.sh](https://github.com/dominictarr/JSON.sh) for json parsing. 