# AionUi Community Builds

Automated, unsigned community builds of [AionUi](https://github.com/iOfficeAI/AionUi) with a transparent WebUI login bypass patch.

This repository is not affiliated with iOfficeAI. Every GitHub Release records the exact upstream tag, commit, applied patch, and SHA256 checksums.

## Platforms

| Platform | Architectures        | Packages |
| -------- | -------------------- | -------- |
| macOS    | Apple Silicon, Intel | DMG, ZIP |
| Windows  | arm64, x64           | NSIS EXE |
| Linux    | arm64, x64           | DEB      |

The release workflow checks upstream every 12 hours. It accepts published stable tags matching `vMAJOR.MINOR.PATCH`, checks out the resolved upstream commit, verifies and applies the repository patch, then invokes upstream's build system.

If the patch no longer applies, the workflow fails before platform builds or publication. Completed versions are idempotently skipped when their upstream commit, patch checksum, and artifacts match.

## Downloads

Download the package for your platform from [GitHub Releases](https://github.com/Lumysia/AionUi-Community-Builds/releases).

## Verification

Each release includes:

- `SHA256SUMS` with checksums for every binary package.
- `UPSTREAM_SOURCE.txt` with the exact upstream repository, tag, and commit.
- `remove-webui-login.patch` with the applied community source change.

```bash
sha256sum --check SHA256SUMS
```
