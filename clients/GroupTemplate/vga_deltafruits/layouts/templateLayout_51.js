/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
import React from 'react';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { getLinkProduct, formatNumber } from '@/utils/utils';

const GiaTotMoiNgay = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/GiaTotMoiNgay`), {
  ssr: true,
  loading: () => null,
});

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
  constructor(props) {
    super(props);
    this.state = {
      arrayProduct: [],
      visible: false,
    };
  }

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

    dispatch({
      type: 'webs/fetchAllChildrenCategory',
      payload: {
        filter: {
          status: true,
          parentId: data.id,
          sitesId: data.sitesId,
        },
      },
      callback: res => {
        // console.log(res);
        const dataChildren = res && res.result && res.result.list;
        this.setState({
          dataChildrenCategoryAll: dataChildren,
        });
      },
    });
  }

  showPopUp = () => {
    this.setState({
      visible: !this.visible,
    });
  };

  selectProduct = product => this.setState({ productSelected: product });

  render() {
    const { dataChildrenCategoryAll, arrayProduct, visible, productSelected } = this.state;
    const {
      data,
      webs: { dataAd },
      dataSite,
    } = this.props;
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;

    const dataSlide =
      dataAd &&
      dataAd.list &&
      dataAd.list.length > 0 &&
      dataAd.list.filter(item => Number(item.adsPositionsId) === 30);
    // console.log(arrayProduct);
    return (
      <React.Fragment>
        <section className=" awe-section-2">
          <section className="section section_deal_bestsale">
            <div className="container">
              <div className="row">
                {/* Gia Tot moi ngay */}
                {dataChildrenCategoryAll &&
                  dataChildrenCategoryAll.length > 0 &&
                  dataChildrenCategoryAll.map(item => (
                    <GiaTotMoiNgay data={item} dataCategory={dataChildrenCategoryAll} />
                  ))}
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div className="section title_module_main">
                    <h2 className="h2">
                      <a href={`${data.url}`} title={data.name}>
                        {data.name}
                      </a>
                    </h2>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="content_module">
                          <div className="wrap_content">
                            {arrayProduct && arrayProduct.length > 0 && (
                              <OwlCarousel
                                className="wrap_owldelal owl-carousel owl-loaded owl-drag"
                                items={2}
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
                                  0: { items: 1, nav: true },
                                  600: { items: 2, nav: true },
                                  768: { items: 2, nav: true },
                                  1000: { items: 2, nav: true },
                                }}
                                dots={false}
                              >
                                {arrayProduct &&
                                  arrayProduct.length > 0 &&
                                  arrayProduct.map(products => (
                                    <div className="item_product_main itemcustome best_sale">
                                      {products &&
                                        products.map(product => (
                                          <div className="product-box product-item-main product-main-list-mini">
                                            <div className="product-thumbnail">
                                              <a
                                                data-toggle="tooltip"
                                                title
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
                                              <a
                                                className="image_thumb p_img"
                                                title={product.name}
                                                href={getLinkProduct(product)}
                                              >
                                                <img
                                                  src={getResponsiveImage(
                                                    product.images && product.images.split(',')[0],
                                                    imageResize
                                                  )}
                                                  alt={product.name}
                                                />
                                              </a>
                                            </div>
                                            <div className="product-info product-bottom">
                                              <h3 className="product-name">
                                                <a
                                                  href={getLinkProduct(product)}
                                                  title={product.name}
                                                >
                                                  {product.name}
                                                </a>
                                              </h3>
                                              {/* <div className="reviews_item_product active a-left">
                                                    <div className="bizweb-product-reviews-badge a-left">
                                                      <div className="bizweb-product-reviews-star" data-score={0} data-number={5} title="Not rated yet!" style={{ color: 'rgb(255, 190, 0)' }}>
                                                        <i data-alt={1} className="far fa-star" title="Not rated yet!" />&nbsp;
                                                        <i data-alt={2} className="far fa-star" title="Not rated yet!" />&nbsp;
                                                        <i data-alt={3} className="far fa-star" title="Not rated yet!" />&nbsp;
                                                        <i data-alt={4} className="far fa-star" title="Not rated yet!" />&nbsp;
                                                        <i data-alt={5} className="far fa-star" title="Not rated yet!" />
                                                        <input name="score" type="hidden" readOnly />
                                                      </div>
                                                      <div>
                                                        <img src="#" width={18} height={17} alt="user" />
                                                      </div>
                                                    </div>
                                                  </div> */}
                                              <div className="blockprice">
                                                <div className="product-item-price price-box a-left">
                                                  <span className="special-price">
                                                    <span className="price product-price">
                                                      {formatNumber(Number(product.dealPrice))}
                                                    </span>
                                                  </span>
                                                  {product.dealPrice &&
                                                    product.dealPrice - product.price < 0 && (
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
                                        ))}
                                    </div>
                                  ))}
                              </OwlCarousel>
                            )}
                          </div>
                          {dataSlide &&
                            dataSlide.length > 0 &&
                            dataSlide.map(item => (
                              <div className="section">
                                <figure className="img_effect">
                                  <a href="#" title="Mua ngay giá tốt quá trời">
                                    <img
                                      className="img-responsive center-base"
                                      src={getResponsiveImage(
                                        item.contents && item.contents.split(',')[0],
                                        imageResize
                                      )}
                                      alt="Mua ngay giá tốt quá trời"
                                    />
                                  </a>
                                </figure>
                              </div>
                            ))}
                          {arrayProduct &&
                            arrayProduct.length > 0 &&
                            arrayProduct.map(products => (
                              <div
                                id="quick-view-product"
                                className={visible ? 'quickview-product in' : 'quickview-product'}
                                style={
                                  visible
                                    ? { display: 'block', paddingRight: '15px' }
                                    : { display: 'none' }
                                }
                              >
                                <div className="quickview-overlay fancybox-overlay fancybox-overlay-fixed">
                                  <div className="quick-view-product">
                                    {products &&
                                      products.map(product => (
                                        <div className="block-quickview primary_block row">
                                          <div className="product-left-column col-xs-12 col-sm-5 col-md-5 col-lg-5">
                                            <div className="clearfix image-block">
                                              <span className="view_full_size">
                                                <a
                                                  className="img-product"
                                                  title
                                                  href={getLinkProduct(product)}
                                                >
                                                  <img
                                                    id="product-featured-image-quickview"
                                                    src={getResponsiveImage(
                                                      product.image && product.image.split(',')[0],
                                                      imageResize
                                                    )}
                                                    className="img-responsive product-featured-image-quickview"
                                                    alt="quickview"
                                                  />
                                                </a>
                                              </span>
                                              <div
                                                className="loading-imgquickview"
                                                style={{ display: 'none' }}
                                              />
                                            </div>
                                            <div className="more-view-wrapper clearfix">
                                              <div
                                                className="thumbs_quickview thumbs_list_quickview"
                                                id="thumbs_list_quickview"
                                              >
                                                <ul
                                                  className="product-photo-thumbs quickview-more-views-owlslider owl-loaded owl-drag"
                                                  id="thumblist_quickview"
                                                  style={{ visibility: 'visible' }}
                                                >
                                                  {arrayProduct && (
                                                    <OwlCarousel
                                                      className="owl_col_section owlbestsale owl-carousel owl-loaded owl-drag"
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
                                                      dots={false}
                                                      responsive={{
                                                        0: {
                                                          items: 0,
                                                          nav: false,
                                                        },
                                                        600: {
                                                          items: 3,
                                                          nav: true,
                                                        },
                                                        1000: {
                                                          items: 3,
                                                          nav: true,
                                                        },
                                                      }}
                                                    >
                                                      <div className="owl-stage-outer">
                                                        <div
                                                          className="owl-stage"
                                                          style={{
                                                            transform: 'translate3d(0px, 0px, 0px)',
                                                            transition: 'all 0s ease 0s',
                                                            width: '243px',
                                                          }}
                                                        >
                                                          <div
                                                            className="owl-item active"
                                                            style={{ width: '81px' }}
                                                          >
                                                            <li className="active">
                                                              <a
                                                                href={`${product.url}`}
                                                                alt={product.name}
                                                                style={{
                                                                  maxWidth: '120px',
                                                                  maxHeight: '120px',
                                                                }}
                                                              >
                                                                <img
                                                                  src={getResponsiveImage(
                                                                    product.images &&
                                                                      product.images.split(',')[0],
                                                                    imageResize
                                                                  )}
                                                                  alt={product.name}
                                                                  style={{
                                                                    maxWidth: '120px',
                                                                    maxHeight: '120px',
                                                                  }}
                                                                />
                                                              </a>
                                                            </li>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </OwlCarousel>
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="product-center-column product-info product-item col-xs-5 col-sm-7 col-md-7 col-lg-7"
                                            id="product-12806175"
                                          >
                                            <div className="head-qv">
                                              <h3 className="qwp-name">
                                                <a
                                                  className="text2line"
                                                  href="/bap-cai-xanh"
                                                  title={product.name}
                                                >
                                                  {product.name}
                                                </a>
                                              </h3>
                                              <div className="vend-qv">
                                                <div className="left_vend">
                                                  <span className="vendor_">
                                                    <span>Loại: </span>Rau củ
                                                  </span>
                                                  <span className="line">|</span>
                                                  Tình trạng:{' '}
                                                  <span className="soluong">Hết hàng</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="quickview-info">
                                              <div className="reviews_qv">
                                                <div className="bizweb-product-reviews-badge" />
                                              </div>
                                              <span className="prices">
                                                <span className="price">
                                                  {formatNumber(Number(product.price))}
                                                </span>
                                                <del className="old-price" />
                                              </span>
                                            </div>
                                            <div className="product-description">
                                              <div className="rte">
                                                <p>{product.shortDescription}</p>
                                              </div>
                                            </div>
                                            <form
                                              action="/cart/add"
                                              method="post"
                                              encType="multipart/form-data"
                                              className="quick_option variants form-ajaxtocart"
                                              id="product-actions-12806175"
                                            >
                                              <span
                                                className="price-product-detail hidden"
                                                style={{ opacity: 0 }}
                                              >
                                                <span className />
                                              </span>
                                              <div className="quantity_wanted_p">
                                                <div
                                                  className="input_qty_qv"
                                                  style={{ display: 'none' }}
                                                >
                                                  <a
                                                    className="btn_num num_1 button button_qty"
                                                    onClick=""
                                                  />
                                                  <a
                                                    className="btn_num num_2 button button_qty"
                                                    onClick=""
                                                  >
                                                    +
                                                  </a>
                                                </div>
                                                <div className="button_actions clearfix">
                                                  <button
                                                    type="submit"
                                                    className="btn btn_base fix_add_to_cart ajax_addtocart btn_add_cart btn-cart add_to_cart add_to_cart_detail disabled"
                                                    disabled="disabled"
                                                  >
                                                    Hết hàng
                                                  </button>
                                                </div>
                                              </div>
                                              <input
                                                type="hidden"
                                                name="id"
                                                defaultValue={12806175}
                                              />
                                              <input
                                                type="hidden"
                                                name="variantId"
                                                defaultValue={20924498}
                                              />
                                            </form>
                                            <div className="call_phone_buy f-left w_100">
                                              <div>
                                                Gọi ngay:
                                                <a href={`${data.url}`}>
                                                  {dataSite.places.mobile}
                                                </a>{' '}
                                                để đặt hàng số lượng lớn
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                    <a
                                      title="Close"
                                      className="quickview-close close-window"
                                      href=""
                                    >
                                      <i className="fa   fa-times" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quicl View  */}
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
