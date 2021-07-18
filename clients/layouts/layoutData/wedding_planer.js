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

const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/bootstrap-4-3-min.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/bpr.min.css';
const ekko_lightbox = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/ekko-lightbox.min.css';
const index = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/index.scss.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/main.scss.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/productReviews.min.css';
const quickviews_popup_cart = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/quickviews_popup_cart.scss.css';
const blog_article_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/blog_article_style.scss.css';
const collection_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/collection_style.scss.css';
const product_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/product_style.scss.css';
const contact_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/contact_style.scss.css';
const account_oder_style = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/account_oder_style.scss.css';
const cartpage = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/cartpage.scss.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/checkout.min.css';
const main2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/wedding_planer/css/main.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

const Header = dynamic(() => import(`@/componentWebs/wedding_planer/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/wedding_planer/Cart`), {
  ssr: true,
  loading: () => null,
})
const Footer = dynamic(() => import(`@/componentWebs/wedding_planer/Footer`), {
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
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={index} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={ekko_lightbox} />
          <link rel="stylesheet" href={blog_article_style} />
          <link rel="stylesheet" href={collection_style} />
          <link rel="stylesheet" href={product_style} />
          <link rel="stylesheet" href={quickviews_popup_cart} />
          <link rel="stylesheet" href={contact_style} />
          <link rel="stylesheet" href={account_oder_style} />
          <link rel="stylesheet" href={cartpage} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={main2} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link href="https://fonts.googleapis.com/css?family=Dancing+Script:400,700&amp;display=swap&amp;subset=vietnamese" rel="stylesheet" />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <Cart dataSite={dataSite} isClient={isClient} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    )
  }
}