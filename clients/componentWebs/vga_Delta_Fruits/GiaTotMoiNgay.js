import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { formatNumber, getProfileAfterPrd, getInfoOptions, getLinkProduct } from '@/utils/utils';

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

const ViewProduct = dynamic(() => import('./viewProduct'), {
  ssr: false,
  loading: () => null,
});
@connect(({ webs }) => ({
  webs,
}))
class GiaTotMoiNgay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      saleTime: {
        day: null,
        hour: null,
        minute: null,
        sec: null,
      },
    };
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    this.countdown(5, 0, 0, 0);
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

  getPrice = (dealPrice, price) => {
    const NewPrice = 100 - Math.ceil((dealPrice / price) * 100);
    return NewPrice;
  };

  countdown = (days, hour, minute, sec) => {
    setTimeout(() => {
      if (days === 0 && hour === 0 && minute === 0 && sec === 0) {
        return false;
      }

      (sec >= 0 || minute >= 0 || hour >= 0 || days >= 0) && sec--;
      if (sec < 0) {
        hour >= 0 && minute >= 0 && minute--;
        sec = 59;
      }
      if (minute < 0) {
        days >= 0 && hour >= 0 && hour--;
        minute = 59;
      }
      if (hour < 0) {
        days > 0 && days--;
        hour = 23;
      }
      this.setState({
        saleTime: {
          day: days,
          hour,
          minute,
          sec,
        },
      });
      this.countdown(days, hour, minute, sec);
      // console.log(days, hour, minute, sec)
    }, 1000);
  };

  selectProduct = product => this.setState({ productSelected: product });

  render() {
    const { dataProduct, productSelected, saleTime } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 smdown">
          <div className="section title_module_main">
            <h2 className="h2">
              <a href={`${data.url}`} title={data.name}>
                {data.name}
              </a>
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {dataProduct && dataProduct.length > 0 && (
                <OwlCarousel
                  className="wrap_owldelal owl-carousel owl-loaded owl-drag"
                  items={1}
                  nav
                  navText={[
                    `
                <span className="owl-prev">
                <i class="fas fa-arrow-left"></i>
                </span>`,
                    `<span className="owl-next">
                <i class="fas fa-arrow-right"></i>
                </span>
                `,
                  ]}
                  responsive={{
                    768: {
                      items: 2,
                      nav: false,
                    },
                    1000: {
                      items: 1,
                    },
                  }}
                  dots={false}
                >
                  {dataProduct &&
                    dataProduct.length > 0 &&
                    dataProduct.map(product => (
                      <div className="item_product_main border item_product_main_relative">
                        <div className="item">
                          <div
                            className="product-box product-item-main dealtop"
                            data-time="9/18/2019 10:30:00"
                          >
                            <div className="product-thumbnail">
                              <a
                                className="image_thumb p_img dealimg"
                                href={getLinkProduct(product)}
                                title={product.name}
                              >
                                <img
                                  src={getResponsiveImage(
                                    product.images,
                                    product.images.split(',')[0]
                                  )}
                                  alt={product.name}
                                />
                              </a>
                              <a
                                data-toggle="tooltip"
                                data-handle="xoai-thai-ngot"
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
                              {product.dealPrice && product.dealPrice !== product.price && (
                                <div className="saleright">
                                  <span>-{this.getPrice(product.dealPrice, product.price)}%</span>
                                </div>
                              )}

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
                            </div>
                            <div className="wrap_timeitem deal deal-block">
                              <div className="time-x">
                                <span className="border">
                                  {saleTime.day}
                                  <p>Ngày</p>
                                </span>
                                <span>:</span>
                                <span className="border">
                                  {saleTime.hour}
                                  <p>Giờ</p>
                                </span>
                                <span>:</span>
                                <span className="border">
                                  {saleTime.minute}
                                  <p>Phút</p>
                                </span>
                                <span>:</span>
                                <span className="border">
                                  {saleTime.sec}
                                  <p>Giây</p>
                                </span>
                              </div>
                            </div>
                            <div className="product-info product-bottom mh dealbottom">
                              <h3 className="product-name">
                                <a href={getLinkProduct(product)} title={product.name}>
                                  {product.name}
                                </a>
                              </h3>
                              <div className="reviews_item_product active">
                                {/* <div className="bizweb-product-reviews-badge" data-id={12806148}>
                                <div className="bizweb-product-reviews-star" data-score={0} data-number={5} title="Not rated yet!" style={{ color: 'rgb(255, 190, 0)' }}>
                                  <i data-alt={1} className="fas fa-star" title="Not rated yet!" />&nbsp;
                                <i data-alt={2} className="fas fa-star" title="Not rated yet!" />&nbsp;
                                <i data-alt={3} className="fas fa-star" title="Not rated yet!" />&nbsp;
                                <i data-alt={4} className="fas fa-star" title="Not rated yet!" />&nbsp;
                                <i data-alt={5} className="fas fa-star" title="Not rated yet!" />
                                  <input name="score" type="hidden" readOnly />
                                </div>
                                <div>
                                  <img src="./static/vga_deltafruits/img/user.png" width={18} height={17} alt="user" />
                                </div>
                              </div> */}
                              </div>
                              <div className="section">
                                <div className="blockprice">
                                  <div className="product-item-price price-box">
                                    <span className="special-price">
                                      <span className="price product-price">
                                        {formatNumber(Number(product.dealPrice))}
                                      </span>
                                    </span>
                                    <span className="product-item-price-sale old-price">
                                      <span className="compare-price price product-price-old">
                                        {formatNumber(Number(product.price))}
                                      </span>
                                    </span>
                                  </div>
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
          </div>
        </div>
        {productSelected ? (
          <ViewProduct product={productSelected} closeView={this.selectProduct} />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}
export default GiaTotMoiNgay;
