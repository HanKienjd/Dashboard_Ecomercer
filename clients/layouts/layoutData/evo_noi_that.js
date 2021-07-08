/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout'

const { publicRuntimeConfig } = getConfig();

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/bootstrap.scss.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/plugin.scss.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/base.scss.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/main.scss.css';
const fontawesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/font-awesome.min.css';
const index = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/index.scss.css';
const slick = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/slick.scss.css';
const collections = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/collections.scss.css';
const products = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/products.scss.css';
const picbox = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/picbox.scss.css';
const bprproductsmodule = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/bpr-products-module.scss.css';
const blogs = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/blogs.scss.css';
const article = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/article.scss.css';
const contacts = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/contacts.scss.css';
const accounts = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/accounts.scss.css';
const evo_carts = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/evo-carts.scss.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/checkout.min.css';
const select2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/select2-v4.1.0.min.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const main2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/evo_noi_that/css/main2.scss.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
const Header = dynamic(() => import(`@/componentWebs/evo_noi_that/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/evo_noi_that/Cart`), {
  ssr: true,
  loading: () => null,
})
const Footer = dynamic(() => import(`@/componentWebs/evo_noi_that/Footer`), {
  ssr: true,
  loading: () => null,
})
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
      asPath
    } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={fontawesome} />
          <link rel="stylesheet" href={index} />
          <link rel="stylesheet" href={slick} />
          <link rel="stylesheet" href={collections} />
          <link rel="stylesheet" href={products} />
          <link rel="stylesheet" href={picbox} />
          <link rel="stylesheet" href={bprproductsmodule} />
          <link rel="stylesheet" href={blogs} />
          <link rel="stylesheet" href={article} />
          <link rel="stylesheet" href={contacts} />
          <link rel="stylesheet" href={accounts} />
          <link rel="stylesheet" href={evo_carts} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={select2} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={main2} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Cart dataSite={dataSite} />
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    )
  }
}