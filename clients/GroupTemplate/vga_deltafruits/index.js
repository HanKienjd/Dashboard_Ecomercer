import dynamic from 'next/dynamic';
// eslint-disable-next-line camelcase
const templateLayout_1 = dynamic(() => import(`./layouts/templateLayout_1`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_51 = dynamic(() => import(`./layouts/templateLayout_51`), {
  ssr: true,
  loading: () => null,
});
const templateLayout_22 = dynamic(() => import(`./layouts/templateLayout_22`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_23 = dynamic(() => import(`./layouts/templateLayout_23`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_24 = dynamic(() => import(`./layouts/templateLayout_24`), {
  ssr: true,
  loading: () => null,
});



const templateLayout_52 = dynamic(() => import(`./layouts/templateLayout_52`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_2 = dynamic(() => import(`./layouts/templateLayout_2`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_3 = dynamic(() => import(`./layouts/templateLayout_3`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_5 = dynamic(() => import(`./layouts/templateLayout_5`), {
  ssr: true,
  loading: () => null,
});


const templateLayout_11 = dynamic(() => import(`./layouts/templateLayout_11`), {
  ssr: true,
  loading: () => null,
});

const templateLayout_12 = dynamic(() => import(`./layouts/templateLayout_12`), {
  ssr: true,
  loading: () => null,
});

const product = dynamic(() => import(`./layouts/product`), {
  ssr: true,
  loading: () => null,
});

const detail = dynamic(() => import(`./layouts/detail`), {
  ssr: true,
  loading: () => null,
});

const checkout = dynamic(() => import(`./layouts/checkout`), {
  ssr: true,
  loading: () => null,
});

const cart = dynamic(() => import(`./layouts/cart`), {
  ssr: true,
  loading: () => null,
});

const search = dynamic(() => import(`./layouts/search`), {
  ssr: true,
  loading: () => null,
});



const folder = 'vga_deltafruits';
export default {
  [`${folder}_templateLayout_1`]: templateLayout_1,
  [`${folder}_templateLayout_51`]: templateLayout_51,
  [`${folder}_templateLayout_22`]: templateLayout_22,
  [`${folder}_templateLayout_23`]: templateLayout_23,
  [`${folder}_templateLayout_24`]: templateLayout_24,
  [`${folder}_templateLayout_52`]: templateLayout_52,
  [`${folder}_templateLayout_2`]: templateLayout_2,
  [`${folder}_templateLayout_3`]: templateLayout_3,
  [`${folder}_templateLayout_5`]: templateLayout_5,
  [`${folder}_templateLayout_11`]: templateLayout_11,
  [`${folder}_templateLayout_12`]: templateLayout_12,

  [`${folder}_detail`]: detail,
  [`${folder}_product`]: product,
  [`${folder}_checkout`]: checkout,
  [`${folder}_cart`]: cart,
  [`${folder}_search`]: search,
};
