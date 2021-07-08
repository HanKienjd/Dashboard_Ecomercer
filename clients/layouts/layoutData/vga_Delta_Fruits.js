/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/base.css`;
const products = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/products.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/plugin.css`;
const module = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/module.css`;
const ekkoLightbox = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/vga_deltafruits/css/lightbox.min.css`;
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/reponsive.css`;
const productReviews = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/vga_deltafruits/css/productReviews.min.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/style.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/checkout.min.css`;
const all = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/all.css`;
const stylechunk = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_deltafruits/css/stylechunk`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/Header`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/Footer`), {
  ssr: true,
  loading: () => null,
});
const BreadCrumb = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/BreadCrumb'), {
  ssr: true,
  loading: () => null,
});
const ModalCart = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/ModalCart'), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

export default class Index extends React.Component {
  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const {
      menuHeader,
      menuFooter,
      // cookies,
      // dataSlide,
      dataSite,
      // advertisments,
      children,
      asPath,
    } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={products} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={ekkoLightbox} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={stylechunk} />
          <link rel="stylesheet" href={styleQuickMenu} />
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
