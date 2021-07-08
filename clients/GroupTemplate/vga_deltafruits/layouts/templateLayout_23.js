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
  state = {
    arrayProduct: [],
  };

  componentDidMount() {
    const { data, dispatch } = this.props;
    const { arrayProduct } = this.state;
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
        const div = Math.trunc(result.length / 2);
        for (let i = 1; i <= div; i += 1) {
          const array1 = result.splice(0, 2);
          arrayProduct.push(array1);
        }
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

  render() {
    const { data } = this.props;
    const { arrayProduct, productSelected } = this.state;

    console.log('arrayProduct', arrayProduct);
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    return (
      <React.Fragment>
        <section className=" awe-section-3">
          <section className="section section_product_news">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="row">
                    {/* {data && data.length > 0 && data.map(() => ( */}
                    <div className="col-lg-12 col-md-12 col-sm-4 col-xs-12 itembaner">
                      <figure className="img_effect">
                        <a title={data.name}>
                          <img
                            className="img-responsive center-base"
                            src={getResponsiveImage(data.image && data.image.split(',')[0])}
                            alt="Nho nhập khẩu"
                          />
                        </a>
                      </figure>
                    </div>
                    {/* ))} */}
                    <div className="col-lg-12 col-md-12 col-sm-4 col-xs-12 itembaner">
                      <figure className="img_effect">
                        <a title={data.name}>
                          <img
                            className="img-responsive center-base"
                            src={getResponsiveImage(
                              data.image && data.image.split(',')[1],
                              imageResize
                            )}
                            alt={data.name}
                          />
                        </a>
                      </figure>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-4 col-xs-12 itembaner">
                      <figure className="img_effect">
                        <a title={data.name}>
                          <img
                            className="img-responsive center-base"
                            src={getResponsiveImage(
                              data.image && data.image.split(',')[2],
                              imageResize
                            )}
                            alt={data.name}
                          />
                        </a>
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div className="section title_module_main">
                    <h2 className="h2">
                      <a href={data.urlSlugs} title={data.name}>
                        {data.name}
                      </a>
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="content_module">
                        <div className="wrap_content">
                          {arrayProduct && arrayProduct.length > 0 && (
                            <OwlCarousel
                              className="owl_col_section owlproductnews owl-carousel owl-loaded owl-drag"
                              nav
                              // item={2}
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
                                600: {
                                  items: 2,
                                  nav: true,
                                },
                                768: {
                                  items: 3,
                                  nav: true,
                                },

                                1000: {
                                  items: 3,
                                  nav: true,
                                },
                              }}
                            >
                              {arrayProduct &&
                                arrayProduct.length > 0 &&
                                arrayProduct.map(products => (
                                  <div>
                                    {products &&
                                      products.map(product => (
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
                                              {product.dealPrice &&
                                                product.price - product.dealPrice > 0 && (
                                                  <div className="saleright">
                                                    <span>
                                                      {100 -
                                                        Math.ceil(
                                                          (product.price / product.dealPrice) * 100
                                                        )}
                                                      %
                                                    </span>
                                                  </div>
                                                )}

                                              <a
                                                data-toggle="tooltip"
                                                title
                                                href="#"
                                                data-handle="bap-cai-xanh"
                                                className="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm"
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.selectProduct(product);
                                                }}
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
                                                      data-original-title="Chi tiết"
                                                      onClick={() => this.addToCart(product)}
                                                    >
                                                      <i
                                                        className="fa fa-shopping-basket"
                                                        onClick={e => {
                                                          e.preventDefault();
                                                          this.selectProduct(product);
                                                        }}
                                                      />
                                                      Thêm giỏ hàng
                                                    </a>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                            <div className="product-info product-bottom mh">
                                              <h3 className="product-name">
                                                <a
                                                  href={getLinkProduct(product)}
                                                  title={product.name}
                                                >
                                                  {product.name}
                                                </a>
                                              </h3>
                                              <div className="section">
                                                <div className="blockprice">
                                                  <div className="product-item-price price-box">
                                                    <span className="special-price">
                                                      <span className="price product-price">
                                                        {formatNumber(Number(product.dealPrice))}₫
                                                      </span>
                                                    </span>
                                                    {product.dealPrice &&
                                                      product.price - product.dealPrice > 0 && (
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
                                  </div>
                                ))}
                            </OwlCarousel>
                          )}
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
  }
}

export default Index;
