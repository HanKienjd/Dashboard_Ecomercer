const exception = require('./vi-VN/exception');
const login = require('./vi-VN/login');
const user = require('./vi-VN/user');
const menu = require('./vi-VN/menu');
const roles = require('./vi-VN/roles');
const account = require('./vi-VN/account');
const report = require('./vi-VN/report');
const smsSendeds = require('./vi-VN/smsSendeds');
const smsQueueSenders = require('./vi-VN/smsQueueSenders');
const groupUser = require('./vi-VN/groupUser');
const SmsQueueErrors = require('./vi-VN/SmsQueueErrors')
const TblSmsTemplates = require('./vi-VN/TblSmsTemplates')
const category = require('./vi-VN/category');
const province = require('./vi-VN/province');
const district = require('./vi-VN/district');
const galery = require('./vi-VN/galery')
const ward = require('./vi-VN/ward')
const website = require('./vi-VN/website')
const groupPlace = require('./vi-VN/groupPlace')
const place = require('./vi-VN/place')
const news = require('./vi-VN/news')
const groupWebsites = require('./vi-VN/groupWebsites');
const ad = require('./vi-VN/ad')
const adstype = require('./vi-VN/adsType')
const adsposition = require('./vi-VN/adsPosition')
const galeryCategory = require('./vi-VN/galeryCategory')
const menuPositions = require('./vi-VN/menuPositions')
const rolesTemplates = require('./vi-VN/rolesTemplates')

module.exports = {
  'app.table.column.no': 'STT',
  'app.tooltip.remove': 'Xóa',
  'app.tooltip.edit': 'Sửa',
  'app.title.create': 'Thêm mới {name}',
  'app.confirm.remove': 'Bạn có chắc chắn muốn xóa bản ghi?',
  'app.search.placeHolder': 'Tìm kiếm theo tên {functionName}',
  'app.search.button': 'Tìm kiếm',
  'app.common.action': 'Thao tác',
  'app.common.telco.default': 'Không xác định',
  'app.common.telco.1': 'VINA',
  'app.common.telco.2': 'VIETTEL',
  'app.common.telco.3': 'VNM',
  'app.common.telco.4': 'MOBI',
  'app.common.deleteBtn.cancelText': 'Hủy',
  'app.common.statusTag.0': 'Kích hoạt',
  'app.common.statusTag.1': 'Hủy',
  'app.common.statusTag.2': 'Tất cả trạng thái',
  'app.common.status.placeholder': 'Chọn trạng thái',
  'app.common.placeholder.rangepicker.0': 'Ngày bắt đầu',
  'app.common.placeholder.rangepicker.1': 'Ngày kết thúc',
  'app.common.crudBtns.0': 'Quay lại',
  'app.common.crudBtns.1': 'Huỷ',
  'app.common.crudBtns.2': 'Lưu lại',
  'app.common.searchBtn': 'Tìm kiếm',
  'app.common.delete.success': 'Xóa bản ghi thành công',
  'app.common.edit.success': 'Cập nhật thông tin thành công',
  'app.common.create.success': 'Thêm mới {name} thành công',
  'app.common.error.server.msg': 'Có lỗi xảy ra:',
  'app.common.crud.error.update.change': 'Vui lòng thay đổi thông tin ít nhất 1 trường',
  'app.common.crud.validate.input': 'Vui lòng nhập thông tin',
  'app.common.crud.validate.select': 'Vui lòng chọn thông tin',
  'app.common.crud.validate.fomatUnit': 'Vui lòng nhập từ 1 đến 50 ký tự bao gồm chữ, số và bắt đầu bằng chữ cái',
  'app.common.crud.validate.fomatMedi': 'Vui lòng nhập từ 3 đến 50 ký tự bao gồm chữ, số /- và bắt đầu bằng chữ cái',
  'app.common.crud.validate.fomat': 'Vui lòng nhập từ 3 đến 50 ký tự bao gồm chữ, số và bắt đầu bằng chữ cái',
  'app.common.crud.validate.fomatNew': 'Vui lòng nhập ít nhất 3 ký tự bao gồm chữ, số và bắt đầu bằng chữ cái',
  'app.common.crud.validate.phone': 'Vui lòng nhập đúng định dạng số điện thoại',
  'app.common.crud.validate.email': 'Vui lòng nhập đúng định dạng email',
  'app.common.crud.validate.type': 'Vui lòng nhập đúng định dạng {name} từ 3 đến 50 ký tự',
  'app.common.validate.max': 'Vui lòng nhập tối đa {max} ký tự',
  'app.common.changeStatus.success': 'Cập nhật trạng thái thành công',
  ...exception,
  ...login,
  ...user,
  ...menu,
  ...report,
  ...roles,
  ...account,
  ...smsSendeds,
  ...smsQueueSenders,
  ...groupUser,
  ...report,
  ...SmsQueueErrors,
  ...TblSmsTemplates,
  ...category,
  ...province,
  ...district,
  ...galery,
  ...ward,
  ...website,
  ...groupPlace,
  ...place,
  ...news,
  ...groupWebsites,
  ...ad,
  ...adstype,
  ...adsposition,
  ...galeryCategory,
  ...menuPositions,
  ...rolesTemplates
}