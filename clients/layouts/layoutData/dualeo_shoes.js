
import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout'

import dynamic from 'next/dynamic';

const { publicRuntimeConfig } = getConfig()


if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}

const Header = dynamic(() => import("@/componentWebs/dualeo_shoes/Header"), {
  ssr: true
});
const Footer = dynamic(() => import("@/componentWebs/dualeo_shoes/Footer"), {
  ssr: true
});
const Popup = dynamic(() => import("@/componentWebs/dualeo_shoes/Popup"), {
  ssr: true
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});



const awesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/plugin.scss.css';
const fancybox = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/jquery-fancybox-min.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/base.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/style.scss.css';
const module1 = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/module.scss.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/responsive.scss.css';
const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/bootstrap-theme.css';
const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/owl.carousel.css';
const owl_default = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/owl.theme.default.css';
const banner_content = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/banner_content.css';
const styles = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/styles.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/dualeo_shoes/css/checkout.min.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';

class Index extends Component {

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

    return (
      <React.Fragment>
        <Head>
          {/* <link rel="stylesheet" href={fontawesome5} /> */}
          <link rel="stylesheet" href={`${awesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fancybox}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module1}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl_default}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${banner_content}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styles}`} type="text/css" media="all" />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </Head>
        <Header menuHeader={menuHeader} dataSite={dataSite} />
        {children}
        <Popup />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    )
  }
}
export default Index