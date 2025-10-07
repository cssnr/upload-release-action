[![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/upload-release-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/upload-release-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/upload-release-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/upload-release-action/releases)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/upload-release-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/cssnr/upload-release-action/releases/latest)
[![GitHub Dist Size](https://img.shields.io/github/size/cssnr/upload-release-action/dist%2Findex.js?logo=bookstack&logoColor=white&label=dist%20size)](https://github.com/cssnr/upload-release-action/blob/master/src)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/upload-release-action/release.yaml?logo=cachet&label=release)](https://github.com/cssnr/upload-release-action/actions/workflows/release.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/upload-release-action/lint.yaml?logo=cachet&label=lint)](https://github.com/cssnr/upload-release-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_upload-release-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=cssnr_upload-release-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/upload-release-action?logo=github&label=updated)](https://github.com/cssnr/upload-release-action/pulse)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/cssnr/upload-release-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/cssnr/upload-release-action)
[![GitHub Contributors](https://img.shields.io/github/contributors/cssnr/upload-release-action?logo=github)](https://github.com/cssnr/upload-release-action/graphs/contributors)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/upload-release-action?logo=bookstack&logoColor=white&label=repo%20size)](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/upload-release-action?logo=htmx)](https://github.com/cssnr/upload-release-action)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/upload-release-action?logo=github)](https://github.com/cssnr/upload-release-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/upload-release-action?style=flat&logo=github)](https://github.com/cssnr/upload-release-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/upload-release-action?style=flat&logo=github)](https://github.com/cssnr/upload-release-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Upload Release Action

- [Features](#Features)
- [Inputs](#Inputs)
  - [Permissions](#Permissions)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Support](#Support)
- [Contributing](#Contributing)

Upload Files or Globs as Release Assets with Custom Names.

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    files: README.md
```

## Features

- Upload Any File(s) or Glob(s) as Release Assets
- Automatically Detect the Release or Set Manually
- Option to Manually Set Asset File Name(s)

## Inputs

You must provide `files` or `globs` or both.

| Input     | Default&nbsp;Value    | Description&nbsp;of&nbsp;Input |
| :-------- | :-------------------- | :----------------------------- |
| globs     | or `files`            | File Glob(s)                   |
| files     | or `globs`            | File Path(s)                   |
| names     | -                     | Asset File Name(s)             |
| overwrite | `false`               | Overwrite Existing Files       |
| id        | -                     | Optional Release ID            |
| tag       | -                     | Optional Release Tag           |
| latest    | `false`               | Use Latest Release             |
| summary   | `true`                | Add Summary to Job             |
| token     | `${{ github.token }}` | GitHub Access Token PAT [^1]   |

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    files: README.md
```

See the [Examples](#examples) for usage options.

### Permissions

This action requires the following permissions:

```yaml
permissions:
  contents: write
```

Permissions documentation for [Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token) and [Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication).

## Outputs

| Output | Description          |
| :----- | :------------------- |
| assets | Assets Uploaded JSON |

```yaml
- name: 'Upload Release'
  id: release
  uses: cssnr/upload-release-action@v1
  with:
    files: README.md

- name: 'Echo Output'
  run: |
    echo "assets: ${{ steps.release.outputs.assets }}"
```

## Examples

💡 _Click on an example heading to expand or collapse the example._

With a file path.

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    files: dist/app.js
```

With a glob.

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    globs: dist/**
```

With multiple files or globs.

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    globs: |
      dist/**
      src/*.js
    files: |
      README.md
      package.json
```

With File Names.

```yaml
- name: 'Upload Release'
  uses: cssnr/upload-release-action@v1
  with:
    files: |
      README.md
      package.json
    names: |
      readme.txt
      package-spec.json
```

<details><summary>Full Workflow</summary>

```yaml
name: 'Upload Release Action'

on:
  workflow_dispatch:
  release:
    types: [published]

permissions:
  contents: write

jobs:
  release:
    name: 'Release'
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v5

      - name: 'Upload Release'
        id: release
        uses: cssnr/upload-release-action@v1
        with:
          files: README.md

      - name: 'Echo Output'
        run: |
          echo "assets: ${{ steps.release.outputs.assets }}"
```

</details>

For more examples, you can check out other projects using this action:  
https://github.com/cssnr/upload-release-action/network/dependents

## Tags

The following rolling [tags](https://github.com/cssnr/upload-release-action/tags) are maintained.

| Version&nbsp;Tag                                                                                                                                                                                                           | Rolling | Bugs | Feat. |   Name    |  Target  | Example  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :-------: | :------: | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/cssnr/upload-release-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/cssnr/upload-release-action/releases/latest) |   ✅    |  ✅  |  ✅   | **Major** | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/cssnr/upload-release-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/cssnr/upload-release-action/releases/latest) |   ✅    |  ✅  |  ❌   | **Minor** | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/cssnr/upload-release-action?style=for-the-badge&label=%20&color=red)](https://github.com/cssnr/upload-release-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | **Micro** | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/cssnr/upload-release-action/releases) page.

The **Major** tag is recommended. It is the most up-to-date and always backwards compatible.
Breaking changes would result in a **Major** version bump. At a minimum you should use a **Minor** tag.

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/upload-release-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/upload-release-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/upload-release-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Update%20Release%20Notes)

For more information, see the CSSNR [SUPPORT.md](https://github.com/cssnr/.github/blob/master/.github/SUPPORT.md#support).

# Contributing

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

If you would like to submit a PR, please review the [CONTRIBUTING.md](#contributing-ov-file).

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy Action](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [Docker Context Action](https://github.com/cssnr/docker-context-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [JSON Key Value Check Action](https://github.com/cssnr/json-key-value-check-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Package Changelog Action](https://github.com/cssnr/package-changelog-action?tab=readme-ov-file#readme)
- [NPM Outdated Check Action](https://github.com/cssnr/npm-outdated-action?tab=readme-ov-file#readme)
- [Label Creator Action](https://github.com/cssnr/label-creator-action?tab=readme-ov-file#readme)
- [Algolia Crawler Action](https://github.com/cssnr/algolia-crawler-action?tab=readme-ov-file#readme)
- [Upload Release Action](https://github.com/cssnr/upload-release-action?tab=readme-ov-file#readme)
- [Check Build Action](https://github.com/cssnr/check-build-action?tab=readme-ov-file#readme)
- [Web Request Action](https://github.com/cssnr/web-request-action?tab=readme-ov-file#readme)
- [Get Commit Action](https://github.com/cssnr/get-commit-action?tab=readme-ov-file#readme)

<details><summary>❔ Unpublished Actions</summary>

These actions are not published on the Marketplace, but may be useful.

- [cssnr/draft-release-action](https://github.com/cssnr/draft-release-action?tab=readme-ov-file#readme) - Keep a draft release ready to publish.
- [cssnr/env-json-action](https://github.com/cssnr/env-json-action?tab=readme-ov-file#readme) - Convert env file to json or vice versa.
- [cssnr/push-artifacts-action](https://github.com/cssnr/push-artifacts-action?tab=readme-ov-file#readme) - Sync files to a remote host with rsync.
- [smashedr/update-release-notes-action](https://github.com/smashedr/update-release-notes-action?tab=readme-ov-file#readme) - Update release notes.
- [smashedr/combine-release-notes-action](https://github.com/smashedr/combine-release-notes-action?tab=readme-ov-file#readme) - Combine release notes.

---

</details>

<details><summary>📝 Template Actions</summary>

These are basic action templates that I use for creating new actions.

- [js-test-action](https://github.com/smashedr/js-test-action?tab=readme-ov-file#readme) - JavaScript
- [py-test-action](https://github.com/smashedr/py-test-action?tab=readme-ov-file#readme) - Python
- [ts-test-action](https://github.com/smashedr/ts-test-action?tab=readme-ov-file#readme) - TypeScript
- [docker-test-action](https://github.com/smashedr/docker-test-action?tab=readme-ov-file#readme) - Docker Image

Note: The `docker-test-action` builds, runs and pushes images to [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

---

</details>

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

[^1]:
    The `${{ github.token }}` / `{{ secrets.GITHUB_TOKEN }}` is automatically passed, there is no need to manually pass these!
    This is only available to allow users to pass a different token they have created and defined in their `secrets`.
