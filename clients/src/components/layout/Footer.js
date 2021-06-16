import React, { useState, useEffect } from "react";

import $ from "jquery";
const menuFooter = [
  {
    name: "Sản Phẩm",
    urlSlugs: "san-pham",
    children: [
      { name: "Sản phẩm nổi bật" },
      { name: "Sản phẩm khuyến mãi" },
      { name: "Sản phẩm bán chạy" },
      { name: "Rau củ nhập khẩu" },
    ],
  },
  { name: "Tin tức", urlSlugs: "tin-tuc" },
  { name: "Giới thiệu", urlSlugs: "gioi-thieu" },
  { name: "Liên hệ", urlSlugs: "lien-he" },
];

const Footer = (props) => {
  const [childMenu, setChildMenu] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);

  const checkScroll = (e) => {
    const scrollLimit = 100;
    if (e.srcElement.scrollingElement.scrollTop > scrollLimit && !backToTop) {
      setBackToTop(true);
    } else if (
      e.srcElement.scrollingElement.scrollTop < scrollLimit &&
      backToTop
    ) {
      setBackToTop(false);
    }
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    $("html").animate(
      {
        scrollTop: 0,
      },
      700
    );
    setBackToTop(false);
  };

  const activeFooter = (e, index) => {
    e.preventDefault();
    setChildMenu(!childMenu);
    setCurrentChild(index);
  };

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
                          src="/images/logofooter.png"
                          alt="logo Delta Fruits"
                        />
                      </a>
                    </div>
                    <div className="contactfooter">
                      <div className="flop">
                        <span className="icon">
                          <img src="/images/headphone.png" alt="liên hệ ngay" />
                        </span>
                        <div className="fright">
                          <p>Bạn cần tư vấn ?</p>
                          <a className="fone" href="tel:0388287614">
                            0388287614
                          </a>
                        </div>
                      </div>
                      <div className="flop mt">
                        <p>Thông tin địa chỉ</p>
                        <div className="section flex">
                          <span className="icon">
                            <img
                              src="/images/place.png"
                              alt="141-Chiến Thắng-Thanh Trì-Hà Nội"
                            />
                          </span>
                          <div className="fright">
                            <span>141-Chiến Thắng-Thanh Trì-Hà Nội</span>
                          </div>
                        </div>
                        <div className="section flex">
                          <span className="icon">
                            <img src="/img/email.png" alt="noreply@gmail.com" />
                          </span>
                          <div className="fright">
                            <a href="mailto:deltawebltd@gmail.com">
                              noreply@gmail.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="social_footer">
                      <ul className="follow_option">
                        <li>
                          <a href="#" title="Theo dõi Facebook Delta Fruits">
                            <i className="fab fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://twitter.com/"
                            title="Theo dõi Twitter Delta Fruits"
                          >
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
                        return (
                          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                            <div className="widget-ft first">
                              <h4 className="title-menu">
                                <a
                                  role="button"
                                  className={
                                    childMenu.status &&
                                    childMenu.index === index
                                      ? ""
                                      : "collapsed"
                                  }
                                  data-toggle="collapse"
                                >
                                  {item.name}
                                  <i
                                    className="fa fa-plus"
                                    onClick={(e) => this.activeFooter(e, index)}
                                  />
                                </a>
                              </h4>
                              <div
                                className={
                                  childMenu && currentChild === index
                                    ? "collapsed in"
                                    : "collapse"
                                }
                                id="collapseListMenu01"
                                style={
                                  childMenu && currentChild === index
                                    ? {}
                                    : { height: "0px" }
                                }
                                aria-expanded="false"
                              >
                                <ul className="list-menu">
                                  {item.children &&
                                    item.children.map((child) => (
                                      <li className="li_menu">
                                        <a href={`${child.urlSlugs}`}>
                                          {child.name}
                                        </a>
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
                <img src="/images/payment.png" alt="Các hình thức thành toán" />
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
                onClick={handleBackToTop}
                title="Lên đầu trang"
                style={{ position: "fixed" }}
              >
                <i
                  className="fa fa-angle-up"
                  aria-hidden="true"
                  style={{ position: "relative" }}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
