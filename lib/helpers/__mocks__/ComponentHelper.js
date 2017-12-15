module.exports = function (dir) {
  return {
    observers: {
      parseTemplate: []
    },
    parseTemplate (type, name) {
      this.observers.parseTemplate.push(type)
      this.observers.parseTemplate.push(name)
      return 'test';
    }
  }
}
