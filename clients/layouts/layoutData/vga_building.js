/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import Head from '@/componentWebs/headLayout';

const { publicRuntimeConfig } = getConfig()
const Header = dynamic(() => import('@/componentWebs/vga_building/Header'), {
    ssr: true,
    loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/vga_building/Footer'), {
    ssr: true,
    loading: () => null,
});

const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
    ssr: true,
    loading: () => null,
});


const fontAwesome = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/fontawesome5/css/all.css`;
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/styleQuickMenu.css`
const owl = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.carousel.css`
const owltheme = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/css/owl.theme.default.css`
const checkoutCss = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_building/css/checkoutcustom.css`
const myBootstrap = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_building/css/my-bootstrap.css`
const indexCss = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_building/css/index.css`
const responsiveCss = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/vga_building/css/responsive.css`
const jquery = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/jquery-3.5.1.js`
const smoothScroll = `${publicRuntimeConfig.DOMAIN_STATIC  }/static/web/js/SmoothScroll.js`

class Index extends React.PureComponent {
    render() {
        const {
            menuHeader,
            menuFooter,
            cookies,
            dataSite,
            children,
            asPath
        } = this.props;
        const token = cookies
        return (
          <React.Fragment>
            <Head>
              <link rel="stylesheet" href={`${myBootstrap}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${indexCss}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${responsiveCss}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${checkoutCss}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
              <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />

              <link rel="stylesheet" href={`${styleQuickMenu}`} type="text/css" media="all" />
              <link
                href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Krub:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                rel="stylesheet"
              />
              <script src={jquery} />
              <script src={smoothScroll} />
            </Head>
            <Header
              key="web-header"
              menuCategories={menuHeader}
              token={token}
              dataSite={dataSite}
              asPath={asPath}
            />
            {children}
            <QuickMenu data={dataSite} />
            <Footer
              key="web-footer"
              menuCategories={menuFooter}
              dataSite={dataSite}
            />
          </React.Fragment>
        )
    }
}
export default Index