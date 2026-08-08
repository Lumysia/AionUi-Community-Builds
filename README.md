# AionUi Community Builds

Automated, unsigned community builds of the unmodified [AionUi](https://github.com/iOfficeAI/AionUi) open-source releases.

This repository is not affiliated with iOfficeAI and does not modify AionUi, remove login, or patch application behavior. Every GitHub Release records the exact upstream tag and commit used, and includes SHA256 checksums.

## Platforms

| Platform | Architectures        | Packages |
| -------- | -------------------- | -------- |
| macOS    | Apple Silicon, Intel | DMG, ZIP |
| Windows  | arm64, x64           | NSIS EXE |
| Linux    | arm64, x64           | DEB      |

The release workflow checks upstream every 12 hours. It only accepts published stable tags matching `vMAJOR.MINOR.PATCH`, checks out the resolved upstream commit directly, and invokes upstream's existing build system.

Completed versions are idempotently skipped.

## Downloads

Download the package for your platform from [GitHub Releases](https://github.com/Lumysia/AionUi-Community-Builds/releases).

## Verification

Each release includes:

- `SHA256SUMS` with checksums for every binary package.
- `UPSTREAM_SOURCE.txt` with the exact upstream repository, tag, and commit.

```bash
sha256sum --check SHA256SUMS
```
