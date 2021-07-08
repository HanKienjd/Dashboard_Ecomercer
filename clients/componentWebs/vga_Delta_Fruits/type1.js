import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { formatNumber, getLinkProduct } from '@/utils/utils';

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
class Type1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrayProduct: [],
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
        const div = Math.trunc(result.length / 3);
        const chunk = 3;
        for (let i = 1; i <= div; i++) {
          const array1 = result.splice(0, chunk);
          arrayProduct.push(array1);
        }
        this.setState({
          dataProduct: result,
        });
      },
    });
  }

  selectProduct = product => this.setState({ productSelected: product });

  render() {
    const { data } = this.props;
    const { dataProduct, arrayProduct, productSelected } = this.state;
    // console.log(arrayProduct);
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    return (
      <React.Fragment>
        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
          <div className="title_module_fix cot1">
            <h2 className="h2">
              <a href={`${data.urlSlugs}`} title={data.name}>
                {data.name}
              </a>
            </h2>
          </div>
          <div
            className="content_module"
            style={{ width: '100%', float: 'left', marginTop: '15px' }}
          >
            <div className="wrap_content">
              {arrayProduct && arrayProduct.length > 0 && (
                <OwlCarousel
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
                  className="owl_col_section custom_calosel"
                  items={1}
                  nav
                  dots={false}
                  responsive={{ 768: { items: 1 }, 1000: { items: 1 } }}
                >
                  {arrayProduct &&
                    arrayProduct.map(product => (
                      <div className="item_product_main itemcustome">
                        {product &&
                          product.map(item => (
                            <div className="product-box product-item-main product-main-list-mini">
                              <div className="product-thumbnail">
                                <a
                                  data-toggle="tooltip"
                                  className="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm"
                                  data-original-title="Xem nhanh"
                                >
                                  <i
                                    className="fa fa-eye"
                                    onClick={e => {
                                      e.preventDefault();
                                      this.selectProduct(item);
                                    }}
                                  />
                                </a>
                                <a
                                  className="image_thumb p_img"
                                  href={getLinkProduct(item)}
                                  title={item.name}
                                >
                                  <img
                                    src={getResponsiveImage(
                                      item.images && item.images.split(',')[0],
                                      imageResize
                                    )}
                                    alt={item.name}
                                  />
                                </a>
                              </div>
                              <div className="product-info product-bottom">
                                <h3 className="product-name">
                                  <a href={getLinkProduct(item)} title={item.name}>
                                    {item.name}
                                  </a>
                                </h3>
                                <div className="reviews_item_product active a-left">
                                  <div
                                    className="bizweb-product-reviews-badge a-left"
                                    data-id={12806121}
                                  >
                                    <div
                                      className="bizweb-product-reviews-star"
                                      data-score={0}
                                      data-number={5}
                                      title="Not rated yet!"
                                      style={{ color: 'rgb(255, 190, 0)' }}
                                    >
                                      <i
                                        data-alt={1}
                                        className="fas fa-star"
                                        title="Not rated yet!"
                                      />
                                      &nbsp;
                                      <i
                                        data-alt={2}
                                        className="fas fa-star"
                                        title="Not rated yet!"
                                      />
                                      &nbsp;
                                      <i
                                        data-alt={3}
                                        className="fas fa-star"
                                        title="Not rated yet!"
                                      />
                                      &nbsp;
                                      <i
                                        data-alt={4}
                                        className="fas fa-star"
                                        title="Not rated yet!"
                                      />
                                      &nbsp;
                                      <i
                                        data-alt={5}
                                        className="fas fa-star"
                                        title="Not rated yet!"
                                      />
                                      <input name="score" type="hidden" readOnly />
                                    </div>
                                    <div>
                                      <img
                                        src="./static/vga_deltafruits/img/user.png"
                                        width={18}
                                        height={17}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="blockprice">
                                  <div className="product-item-price price-box a-left">
                                    <span className="special-price">
                                      <span className="price product-price">
                                        {formatNumber(Number(item.dealPrice))}
                                      </span>
                                    </span>
                                    {item.dealPrice && item.dealPrice - item.price < 0 && (
                                      <span className="product-item-price-sale old-price">
                                        <span className="compare-price price product-price-old">
                                          {formatNumber(Number(item.price))}
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
export default Type1;
