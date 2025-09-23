const github = require('@actions/github')

class Api {
    /**
     * GitHub Api
     * @param {String} token
     */
    constructor(token) {
        this.octokit = github.getOctokit(token)
    }

    /**
     * Get Release
     * @param {string} release_id
     * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
     */
    async getRelease(release_id) {
        const release = await this.octokit.rest.repos.getRelease({
            ...github.context.repo,
            release_id,
        })
        return release.data
    }

    /**
     * Get Release by Tag
     * @param {string} tag
     * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
     */
    async getReleaseByTag(tag) {
        const release = await this.octokit.rest.repos.getReleaseByTag({
            ...github.context.repo,
            tag,
        })
        return release.data
    }

    /**
     * Get Latest Release
     * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
     */
    async getLatestRelease() {
        const release = await this.octokit.rest.repos.getLatestRelease({
            ...github.context.repo,
        })
        return release.data
    }

    /**
     * Upload Release Asset
     * @param {String} release_id
     * @param {String} name
     * @param {Buffer} data
     * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
     */
    async uploadReleaseAsset(release_id, name, data) {
        const release = await this.octokit.rest.repos.uploadReleaseAsset({
            ...github.context.repo,
            release_id,
            name,
            data,
        })
        return release.data
    }

    /**
     * Delete Release Asset
     * @param {String} asset_id
     * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
     */
    async deleteReleaseAsset(asset_id) {
        const release = await this.octokit.rest.repos.deleteReleaseAsset({
            ...github.context.repo,
            asset_id,
        })
        return release.data
    }
}

module.exports = Api
