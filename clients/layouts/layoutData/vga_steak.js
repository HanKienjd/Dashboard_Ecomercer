/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const main = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/main.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/bootstrap.css`;
const index = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/index.css`;
const css = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/css.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/style.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/plugin.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_steak/css/checkout.min.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_steak/Header`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_steak/Footer`), {
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
    const { menuHeader, menuFooter, dataSite, children, asPath } = this.props;
    console.log('children', children);
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={index} />
          <link rel="stylesheet" href={plugin} />

          <link
            href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link href="https://use.fontawesome.com/releases/v5.0.1/css/all.css" rel="stylesheet" />

          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={css} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={owlcarousel} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
