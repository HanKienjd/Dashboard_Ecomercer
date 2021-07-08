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

const Header = dynamic(() => import('@/componentWebs/vga_sport/Header'), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/vga_sport/Footer'), {
  ssr: true,
  loading: () => null,
});

const owl = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`
const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`

const main = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/main.css`
const header = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/header.css`
const footer = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/footer.css`
const product = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/product.css`
const detailProduct = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/detailproduct.css`
const cart = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/cart.css`
const article = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/article.css`
const home = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/home.css`
const stores = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/stores.css`
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/responsive.css`
const responsiveLib = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/responsive_lib.css`

const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_sport/css/checkout.min.css`

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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
          <link rel="stylesheet" href={`${main}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${header}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${footer}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${product}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${detailProduct}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${cart}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${article}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${home}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${stores}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsiveLib}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />

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