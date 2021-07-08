import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout'
import dynamic from 'next/dynamic'

const { publicRuntimeConfig } = getConfig()
const Header = dynamic(() => import("@/componentWebs/jobboard/Header"), {
  ssr: true
});
const Footer = dynamic(() => import("@/componentWebs/jobboard/Footer"), {
  ssr: true
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

// const { publicRuntimeConfig } = getConfig()

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/bootstrapmin.css';
const awesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.min.css';
const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.min.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/jobboard/css/style.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/jobboard/css/main.css';
const jqueryjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/jquery-3.5.1.js';
const popperjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/popper.min.js';
const bootstrapjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/bootstrap.min.js';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

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
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${awesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${main}`} type="text/css" media="all" />
          <script type="text/javascript" src={`${popperjs}`}></script>
          <script type="text/javascript" src={`${jqueryjs}`}></script>
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <script type="text/javascript" src={`${bootstrapjs}`}></script>
          <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
        </Head>
        <Header menuHeader={menuHeader} dataSite={dataSite} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />

      </React.Fragment>
    )
  }
}
export default Index