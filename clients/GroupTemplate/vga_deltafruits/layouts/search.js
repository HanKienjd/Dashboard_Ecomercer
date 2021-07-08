// Sản phẩm
import React from 'react';
import { formatNumber, getLinkProduct, getProfileAfterPrd } from '@/utils/utils';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import Router from 'next/router';
import $ from 'jquery';
import { connect } from 'react-redux';

const pageSize = 8;

@connect(({ cart }) => ({ ...cart }))
class Index extends React.PureComponent {
  constructor(props) {
    super(props); 
    const { list, pagination } = props.data;
    this.state = {
      products: list || [],
      total: (pagination && pagination.total) || 0,
      byname: '',
    };
  }

  componentDidMount() {
    const { router } = Router;

    const { dispatch } = this.props;
    this.setState({
      byname: router && router.query && router.query.byname,
    });
  }

  goToPage = index => {
    const { dispatch, dataSite } = this.props;
    const { byname } = this.state;
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: {
        filter: {
          status: true,
          sitesId: dataSite.id,
          name: byname,
        },
        range: [index * pageSize, (index + 1) * pageSize - 1],
        attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
      },
      callback: res => {
        if (res.success) {
          if (res.result.list) {
            this.setState({
              products: res.result.list,
            });
            $('body').animate(
              {
                scrollTop: 0,
              },
              500
            );
            $('html').animate(
              {
                scrollTop: 0,
              },
              500
            );
          }
        }
      },
    });
  };

  addToCart = product => {
    const { dispatch } = this.props;
    const { infoOptions, qty } = this.state;
    // const { ecommerceProductsModelList } = product;
    // if (ecommerceProductsModelList && ecommerceProductsModelList.length > 1) {
    //   window.location.href = getLinkProduct(product);
    // } else {
    const newData = getProfileAfterPrd(product, infoOptions);
    dispatch({
      type: 'cart/increaseItem',
      product: { ...newData, qty },
      showCart: true,
    });
  };

  selectFilter = index => {
    const { filter } = this.state;
    this.setState({ filter: index === filter || index });
  };

  openFilter = () => {
    const { isOpenFilter } = this.state;
    this.setState({ isOpenFilter: !isOpenFilter });
  };

  getSale = (price, dealPrice) => Math.ceil(((dealPrice - price) * 100) / price);

  render() {
    const { products, total } = this.state;
    console.log(products);

    return (
      <React.Fragment>
        <section className="bread-crumb">
          <div className="container">
            <ul className="breadcrumb">
              <li className="home">
                <a href="/" title="Trang chủ">
                  <span itemProp="name">Trang chủ</span>&nbsp;
                </a>
              </li>
              <li>
                <strong itemProp="name">Kết quả tìm kiếm</strong>
              </li>
            </ul>
          </div>
        </section>
        <section className="signup search-main">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 margin-bottom-15">
                <h1 className="title-head title_search">
                  {total > 0
                    ? `Có ${total} kết quả tìm kiếm phù hợp`
                    : 'Không tìm thấy kết quả nào'}
                </h1>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-bottom-30">
                <div className="products-view-gridsss products cls_search list_hover_pro">
                  <div className="row content_col">
                    {products && products.length > 0
                      ? products.map(product => (
                          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 margin-bottom-20">
                            <div className="item_product_main item_product_main_relative">
                              <div className="item">
                                <div className="product-box product-item-main">
                                  <div className="item">
                                    <div className="product-thumbnail">
                                      <a
                                        className="image_thumb thumb_search p_img"
                                        href={getLinkProduct(product)}
                                        title={product.name}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src={getResponsiveImage(
                                            product.images && product.images.split(',')[0]
                                          )}
                                          alt={product.name}
                                        />
                                      </a>
                                      <div className="product-action clearfix">
                                        <form className="variants form-nut-grid">
                                          <div className="group_action">
                                            <input type="hidden" name="variantId" />
                                            <a
                                              data-toggle="tooltip"
                                              className="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart"
                                              data-original-title="Mua ngay"
                                              onClick={() => this.addToCart(product)}
                                            >
                                              <i className="fa fa-shopping-basket" />
                                              Thêm vào giỏ
                                            </a>
                                          </div>
                                        </form>
                                      </div>
                                      {product.dealPrice && product.price !== product.dealPrice && (
                                        <div className="saleright">
                                          <span>
                                            <span className="sale-off">
                                              - {this.getSale(product.dealPrice, product.price)}%
                                            </span>
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="product-info product-bottom mh">
                                      <h3 className="product-name a-center">
                                        <a href={getLinkProduct(product)} title={product.name}>
                                          {product.name}
                                        </a>
                                      </h3>
                                      <div className="block-width-min-height">
                                        <div className="blockprice">
                                          <div className="product-item-price price-box">
                                            {product.dealPrice && (
                                              <span className="special-price">
                                                <span className="price product-price">
                                                  {formatNumber(Number(product.dealPrice))}₫
                                                </span>
                                              </span>
                                            )}
                                            {product.dealPrice &&
                                              product.price !== product.dealPrice && (
                                                <span className="product-item-price-sale old-price-price">
                                                  <span className="compare-price price product-price-old">
                                                    {formatNumber(Number(product.price))}₫
                                                  </span>
                                                </span>
                                              )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <form
                                action="/cart/add"
                                method="post"
                                encType="multipart/form-data"
                                className="hidden-md variants form-ajaxtocart product-bottom-expand has-validation-callback"
                                data-id="product-actions-16241746"
                              >
                                <input type="hidden" name="variantId" defaultValue={28767324} />

                                <button
                                  type="button"
                                  className="favorites-btn js-btn-wishlist js-favorites js-favorites-heart cart-button"
                                  title="Thêm vào yêu thích"
                                  data-handle="vay-a-xep-ly"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 51.997 51.997"
                                    style={{ enableBackground: 'new 0 0 51.997 51.997' }}
                                    xmlSpace="preserve"
                                  >
                                    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" />
                                  </svg>
                                </button>
                              </form>
                            </div>
                          </div>
                        ))
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;
