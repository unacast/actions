import { CircleCI, GitType, CircleCIOptions } from "circleci-api";
import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fetch from 'node-fetch';
import * as fs from 'fs';

const getCircleToken = () => {
    return process.env.CIRCLE_TOKEN || '';
}

const initCircleApi = circleToken => {
    const context = github.context;
    core.debug(JSON.stringify(context));
    const options: CircleCIOptions = {
        token: circleToken,
        vcs: {
            type: GitType.GITHUB,
            owner: context.repo.owner,
            repo: context.repo.repo
        },
        options: {
            branch: context.payload.deployment.ref,
            filter: "successful"
        }
    }
    return new CircleCI(options);
}

async function getArtifactMeta(circleApi: CircleCI) {
    return circleApi.latestArtifacts();
}

const getFileNameFromUrl = url => {
    const urlWithoutQuery = url.split("?")[0];
    const urlParts = urlWithoutQuery.split("/");
    return urlParts[urlParts.length - 1];
}

async function downloadArtifact(url, outputFolder, circleToken) {
    const fileName = getFileNameFromUrl(url);
    const response = await fetch(`${url}?circle-token=${circleToken}`);
    const destination = fs.createWriteStream(`${outputFolder}${fileName}`);
    console.log("==> Download response: ", response);
    await response.body.pipe(destination);
}

const getOutputFolder = () => {
    const outputFolder = core.getInput("outputFolder") || "./";
    if(!outputFolder.endsWith("/")) {
        return outputFolder + "/";
    }
    return outputFolder;
};

async function run() {
    try {
        console.log("==> Getting circle token");
        const circleToken = getCircleToken();
        console.log("==> Initialize circle api");
        const circleApi = initCircleApi(circleToken);
        console.log("==> Getting output folder");
        const outputFolder = getOutputFolder();
        console.log("==> Getting artifact meta");
        const artifactMeta = await getArtifactMeta(circleApi);
        console.log("==> Artifact meta: ", artifactMeta);
        console.log("==> Downloading artifact");
        await downloadArtifact(artifactMeta[0].url, outputFolder, circleToken);
        const files = fs.readdirSync(outputFolder);
        console.log("==> Downloaded files: ", files);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
