/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;
const animated = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/js/wow/animate.css`;
const wow = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/js/wow/wow.js`;

const main = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/main.css`;
const css = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/css.css`;
const button = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/button.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/style.css`;
const product = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/product.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/plugin.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_noi_that/css/checkout.min.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_noi_that/Header`), {
  ssr: true,
  loading: () => null,
});

const ModalCart = dynamic(() => import(`@/componentWebs/vga_noi_that/ModalCart`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_noi_that/Footer`), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: false,
  loading: () => null,
});

// if (isClient) {
//   require('@/static/web/js/owl.carousel.js');
// }
export default class Index extends React.Component {
  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const { menuHeader, menuFooter, dataSite, children, asPath } = this.props;
    console.log('children', children);
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={plugin} />

          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={button} />
          <link rel="stylesheet" href={product} />
          <link rel="stylesheet" href={css} />
          <link rel="stylesheet" href={checkout} />

          <link rel="stylesheet" href={`${animated}`} type="text/css" media="all" />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={owlcarousel} />
          <script src={`${wow}`} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <ModalCart dataSite={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
