#!/usr/bin/env node

import { pathToFileURL } from 'node:url';

function renderCask(repository, version, armSha256, intelSha256) {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new Error(`Invalid GitHub repository: ${repository}`);
  }
  if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) throw new Error(`Invalid version: ${version}`);
  for (const checksum of [armSha256, intelSha256]) {
    if (!/^[a-f0-9]{64}$/.test(checksum)) throw new Error(`Invalid SHA256: ${checksum}`);
  }

  return `cask "aionui-community" do
  arch arm: "arm64", intel: "x64"

  version "${version}"
  sha256 arm:   "${armSha256}",
         intel: "${intelSha256}"

  url "https://github.com/${repository}/releases/download/v#{version}/AionUi-#{version}-mac-#{arch}.dmg"
  name "AionUi Community"
  desc "Community AionUi build with a transparent WebUI login bypass patch"
  homepage "https://github.com/${repository}"

  livecheck do
    url :url
    strategy :github_latest
  end

  auto_updates true
  conflicts_with cask: "aionui"

  app "AionUi.app"
end
`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.stdout.write(renderCask(...process.argv.slice(2)));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
