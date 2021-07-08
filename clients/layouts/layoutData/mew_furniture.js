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

const bootstrap_css = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/bootstrap_css.scss.css';
const mewint_css = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/mewint_css.scss.css';
const blogmate = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/blogmate.css';
const pagestyle = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/pagestyle.scss.css';
const collection_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/collection_style.scss.css';
const product_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/product_style.scss.css';
const main2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/main.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_furniture/css/checkout.min.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

const Header = dynamic(() => import(`@/componentWebs/mew_furniture/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/mew_furniture/Cart`), {
  ssr: true,
  loading: () => null,
})
const Footer = dynamic(() => import(`@/componentWebs/mew_furniture/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
export default class Index extends React.Component {
  componentDidMount() {
    // console.log(this.props)
  }
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
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={bootstrap_css} />
          <link rel="stylesheet" href={mewint_css} />
          <link rel="stylesheet" href={blogmate} />
          <link rel="stylesheet" href={pagestyle} />
          <link rel="stylesheet" href={collection_style} />
          <link rel="stylesheet" href={product_style} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={main2} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <Cart dataSite={dataSite} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    )
  }
}