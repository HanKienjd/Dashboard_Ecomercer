import React from 'react';
// import cookie from 'cookie';
// import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
// import viVN from 'antd/lib/locale/vi_VN';
import { isClient } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';

const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/base.scss.css';
const all = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/all.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/responsive.scss.css';
const module = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/module.scss.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/plugin.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/style.scss.css';
// const ekkoLightBox = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/ekko-lightbox.min.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/bpr.min.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/vga_giasu/css/productReviews.min.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;


const Header = dynamic(() => import(`@/componentWebs/vga_giasu/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import('@/componentWebs/mew_nature/Cart'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/vga_giasu/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: false,
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
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={style} />
          {/* <link rel="stylesheet" href={ekkoLightBox} /> */}


       
          {/* <link rel="stylesheet" href={previewSlick} />
          {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600,700%7CDancing+Script:400,500,700%7COswald:400,500,600,700" media="all"></link>
        </HeadLayout>
        <Cart dataSite={dataSite} />
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    )
  }
}