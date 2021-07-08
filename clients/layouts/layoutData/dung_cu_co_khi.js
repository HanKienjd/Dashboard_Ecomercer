import React, { Component } from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';

import dynamic from 'next/dynamic';

const { publicRuntimeConfig } = getConfig();

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}

const Header = dynamic(() => import('@/componentWebs/dung_cu_co_khi/Header'), {
  ssr: true,
});
const Footer = dynamic(() => import('@/componentWebs/dung_cu_co_khi/Footer'), {
  ssr: true,
});
const ModalCart = dynamic(() => import('@/componentWebs/dung_cu_co_khi/ModalCart'), {
  ssr: true,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/dung_cu_co_khi/css/base.css';
const css = publicRuntimeConfig.DOMAIN_STATIC + '/static/dung_cu_co_khi/css/css.css';
const fontAwesome =
  publicRuntimeConfig.DOMAIN_STATIC + '/static/dung_cu_co_khi/css/font-awesome.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/dung_cu_co_khi/css/style.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/dung_cu_co_khi/css/checkout.min.css';

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
      asPath,
    } = this.props;
    console.log('children', children);

    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={css} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={owlcarousel} />
        </Head>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} asPath={asPath} />
        <ModalCart dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
export default Index;
