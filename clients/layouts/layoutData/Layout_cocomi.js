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

const Header = dynamic(() => import('@/componentWebs/template_cocomi/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_cocomi/Footer'), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import('@/componentWebs/template_cocomi/Cart'), {
  ssr: false,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/bootstrapmin.css';
const fontAwesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const slick = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/slick.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'
const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css'
const owltheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css'
const indexCss = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_cocomi/css/index.css'
const responsiveCss = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_cocomi/css/responsive.css'
const checkoutCss = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_cocomi/css/checkoutcustom.css'
const jquery = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/jquery-3.5.1.js'
const smoothScroll = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/SmoothScroll.js'

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
      asPath
    } = this.props;
    const token = cookies
    return (
      <React.Fragment>
        <Head>

          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${indexCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsiveCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${checkoutCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${slick}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
            rel="stylesheet" />

          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
            rel="stylesheet" />

          <script src={jquery}></script>
          <script src={smoothScroll}></script>

        </Head>
        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          dataSite={dataSite}
          asPath={asPath}
        />
        <Cart />
        {children}
        {/* <Widget /> */}
        <QuickMenu data={dataSite} />


        <Footer
          key="web-footer"
          menuCategories={menuFooter}
          dataSite={dataSite}
        />
      </React.Fragment>
    )
  }
}
export default Index