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

const Header = dynamic(() => import('@/componentWebs/mb1o4er/Header'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import('@/componentWebs/mb1o4er/Cart'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/mb1o4er/Footer'), {
  ssr: true,
  loading: () => null,
});





const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css'
const owltheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css'
const fontAwesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css'

const all = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/all.css'
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/responsive.scss.css'
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/base.scss.css'
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/plugin.scss.css'
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/style.scss.css'
const bqr = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/bpr-products-module.css'
const popup = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/popup-register-default.min.css'
const module = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/module.scss.css'
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/checkout.min.css'
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;
const re_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/mb1o4er/css/re_style.css'


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
    // console.log(this.props)
    return (
      <React.Fragment>
        <Head>

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${checkout}`} type="text/css" media="all" />
          {/* <link rel="stylesheet" href={`${popup}`} type="text/css" media="all" /> */}
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${re_style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />

          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0" nonce="syL1ExxB"></script>
        </Head>
        <Cart dataSite={dataSite} />

        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          asPath={this.props.asPath}
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