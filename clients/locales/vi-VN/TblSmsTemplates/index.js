const TblSmsTemplates = require('./TblSmsTemplates')
const create = require('./create')
const crud = require('./$Crud$')

module.exports = {
  ...TblSmsTemplates,
  ...create,
  ...crud,
}