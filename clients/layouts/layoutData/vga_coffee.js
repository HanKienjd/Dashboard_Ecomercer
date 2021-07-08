import React from 'react';
import getConfig from 'next/config';
import { isClient } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const all = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/base.css`;
const css = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/css.css`;
const ekkoLightbox = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/ekko-lightbox.css`;
const module = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/module.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/plugin.css`;
const productReviews = `${
  publicRuntimeConfig.DOMAIN_STATIC
}/static/vga_coffee/css/productReviews.css`;

const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/responsive.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/style.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/checkout.min.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const owlthemedefault = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`;
const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_coffee/Header`), {
  ssr: true,
  loading: () => null,
});

const ModalCart = dynamic(() => import(`@/componentWebs/vga_coffee/ModalCart`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_coffee/Footer`), {
  ssr: true,
  loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});

if (isClient) {
  // eslint-disable-next-line global-require
  require('@/static/web/js/owl.carousel.js');
}
export default class Index extends React.Component {
  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const { menuHeader, menuFooter, dataSlide, dataSite, children, asPath } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link
            href="//fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
            type="text/css"
          />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={css} />
          <link rel="stylesheet" href={ekkoLightbox} />
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={base} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} dataSlide={dataSlide} />
        {children}

        <ModalCart dataSite={dataSite} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
