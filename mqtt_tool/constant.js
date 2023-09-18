const appConstant = {
    EVERY_10S: "*/10 * * * * *",
    EVERY_1MINUTE: "* * * * *",
    EVERY_HOUR: "0 * * * *",
    EVERY_6HOUR: "0 */6 * * *",
    EVERY_DAY: "0 0 * * *",
    ERROR_PARSE_JSON: "parse JSON error ",
    ERROR_RECORD_FORMAT: "record format don't match",
    ERROR_INSERT_MONGO: "insert record to mongo error",
  };

  module.exports = {
    appConstant
  };
  
  