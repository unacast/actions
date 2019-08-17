import { CircleRequest, CircleCIOptions, GitRequiredRequest, FilterRequestOptions, RequestOptions, ArtifactsRequestOptions, Me, Project, FollowNewResult, BuildSummary, BuildWithSteps, Artifact, Build, ListEnvVariablesResponse, EnvVariable, EnvVariableResponse, DeleteEnvVarResponse, ClearCacheResponse, CheckoutKeyResponse, CheckoutType, DeleteCheckoutKeyResponse, TestMetadataResponse, SSHKey, AddSSHKeyResponse, HerokuKey, AddHerokuResponse } from "./types";
/**
 * CircleCI API Wrapper
 * A wrapper for all of the circleci api calls.
 * Most values can be overridden by individual methods
 *
 */
export declare class CircleCI {
    private token;
    private vcs;
    private options;
    private circleOptions;
    /**
     *
     * @param token CircleCI API token
     * @param vcs Default git information
     * @param vcs.type Git project type ex "github" | "bitbucket"
     * @param vcs.owner Owner of the git repository
     * @param vcs.repo Git repository name
     * @param options Additional query parameters
     * @returns {CircleCI} wrapper for CircleCI
     */
    constructor({ token, vcs: { type, owner, repo }, options, circleHost }: CircleCIOptions);
    /**
     * Get the options used to create this instance
     */
    defaults(): CircleRequest;
    /**
     * Adds the CircleCI token to a url
     * @param url URL to modify
     */
    addToken(url: string): string;
    /**
     * Get the currently authenticated user
     */
    me(): Promise<Me>;
    /**
     * Get a list of all the projects the user follows
     */
    projects(): Promise<Project[]>;
    /**
     * Follow a new project. CircleCI will then monitor the project for automatic building of commits.
     * @param opts Project information
     */
    followProject(opts: GitRequiredRequest): Promise<FollowNewResult>;
    /**
     * Get all recent builds for CircleCI user
     * @param reqOptions Optional, Request options
     * @param reqOptions.options.limit Optional, Limit the number of builds returned, max=100
     * @param reqOptions.options.offset Optional, builds starting from this offset
     * @param opts Optional settings
     */
    recentBuilds(reqOptions?: RequestOptions, opts?: CircleRequest): Promise<BuildSummary[]>;
    /**
     * Get recent build summaries for a project
     * @param reqOptions Optional, request options for filtering, limiting, etc
     * @param reqOptions.limit Optional, the number of builds to return. Maximum 100, defaults to 30.
     * @param reqOptions.offset Optional, builds starting from this offset, defaults to 0.
     * @param reqOptions.filter Optional, restricts which builds are returned. Set to "completed", "successful", "failed", "running"
     * @param opts Optional settings
     */
    builds(reqOptions?: FilterRequestOptions, opts?: CircleRequest): Promise<BuildSummary[]>;
    /**
     * Get recent builds for a project and branch
     * @param branch Target branch to fetch builds for
     * @param reqOptions Optional, request options for filtering, limiting, etc
     * @param reqOptions.limit Optional, the number of builds to return. Maximum 100, defaults to 30.
     * @param reqOptions.offset Optional, builds starting from this offset, defaults to 0.
     * @param reqOptions.filter Optional, restricts which builds are returned. Set to "completed", "successful", "failed", "running"
     * @param opts Optional settings
     */
    buildsFor(branch?: string, reqOptions?: FilterRequestOptions, opts?: CircleRequest): Promise<BuildSummary[]>;
    /**
     * Get full build details for a single build
     * @param buildNumber Target build number
     * @param opts Optional settings
     */
    build(buildNumber: number, opts?: GitRequiredRequest): Promise<BuildWithSteps>;
    /**
     * Get artifacts for single project build
     * @param buildNumber Target build number
     * @param opts Optional settings to override class defaults
     */
    artifacts(buildNumber: number, opts?: CircleRequest): Promise<Artifact[]>;
    /**
     * Get the latest build artifacts for a project
     * Pass a branch in the options to target a specific branch
     * @param reqOptions Optional, request options for filtering and specifying a branch
     * @param reqOptions.branch The branch you would like to look in for the latest build. Returns artifacts for latest build in entire project if omitted.
     * @param reqOptions.filter Restricts which builds are returned. Set to "completed", "successful", "failed", "running"
     * @param opts Optional settings
     */
    latestArtifacts(reqOptions?: ArtifactsRequestOptions, opts?: CircleRequest): Promise<Artifact[]>;
    /**
     * Retries the build, returns a summary of the new build.
     * @param build Target build number
     * @param opts Optional settings
     */
    retry(build: number, opts?: CircleRequest): Promise<BuildSummary>;
    /**
     * Cancels the build, returns a summary of the new build.
     * @param build Target build number
     * @param opts Optional settings
     */
    cancel(build: number, opts?: CircleRequest): Promise<BuildSummary>;
    /**
     * Triggers a new build, returns a summary of the build.
     * @see https://circleci.com/docs/api/v1-reference/#new-build
     * @param opts Optional settings
     * @param opts.options.newBuildOptions Additional build settings
     */
    triggerBuild(opts?: CircleRequest): Promise<Build>;
    /**
     * Triggers a new build for a specific branch.
     * @see https://circleci.com/docs/api/v1-reference/#new-build-branch
     * @param branch Optional, branch to target, defaults to 'master'
     * @param opts Optional settings
     * @param opts.options.newBuildOptions Additional build settings
     */
    triggerBuildFor(branch?: string, opts?: CircleRequest): Promise<Build>;
    /**
     * Clear the cache for the project
     * @see clearCache for implementation
     * @see https://circleci.com/docs/api/v1-reference/#clear-cache
     * @param opts Optional settings
     */
    clearCache(opts?: CircleRequest): Promise<ClearCacheResponse>;
    /**
     * List all of a projects environment variables, values will not be fully shown
     * @see getEnvVar for accessing full value
     * @see listEnv
     * @see https://circleci.com/docs/api/v1-reference/#list-environment-variables
     * @param opts Optional settings
     */
    listEnvVars(opts?: CircleRequest): Promise<ListEnvVariablesResponse>;
    /**
     * Add environment variable to project
     * @see addEnv
     * @see https://circleci.com/docs/api/v1-reference/#add-environment-variable
     * @param variable Environment variable to add to project
     * @param opts Optional settings
     */
    addEnvVar(variable: EnvVariable, opts?: CircleRequest): Promise<EnvVariableResponse>;
    /**
     * Get the hidden value of an environment variable
     * @see getEnv
     * @see https://circleci.com/docs/api/v1-reference/#get-environment-variable
     * @param envName Name of the variable to fetch
     * @param opts Optional settings
     */
    getEnvVar(envName: string, opts?: CircleRequest): Promise<EnvVariableResponse>;
    /**
     * Delete an environment variable
     * @see deleteEnv
     * @see https://circleci.com/docs/api/v1-reference/#delete-environment-variable
     * @param envName Name of the variable to delete
     * @param opts Optional settings
     */
    deleteEnvVar(envName: string, opts?: CircleRequest): Promise<DeleteEnvVarResponse>;
    /**
     * List all the checkout keys for the project
     * @see getCheckoutKeys
     * @see https://circleci.com/docs/api/v1-reference/#list-checkout-keys
     * @param opts Optional request settings
     */
    listCheckoutKeys(opts?: CircleRequest): Promise<CheckoutKeyResponse>;
    /**
     * Create a new checkout key
     * @see createCheckoutKey
     * @see https://circleci.com/docs/api/v1-reference/#new-checkout-key
     * @param type Type of checkout key to create
     * @param opts Optional request settings
     */
    addCheckoutKey(type: CheckoutType, opts?: CircleRequest): Promise<CheckoutKeyResponse>;
    /**
     * Get a single checkout key from it's fingerprint
     * @see getCheckoutKey
     * @see https://circleci.com/docs/api/v1-reference/#get-checkout-key
     * @param fingerprint Fingerprint of the key to get
     * @param opts Optional request settings
     */
    getCheckoutKey(fingerprint: string, opts?: CircleRequest): Promise<CheckoutKeyResponse>;
    /**
     * Delete a checkout key
     * @see deleteCheckoutKey
     * @see https://circleci.com/docs/api/v1-reference/#delete-checkout-key
     * @param fingerprint Fingerprint of the key to delete
     * @param opts Optional request settings
     */
    deleteCheckoutKey(fingerprint: string, opts?: CircleRequest): Promise<DeleteCheckoutKeyResponse>;
    /**
     * Get test metadata for a build
     * @see getTestMetadata
     * @see https://circleci.com/docs/api/v1-reference/#test-metadata
     * @param buildNumber Build number to get metadata for
     * @param opts Optional request settings
     */
    getTestMetadata(buildNumber: number, opts?: CircleRequest): Promise<TestMetadataResponse>;
    /**
     * Creates an ssh key that will be used to access the external system identified by
     * the hostname parameter for SSH key-based authentication.
     * @see https://circleci.com/docs/api/v1-reference/#ssh-keys
     * @param token CircleCI API token
     * @param vcs Git information for project
     * @param key SSH key details to add to project
     */
    addSSHKey(key: SSHKey, opts?: CircleRequest): Promise<AddSSHKeyResponse>;
    /**
     * Adds your Heroku API key to CircleCI
     * @see https://circleci.com/docs/api/v1-reference/#ssh-keys
     * @param token CircleCI API token
     * @param key Heroku key to add to project
     */
    addHerokuKey(key: HerokuKey, opts?: CircleRequest): Promise<AddHerokuResponse>;
    /**
     * Take a request object and merge it with the class properties.
     * Passed in options always take priority over the class properties
     * @param opts Optional, request options
     * @throws If missing a token, or VCS options
     * @returns Merged request object
     */
    private createRequest;
    /**
     * Perform a build action on a build
     * @see BuildAction for list of actions
     * @see postBuildActions for implementation
     * @param request Request information
     * @param build Build number to perform action on
     * @param action Type of action to perform
     */
    private performAction;
}
