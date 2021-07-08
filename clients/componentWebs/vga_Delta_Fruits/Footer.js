/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';

@connect(({ webs, cart, webs: { dataAd } }) => ({
  webs,
  cart,
  dataAd,
}))
class Footer extends React.PureComponent {
  state = {
    backToTop: false,
    childMenu: false,
    currentChild: null,
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.checkScroll);
  }

  checkScroll = e => {
    const scrollLimit = 100;
    if (e.srcElement.scrollingElement.scrollTop > scrollLimit && !this.state.backToTop) {
      this.setState({
        backToTop: true,
      });
    } else if (e.srcElement.scrollingElement.scrollTop < scrollLimit && this.state.backToTop) {
      this.setState({
        backToTop: false,
      });
    }
  };

  backToTop = e => {
    e.preventDefault();
    $('html').animate(
      {
        scrollTop: 0,
      },
      700
    );
    this.setState({
      backToTop: false,
    });
  };

  activeFooter = (e, index) => {
    const { childMenu } = this.state;
    e.preventDefault();
    this.setState({
      childMenu: !childMenu,
      currentChild: index,
    });
  };

  render() {
    const { dataSite, menuFooter } = this.props;
    const { childMenu, currentChild } = this.state;
    // console.log(childMenu)
    return (
      <React.Fragment>
        <footer className="footer ">
          <div className="site-footer">
            <div className="mid-footer">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                    <div className="widget-ft last social_footer">
                      <div className="blocklogo">
                        <a href="/" className="logofooter">
                          <img
                            src={getResponsiveImage(dataSite.logo && dataSite.logo.split(',')[0])}
                            alt="logo Delta Fruits"
                          />
                        </a>
                      </div>
                      <div className="contactfooter">
                        <div className="flop">
                          <span className="icon">
                            <img
                              src="/static/vga_deltafruits/img/headphone.png"
                              alt="liên hệ ngay"
                            />
                          </span>
                          <div className="fright">
                            <p>Bạn cần tư vấn ?</p>
                            <a className="fone" href="tel:0388287614">
                              {dataSite.places.mobile}
                            </a>
                          </div>
                        </div>
                        <div className="flop mt">
                          <p>Thông tin địa chỉ</p>
                          <div className="section flex">
                            <span className="icon">
                              <img
                                src="/static/vga_deltafruits/img/place.png"
                                alt={dataSite.places.address}
                              />
                            </span>
                            <div className="fright">
                              <span>{dataSite.places.address}</span>
                            </div>
                          </div>
                          <div className="section flex">
                            <span className="icon">
                              <img
                                src="/static/vga_deltafruits/img/email.png"
                                alt={dataSite.places.email}
                              />
                            </span>
                            <div className="fright">
                              <a href="mailto:deltawebltd@gmail.com">{dataSite.places.email}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="social_footer">
                        <ul className="follow_option">
                          <li>
                            <a
                              href="https://www.facebook.com/VGA-SOFT-103011295020063/"
                              title="Theo dõi Facebook Delta Fruits"
                            >
                              <i className="fab fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="https://twitter.com/" title="Theo dõi Twitter Delta Fruits">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.google.com/"
                              title="Theo dõi Google Plus Delta Fruits"
                            >
                              <i className="fab fa-google" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/"
                              title="Theo dõi Instagam Delta Fruits"
                            >
                              <i className="fab fa-instagram-square" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/"
                              title="Theo dõi Youtube Delta Fruits"
                            >
                              <i className="fab fa-youtube" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-7 col-sm-12 col-xsm-12">
                    <div className="row rowsfooter">
                      {menuFooter &&
                        menuFooter.length > 0 &&
                        menuFooter.map((item, index) => {
                          // console.log(item)
                          return (
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                              <div className="widget-ft first">
                                <h4 className="title-menu">
                                  <a
                                    role="button"
                                    className={
                                      childMenu.status && childMenu.index === index
                                        ? ''
                                        : 'collapsed'
                                    }
                                    data-toggle="collapse"
                                  >
                                    {item.name}
                                    <i
                                      className="fa fa-plus"
                                      onClick={e => this.activeFooter(e, index)}
                                    />
                                  </a>
                                </h4>
                                <div
                                  className={
                                    childMenu && currentChild === index
                                      ? 'collapsed in'
                                      : 'collapse'
                                  }
                                  id="collapseListMenu01"
                                  style={
                                    childMenu && currentChild === index ? {} : { height: '0px' }
                                  }
                                  aria-expanded="false"
                                >
                                  <ul className="list-menu">
                                    {item.children &&
                                      item.children.map(child => (
                                        <li className="li_menu">
                                          <a href={`${child.urlSlugs}`}>{child.name}</a>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment_e">
              <div className="container a-center">
                <div className="iigpay">
                  <img
                    src="/static/vga_deltafruits/img/payment.png"
                    alt="Các hình thức thành toán"
                  />
                </div>
              </div>
            </div>
            <div className="bg-footer-bottom copyright clearfix">
              <div className="container">
                <div className="inner clearfix">
                  <div className="row tablet" />
                </div>
                <a
                  id="back-to-top"
                  className="backtop show"
                  onClick={this.backToTop}
                  title="Lên đầu trang"
                  style={{ position: 'fixed' }}
                >
                  <i
                    className="fa fa-angle-up"
                    aria-hidden="true"
                    style={{ position: 'relative' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
export default Footer;
