/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import $ from 'jquery';

import { initJquery } from '@/static/web/js/main';

const { publicRuntimeConfig } = getConfig();

const Header = dynamic(() => import('@/componentWebs/template_evo_tour/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_evo_tour/Footer'), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/bootstrapmin.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/template_evo_tour/web/css/evo-index.css`;
const style2 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/template_evo_tour/web/css/evo-main.css`;
const style3 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-blogs.css`;
const style4 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-pages.css`;
const style5 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-contacts.css`;
const style6 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-article.css`;
const style7 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-collections.css`;
const style8 = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_evo_tour/web/css/evo-products.css`;
const owl = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
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
      children,
      asPath,
    } = this.props;
    const token = cookies;
    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style2}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${style3}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style4}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style5}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style6}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style7}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${style8}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
        </Head>
        <Header
          key="web-header"
          menuCategories={menuHeader}
          token={token}
          dataSite={dataSite}
          asPath={asPath}
        />

        {children}
        {/* <Widget /> */}
        <QuickMenu data={dataSite} />
        <Footer key="web-footer" menuCategories={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
export default Index;
