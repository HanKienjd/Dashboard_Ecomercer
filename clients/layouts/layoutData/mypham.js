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

const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/base.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/bpr.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/plugin.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/productReviews.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/responsive.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/style.css';
const lightbox = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/lightbox.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/mypham/css/checkout.min.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';

const Header = dynamic(() => import(`@/componentWebs/mypham/Header`), {
  ssr: true,
  loading: () => null,
});

const ModalCart = dynamic(() => import(`@/componentWebs/mypham/ModalCart`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/mypham/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: false,
  loading: () => null,
});

// if (isClient) {
//   require('@/static/web/js/owl.carousel.js');
// }
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
      asPath,
    } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={lightbox} />
          <link rel="stylesheet" href={checkout} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <ModalCart dataSite={dataSite} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
