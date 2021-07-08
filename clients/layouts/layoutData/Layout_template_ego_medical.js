/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { isClient } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import $ from 'jquery';

import { initJquery } from '@/static/web/js/main';

const { publicRuntimeConfig } = getConfig();

const Header = dynamic(() => import('@/componentWebs/template_ego_medical/Header'), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import('@/componentWebs/template_ego_medical/Cart'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_ego_medical/Footer'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const owl = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.carousel.css`;
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.theme.default.css`;
const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/bootstrapmin.css`;
const slickCss = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/slick.css`;
const wowJs = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/wow/wow.js`;
const slick = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/slick.min.js`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`;
const all = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/all.css`;
const bootstrap_4_3 = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/bootstrap-4-3-min.css`;
const index = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/index.scss.css`;
const main = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/main.scss.css`;
const quickviews_popup_cart = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/quickviews_popup_cart.scss.css`;
const page_appointment = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/page_appointment.scss.css`;
const styles__ltr = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/styles__ltr.css`;
const blog_article_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/blog_article_style.scss.css`;
const contact_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/contact_style.scss.css`;
const collection_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/collection_style.scss.css`;
const jquery_ui_min = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/jquery_ui_min.scss.css`;
const sidebar_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/sidebar_style.scss.css`;
const lightbox = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/lightbox.css`;
const product_style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/product_style.scss.css`;
const cartpage = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/cartpage.scss.css`;

const checkout = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_ego_medical/css/checkout.min.css`;

if (isClient) {
  require('@/static/web/js/owl.carousel');
  require('@/static/web/js/slick.min');
}
class Index extends React.Component {
  render() {
    const {
      menuHeader,
      menuFooter,
      cookies,
      dataSlide,
      dataSite,
      advertisments,
      children,
      asPath,
    } = this.props;
    const token = cookies;

    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />

          {/* <link rel="stylesheet" href={`${all}`} type="text/css" media="all" /> */}
          <link rel="stylesheet" href={`${bootstrap_4_3}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${main}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${cartpage}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${index}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${quickviews_popup_cart}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${page_appointment}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styles__ltr}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${blog_article_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${contact_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${collection_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${jquery_ui_min}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${sidebar_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${product_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={`${slickCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <script src={`${wowJs}`} />
          <script src={`${slick}`} />
          {/* <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script> */}
        </Head>
        <Header
          key="web-header"
          menuHeader={menuHeader}
          token={token}
          dataSite={dataSite}
          asPath={asPath}
        />
        <Cart />
        {children}
        <QuickMenu data={dataSite} />
        <Footer key="web-footer" menuCategories={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
export default Index;
