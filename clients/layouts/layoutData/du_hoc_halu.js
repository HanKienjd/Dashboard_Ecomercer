/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout'

const { publicRuntimeConfig } = getConfig();

const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/du_hoc_halu/css/base.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/du_hoc_halu/css/style.scss.css';
const bpr_products_module = publicRuntimeConfig.DOMAIN_STATIC + '/static/du_hoc_halu/css/bpr-products-module.css';
const lightbox = publicRuntimeConfig.DOMAIN_STATIC + '/static/du_hoc_halu/css/lightbox.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/du_hoc_halu/css/main.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

const Header = dynamic(() => import(`@/componentWebs/du_hoc_halu/Header`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/du_hoc_halu/Footer`), {
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
      asPath
    } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={bpr_products_module} />
          <link rel="stylesheet" href={lightbox} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={styleQuickMenu} />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    )
  }
}