module.exports = function (observer) {
  return {
    build (key, value) {
      observer.push(key);
      observer.push(value);
    }
  };
};
