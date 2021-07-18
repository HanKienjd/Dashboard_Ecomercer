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

const Header = dynamic(() => import('@/componentWebs/template_vin_house/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_vin_house/Footer'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css'
const owltheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css'
const animate = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/wow/animate.css'
const fontAwesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css'
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_vin_house/web/css/style.css'
const style2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_vin_house/web/css/style2.css'
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_vin_house/web/css/responsive.css'
const fix = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_vin_house/web/css/fix.css'
const bst = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_vin_house/web/css/bootstrap.css'
const wow = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/js/wow/wow.js'
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

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
    // console.log("dataSite", dataSite)
    return (
      <React.Fragment>
        <Head>


          <link rel="stylesheet" href={`${bst}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style2}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fix}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
          />

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${animate}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          {/* <script src={`${isotope}`}></script> */}
          <script src={`${wow}`}></script>

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