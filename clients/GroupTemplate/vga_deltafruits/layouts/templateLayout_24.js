/* eslint-disable no-inner-declarations */

import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import moment from 'moment';
import { getLinkProduct, formatNumber, getProfileAfterPrd } from '@/utils/utils';

moment.locale('vi');
const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

const ViewProduct = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/viewProduct'), {
  ssr: false,
  loading: () => null,
});
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  state = {};

  componentDidMount() {
    const { data, dispatch } = this.props;
    const query = {
      filter: {
        status: true,
        sitesId: data.sitesId,
        categoriesId: data.id,
      },
    };

    dispatch({
      type: 'webs/fetchAllProductCatalog',
      payload: query,
      callback: res => {
        const result = (res && res.result && res.result.length > 0 && res.result[0].products) || [];
        this.setState({
          dataProduct: result,
        });
      },
    });
  }

  addToCart = product => {
    const { dispatch } = this.props;
    const { infoOptions, qty } = this.state;
    const newData = getProfileAfterPrd(product, infoOptions);
    dispatch({
      type: 'cart/increaseItem',
      product: { ...newData, qty },
      showCart: true,
    });
  };

  selectProduct = product => this.setState({ productSelected: product });

  render = () => {
    const { dataProduct, productSelected } = this.state;
    const {
      data,
      webs: { dataAd },
    } = this.props;
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    const dataSide =
      dataAd &&
      dataAd.list &&
      dataAd.list.length > 0 &&
      dataAd.list.filter(item => Number(item.adsPositionsId) === 26);
    return (
      <React.Fragment>
        <section className=" awe-section-4">
          <section className="section section_suggested">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="section title_module_main">
                    <h2 className="h2">
                      <a href={`${data.url}`} title={data.name}>
                        {data.name}
                      </a>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  {dataProduct && dataProduct.length > 0 && (
                    <OwlCarousel
                      className="owl-carousel owl_suggested owl-loaded owl-drag"
                      items={5}
                      navText={[
                        `
                    <div className="owl-nav">
                    <span className="owl-prev">
                    <i class="fas fa-arrow-left"></i>
                    </span>`,
                        `<span className="owl-next">
                    <i class="fas fa-arrow-right"></i>
                    </span>
                    </div>
                    `,
                      ]}
                      responsive={{
                        0: {
                          items: 1,
                          nav: true,
                        },
                        425: {
                          items: 2,
                          nav: true,
                        },
                        768: { items: 3, nav: true },

                        1000: {
                          items: 5,
                          nav: true,
                        },
                      }}
                      nav
                    >
                      {dataProduct &&
                        dataProduct.length > 0 &&
                        dataProduct.map(product => (
                          <div className="item_product_main itemcustome">
                            <div className="product-box product-item-main product-item-compare">
                              <div className="product-thumbnail">
                                <a
                                  className="image_thumb p_img"
                                  href={getLinkProduct(product)}
                                  title={product.name}
                                >
                                  <img
                                    src={getResponsiveImage(
                                      product.images && product.images.split(',')[0],
                                      imageResize
                                    )}
                                    alt={product.name}
                                  />
                                </a>
                                {product.dealPrice && product.price - product.dealPrice > 0 && (
                                  <div className="saleright">
                                    <span>
                                      {100 - Math.ceil((product.price / product.dealPrice) * 100)}%
                                    </span>
                                  </div>
                                )}
                                <a
                                  data-toggle="tooltip"
                                  title
                                  href={getLinkProduct(product)}
                                  data-handle="bap-cai-xanh"
                                  className="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm"
                                  data-original-title="Xem nhanh"
                                >
                                  <i
                                    className="fa fa-eye"
                                    onClick={e => {
                                      e.preventDefault();
                                      this.selectProduct(product);
                                    }}
                                  />
                                </a>
                                <div className="product-action clearfix">
                                  <form className="variants form-nut-grid">
                                    <div className="group_action">
                                      <a
                                        data-toggle="tooltip"
                                        className="btn-buy firstc btn-cart button_35 left-to"
                                        title
                                        data-original-title="Chi tiết"
                                        onClick={() => this.addToCart(product)}
                                      >
                                        <i className="fa fa-shopping-basket" />
                                        Mua hàng
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="product-info product-bottom mh">
                                <h3 className="product-name">
                                  <a href={getLinkProduct(product)} title={product.name}>
                                    {product.name}
                                  </a>
                                </h3>
                                <div className="section">
                                  <div className="blockprice">
                                    <div className="product-item-price price-box">
                                      <span className="special-price">
                                        <span className="price product-price">
                                          {formatNumber(Number(product.dealPrice))}
                                        </span>
                                      </span>
                                      {product.dealPrice && product.price - product.dealPrice > 0 && (
                                        <span className="product-item-price-sale old-price">
                                          <span className="compare-price price product-price-old">
                                            {formatNumber(Number(product.price))}
                                          </span>
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </OwlCarousel>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-15">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 itembannerhover">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-5 hidden-xs">
                          {dataSide &&
                            dataSide.length > 0 &&
                            dataSide.map(item => (
                              <div className="imgbanner getheight_banner">
                                <a href="#">
                                  <img
                                    src={getResponsiveImage(
                                      item.contents && item.contents.split(',')[0],
                                      imageResize
                                    )}
                                    alt="banner"
                                  />
                                </a>
                              </div>
                            ))}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-12">
                          <div className="contentbanner contentb1">
                            <p>TRÁI CÂY</p>
                            <p className="bold">NHẬP KHẨU</p>
                            <p>AN TOÀN</p>
                            <p className="large">GIẢM TỚI 50%</p>
                            <a className="button" href="#" title="mua ngay">
                              Mua ngay
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 itembannerhover">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-5 hidden-xs">
                          {dataSide &&
                            dataSide.length > 0 &&
                            dataSide.map(item => (
                              <div className="imgbanner getheight_banner">
                                <a href="#">
                                  <img
                                    src={getResponsiveImage(
                                      item.contents && item.contents.split(',')[1],
                                      imageResize
                                    )}
                                    alt="banner"
                                  />
                                </a>
                              </div>
                            ))}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-7 col-xs-12">
                          <div className="contentbanner contentb2">
                            <p>Nước trái cây</p>
                            <p className="bold">100% TỪ</p>
                            <p>THIÊN NHIÊN</p>
                            <p className="large">SIÊU SẠCH</p>
                            <a className="button" href="#" title="mua ngay">
                              Mua ngay
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        {productSelected ? (
          <ViewProduct product={productSelected} closeView={this.selectProduct} />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  };
}

export default Index;
