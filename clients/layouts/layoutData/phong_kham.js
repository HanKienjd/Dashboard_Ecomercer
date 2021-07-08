/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC}/static/phong_kham/css/base.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/phong_kham/css/bootstrap.css`;
const copy = `${publicRuntimeConfig.DOMAIN_STATIC}/static/phong_kham/css/copy.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/phong_kham/Header`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/phong_kham/Footer`), {
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
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={copy} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
