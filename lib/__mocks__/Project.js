module.exports = function Project (arg1, arg2, arg3, arg4) {
  return {
    build (obj) {
      arg2.push(obj);
      return arg1;
    }
  };
};
