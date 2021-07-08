import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout'

const { publicRuntimeConfig } = getConfig();

const all = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/all.css';
const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/base.scss.css';
const bpr = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/bpr.min.css';
const bpr_products = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/bpr-products-module.css';
const module = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/module.scss.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/plugin.scss.css';
const productReviews = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/productReviews.min.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/responsive.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/style.scss.css';
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/checkout.min.css';
const main = publicRuntimeConfig.DOMAIN_STATIC + '/static/cool_beauty/css/main.css';
const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css'

const Header = dynamic(() => import(`@/componentWebs/cool_beauty/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/cool_beauty/Cart`), {
  ssr: true,
  loading: () => null,
})
const Footer = dynamic(() => import(`@/componentWebs/cool_beauty/Footer`), {
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
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={bpr_products} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link href="https://fonts.googleapis.com/css?family=Muli:400,600,700&amp;subset=vietnamese" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Quicksand:400,700&amp;subset=vietnamese" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} dataSlide={dataSlide} />
        {children}
        <Cart dataSite={dataSite} isClient={isClient} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    )
  }
}