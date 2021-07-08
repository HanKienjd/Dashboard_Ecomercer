/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import dynamic from 'next/dynamic';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import $ from 'jquery';

import { initJquery } from '@/static/web/js/main';
const { publicRuntimeConfig } = getConfig()
// console.log("1")
const Header = dynamic(() => import('@/componentWebs/template_sea_kitchen/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_sea_kitchen/Footer'), {
  ssr: true,
  loading: () => null,
});
const Modal = dynamic(() => import('@/componentWebs/template_sea_kitchen/Modal'), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import('@/componentWebs/template_sea_kitchen/Cart'), {
  ssr: true,
  loading: () => null,
});
// console.log("2")
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

// console.log("3")
const style1 = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/style.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/plugin.scss.css';
const module1 = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/module.scss.css';
const ekko = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/ekko-lightbox.min.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/responsive.css';
const fontAwsome = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/fontawesome5/css/all.css'
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/base.scss.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/bpr.min.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/checkout.min.css';
const checkoutcustom = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/checkoutcustom.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_kitchen/web/css/productReviews.min.css';
const owlCarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlCarouselTheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'
const jquery = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/jquery-3.5.1.js';
const jsowl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/owl.carousel.js';
// console.log("4")

class Index extends React.Component {

  render() {
    const {
      menuHeader,
      menuFooter,
      cookies,
      dataSlide,
      dataSite,
      advertisments,
      children
    } = this.props;
    const token = cookies
    // console.log("dataSite", dataSite)
    return (
      <React.Fragment>
        <Head>
          <script src={`${jquery}`} />
          <script src={`${jsowl}`} />

          <link rel="stylesheet" href={`${style1}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module1}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${ekko}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bpr}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${productReviews}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwsome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owlCarousel}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owlCarouselTheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${checkoutcustom}`} type="text/css" media="all" />
          {/* <link rel="stylesheet" href={`${checkout}`} type="text/css" media="all" /> */}

        </Head>
        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          dataSite={dataSite}
        />

        {children}
        <QuickMenu data={dataSite} />
        <Footer
          key="web-footer"
          menuCategories={menuFooter}
          dataSite={dataSite}
        />
        <Modal />
        <Cart />
      </React.Fragment>
    )
  }
}
export default Index