/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import { ConfigProvider } from 'antd';
import getConfig from 'next/config';
import viVN from 'antd/lib/locale/vi_VN';
import dynamic from 'next/dynamic';
import { isClient, getComponentDisplayName } from '@/utils/helpers';
import Head from '@/componentWebs/headLayout';
import $ from 'jquery';

import { initJquery } from '@/static/web/js/main';
const { publicRuntimeConfig } = getConfig()

const Header = dynamic(() => import('@/componentWebs/mew_nature/Header'), {
  ssr: true,
  loading: () => null,
});

const Cart = dynamic(() => import('@/componentWebs/mew_nature/Cart'), {
  ssr: true,
  loading: () => null,
});
const Footer = dynamic(() => import('@/componentWebs/mew_nature/Footer'), {
  ssr: true,
  loading: () => null,
});
const QuickMenu = dynamic(() => import('@/componentWebs/QuickMenu'), {
  ssr: true,
  loading: () => null,
});





const owl = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.carousel.css'
const owltheme = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/owl.theme.default.css'
const fontAwesome = publicRuntimeConfig.DOMAIN_STATIC + '/static/web/css/fontawesome5/css/all.css'
const styleQuickMenu = `${publicRuntimeConfig.DOMAIN_STATIC}/static/web/css/styleQuickMenu.css`;

const owl2 = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/owlcarousel.scss.css'
const bootstrap = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/bootstrap_css.scss.css'
const mewint = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/mewint_css.scss.css'
const blogmate = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/blogmate.css'
const collection = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/collection_style.scss.css'
const pageStyle = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/pagestyle.scss.css'
const swatch = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/swatch_style.scss.css'
const product = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/product_style.scss.css'
const checkout = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/checkout.min.css'

const restyle = publicRuntimeConfig.DOMAIN_STATIC + '/static/mew_nature/css/restyle.css'





if (isClient) {
  require('@/static/web/js/owl.carousel');
}
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      mobileMenuTimeout: false,
      menu2: {
        status: false,
        id: null
      },
      menu3: {
        status: false,
        id: null
      }
    }
  }

  toggleMenu = () => {
    this.setState({
      mobileMenu: !this.state.mobileMenu,
    });
    const { mobileMenuTimeout } = this.state;
    if (mobileMenuTimeout) {
      setTimeout(() => {
        this.setState({
          mobileMenuTimeout: false
        });
      }, 5000);
    } else {
      this.setState({
        mobileMenuTimeout: true
      });
    }
  }

  toggleMenu2 = (id) => {
    const { menu2 } = this.state;
    this.setState({
      menu2: {
        status: !menu2.status,
        id: id
      }
    })
  }

  toggleMenu3 = (id, id2) => {
    const { menu3 } = this.state;
    this.setState({
      menu3: {
        status: !menu3.status,
        id: id,
        id2: id2
      }
    })
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

    } = this.props;
    const token = cookies

    const { mobileMenu, mobileMenuTimeout, menu2, menu3 } = this.state;
    let styleMenu = 'hidden-md hidden-lg mm-menu mm-offcanvas';
    if (mobileMenuTimeout) {
      styleMenu = 'hidden-md hidden-lg mm-menu mm-offcanvas mm-current mm-opened';
    }
    const menuIsActive = 'mm-panel mm-hasnavbar mm-highest mm-current mm-opened';
    const menuOff = 'mm-panel mm-hasnavbar mm-highest'
    return (
      <React.Fragment>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />

          <link rel="stylesheet" href={`${owl}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owltheme}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${fontAwesome}`} type="text/css" media="all" />
          <link rel="stylesheet" href={styleQuickMenu} />
          <link rel="stylesheet" href={`${checkout}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${bootstrap}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${mewint}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${owl2}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${blogmate}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${collection}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${pageStyle}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${swatch}`} type="text/css" media="all" />
          <link rel="stylesheet" href={`${product}`} type="text/css" media="all" />

          <link rel="stylesheet" href={`${restyle}`} type="text/css" media="all" />

          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0" nonce="syL1ExxB"></script>
        </Head>
        <Cart dataSite={dataSite} />

        <nav id="nav-mobile" className={styleMenu}>
          <div className="mm-panels">
            <div className="mm-panel mm-hasnavbar mm-opened mm-current" id="mm-1">
              <div className="mm-navbar">
                <a className="mm-title">Danh mục</a>
              </div>
              <ul className="mm-listview">
                {
                  menuHeader && menuHeader.length > 0 &&
                  menuHeader.map((item, index) => {
                    return (
                      <li key={item.id}>
                        {
                          item.children && item.children.length > 0 &&
                          <a className="mm-next" onClick={() => this.toggleMenu2(index)} data-target="#mm-3" />
                        }
                        <a href={item.urlSlugs === '/' ? '/' : `/${item.urlSlugs}`}>
                          {item.name}
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            {
              menuHeader && menuHeader.length > 0 &&
              menuHeader.map((item, index) => {
                let isChild = false;
                if (item.children && item.children.length > 0) {
                  isChild = true;
                }
                if (isChild) {
                  return (
                    <div key={item.id} className={menu2.status && menu2.id === index ? menuIsActive : menuOff} id="mm-2">
                      <div className="mm-navbar">
                        <a className="mm-btn mm-prev" onClick={() => this.toggleMenu2(index)} data-target="#mm-1" />
                        <a className="mm-title">
                          {item.name}
                        </a>
                      </div>
                      <ul className="mm-listview">
                        {
                          item.children.map((item2, index2) => {
                            return (
                              <li key={item2.id}>
                                {item2.children && item2.children.length > 0 &&
                                  <a className="mm-next" onClick={() => this.toggleMenu3(index, index2)} data-target="#mm-3" />
                                }
                                <a href={item2.urlSlugs}>
                                  {item2.name}
                                </a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                }
              })
            }
            {
              menuHeader && menuHeader.length > 0 &&
              menuHeader.map((item, index) => {
                return (
                  <>
                    {
                      item.children && item.children.length > 0 &&
                      item.children.map((item2, index2) => {
                        return (
                          <>
                            {
                              item2.children && item2.children.length > 0 &&
                              <div key={item2.id} className={menu3.status && menu3.id === index && menu3.id2 === index2 ? menuIsActive : menuOff} id="mm-3">
                                <div className="mm-navbar">
                                  <a className="mm-btn mm-prev" onClick={() => this.toggleMenu3(index, index2)} data-target="#mm-3" />
                                  <a className="mm-title">
                                    {item2.name}
                                  </a>
                                </div>
                                <ul className="mm-listview">
                                  {
                                    item2.children.map((item3, index3) => {
                                      return (
                                        <li key={item3.id}>
                                          {item3.children && item3.children.length > 0 &&
                                            <a className="mm-next" onClick={() => this.toggleMenu3(index2)} data-target="#mm-3" />
                                          }
                                          <a href={item3.urlSlugs} >
                                            {item3.name}
                                          </a>
                                        </li>
                                      )
                                    })
                                  }
                                </ul>
                              </div>
                            }
                          </>
                        )
                      })
                    }
                  </>
                )
              })
            }
          </div>
        </nav>
        <div id="mm-blocker" className="mm-slideout" onClick={this.toggleMenu} />
        <div className='page-body mm-page mm-slideout' id='mm-0' style={mobileMenu ? { minHeight: 992, background: 'white' } : { background: 'white' }}>

          <Header
            key="web-header"
            menuCategories={menuHeader}
            token={token}
            asPath={this.props.asPath}
            dataSite={dataSite}
            toggleMenu={this.toggleMenu}
            mobileMenu={mobileMenu}
          />
          {children}
          <QuickMenu data={dataSite} />
          <Footer
            key="web-footer"
            menuCategories={menuFooter}
            dataSite={dataSite}
          />
        </div>

      </React.Fragment>
    )
  }
}
export default Index