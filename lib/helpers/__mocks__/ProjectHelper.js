module.exports = function(observer) {
  return {
    copyAPI () {
      observer.push('copyAPI was called');
      return this;
    },
    copyConfigs () {
      observer.push('copyConfigs was called');
      return this;
    },
    copyPackageJSON (arg) {
      if (arg) {        
        observer.push('copyPackageJSON was called');
        observer.push(arg);
      } else throw new Error('copyPackageJSON threw exception');
      return this;
    }
  }
}
