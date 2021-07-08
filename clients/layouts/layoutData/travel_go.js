/* eslint-disable react/prefer-stateless-function */
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

const Header = dynamic(() => import('@/componentWebs/travel_go/Header'), {
  ssr: true,
  loading: () => null,
});

const Cart = dynamic(() => import('@/componentWebs/travel_go/Cart'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/travel_go/Footer'), {
  ssr: true,
  loading: () => null,
});

const owl = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`
const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`

const zmgTCnfBc0 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/7zmgTCnfBc0.css`
const all = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/all.css`
const bootstrap2 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/bootstrap-4-3-min.css`
const bpr_products = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/bpr-products-module.css`
const bpr_min = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/bpr.min.css`
const ekko_lightbox_min = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/ekko-lightbox.min.css`
const index = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/index.scss.css`
const main = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/main.scss.css`
const productReviews = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/productReviews.min.css`
const q5YVZ5jfOiL = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/q5YVZ5jfOiL.css`
const quickviews_popup_cart = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/quickviews_popup_cart.scss.css`
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/responsive.scss.css`
const sidebar_style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/sidebar_style.scss.css`
const collection_style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/collection_style.scss.css`
const blog_article_style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/blog_article_style.scss.css`
const styles__ltr = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/styles__ltr.css`
const contact_style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/contact_style.scss.css`
const product_style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/product_style.scss.css`
const ekko_lightbox = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/ekko-lightbox.min.css`

const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/checkout.min.css`

const restyle = `${publicRuntimeConfig.DOMAIN_STATIC}/static/travel_go/css/restyle.css`

const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;



if (isClient) {
  require('@/static/web/js/owl.carousel');
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

    } = this.props;
    const token = cookies

    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${checkout}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${styles__ltr}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap2}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${blog_article_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${main}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${index}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${collection_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${quickviews_popup_cart}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bpr_min}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${contact_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${sidebar_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${product_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${all}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${productReviews}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${ekko_lightbox}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />

          <link rel="stylesheet" href={`${restyle}`} type="text/css" media="all" />
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0" nonce="syL1ExxB" />

        </Head>
        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          asPath={this.props.asPath}
          dataSite={dataSite}
        />
        {children}

        <Footer
          key="web-footer"
          menuCategories={menuFooter}
          dataSite={dataSite}
        />
        <QuickMenu data={dataSite} />
      </React.Fragment>
    )
  }
}
export default Index