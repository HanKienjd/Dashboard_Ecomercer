import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout'
import dynamic from 'next/dynamic'

const { publicRuntimeConfig } = getConfig()
const Header = dynamic(() => import("@/componentWebs/antshoes/Header"), {
  ssr: true
});
const Cart = dynamic(() => import("@/componentWebs/antshoes/Cart"), {
  ssr: true
});
const Footer = dynamic(() => import("@/componentWebs/antshoes/Footer"), {
  ssr: true
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/bootstrap.min.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/plugin.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/base.css';
const antshoes = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/antshoes.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/style.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/antshoes/css/main.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
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
      children,
      asPath
    } = this.props;

    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${antshoes}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${main}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owlcarousel}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owlthemedefault}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontawesome5}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" media="all" />
        </Head>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        <Cart dataSite={dataSite} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />

      </React.Fragment>
    )
  }
}
export default Index