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

const Header = dynamic(() => import('@/componentWebs/template_sea_event/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_sea_event/Footer'), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});




const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css'
const owltheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css'
const fontAwesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css'
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_event/web/css/base.css'
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_event/web/css/plugin.css'
const sea = publicRuntimeConfig.DOMAIN_STATIC + '/static/template_sea_event/web/css/sea.css'
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'
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
      children
    } = this.props;
    const token = cookies
    return (
      <React.Fragment>
        <Head>

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${sea}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
        </Head>
        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          dataSite={dataSite}
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