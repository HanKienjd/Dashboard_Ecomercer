/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import dynamic from 'next/dynamic';
import { isClient } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Header = dynamic(() => import('@/componentWebs/template_logistic/Header'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/template_logistic/Footer'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

const owl = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`;
const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/bootstrapmin.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const indexCss = `${publicRuntimeConfig.DOMAIN_STATIC}/static/template_logistic/css/index.css`;
const mainCss = `${publicRuntimeConfig.DOMAIN_STATIC}/static/template_logistic/css/main.css`;
const responsiveCss = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_logistic/css/responsive.css`;
const wowCss = `${publicRuntimeConfig.DOMAIN_STATIC}/static/template_logistic/css/animate.min.css`;
const wowJs = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/js/wow/wow.js`;
const blogCss = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/template_logistic/css/blog_article_style.css`;

if (isClient) {
  require('@/static/web/js/owl.carousel');
}
export default class Index extends React.Component {
  componentDidMount() {}

  render() {
    const { menuHeader, menuFooter, cookies, dataSite, children, asPath } = this.props;
    const token = cookies;
    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href={`${mainCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${indexCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${responsiveCss}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${blogCss}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${wowCss}`} />
          <link rel="stylesheet" href={styleQuickMenu} />

          <script src={`${wowJs}`} />
        </Head>
        <Header
          key="web-header"
          menuHeader={menuHeader}
          token={token}
          dataSite={dataSite}
          asPath={asPath}
        />

        {children}
        <QuickMenu data={dataSite} />
        <Footer key="web-footer" menuCategories={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
