/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.carousel.css`;
const bootstrap = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/bootstrap.css`;
const index = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-index.css`;
const article = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-article.css`;
const main = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-main.css`;
const modal = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/modal.css`;
const contacts = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-contacts.css`;
const pages = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-pages.css`;
const products = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-products.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/plugin.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/checkout.min.css`;
const collections =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-collections.css`;
const blog = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_market/css/evo-blogs.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/vga_market/Header`), {
  ssr: true,
  loading: () => null,
});

const ModalCart = dynamic(() => import(`@/componentWebs/vga_market/ModalCart`), {
  ssr: true,
  loading: () => null,
});

const Footer = dynamic(() => import(`@/componentWebs/vga_market/Footer`), {
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
          <link rel="stylesheet" href={bootstrap} />
          <link rel="stylesheet" href={index} />
          <link rel="stylesheet" href={pages} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={article} />
          <link rel="stylesheet" href={contacts} />
          <link rel="stylesheet" href={products} />
          <link rel="stylesheet" href={modal} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={checkout} />

          <link rel="stylesheet" href={collections} />
          <link rel="stylesheet" href={blog} />

          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={styleQuickMenu} />

          <link rel="stylesheet" href={owlcarousel} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}

        <QuickMenu data={dataSite} />
        <ModalCart dataSite={dataSite} />
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    );
  }
}
