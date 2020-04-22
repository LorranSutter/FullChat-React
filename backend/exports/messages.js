const moment = require('moment');

function formatMessage(user, message) {
  return {
    user, message, date: moment()
  };
}

module.exports = formatMessage;