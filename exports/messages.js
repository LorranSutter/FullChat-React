const moment = require('moment');

function formatMessage(username, text) {
  return {
    username, text, time1: moment().format('MMM Do YY'), time2: moment().format('hh:mm:ss a')
  };
}

module.exports = formatMessage;