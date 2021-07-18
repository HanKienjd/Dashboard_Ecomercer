/* eslint-disable react/no-danger */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout'
import dynamic from 'next/dynamic'

import { initJquery } from '@/static/web/js/main';

const { publicRuntimeConfig } = getConfig()

const Header = dynamic(() => import("@/componentWebs/wedding_studio/Header"), {
  ssr: true
});
const Footer = dynamic(() => import("@/componentWebs/wedding_studio/Footer"), {
  ssr: true
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});


const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/bootstrapmin.css`;
const fontAwesome5 = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/base.scss.css`;
const styleProduct = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/productReviews.min.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/style.scss.css`;
const update = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/update.scss.css`;
const module1 = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/module.scss.css`;
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/responsive.scss.css`;
const owl = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/owl.carousel.min.css`;
const custom = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/wedding_studio/css/custom_style.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`

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



          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${update}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module1}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${custom}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome5}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
          {/* <script type="text/javascript" src={`${owljs}`}></script> */}
          {/* <script type="text/javascript" src={`${bootstrapjs}`}></script> */}
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