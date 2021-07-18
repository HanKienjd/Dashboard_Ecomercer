/* eslint-disable global-require */
/* eslint-disable camelcase */

import React from 'react';
import getConfig from 'next/config';
import { isClient } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const folderCss = 'static';

const owl = `${publicRuntimeConfig.DOMAIN_STATIC}/${folderCss}/web/css/owl.carousel.css`;
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC}/${folderCss}/web/css/owl.theme.default.css`;
const fontAwesome = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/${folderCss}/web/css/fontawesome5/css/all.css`;
// const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/${folderCss}/web/css/bootstrapmin.css`;
const slickCss = `${publicRuntimeConfig.DOMAIN_STATIC}/${folderCss}/web/css/slick.css`;

const bootstrap_css =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/bootstrap_css.css`;
const bg_css = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/bg.css`;
const flatpickr_min =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/flatpickr_min.css`;
const mew_style_first =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/mew_style_first.css`;
const mew_style_gb = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/mew_style_gb.css`;
const blogmate = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/blogmate.css`;
const pagestyle = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/pagestyle.css`;
const product_style =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/product_style.css`;
const swatch_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/swatch_style.css`;
// const cart_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/new_clinic/css/cart_style.css';
const collection_style =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/collection_style.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/new_clinic/css/checkout.min.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/new_clinic/Header`), {
  ssr: true,
  loading: () => null,
});
const Modal = dynamic(() => import('@/componentWebs/new_clinic/Modal'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/new_clinic/Footer`), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
export default class Index extends React.Component {
  componentDidMount() {}

  render() {
    const {
      menuHeader,
      menuFooter,
      dataSite,
      children,
      asPath,
    } = this.props;

    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={bootstrap_css} />
          <link rel="stylesheet" href={bg_css} />
          <link rel="stylesheet" href={flatpickr_min} />
          <link rel="stylesheet" href={mew_style_first} />
          <link rel="stylesheet" href={mew_style_gb} />
          <link rel="stylesheet" href={blogmate} />
          <link rel="stylesheet" href={collection_style} />
          <link rel="stylesheet" href={pagestyle} />
          <link rel="stylesheet" href={product_style} />
          <link rel="stylesheet" href={swatch_style} />
          {/* <link rel="stylesheet" href={cart_style} /> */}
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={owl} />
          <link rel="stylesheet" href={owltheme} />
          <link rel="stylesheet" href={fontAwesome} />
          {/* <link rel="stylesheet" href={bootstrap} /> */}
          <link rel="stylesheet" href={slickCss} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <Footer menuFooter={menuFooter} dataSite={dataSite} />

        <Modal dataSite={dataSite} />
        <QuickMenu data={dataSite} />
      </React.Fragment>
    );
  }
}
