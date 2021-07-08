import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout'

const { publicRuntimeConfig } = getConfig();

const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/connect_deal/css/main.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/connect_deal/css/checkout.min.css';
const bootstrapmin = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/bootstrapmin.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'
const slick = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/slick.css';

const Cart = dynamic(() => import(`@/componentWebs/connect_deal/Cart`), {
  ssr: true,
  loading: () => null,
});
const Header = dynamic(() => import(`@/componentWebs/connect_deal/Header`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/connect_deal/Footer`), {
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
          <link rel="stylesheet" href={slick} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={bootstrapmin} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={styleQuickMenu} />
          {/* <link rel="stylesheet" href={previewSlick} /> */}
          <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" />
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