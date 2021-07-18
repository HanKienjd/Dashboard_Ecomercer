/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { formatNumber, getLinkProduct, getProfileAfterPrd, getInfoOptions } from '@/utils/utils';
import { Rate } from 'antd';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

@connect(({ webs: { dataSite } }) => ({ dataSite }))
class ViewProduct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      active: 0,
    };
  }

  componentDidMount() {
    const { product } = this.props;
    if (product) {
      const { optionId1, optionId2, infoOptions } = getInfoOptions(product);
      this.setState({
        optionId1,
        optionId2,
        infoOptions,
      });
    }
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

  handleChange = e => {
    this.setState({
      [e.target.name]: Number(e.target.value) ? Math.min(Number(e.target.value), 999) : 1,
    });
  };

  onFilterOptions = (id, val) => {
    const { optionId1, optionId2 } = this.state;
    const { product } = this.props;
    const { ecommerceProductsModelList } = product;
    if (val === '1') {
      const infoOptions =
        ecommerceProductsModelList &&
        ecommerceProductsModelList.length > 0 &&
        ecommerceProductsModelList.find(
          item =>
            item.ecommerceProductClassify1Id === id &&
            item.ecommerceProductClassify2Id === optionId2
        );
      this.setState({
        optionId1: id,
        infoOptions,
      });
    } else {
      const infoOptions =
        ecommerceProductsModelList &&
        ecommerceProductsModelList.length > 0 &&
        ecommerceProductsModelList.find(
          item =>
            item.ecommerceProductClassify1Id === optionId1 &&
            item.ecommerceProductClassify2Id === id
        );
      this.setState({
        optionId2: id,
        infoOptions,
      });
    }
  };

  close = () => {
    const { closeView } = this.props;
    if (closeView) {
      closeView();
    }
  };

  render() {
    const { product, dataSite } = this.props;
    console.log(product);
    if (!product || !dataSite) return null;
    const { ecommerceProductClassify1, ecommerceProductClassify2 } = product;
    const { infoOptions, optionId1, optionId2, active, qty } = this.state;
    const images = (product.images && product.images.split(',')) || [];
    const rateList = ['Rất tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    const infoProduct = infoOptions || product;
    // console.log('infotProduct', infoProduct);
    const mobile =
      (dataSite.siteProfiles && dataSite.siteProfiles.hotline) ||
      (dataSite.places && dataSite.places.mobile);
    const imageResize = [360];
    const imageResizeThumbnail = [58];
    return (
      <React.Fragment>
        <div
          id="quick-view-product"
          className="quickview-product in"
          style={{ display: 'block' }}
          onClick={e => (e.target.id === 'quick-view-product' ? this.close() : null)}
        >
          <div
            className="quickview-overlay fancybox-overlay fancybox-overlay-fixed"
            onClick={this.close}
          />
          <div className="quick-view-product">
            <div className="block-quickview primary_block row">
              <div className="product-left-column col-xs-12 col-sm-5 col-md-5 col-lg-5">
                <div className="clearfix image-block">
                  <span className="view_full_size">
                    <a className="img-product" href="#">
                      {images[active] ? (
                        <img
                          id="product-featured-image-quickview"
                          className="img-responsive product-featured-image-quickview"
                          src={getResponsiveImage(images[active], imageResize)}
                          alt={product.name || ''}
                        />
                      ) : (
                        ''
                      )}
                    </a>
                  </span>
                </div>
                <div className="more-view-wrapper clearfix">
                  <div
                    className="thumbs_quickview thumbs_list_quickview"
                    id="thumbs_list_quickview"
                  >
                    <ul>
                      {images[0] ? (
                        <OwlCarousel
                          className="product-photo-thumbs quickview-more-views-owlslider owl-loaded owl-drag"
                          items={4}
                          autoplay
                          margin={10}
                          nav
                          id="thumblist_quickview"
                          style={{ visibility: 'visible' }}
                        >
                          {images.map((image, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                this.setState({
                                  active: index,
                                })
                              }
                            >
                              <a href="#" title="Xem ảnh">
                                <img
                                  src={getResponsiveImage(
                                    image && image.split(',')[0],
                                    imageResizeThumbnail
                                  )}
                                  alt={product.name || ''}
                                  style={{ maxWidth: '120px', maxHeight: '120px' }}
                                />
                              </a>
                            </li>
                          ))}
                        </OwlCarousel>
                      ) : (
                        ''
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="product-center-column product-info product-item col-xs-5 col-sm-7 col-md-7 col-lg-7">
                <div className="head-qv">
                  <h3 className="qwp-name">
                    <a
                      className="text2line"
                      href={getLinkProduct(product)}
                      title={product.name || ''}
                    >
                      {product.name || ''}
                    </a>
                  </h3>
                  <div className="reviews_qv">
                    <div className="bizweb-product-reviews-badge">
                      <div
                        className="bizweb-product-reviews-star"
                        data-score={0}
                        data-number={5}
                        title="Not rated yet!"
                        style={{ color: 'rgb(255, 190, 0)' }}
                      >
                        <Rate tooltips={rateList} disabled defaultValue={5} />
                      </div>
                    </div>
                  </div>
                  <div className="vend-qv">
                    <div className="left_vend">
                      <span className="vendor_">
                        <span>Thương hiệu: </span>
                        {(product.producer && product.producer.name) || ''}
                      </span>
                      <span className="line">|</span>
                      <span>
                        Tình trạng:{' '}
                        <span className="soluong">{infoProduct.id ? 'Còn hàng' : 'Hết hàng'}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="quickview-info">
                  <span className="prices">
                    <span className="price sale-price on-sale">
                      {formatNumber(
                        infoProduct.dealPrice ? infoProduct.dealPrice : infoProduct.price
                      )}
                      ₫
                    </span>
                    {infoProduct.dealPrice && infoProduct.dealPrice !== infoProduct.price ? (
                      <del className="old-price">{formatNumber(infoProduct.price)}₫</del>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className="product-description">
                  <div className="rte">{product.shortDescription}</div>
                </div>
                <form
                  action="/cart/add"
                  method="post"
                  encType="multipart/form-data"
                  className="quick_option variants form-ajaxtocart"
                  id="product-actions-12715584"
                >
                  <div className="swatch clearfix">
                    {ecommerceProductClassify1 &&
                      ecommerceProductClassify1.length > 1 &&
                      ecommerceProductClassify1.map(item => (
                        <div key={item.id} className="swatch-element available">
                          <input
                            id={`swatch-0-to-${item.id}`}
                            type="radio"
                            name="option-1"
                            defaultValue="To"
                            checked={optionId1 === item.id}
                            onChange={() => this.onFilterOptions(item.id, '1')}
                          />
                          <label htmlFor={`swatch-0-to-${item.id}`}>{item.name}</label>
                        </div>
                      ))}
                  </div>
                  <div className="swatch clearfix">
                    {ecommerceProductClassify2 &&
                      ecommerceProductClassify2.length > 1 &&
                      ecommerceProductClassify2.map(item => (
                        <div key={item.id} className="swatch-element available">
                          <input
                            id={`swatch-0-to-${item.id}`}
                            type="radio"
                            name="option-2"
                            defaultValue="To"
                            checked={optionId2 === item.id}
                            onChange={() => this.onFilterOptions(item.id, '2')}
                          />
                          <label htmlFor={`swatch-0-to-${item.id}`}>{item.name}</label>
                        </div>
                      ))}
                  </div>
                  <div className="quantity_wanted_p">
                    <div className="button_actions clearfix">
                      <button
                        type="submit"
                        className="btn btn_base fix_add_to_cart ajax_addtocart btn_add_cart btn-cart add_to_cart add_to_cart_detail"
                        onClick={() => {
                          this.addToCart(infoProduct);
                          this.close();
                        }}
                      >
                        <span className="text_1">
                          {infoProduct.id ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="call_phone_buy f-left w_100">
                  <div>
                    <i className="icon i_call_product" style={{ paddingRight: '5px' }} />
                    <span>
                      Gọi ngay <a href={`tel:${mobile}`}>{mobile}</a> để được tư vấn và đặt hàng
                      nhanh chóng
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <a title="Close" className="quickview-close close-window" onClick={this.close}>
              <i className="fas fa-times" />
            </a>
          </div>
        </div>
        <div className="modal-backdrop in" />
      </React.Fragment>
    );
  }
}
export default ViewProduct;
