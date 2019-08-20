# circleci-download

Action to help you download artifacts from circleci that you might need in your deploy.

## Usage

First you need to get your `CIRCLE_TOKEN` from https://circleci.com and it to your github secrets. The action will use the github context to figure out where the artifact is.

```
- name: Download CircleCI Artifact
  uses: unacast/actions/circleci-download@v0.9.0
  env:
    CIRCLE_TOKEN: ${{ secrets.CIRCLE_TOKEN }}
  with:
    outputFolder: "./artifacts/"
```