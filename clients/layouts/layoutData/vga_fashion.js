import React from 'react';
import getConfig from 'next/config';
import { isClient } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.carousel.css`;
const owlthemedefault = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/owl.theme.default.css`;
const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/fontawesome5/css/all.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const index = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_fashion/css/index.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_fashion/css/bootstrap.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC}/static/vga_fashion/css/checkout.min.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_fashion/Header`), {
  ssr: true,
  loading: () => null,
});

const Modal = dynamic(() => import(`@/componentWebs/vga_fashion/Modal`), {
  ssr: true,
  loading: () => null,
});


const Footer = dynamic(() => import(`@/componentWebs/vga_fashion/Footer`), {
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
    const { menuHeader, menuFooter, dataSite, children, asPath } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link
            href="//fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
            type="text/css"
          />

          <link rel="stylesheet" href={index} />
          <link rel="stylesheet" href={bootstrap} />

          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={checkout} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <Modal dataSite={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
