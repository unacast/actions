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
Object.defineProperty(exports, "__esModule", { value: true });
const circleci_api_1 = require("circleci-api");
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const fetch = __importStar(require("node-fetch"));
const fs = __importStar(require("fs"));
const getCircleToken = () => {
    return process.env.CIRCLE_TOKEN || '';
};
const initCircleApi = circleToken => {
    const context = github.context;
    core.debug(JSON.stringify(context));
    const options = {
        token: circleToken,
        vcs: {
            type: circleci_api_1.GitType.GITHUB,
            owner: context.repo.owner,
            repo: context.repo.repo
        },
        options: {
            branch: context.payload.deployment.ref,
            filter: "successful"
        }
    };
    return new circleci_api_1.CircleCI(options);
};
function getArtifactMeta(circleApi) {
    return __awaiter(this, void 0, void 0, function* () {
        return circleApi.latestArtifacts();
    });
}
const getFileNameFromUrl = url => {
    const urlWithoutQuery = url.split("?")[0];
    const urlParts = urlWithoutQuery.split("/");
    return urlParts[urlParts.length - 1];
};
function downloadArtifact(url, outputFolder, circleToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = getFileNameFromUrl(url);
        const response = yield fetch(`${url}?circle-token=${circleToken}`);
        const destination = fs.createWriteStream(`${outputFolder}${fileName}`);
        console.log("==> Download response: ", response);
        yield response.body.pipe(destination);
    });
}
const getOutputFolder = () => {
    const outputFolder = core.getInput("outputFolder") || "./";
    if (!outputFolder.endsWith("/")) {
        return outputFolder + "/";
    }
    return outputFolder;
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("==> Getting circle token");
            const circleToken = getCircleToken();
            console.log("==> Initialize circle api");
            const circleApi = initCircleApi(circleToken);
            console.log("==> Getting output folder");
            const outputFolder = getOutputFolder();
            console.log("==> Getting artifact meta");
            const artifactMeta = yield getArtifactMeta(circleApi);
            console.log("==> Artifact meta: ", artifactMeta);
            console.log("==> Downloading artifact");
            yield downloadArtifact(artifactMeta[0].url, outputFolder, circleToken);
            const files = fs.readdirSync(outputFolder);
            console.log("==> Downloaded files: ", files);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
