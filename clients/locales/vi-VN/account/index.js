const account = require('./account');
const accountValidate = require('./account.validate');

module.exports = {
  ...account,
  ...accountValidate,
}