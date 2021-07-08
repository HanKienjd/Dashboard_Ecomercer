/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();
const custom = `${publicRuntimeConfig.DOMAIN_STATIC}'/static/vga_phamra/css/custom.css`;
const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/base.scss.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/plugin.css`;
const module = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/module.css`;
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/responsive.scss.css`;
const productReviews = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/vga_pharma/css/productReviews.min.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/style.css`;
const themify = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/themify-icons.css`;
const main = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/main.css`;
const bpr = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/bpr.min.css`;
// const ionicons = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/ionicons.css`;
const iwish = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/iwish.css`;
// const custom = `${publicRuntimeConfig.DOMAIN_STATIC}'/static/vga_phamra/css/custom.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/checkout.min.css`;
const slick = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_pharma/css/slick.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_pharma/Header`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_pharma/Footer`), {
  ssr: true,
  loading: () => null,
});
const BreadCrumb = dynamic(() => import('@/componentWebs/vga_pharma/BreadCrumb'), {
  ssr: true,
  loading: () => null,
});
const ModalCart = dynamic(() => import('@/componentWebs/vga_pharma/ModalCart'), {
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
    const { menuHeader, menuFooter, dataSite, children, asPath } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          {/* <link rel="stylesheet" href={custom} /> */}
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={iwish} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={themify} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={custom} />
          <link rel="stylesheet" href={slick} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <ModalCart dataSite={dataSite} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
