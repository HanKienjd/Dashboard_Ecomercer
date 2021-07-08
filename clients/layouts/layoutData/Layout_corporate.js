/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import $ from 'jquery';

import { initJquery } from '@/static/web/js/main';

const { publicRuntimeConfig } = getConfig()

const Header = dynamic(() => import('@/componentWebs/template_corporate/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_corporate/Footer'), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const owl = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.carousel.css`
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.theme.default.css`
const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`
const animated = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/wow/animate.css`
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`
const onepage = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/onepage.css`
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/responsive.css`
const style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/style.css`
const substyle = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/subStyle.css`
const custom = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/custom.css`
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/template_corporate/css/bootstrap.css`
const wow = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/wow/wow.js`
const isotope = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/isotope.pkgd.min.js`

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
class Index extends React.Component {
  componentDidMount() {
    document.querySelector("body").classList.add("template-index", "no-transition", "stretched", "side-push-panel", "no-transition", "device-lg")
  }

  render() {
    const {
      menuHeader,
      menuFooter,
      cookies,
      dataSlide,
      dataSite,
      children,
      asPath
    } = this.props;
    const token = cookies
    // console.log(dataSite)
    return (
      <React.Fragment>
        <Head>

          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${substyle}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${onepage}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${custom}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${animated}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          <script src={`${wow}`} />
          {/* <script src={`${isotope}`}></script> */}

        </Head>

        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          dataSite={dataSite}
          asPath={asPath}
        />

        {children}
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