const semver = require('semver');
const { VERSION_LINE_REGEX } = require('./regexprs');

function verifyTargetVersion(targetVersion, currentChangelog) {
  if (!currentChangelog || !currentChangelog.length) {
    return;
  }
  VERSION_LINE_REGEX.lastIndex = 0;
  const versionMatches = VERSION_LINE_REGEX.exec(
    currentChangelog,
  );

  if (!versionMatches || !versionMatches[1]) {
    return;
  }

  const lastVersion = versionMatches[1];

  if (!semver.valid(lastVersion)) {
    console.error('Last version is not a valid semver version!', `[${lastVersion}]`);
    process.exit(1);
  }

  if (!semver.gt(targetVersion, lastVersion)) {
    console.error('Target version must be greater than last found version!',
      `[target: ${targetVersion}, found: ${lastVersion}]`);
    process.exit(1);
  }
}

module.exports = {
  verifyTargetVersion,
};
