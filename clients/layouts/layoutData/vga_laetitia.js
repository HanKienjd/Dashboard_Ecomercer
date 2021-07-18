/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const animated = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/js/wow/animate.css`;
const wow = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/js/wow/wow.js`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/bootstrap.css`;

const all = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/all_plugin.css`;
const custom = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/custom_style.css`;
const menuMobile = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/menu-mobile.css`;
const slick = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/slick.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/style.css`;
const player = `${publicRuntimeConfig.DOMAIN_STATIC}/static/laetitia/css/www-player-webp.css`;

const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_laetitia/Header`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_laetitia/Footer`), {
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
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={custom} />
          <link rel="stylesheet" href={bootstrap} />

          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={menuMobile} />
          <link rel="stylesheet" href={slick} />
          <link rel="stylesheet" href={player} />

          <link rel="stylesheet" href={`${animated}`} type="text/css" media="all" />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={owlcarousel} />
          <script src={`${wow}`} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
