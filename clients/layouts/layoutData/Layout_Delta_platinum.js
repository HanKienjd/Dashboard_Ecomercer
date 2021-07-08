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
import Head from '@/componentWebs/headLayout';
import dynamic from 'next/dynamic';

const { publicRuntimeConfig } = getConfig();
const Header = dynamic(() => import('@/componentWebs/delta_platinum/Header'), {
  ssr: true,
});

const Footer = dynamic(() => import('@/componentWebs/delta_platinum/Footer'), {
  ssr: true,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const fontawesome = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/delta_platinum/css/plugin.scss.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/delta_platinum/css/base.scss.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/delta_platinum/css/style.scss.css`;
const module11 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/delta_platinum/css/module.scss.css`;
const responsive = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/delta_platinum/css/responsive.scss.css`;
const script = `${publicRuntimeConfig.DOMAIN_STATIC}/static/delta_platinum/js/script.js`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

export default class Index extends React.Component {
  componentDidMount() {}

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

    // const logo = dataSite.logo

    // console.log('dataSite :>> ', dataSite);

    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={`${fontawesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${plugin}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${base}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${module11}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsive}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />

          <script type="text/javascript" src={`${script}`} />
        </Head>
        <div style={{ position: 'relative' }}>
          <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
          {children}
        </div>
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
        <QuickMenu data={dataSite} />
      </React.Fragment>
    );
  }
}
