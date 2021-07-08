/* eslint-disable no-shadow */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { notification } from 'antd';
import {
  getLinkProduct,
  formatNumber,
  getProfileAfterPrd,
  getInfoOptions,
  checkHttpLink,
} from '@/utils/utils';
import {
  // eslint-disable-next-line no-unused-vars
  getArrImg,
  checkDealPrice,
} from '@/static/web/js/templateCode';
import moment from 'moment';

moment.locale('vi');
const BreadCrumb = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/BreadCrumb'), {
  ssr: true,
  loading: () => null,
});

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

const ZoomImage = dynamic(() => import('@/componentWebs/Global/ZoomImage'), {
  ssr: false,
  loading: () => null,
});

const PAGE_SIZE = 6;
const Index = props => {
  const { data, dispatch, dataSite } = props;
  const [activeTab, setactiveTab] = useState(0);
  const zoomImageResize = [1920, 1024, 500];
  const [productInCategory, setProductInCategory] = useState([]);
  const [infoOptions] = useState(getInfoOptions(data).infoOptions);
  const [optionId1] = useState(getInfoOptions(data).optionId1);
  const [optionId2] = useState(getInfoOptions(data).optionId2);
  const [feedbacks, setFeedbacks] = useState({});
  const [qty, setQty] = useState(1);
  const [index, setActiveImage] = useState(0);
  const { ecommerceProductClassify1, ecommerceProductClassify2 } = data;
  const infoProduct = infoOptions || data;

  const goToPage = num => {
    const indexOfLastNews = num * PAGE_SIZE;
    const indexOfFirstNews = indexOfLastNews - PAGE_SIZE;
    dispatch({
      type: 'webs/fetchProductVAC',
      payload: {
        filter: {
          status: true,
          productsId: data.id,
        },
        range: [indexOfFirstNews, indexOfLastNews - 1],
        sort: ['rated', 'DESC'],
      },
      callback: res => {
        if (res.success) {
          const result = (res && res.result) || {};
          setFeedbacks(result || {});
        }
      },
    });
  };
  const onAddEventForTab = () => {
    const tabs = document.querySelectorAll('.tab__item');
    const tabContents = document.querySelectorAll('.tab__content--item');
    if (tabs && tabs.length > 0) {
      tabs.forEach(item => {
        item.addEventListener('click', () => {
          for (let i = 0; i < tabs.length; i += 1) {
            tabs[i].classList.remove('active');
            const tabContent = tabContents && tabContents[i];
            tabContent.classList.remove('active');
          }
          const id = item.getAttribute('data-tab');
          const content = document.getElementById(id);
          if (content) content.classList.add('active');
          item.classList.add('active');
        });
      });
    }
  };
  useEffect(() => {
    const query = {
      filter: {
        status: true,
        categoriesId: data.categoriesId,
        sitesId: dataSite.id,
      },
      range: [0, PAGE_SIZE - 1],
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        const filter =
          res &&
          res.result &&
          res.result.list &&
          res.result.list.length > 0 &&
          res.result.list.filter(item => item.id !== data.id);
        setProductInCategory((filter && filter.slice(0, 5)) || []);
      },
    });
    goToPage(1);
    onAddEventForTab();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Đã thêm sản phẩm vào giỏ hàng',
      top: 100,
      duration: 1,
    });
  };

  const addToCart = product => {
    // const { dispatch } = this.props;
    // const { infoOptions, qty } = this.state;
    const newData = getProfileAfterPrd(product, infoOptions);
    dispatch({
      type: 'cart/increaseItem',
      product: { ...newData, qty },
      showCart: true,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const { qty, infoOptions } = this.state;
    // eslint-disable-next-line no-shadow
    const { data, dispatch } = this.props;
    const newData = getProfileAfterPrd(data, infoOptions);
    dispatch({
      type: 'cart/increaseItem',
      product: { ...newData, qty: qty || 1 },
      showCart: true,
    });
  };

  const changeItem = e => {
    // eslint-disable-next-line no-shadow
    const qty = e.target.value;
    if ((qty <= 999 && qty >= 1) || qty === '') {
      this.setState({ qty: e.target.value ? Number(e.target.value) : e.target.value });
    }
  };

  const handleClickActiveTab = num => {
    setactiveTab(num);
    console.log('activeTab', activeTab);
  };
  const handleImage = (e, num) => {
    e.preventDefault();
    setActiveImage(num);
  };

  const template =
    data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
  const imageResize =
    template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
  const image = (data && data.images.split(',')) || '';
  return (
    <React.Fragment>
      <BreadCrumb data={data} isProduct />
      <section className="product margin-top-10 f-left w_100">
        <div className="container">
          <div className="row">
            <div className="section">
              <div className="details-product section">
                {/* Zoomlens */}
                <div className="product-detail-left product-images col-xs-12 col-sm-6 col-md-offset-0 col-lg-offset-0 col-sm-offset-3 col-md-4 col-lg-4">
                  <div className="col_large_default large-image">
                    <a href="#" data-rel="prettyPhoto[product-gallery]">
                      <div style={{ height: '368px', width: '368px' }} className="zoomWrapper">
                        <div style={{ height: '368px', width: '368px' }} className="zoomWrapper">
                          <ZoomImage
                            id="detail-zoom"
                            className="checkurl img-responsive"
                            src={getResponsiveImage(
                              data.images && data.images.split(',')[index],
                              imageResize
                            )}
                            lensSize={150}
                            zoomStyle={{
                              border: '2px solid rgb(136, 136, 136)',
                              width: '420px',
                              height: '500px',
                              marginLeft: 10,
                            }}
                            style={{ position: 'absolute', width: '368px', height: '368px' }}
                            alt={data.name}
                          />
                        </div>
                      </div>
                    </a>
                  </div>

                  {image && (
                    <OwlCarousel items={3} margin={15} className="thumb_product_details">
                      {image.map((item, index) => (
                        <div className="item">
                          <a href="#">
                            <img
                              className="lazyload loaded"
                              src={getResponsiveImage(item, imageResize)}
                              alt={data.name}
                              data-was-processed="true"
                              onClick={e => handleImage(e, index)}
                            />
                          </a>
                        </div>
                      ))}
                    </OwlCarousel>
                  )}
                </div>

                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 details-pro">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <h2 className="title-product">{data.name}</h2>
                      <div className="fw w_100">
                        <div className="group-status">
                          <span className="first_status">
                            Loại:{' '}
                            {data.ecommerceProductClassify1 &&
                              data.ecommerceProductClassify1.map(item => (
                                <span className="status_name">{item.name}</span>
                              ))}
                          </span>
                          <span className="first_status section margin-bottom-10">
                            Tình Trạng :
                            <span className="status_name availabel">
                              {data.quantities && data.quantities === 1 ? 'Còn hàng' : 'Hết hàng'}
                            </span>
                          </span>
                        </div>
                        <div className="section">
                          <div className="rte">
                            <p>{data.shortDescription}</p>
                          </div>
                        </div>
                        {/* <div className="reviews_details_product ">
                          <div className="info__rate-star">
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </div>
                        </div> */}

                        <div className="price-box">
                          <div className="special-price">
                            <span className="price product-price">
                              {formatNumber(
                                checkDealPrice(infoProduct)
                                  ? infoProduct.dealPrice
                                  : infoProduct.price
                              )}
                              <span>đ</span>&nbsp;
                            </span>
                            {checkDealPrice(infoProduct) && (
                              <del className="deal-price">
                                {formatNumber(infoProduct.price)}
                                <span>đ</span>
                              </del>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-product col-sm-12">
                        {ecommerceProductClassify1 && ecommerceProductClassify1.length > 1 && (
                          <div className="option__1">
                            <div className="option__box">
                              {ecommerceProductClassify1.map(item => (
                                <div
                                  className={`option__item ${
                                    optionId1 === item.id ? 'active' : ''
                                  }`}
                                  key={item.id}
                                  title={item.name}
                                  onClick={() => onFilterOptions(item.id, '1')}
                                >
                                  {item.images !== '' ? (
                                    <img
                                      className="fill-cover"
                                      alt={data.name}
                                      src={`${getResponsiveImage(
                                        item.images && item.images.split(',')[0],
                                        [30, 30, 30]
                                      )}`}
                                    />
                                  ) : (
                                    <p style={{ padding: '10px 15px' }}>{item.name}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {ecommerceProductClassify2 && ecommerceProductClassify2.length > 1 && (
                          <div className="option__1">
                            <div className="option__box">
                              {ecommerceProductClassify2.map(item => (
                                <div
                                  className={`option__item ${
                                    optionId2 === item.id ? 'active' : ''
                                  }`}
                                  key={item.id}
                                  onClick={() => onFilterOptions(item.id, '2')}
                                  title={item.name}
                                >
                                  {item.images !== '' ? (
                                    <img
                                      className="fill-cover"
                                      alt={data.name}
                                      src={`${getResponsiveImage(
                                        item.images && item.images.split(',')[0],
                                        [30, 30, 30]
                                      )}`}
                                    />
                                  ) : (
                                    <p>{item.name}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div
                          className="form-group form_button_details"
                          onSubmit={e => handleSubmit(e)}
                        >
                          <div className="form_product_content ">
                            <div className="soluong show">
                              <div className="label_sl margin-bottom-5">Số lượng:</div>
                              <div className="custom input_number_product custom-btn-number form-control">
                                <button
                                  className="btn_num num_1 button button_qty"
                                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                                  type="button"
                                >
                                  -
                                </button>
                                <input
                                  className="form-control prd_quantity"
                                  id="num--qty-product"
                                  type="text"
                                  min={1}
                                  readOnly
                                  max={10}
                                  value={qty}
                                  onChange={
                                    e => changeItem(e) // eslint-disable-next-line react/no-this-in-sfc
                                  }
                                />
                                <button
                                  className="btn_num num_2 button button_qty"
                                  onClick={() => setQty(qty + 1)}
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="button_actions clearfix">
                              <button
                                type="submit"
                                className="btn btn_base btn_add_cart btn-cart add_to_cart"
                              >
                                <span className="iconleft_button">
                                  <i className="fa fa-shopping-basket" />
                                </span>
                                <span className="text_1" onClick={() => addToCart(data)}>
                                  Cho vào giỏ hàng
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section note_details">
                        <b>Ghi chú</b>
                        <p>{data.categories.descriptions}</p>
                      </div>
                      <div className="add__cart">
                        <div
                          className="buy-now perfect-center"
                          onClick={() => {
                            addToCart(data);
                            window.location.href = '/checkout';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab_h section">
                <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                  <div className="product-tab e-tabs not-dqtab">
                    <ul className="tabs tabs-title clearfix">
                      <li
                        className={activeTab === 0 ? 'tab-link current' : 'tab-link'}
                        tab="0"
                        style={{ height: '40px', marginLeft: '5px' }}
                        onClick={() => handleClickActiveTab(0)}
                      >
                        <h3 tab="0">Mô tả sản phẩm</h3>
                      </li>
                      <li
                        className={activeTab === 1 ? 'tab-link current' : 'tab-link'}
                        tab="1"
                        style={{ height: '40px', marginLeft: '5px' }}
                        onClick={() => handleClickActiveTab(1)}
                      >
                        <h3 tab="1">Tab tuỳ chỉnh</h3>
                      </li>
                      <li
                        className={activeTab === 2 ? 'tab-link current' : 'tab-link'}
                        tab="2"
                        style={{ height: '40px', marginLeft: '5px' }}
                        onClick={() => handleClickActiveTab(2)}
                      >
                        <h3 tab="2">Đánh giá</h3>
                      </li>
                    </ul>

                    <div className="tab-float">
                      <div
                        className={
                          activeTab === 0
                            ? 'tab-content content_extab current'
                            : 'tab-content content_extab'
                        }
                      >
                        <div
                          className="rte"
                          dangerouslySetInnerHTML={
                            { __html: data.description || `<p>Đang cập nhật....</p>` } // eslint-disable-next-line react/no-danger
                          }
                        />
                      </div>
                    </div>
                    <div
                      id="1"
                      className={
                        activeTab === 1
                          ? 'tab-content content_extab current'
                          : 'tab-content content_extab'
                      }
                    >
                      <div className="rte">Nội dung tùy chỉnh viết ở đây</div>
                    </div>
                    <div
                      id="2"
                      className={
                        activeTab === 2
                          ? 'content content_extab tab-review-c current'
                          : 'content content_extab tab-review-c'
                      }
                    >
                      <div className="rte">
                        <div
                          id="bizweb-product-reviews"
                          className="bizweb-product-reviews"
                          data-id={12806148}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* San pham cung loai */}
            {productInCategory && productInCategory.length > 0 && (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 owl_nav_custome1 related-product margin-top-20 xs-margin-top-15 margin-bottom-30">
                <div className="section_prd_feature">
                  <div className="heading">
                    <h2 style={{ fontFamily: 'Tinos, Roboto, sans-serif' }}>
                      <a href="/trai-cay-nhap-khau" title="Sản phẩm cùng loại">
                        Sản phẩm cùng loại
                      </a>
                    </h2>
                  </div>
                  {/* <div className="products product_related products-view-grid-bb owl-carousel owl-theme products-view-grid not-dot2 owl-loaded owl-drag"> */}
                  <OwlCarousel
                    dots={false}
                    margin={15}
                    responsive={{
                      0: { items: 2, slideBy: 1 },
                      600: { items: 3, slideBy: 1 },
                      991: { items: 4, slideBy: 2 },
                    }}
                    nav
                  >
                    {productInCategory &&
                      productInCategory.map(item => (
                        <div className="item_product_main related-item">
                          <div className="item">
                            <div className="product-box product-item-main product-item-compare">
                              <div className="product-thumbnail">
                                <a
                                  className="image_thumb p_img"
                                  href={getLinkProduct(item)}
                                  title={item.name}
                                >
                                  <img
                                    className="lazyload loaded"
                                    src={`${
                                      checkHttpLink(getArrImg(item)[0])
                                        ? getArrImg(item)[0]
                                        : getResponsiveImage(getArrImg(item)[0], 200, 350, 150)
                                    }`}
                                    alt={item.name}
                                  />
                                </a>
                                {item.dealPrice < item.price && (
                                  <div className="saleright">
                                    <span style={{ fontFamily: 'Tinos, Roboto, sans-serif' }}>
                                      -{100 - Math.ceil((item.price / item.dealPrice) * 100)}%
                                    </span>
                                  </div>
                                )}

                                {/* <a data-toggle="tooltip" title href={getLinkProduct(item)} className="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm" data-original-title="Xem nhanh">
                                <i className="fa fa-eye" />
                              </a> */}
                                <div className="product-action clearfix">
                                  <form
                                    method="post"
                                    className="variants form-nut-grid"
                                    data-id="product-actions-12806140"
                                    encType="multipart/form-data"
                                  >
                                    <div className="group_action">
                                      <input type="hidden" name="variantId" />
                                      <a
                                        data-toggle="tooltip"
                                        className="btn-buy firstb btn-cart button_35 left-to muangay add_to_cart"
                                        title
                                        data-original-title="Mua ngay"
                                        onClick={() => addToCart(item)}
                                      >
                                        <i className="fa fa-shopping-basket" />
                                        Thêm vào giỏ
                                      </a>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="product-info product-bottom mh">
                                <h3 className="product-name">
                                  <a href={getLinkProduct(item)} title="Đu đủ Thái Lan">
                                    {item.name}
                                  </a>
                                </h3>
                                <div className="section">
                                  <div className="blockprice">
                                    <div className="product-item-price price-box">
                                      <span className="special-price">
                                        <span className="price product-price">
                                          {formatNumber(
                                            checkDealPrice(item) ? item.dealPrice : item.price
                                          )}
                                        </span>
                                      </span>
                                      <span className="product-item-price-sale old-price">
                                        <span className="compare-price price product-price-old">
                                          {formatNumber(item.price)}
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
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default connect()(Index);
