const core = require("@actions/core");

/**
 * Get Inputs
 * @typedef {object} Inputs
 * @property {string|undefined} globs
 * @property {string|undefined} files
 * @property {string|undefined} names
 * @property {boolean} overwrite
 * @property {string|undefined} id
 * @property {string|undefined} tag
 * @property {boolean} latest
 * @property {boolean} summary
 * @property {string} token
 * @return {Inputs}
 */
function getInputs() {
    return {
        globs: core.getInput('globs'),
        files: core.getInput('files'),
        names: core.getInput('names'),
        overwrite: core.getBooleanInput('overwrite'),
        id: core.getInput('id'),
        tag: core.getInput('tag'),
        latest: core.getBooleanInput('latest'),
        summary: core.getBooleanInput('summary'),
        token: core.getInput('token', { required: true }),
    }
}
