# AionUi Community Builds

## Purpose

Build unofficial AionUi releases with a transparent WebUI login-bypass patch.
This repository contains automation and patches only; never vendor upstream
source or call the result unmodified.

## Source Rules

- Use English only in every repository file, including comments, patches,
  metadata, documentation, workflow text, and commit messages.
- Accept only published stable upstream tags matching `^vMAJOR.MINOR.PATCH$`.
- Resolve and check out the exact upstream commit SHA.
- Verify the SHA and `package.json` version before patching.
- Keep community changes as unified diffs under `patches/`.
- Apply with `git apply --check` followed by `git apply`.
- Never use version-specific replacements, whole-file replacements, fuzzy
  fallbacks, or patched upstream files committed to this repository.
- Keep patches minimal and generic. Unified-diff line numbers are hints; stable
  surrounding context performs the match.
- Do not add tests to patches.
- Verify patches in a separate job before starting platform builds. Fail closed
  when a patch no longer applies.

## Login Bypass

Upstream AionCore already runs with `--local` and uses
`system_default_user`. Patch only the remaining renderer gate:

- Treat browser sessions as authenticated without auth HTTP requests.
- Keep them authenticated after logout requests.
- Hide the browser logout action.
- Do not patch AionCore unless upstream architecture changes require it.

## Releases

- Build macOS arm64/x64, Windows arm64/x64, and Linux arm64/x64 from one SHA.
- Run every 12 hours and support manual and repository dispatch.
- Apply every `patches/*.patch` file in bytewise filename order.
- Publish all applied patches, their set SHA256, upstream tag/SHA,
  `SHA256SUMS`, and `UPSTREAM_SOURCE.txt` with every Release.
- Consider a Release complete only when upstream SHA, patch set SHA256, and all
  expected artifacts match.
- Never publish after patch verification or a platform build fails.
- Public metadata must say this is an unofficial patched community build.

Homebrew remains disabled unless `HOMEBREW_TAP_ENABLED=true`.

WinGet configuration:

- Secret: `WINGET_TOKEN`
- Variable: `WINGET_ENABLED=true`
- Variable: `WINGET_PACKAGE_ID=Lumysia.AionUiCommunity`

WinGet submits a first-package PR when absent, updates later versions, and skips
merged versions or matching open PRs. Never expose `WINGET_TOKEN`.

## Validation

```text
actionlint .github/workflows/release.yml
bunx oxfmt --check AGENTS.md README.md .github/workflows/release.yml scripts/*.mjs
git apply --check patches/*.patch
git diff --check
```

Use Conventional Commits. Do not push unless asked. Run Git commands from this
nested repository, not its parent.
