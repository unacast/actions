"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const rest_1 = __importDefault(require("@octokit/rest"));
const getPayload = () => {
    const state = core.getInput("state");
    return { state };
};
const getOctoClient = githubToken => {
    return new rest_1.default({
        auth: githubToken
    });
};
const getGithubToken = () => {
    return process.env.GITHUB_TOKEN || '';
};
const updateStatus = (octoClient, payload) => __awaiter(this, void 0, void 0, function* () {
    const context = github.context;
    const params = {
        deployment_id: context.payload.deployment.id,
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: payload.state
    };
    console.log("==> Updating checks status: ", params);
    yield octoClient.repos.createDeploymentStatus(params);
    console.log("==> Update done");
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = getPayload();
            const githubToken = getGithubToken();
            const octoClient = getOctoClient(githubToken);
            yield updateStatus(octoClient, payload);
            console.log("==> Updating deployment status");
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
