import * as core from '@actions/core';
import * as github from '@actions/github';
import Octokit, { ChecksUpdateParams, ReposCreateDeploymentStatusParams } from '@octokit/rest';

const getPayload = () => {
    const state = core.getInput("state");
    return { state };
};

const getOctoClient = githubToken => {
    return new Octokit({
        auth: githubToken
    })
};

const getGithubToken = () => {
    return process.env.GITHUB_TOKEN || '';
}

const updateStatus = async (octoClient: Octokit, payload) => {
    const context = github.context;
    const params: ReposCreateDeploymentStatusParams = {
        deployment_id: context.payload.deployment.id,
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: payload.state
    }
    console.log("==> Updating checks status: ", params);
    await octoClient.repos.createDeploymentStatus(params);
    console.log("==> Update done");
}

async function run() {
    try {
        const payload = getPayload();
        const githubToken = getGithubToken();
        const octoClient = getOctoClient(githubToken);
        await updateStatus(octoClient, payload);
        console.log("==> Updating deployment status");
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
