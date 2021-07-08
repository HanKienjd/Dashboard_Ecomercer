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
import $ from 'jquery';

const { publicRuntimeConfig } = getConfig();

const animate = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/animate.css';
const bootstrap_select = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/bootstrap-select.css';
const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/bootstrap.min.css';
const bpr_products_module = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/bpr-products-module.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/bpr.min.css';
const jquery_fancybox = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/jquery.fancybox.scss.css';
const normalize = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/normalize.css';
const owl_carousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/owl.carousel.css';
const owl_theme = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/owl.theme.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/productReviews.min.css';
const slick = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/slick.css';
const style_optimize = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/style_optimize.scss.css';
const style_prdreview = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/style_prdreview.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/style.scss.css';
const main2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/it_solution/css/main.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'


if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
const Header = dynamic(() => import(`@/componentWebs/it_solution/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/it_solution/Cart`), {
  ssr: false,
  loading: () => null,
})
const Footer = dynamic(() => import(`@/componentWebs/it_solution/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

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
          <link rel="stylesheet" href={animate} />
          <link rel="stylesheet" href={bootstrap_select} />
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={bpr_products_module} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={jquery_fancybox} />
          <link rel="stylesheet" href={owl_carousel} />
          <link rel="stylesheet" href={owl_theme} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={slick} />
          <link rel="stylesheet" href={style_optimize} />
          <link rel="stylesheet" href={style_prdreview} />
          <link rel="stylesheet" href={style} />
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