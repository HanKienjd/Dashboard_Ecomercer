import React from 'react';
import getConfig from 'next/config';
import { isClient } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const all = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/all.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/base.css`;
const roboto = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/font-roboto.css`;
const module = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/module.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/plugin.css`;
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/responsive.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_car/css/style.css`;

const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const owlthemedefault = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`;
const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_coffee/css/checkout.min.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_car/Header`), {
  ssr: true,
  loading: () => null,
});

const ModalCart = dynamic(() => import(`@/componentWebs/vga_car/ModalCart`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_car/Footer`), {
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
          <link rel="stylesheet" href={checkout} />

          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={base} />

          <link rel="stylesheet" href={roboto} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={responsive} />
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
