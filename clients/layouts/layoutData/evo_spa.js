/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/bootstrap.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/plugin.css';
const index = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-index.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-main.css';
const evoPage = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-pages.css';
const evoContact = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-contacts.css';
const evoBlog = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-blogs.css';
const evoArticle = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-article.css';
const evoProduct = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-products.css';
const picbox = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/picbox.css';
const product = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/bpr-products-module.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/checkout.min.css';
const evoDichVu = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-dich-vu.css';
const evoCollection = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_spa/css/evo-collections.css';

const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
const Header = dynamic(() => import(`@/componentWebs/evo_spa/Header`), {
  ssr: true,
  loading: () => null,
});
const ModalCart = dynamic(() => import(`@/componentWebs/evo_spa/ModalCart`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/evo_spa/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});
export default class Index extends React.Component {
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
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={index} />

          {/* <link rel="stylesheet" href={fontAwesome} /> */}
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={evoPage} />
          <link rel="stylesheet" href={evoContact} />
          <link rel="stylesheet" href={evoBlog} />
          <link rel="stylesheet" href={evoArticle} />
          <link rel="stylesheet" href={product} />
          <link rel="stylesheet" href={evoProduct} />
          <link rel="stylesheet" href={picbox} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={evoDichVu} />
          <link rel="stylesheet" href={evoCollection} />

          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <ModalCart dataSite={dataSite} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    );
  }
}
