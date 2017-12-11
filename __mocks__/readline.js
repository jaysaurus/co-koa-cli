const readline = jest.genMockFromModule('readline');

readline.__observers = {
  close: false,
  interfaceCreated: false,
  on: [],
  question: []
};
readline.__getObservers = function (observers) {
  return this.__observers;
};
readline.createInterface = function (arg) {
  const observers = this.__observers;
  observers.interfaceCreated = true;
  return {
    close () {
      observers.close = true;
    },
    on (string, next) {
      observers.on.push(string);
      next();
    },
    question (string, next) {
      observers.question.push(string);
      next(string);
    }
  };
};

module.exports = readline;
