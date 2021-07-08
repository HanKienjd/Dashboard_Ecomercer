const category = require('./category');
const categoryValidate = require('./category.validate');

module.exports = {
  ...category,
  ...categoryValidate,
}