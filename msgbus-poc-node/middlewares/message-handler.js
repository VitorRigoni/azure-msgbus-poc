const { listen } = require('../service-bus');

const handleMessage = (req, res, next) => {
  listen();
  next();
};

module.exports = {
  handleMessage,
};