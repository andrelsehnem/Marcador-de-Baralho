function readPackage(pkg) {
  if (pkg.peerDependencies) {
    delete pkg.peerDependencies;
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};