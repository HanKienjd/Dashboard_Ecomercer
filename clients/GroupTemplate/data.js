/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import vga_deltafruits from './vga_deltafruits/index';

// Thay đổi sang import cả object từ folder
const DATA_TEMPLATES = {
  ...vga_deltafruits,
};
export default DATA_TEMPLATES;
