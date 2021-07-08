import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout'
import dynamic from 'next/dynamic'

const { publicRuntimeConfig } = getConfig()

const Header = dynamic(() => import("@/componentWebs/dreamer/Header"), {
  ssr: true
});
const Connect = dynamic(() => import("@/componentWebs/dreamer/Connect"), {
  ssr: true
});
const Footer = dynamic(() => import("@/componentWebs/dreamer/Footer"), {
  ssr: true
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/bootstrap.min.css';
const awesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.min.css';

const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/owl.carousel.min.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/base.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/style.scss.css';
const styles = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/styles.scss.css';
const module = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/module.scss.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/responsive.scss.css';
const animate = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/animate.css';
const custom_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/dreamer/css/custom_style.css';

const jqueryjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/jquery-3.5.1.js';
const popperjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/popper.min.js';
const bootstrapjs = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/bootstrap.min.js';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';

if (isClient) {
  require('@/static/web/js/owl.carousel.js')
}

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

    // const logo = dataSite.logo

    // console.log('asPath :>> ', asPath);

    return (
      <React.Fragment>
        <Head>
          {/* <script src={`${jquery}`} />
          <script src={`${jsowl}`} /> */}
          {/* <link rel="icon" href={`${logo}`} type="image/x-icon" /> */}

          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${awesome}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styles}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${animate}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${custom_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />
          <script type="text/javascript" src={`${jqueryjs}`}></script>
          <script type="text/javascript" src={`${popperjs}`}></script>
          <script type="text/javascript" src={`${bootstrapjs}`}></script>\
        </Head>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <QuickMenu data={dataSite} />
        <Connect />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />

      </React.Fragment>
    )
  }
}
export default Index