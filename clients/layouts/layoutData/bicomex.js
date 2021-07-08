import React from 'react';
import getConfig from 'next/config';

import { isClient} from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const all = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/all.css`;
const base = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/base.scss.css`;
const bpr = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/bpr.min.css`;
const module = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/module.scss.css`;
const plugin = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/plugin.scss.css`;
const productReviews =
  `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/productReviews.min.css`;
const responsive = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/responsive.scss.css`;
const style = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/style.scss.css`;
const checkout = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/checkout.min.css`;
const main = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/bicomex/css/main.css`;
const owlcarousel = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.carousel.css`;
const owlthemedefault = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.theme.default.css`;
const fontawesome5 = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`;

const Header = dynamic(() => import(`@/componentWebs/bicomex/Header`), {
  ssr: true,
  loading: () => null,
});
const Cart = dynamic(() => import(`@/componentWebs/bicomex/Cart`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/bicomex/Footer`), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});


export default class Index extends React.Component {
  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const {
      menuHeader,
      menuFooter,
      dataSlide,
      dataSite,
      children,
      asPath,
    } = this.props;
    return (
      <React.Fragment>
        <HeadLayout>
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={all} />
          <link rel="stylesheet" href={bpr} />
          <link rel="stylesheet" href={productReviews} />
          <link rel="stylesheet" href={checkout} />
          <link rel="stylesheet" href={main} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link
            href="//fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
            type="text/css"
          />
        </HeadLayout>
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} dataSlide={dataSlide} />
        {children}

        <Cart dataSite={dataSite} isClient={isClient} />
        <QuickMenu data={dataSite} />
        <Footer menuFooter={menuFooter} />
      </React.Fragment>
    );
  }
}
