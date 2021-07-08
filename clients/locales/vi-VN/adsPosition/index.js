const list = require('./list')
const create = require('./create')
const crud = require('./crud')

module.exports = {
  ...list,
  ...create,
  ...crud,
}