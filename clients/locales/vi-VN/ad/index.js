const list = require('./list')
const create = require('./create')
const crud = require('./crud')
const validate = require('./ad.validate')

module.exports = {
  ...list,
  ...create,
  ...crud,
  ...validate
}