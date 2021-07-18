const report = require('./report');
const reportValidate = require('./report.validate');

module.exports = {
  ...report,
  ...reportValidate,
}