import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import dynamic from 'next/dynamic';
import HeadLayout from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig();

const owlcarousel = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css';
const owlthemedefault = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css';

const base = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/base.scss.css';
const module_medisan = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/module_medisan.scss.css';
const responsive = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/responsive.scss.css';
const module = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/module.scss.css';
const plugin = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/plugin.scss.css';
const style = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/style.scss.css';
const ekkoLightBox = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/ekko-lightbox.min.css';
const fontawesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/medisan/css2/font-awesome.min.css';
const fontawesome5 = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css';
const styleQuickMenu = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/styleQuickMenu.css';



// const Cart = dynamic(() => import(`@/componentWebs/connect_deal/Cart`), {
//   ssr: true,
//   loading: () => null,
// });
const Header = dynamic(() => import(`@/componentWebs/medisan/Header`), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import(`@/componentWebs/medisan/Footer`), {
  ssr: true,
  loading: () => null,
});
// const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
//   ssr: true,
//   loading: () => null,
// });

if (isClient) {
  require('@/static/web/js/owl.carousel.js');
}
export default class Index extends React.Component {
  // componentDidMount() {
  //   console.log("medisan");
  // }
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
          <link rel="stylesheet" href={base} />
          <link rel="stylesheet" href={style} />
          <link rel="stylesheet" href={plugin} />
          <link rel="stylesheet" href={module} />
          <link rel="stylesheet" href={responsive} />
          <link rel="stylesheet" href={module_medisan} />
          <link rel="stylesheet" href={fontawesome} />
          <link rel="stylesheet" href={fontawesome5} />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={owlcarousel} />
          <link rel="stylesheet" href={owlthemedefault} />
          <link rel="stylesheet" href={ekkoLightBox} />

       
          {/* <link rel="stylesheet" href={previewSlick} />
          {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet" /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600,700%7CDancing+Script:400,500,700%7COswald:400,500,600,700" media="all"></link>
        </HeadLayout>
        {/* <Cart dataSite={dataSite} /> */}
        <Header menuHeader={menuHeader} dataSite={dataSite} asPath={asPath} />
        {children}
        {/* <QuickMenu data={dataSite} /> */}
        <Footer menuFooter={menuFooter} dataSite={dataSite} />
      </React.Fragment>
    )
  }
}