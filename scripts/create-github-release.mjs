#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const [releaseType, ...flags] = process.argv.slice(2);
const normalizedFlags = flags.filter((flag) => flag !== "--");
const dryRun = normalizedFlags.includes("--dry-run");
const allowedReleaseTypes = new Set(["minor", "patch"]);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
  });

  if (result.error) {
    fail(`Failed to run ${command}: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const details = [result.stderr, result.stdout]
      .filter(Boolean)
      .join("\n")
      .trim();
    fail(details || `${command} ${args.join(" ")} failed`);
  }

  return result.stdout?.trim() ?? "";
}

function tryRun(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: "pipe",
  });

  return {
    ok: result.status === 0,
    output: [result.stdout, result.stderr].filter(Boolean).join("\n").trim(),
  };
}

function repoFromRemote(remoteUrl) {
  const httpsMatch = remoteUrl.match(/^https:\/\/github\.com\/([^/]+)\/(.+?)(?:\.git)?$/);
  if (httpsMatch) {
    return `${httpsMatch[1]}/${httpsMatch[2]}`;
  }

  const sshMatch = remoteUrl.match(/^git@github\.com:([^/]+)\/(.+?)(?:\.git)?$/);
  if (sshMatch) {
    return `${sshMatch[1]}/${sshMatch[2]}`;
  }

  const sshUrlMatch = remoteUrl.match(/^ssh:\/\/git@github\.com\/([^/]+)\/(.+?)(?:\.git)?$/);
  if (sshUrlMatch) {
    return `${sshUrlMatch[1]}/${sshUrlMatch[2]}`;
  }

  fail(`Could not infer OWNER/REPO from remote.origin.url: ${remoteUrl}`);
}

function parseReleaseTag(tag) {
  const match = tag.match(/^v0\.(\d+)\.(\d+)$/);
  if (!match) {
    return null;
  }

  return {
    tag,
    minor: Number(match[1]),
    patch: Number(match[2]),
  };
}

if (!allowedReleaseTypes.has(releaseType)) {
  fail("Usage: node scripts/create-github-release.mjs <minor|patch> [--dry-run]");
}

run("git", ["rev-parse", "--is-inside-work-tree"]);

if (!tryRun("gh", ["--version"]).ok) {
  fail("GitHub CLI is required. Install it and authenticate with `gh auth login`.");
}

const authStatus = tryRun("gh", ["auth", "status"]);
if (!authStatus.ok) {
  fail(`GitHub CLI is not authenticated. Run \`gh auth login\` first.\n\n${authStatus.output}`);
}

const remoteUrl = run("git", ["config", "--get", "remote.origin.url"]);
const repo = repoFromRemote(remoteUrl);

console.log("Reading release tags from origin...");
const tags = run("git", ["ls-remote", "--tags", "--refs", "origin", "v0.*.*"])
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(/\s+/)[1]?.replace("refs/tags/", ""))
  .filter(Boolean)
  .map(parseReleaseTag)
  .filter(Boolean)
  .sort((a, b) => b.minor - a.minor || b.patch - a.patch);

const latest = tags[0] ?? { minor: 0, patch: 0, tag: null };
const nextTag =
  releaseType === "minor"
    ? `v0.${latest.minor + 1}.0`
    : latest.tag
      ? `v0.${latest.minor}.${latest.patch + 1}`
      : "v0.0.1";

if (tags.some((tag) => tag.tag === nextTag)) {
  fail(`Tag ${nextTag} already exists.`);
}

console.log(`Latest release tag: ${latest.tag ?? "none"}`);
console.log(`Next ${releaseType} release: ${nextTag}`);

if (dryRun) {
  console.log("Dry run only. No GitHub release was created.");
  process.exit(0);
}

run(
  "gh",
  [
    "release",
    "create",
    nextTag,
    "--repo",
    repo,
    "--title",
    nextTag,
    "--generate-notes",
    "--latest",
  ],
  { stdio: "inherit" },
);

run("git", ["fetch", "--tags", "origin"], { stdio: "inherit" });

console.log(`Created GitHub release ${nextTag} in ${repo}.`);
