/* eslint-disable camelcase */
/* eslint-disable camelcase */
/* eslint-disable camelcase */
import dynamic from 'next/dynamic';

const vga_Delta_Fruits = dynamic(() => import(`./layoutData/vga_Delta_Fruits`), {
  ssr: true,
  loading: () => null,
});

const DATA_TEMPLATES = {
  vga_deltafruits: vga_Delta_Fruits,
};
export default DATA_TEMPLATES;
