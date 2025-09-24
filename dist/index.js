/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
const core = require('@actions/core')
const github = require('@actions/github')
const glob = require('@actions/glob')
const fs = require('fs')
const path = require('path')

const Api = require('./api')

;(async () => {
    try {
        core.info(`🏳️ Starting Upload Release Action`)

        // Debug
        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

        // Inputs
        const inputs = getInputs()
        core.startGroup('Inputs')
        console.log(inputs)
        core.endGroup() // Inputs

        // Files
        const files = []
        if (inputs.globs) {
            console.log('inputs.globs:', inputs.globs)
            const globber = await glob.create(inputs.globs, {
                matchDirectories: false,
            })
            const globs = await globber.glob()
            console.log('globs:', globs)
            files.push(...globs)
        }
        if (inputs.files) {
            console.log('inputs.files:', inputs.files)
            files.push(...inputs.files.split('\n'))
        }
        console.log('files.length:', files.length)
        console.log('files:', files)
        if (!files?.length) return core.setFailed('No Files to Process...')

        // Names
        console.log('inputs.names:', inputs.names)
        const names = inputs.names ? inputs.names.split('\n') : []
        console.log('names.length:', names.length)
        console.log('names:', names)
        if (names.length && names.length !== files.length) {
            return core.setFailed('File and Names Length Mismatch...')
        }

        // Variables
        console.log('context.repo:', github.context.repo)
        console.log('context.ref:', github.context.ref)
        console.log('context.payload.release?.id:', github.context.payload.release?.id)
        const api = new Api(inputs.token)

        // Release
        const release = await getRelease(inputs, api)
        console.log('release?.id:', release?.id)
        if (!release) return core.setFailed('No Release to Process...')
        console.log('release.html_url:', release.html_url)
        console.log('release.assets.length:', release.assets.length)

        const results = []

        // Processing
        core.startGroup('Processing')
        for (const file of files) {
            let name
            if (names.length) {
                const i = files.indexOf(file)
                name = names[i]
            } else {
                name = path.basename(file)
            }
            core.info(`-- Processing -- name: ${name} - file: ${file}`)
            const asset = release.assets.find((obj) => obj.name === name)
            console.log(`asset.id:`, asset?.id)
            if (asset) {
                if (inputs.overwrite) {
                    console.log(`! ! ASSET EXIST ! ! DELETING:`, name)
                    await api.deleteReleaseAsset(asset.id)
                } else {
                    console.log(`- - ASSET EXIST - - SKIPPING:`, name)
                    continue
                }
            }
            console.log(`+ + UPLOADING ASSET + + name:`, name)
            const data = fs.readFileSync(file)
            const result = await api.uploadReleaseAsset(release.id, name, data)
            console.log(`result.id:`, result.id)
            results.push(result)
        }
        core.endGroup() // Processing

        console.log(`results.length:`, results.length)
        if (!results.length) core.warning('No Assets Uploaded...')

        // Outputs
        core.info('📩 Setting Outputs')
        core.setOutput('assets', JSON.stringify(results))

        // Summary
        if (inputs.summary) {
            core.info('📝 Writing Job Summary')
            try {
                await addSummary(inputs, files, results)
            } catch (e) {
                console.log(e)
                core.error(`Error writing Job Summary ${e.message}`)
            }
        }

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Get Release
 * @param {Inputs} inputs
 * @param {Api} api
 * @return {Promise<InstanceType<typeof github.GitHub>|Undefined>}
 */
async function getRelease(inputs, api) {
    if (inputs.id) {
        core.info(`Get Release by Input ID: \u001b[32m${inputs.id}`)
        return await api.getRelease(inputs.id)
    } else if (inputs.tag) {
        core.info(`Get Release by Input TAG: \u001b[32m${inputs.tag}`)
        return await api.getReleaseByTag(inputs.tag)
    } else if (inputs.latest) {
        core.info(`Get Latest Release: \u001b[32m${inputs.latest}`)
        return await api.getLatestRelease()
    } else if (github.context.payload.release?.id) {
        core.info(`Get Release by ID: \u001b[32m${github.context.payload.release.id}`)
        return await api.getRelease(github.context.payload.release?.id)
    } else {
        const tag = github.context.ref.replace('refs/tags/', '')
        core.info(`Get Release by TAG: \u001b[32m${tag}`)
        return await api.getReleaseByTag(tag)
    }
}

/**
 * Add Summary
 * @param {Inputs} inputs
 * @param {String[]} files
 * @param {Object[]} results
 * @return {Promise<void>}
 */
async function addSummary(inputs, files, results) {
    core.summary.addRaw('## Upload Release Action\n')

    core.summary.addRaw('<details><summary>Files</summary>')
    core.summary.addCodeBlock(files.join('\n'), 'text')
    core.summary.addRaw('</details>\n')

    core.summary.addRaw('<details><summary>Results</summary>')
    core.summary.addCodeBlock(JSON.stringify(results, null, 2), 'json')
    core.summary.addRaw('</details>\n')

    delete inputs.token
    const yaml = Object.entries(inputs)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join('\n')
    core.summary.addRaw('<details><summary>Inputs</summary>')
    core.summary.addCodeBlock(yaml, 'yaml')
    core.summary.addRaw('</details>\n')

    const text = 'View Documentation, Report Issues or Request Features'
    const link = 'https://github.com/cssnr/upload-release-action'
    core.summary.addRaw(`\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`)
    await core.summary.write()
}

/**
 * Get Inputs
 * @typedef {Object} Inputs
 * @property {String|Undefined} globs
 * @property {String|Undefined} files
 * @property {String|Undefined} names
 * @property {Boolean} overwrite
 * @property {String|Undefined} id
 * @property {String|Undefined} tag
 * @property {Boolean} latest
 * @property {Boolean} summary
 * @property {String} token
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

