# CircleCi API Wrapper

A wrapper for [CircleCi API](https://circleci.com/docs/api/v1-reference/) written in TypeScript.

[![CircleCI branch](https://img.shields.io/circleci/project/github/worldturtlemedia/circleci-api/master.svg?label=release%20build)](https://circleci.com/gh/worldturtlemedia/circleci-api/tree/master) [![CircleCI (all branches)](https://img.shields.io/circleci/project/github/worldturtlemedia/circleci-api.svg)](https://circleci.com/gh/worldturtlemedia/circleci-api) [![Coverage Status](https://coveralls.io/repos/github/worldturtlemedia/circleci-api/badge.svg?branch=master)](https://coveralls.io/github/worldturtlemedia/circleci-api?branch=master)

[![npm version](https://badge.fury.io/js/circleci-api.svg)](https://badge.fury.io/js/circleci-api) ![GitHub](https://img.shields.io/github/license/worldturtlemedia/circleci-api.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/circleci-api.svg)

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![dependencies Status](https://david-dm.org/worldturtlemedia/circleci-api/status.svg)](https://david-dm.org/worldturtlemedia/circleci-api) [![devDependencies Status](https://david-dm.org/worldturtlemedia/circleci-api/dev-status.svg)](https://david-dm.org/worldturtlemedia/circleci-api?type=dev)

Usable in node and the browser. If used in a TypeScript project, you will get types, and auto-complete for all of the api responses. You will no longer need to tab back and fourth to the API documentation. Will work in Node or the browser!

I recommend using this library if you are writing a tool or website in TypeScript. I have created definitions for each of the CircleCi endpoints. There may still be some errors, but I am open to contributions on making them better.

If there are any features you would like, please feel free to open up an issue.

## Notes

### Types

I did my best to correctly add types for all of the supported endpoints. However if you notice an incorrect payload type, or some missing properties, **please** open up an issue, or submit a pull request.

### CircleCI API v2

CircleCI is going to be rolling out a new version of their api (see [here](https://github.com/CircleCI-Public/api-preview-docs)). Currently this library **does not** support v2, but I will update it in the future, see #228 for updates.

## Migrating from v3 to v4

There have been some breaking changes, please see [MIGRATING.md](https://github.com/worldturtlemedia/circleci-api/blob/master/MIGRATING.md) for more info.

## Installation

Add using yarn or npm

```bash
yarn add circleci-api

## or

npm install circleci-api
```

## Usage

Get your API token from [CircleCi](https://circleci.com/account/api)

There are two ways to use this library.

## 1. CircleCi class

Get instance of the factory.

```typescript
// Module
import { CircleCI, GitType, CircleCIOptions } from "circleci-api";

// Configure the factory with some defaults
const options: CircleCIOptions = {
  // Required for all requests
  token: "", // Set your CircleCi API token

  // Optional
  // Anything set here can be overriden when making the request

  // Git information is required for project/build/etc endpoints
  vcs: {
    type: GitType.GITHUB, // default: github
    owner: "worldturtlemedia",
    repo: "circleci-api"
  }

  // Optional query params for requests
  options: {
    branch: "master", // default: master
    filter: "completed"
  }
}

// Create the api object
const api = new CircleCI(options)

// Use the api

/**
 * Grab the latest artifacts from a successful build on a certain branch
 * @param [branch="master"] - Artifacts for certain branch
 * @return List of successfully built artifact objects
 */
export async function getLatestArtifacts(branch: string = "master"): Promise<Artifact[]> {
  try {
    // Will use the repo defined in the options above
    const result: Aritfact[] = await api.latestArtifacts({ branch, filter: "successful" })
    console.log(`Found ${result.length} artifacts`)
    return result
  } catch (error) {
    console.log("No build artifacts found")
  }

  return []
}

getLatestArtifacts("develop")
  .then(artifacts => {
    artifacts
      .forEach(({ path, url }: Artifact) => console.log(`${path} -> ${url}`))
  })

// Or override settings set above
api
  .latestArtifacts(
    { branch: "develop" },
    {
      vcs: { repo: "awesome-repo" },
      options: { filter: "successful" }
    }
  )
  .then((artifacts: Artifact[]) => console.log(`Found ${artifacts.length} artifacts`))
  .catch(error => console.error(error))
```

## 2. Manually

The individual functions can also be imported if you only need one or two. To help with tree-shaking.

```typescript
import { getMe, getLatestArtifacts } from "circleci-api";

const CIRCLECI_TOKEN: string = "circle-ci-token";

getMe(CIRCLECI_TOKEN)
  .then(me => console.log("token is valid"))
  .catch(error => console.error("invalid token"));

getLatestArtifacts(CIRCLECI_TOKEN, {
  vcs: {
    owner: "billyBob",
    repo: "super-cool-app"
  },
  options: {
    filter: "failed",
    branch: "feature-smith2"
  }
})
  .then(result => console.log(`Found ${result.length} artifacts`))
  .catch(error => console.error(error));
```

## Self-hosted CircleCI

You can supply a custom `baseURL` to override the default `https://circleci.com/api/v1.1`.

```typescript
// Using the CircleCi class
new CircleCI({
  token: "my-token",
  vcs: { owner: "worldturtlemedia", repo = "circleci-api" },
  circleHost: "https://my-selfhosted-circleci.com/"
}).getLatestArtifacts()

// Using the standalone functions
getLatestArtifacts("my-token", {
  ...
  circleHost: "https://my-selfhosted-circleci.com/"
})
```

All of the standalone functions support a custom `circleHost` property. Using the `CircleCI` class you _must_ specify it in the constructor.

## Demo

There are three similar demos are available in the `demo` folder.

**Note:** I recommend [VSCode](https://code.visualstudio.com/) for viewing and editing the examples. It will give you great intellisense about the library.

For the TypeScript & JavaScript follow the steps below:

```bash
# Step 1 - Change into demo folder and install dependencies
cd demo
yarn

# Javascript example:
node ./index.js

# Typescript example:
npx ts-node --project ../tsconfig.base.json ./index.ts

# To view Browser example, first build project
yarn build

# Then open `index.html` in your browser
```

## Supported endpoints

Using factory:

Optional properties:

```typescript
export interface CircleRequest {
  token?: string;
  vcs?: GitInfo;
  options?: Options;
}
```

Any function with an _optional_ paramater of `CircleRequest` can override any of the values you assigned when using the `circleci()` factory.

| Name                  |          Required           |              Optional               |                     Returns |
| --------------------- | :-------------------------: | :---------------------------------: | --------------------------: |
| `me()`                |            none             |                none                 |                        `Me` |
| `projects()`          |            none             |           `CircleRequest`           |                 `Project[]` |
| `followProject()`     |     `{ vcs: GitInfo }`      |                none                 |           `FollowNewResult` |
| `recentBuilds()`      |            none             | `{ limit: number, offset: number }` |            `BuildSummary[]` |
| `builds()`            |            none             | `{ limit: number, offset: number }` |            `BuildSummary[]` |
| `buildsFor()`         | `branch: string = "master"` | `{ limit: number, offset: number }` |            `BuildSummary[]` |
| `build()`             |    `buildNumber: number`    |           `CircleRequest`           |            `BuildWithSteps` |
| `artifacts()`         |    `buildNumber: number`    |           `CircleRequest`           |                `Artifact[]` |
| `latestArtifacts()`   |            none             |           `CircleRequest`           |                `Artifact[]` |
| `retry()`             |    `buildNumber: number`    |           `CircleRequest`           |              `BuildSummary` |
| `cancel()`            |    `buildNumber: number`    |           `CircleRequest`           |              `BuildSummary` |
| `triggerBuild()`      |            none             |           `CircleRequest`           |                     `Build` |
| `triggerBuildFor()`   | `branch: string = "master"` |           `CircleRequest`           |                     `Build` |
| `clearCache()`        |            none             |           `CircleRequest`           |        `ClearCacheResponse` |
| `listEnvVars()`       |            none             |           `CircleRequest`           |             `EnvVariable[]` |
| `addEnvVar()`         |   `variable: EnvVariable`   |           `CircleRequest`           |               `EnvVariable` |
| `getEnvVar()`         |      `envName: string`      |           `CircleRequest`           |               `EnvVariable` |
| `deleteEnvVar()`      |      `envName: string`      |           `CircleRequest`           |           `MessageResponse` |
| `checkoutKeys()`      |            none             |           `CircleRequest`           |       `CheckoutKeyResponse` |
| `createCheckoutKey()` |    `type: CheckoutType`     |           `CircleRequest`           |       `CheckoutKeyResponse` |
| `checkoutKey()`       |    `fingerprint: string`    |           `CircleRequest`           |       `CheckoutKeyResponse` |
| `deleteCheckoutKey()` |    `fingerprint: string`    |           `CircleRequest`           | `DeleteCheckoutKeyResponse` |
| `getTestMetadata()`   |    `buildNumber: number`    |           `CircleRequest`           |      `TestMetadataResponse` |
| `addSSHKey()`         |        `key: SSHKey`        |           `CircleRequest`           |                        none |
| `addHerokuKey()`      |      `key: HerokuKey`       |           `CircleRequest`           |                        none |

## Missing endpoint

The last remaining endpoint probably won't be added unless there is demand.

| Name              |                              Link                               |
| ----------------- | :-------------------------------------------------------------: |
| Add user to build | [ref](https://circleci.com/docs/api/v1-reference/#add-user-ssh) |

## Contributing

<<<<<<< HEAD
This library uses boilerplate [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter). So see that repo for more information about the setup, and layout of the files.

This library uses [commitizen](https://github.com/commitizen/cz-cli) for commit messages, so be sure to use `yarn commit` when commiting your changes,

1. Fork this repo
1. Add your awesome feature
1. If adding functionality, add tests for your feature
1. Commit using [commitizen](https://github.com/commitizen/cz-cli): `yarn commit`
1. Submit a PR

Example:

```bash
# Setup
git clone https://github.com/worldturtlemedia/circleci-api
cd circleci-api

yarn

# Make some changes

...

# Run tests then build
yarn test:prod
yarn build

# Use commitzen to commit
yarn commit

# If all is good, open a PR!
```

=======
See [CONTRIBUTING](https://github.com/worldturtlemedia/circlci-api/blob/master/CONTRIBUTING.md).

> > > > > > > develop

## License

```text
MIT License

Copyright (c) 2019 WorldTurtleMedia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
