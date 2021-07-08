/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

import {
  formatNumber,
  getLinkProduct,
  getProfileAfterPrd,
  // eslint-disable-next-line no-unused-vars
  getInfoOptions,
} from '@/utils/utils';
import { findPage, range, scrollTop } from '@/static/web/js/templateCode';

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

const BreadCrumb = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/BreadCrumb`), {
  ssr: true,
  loading: () => null,
});

const ViewProduct = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/viewProduct'), {
  ssr: false,
  loading: () => null,
});
const PAGE_SIZE = 12;

@connect(({ webs: { dataAd }, webs }) => ({ dataAd, webs }))
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false,
      dataAll: [],
      articles: [],
      isOpenMenu: false,
      dataProducer: [],
      sortType: 0,
      slides: [],
      number: -1,
      priceList: [
        { name: 'Giá dưới 200.000đ', fromValue: 1, toValue: 199999 },
        { name: '200.000đ - 300.000đ', fromValue: 200000, toValue: 300000 },
        { name: '300.000đ - 500.000đ', fromValue: 300000, toValue: 500000 },
        { name: '500.000đ - 1.000.000đ', fromValue: 500000, toValue: 1000000 },
        { name: 'Giá trên 1.000.000đ', fromValue: 1000000 },
      ],
      arrSort: [
        { name: 'Mới nhất', sort: ['createDate', 'DESC'] },
        { name: 'Cũ nhất', sort: ['createDate', 'ASC'] },
        { name: 'Giá cao đến thấp', sort: ['dealPrice', 'DESC'] },
        { name: 'Giá thấp đến cao', sort: ['dealPrice', 'ASC'] },
      ],
      fromValue: null,
      toValue: null,
      categories: null,
      producerID: null,
      arrayProduct: [],
    };
  }

  componentDidMount() {
    const { data, dispatch, dataAd, dataSite } = this.props;
    const { arrayProduct } = this.state;

    dispatch({
      type: 'webs/fetchProducers',
      payload: {
        filter: {
          sitesId: dataSite.id,
        },
      },

      callback: res => {
        const list = (res && res.result && res.result.list) || [];

        const arrReduce = list.reduce(
          (accumulator, currentItem) =>
            accumulator.map(item => item.id).includes(currentItem.id)
              ? accumulator
              : [...accumulator, currentItem],
          []
        );
        this.setState({
          dataProducer: arrReduce || [],
        });
      },
    });

    dispatch({
      type: 'webs/fetchAllProduct',
      payload: {
        filter: {
          status: true,
          categoriesId: data.id,
          sitesId: dataSite.id,
        },
        range: [0, PAGE_SIZE - 1],
        attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
      },
      callback: res => {
        console.log('res1', res);
        if (res.success) {
          this.setState({ dataAll: res && res.result });
        }
      },
    });

    dispatch({
      type: 'webs/fetchAllProductCatalog',
      payload: {
        filter: {
          status: true,
          // categoriesId: data.id,
          sitesId: dataSite.id,
        },
        attributes: `id,name. images. price. dealPrice, categoriesId, producersId, createDate`,
      },
      callback: res => {
        console.log(res);
        if (res.success) {
          const result =
            (res && res.result && res.result.length > 0 && res.result[0].products) || [];
          const div = Math.trunc(result.length / 4);
          for (let i = 1; i <= div; i += 1) {
            const array1 = result.splice(0, 4);
            arrayProduct.push(array1);
          }
          this.setState({
            dataCatalog:
              (res && res.result && res.result.length > 0 && res.result[1].products) || [],
            dataCatalogSite:
              (res && res.result && res.result.length > 0 && res.result[1].catalogs) || [],
            dataCatalogSite0:
              (res && res.result && res.result.length > 0 && res.result[0].catalogs) || [],
          });
        }
      },
    });

    dispatch({
      type: 'webs/fetchTreeCategory',
      payload: {
        filter: {
          status: true,
          id: data.id,
          sitesId: data.sitesId,
        },
      },
      callback: r => {
        const info = r && r.result && r.result.list && r.result.list.length > 0 && r.result.list[0];
        dispatch({
          type: 'webs/fetchAllChildrenCategory',
          payload: {
            filter: {
              status: true,
              parentId: info && info.id,
            },
          },
          callback: res => {
            if (res.success) {
              if (res.result.list.length) {
                this.setState({
                  articles: res.result.list,
                  categories: res.result.list,
                });
              }
            }
          },
        });
      },
    });

    if (dataAd && dataAd.list) {
      const slides = dataAd.list.filter(a => a.adsPositionsId === '33');
      const dataArticle = dataAd.list.filter(x => x.adsPositionsId === '34');
      this.setState({
        slides,
        dataArticle,
      });
    }
  }

  getSale = (price, dealPrice) => Math.ceil(((price - dealPrice) * 100) / price);

  goToPage = numberPage => {
    const { data, dispatch } = this.props;
    const { fromValue, toValue, producerID, arrSort, sortType } = this.state;
    const indexOfLastNews = numberPage * PAGE_SIZE; // vị trí của tin cuối cùng trong list được hiển thị
    const indexOfFirstNews = indexOfLastNews - PAGE_SIZE; // vị trí của tin đầu tiên trong list tin
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        fromValue,
        toValue,
        field: 'dealPrice',
        producersId: producerID,
        sitesId: data.sitesId,
      },
      sort: arrSort[sortType].sort,
      range: [indexOfFirstNews, indexOfLastNews - 1],
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };
    if (!fromValue) {
      delete query.filter.fromValue;
      delete query.filter.field;
    }
    if (!toValue) {
      delete query.filter.toValue;
    }
    if (!producerID) {
      delete query.filter.producersId;
    }
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        this.setState({
          // dataAll: res && res.result && res.result.list,
          dataAll: res && res.result,
        });
        scrollTop();
      },
    });
  };

  // chuyển trang dựa trên id khi click
  chosePage = item => {
    // event.preventDefault()
    this.goToPage(Number(item));
  };

  // chuyển trang lần lượt khi click
  currentPage = key => {
    const { dataAll } = this.state;
    const numberPage = dataAll && dataAll.pagination && dataAll.pagination.current;
    if (key === 'next') {
      this.goToPage(numberPage + 1);
    } else {
      this.goToPage(numberPage - 1);
    }
  };

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

  onAfterChange = info => {
    const { producerID } = this.state;
    const { data, dispatch } = this.props;
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        producersId: producerID,
        sitesId: data.sitesId,
      },
      range: [0, PAGE_SIZE - 1],
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };

    if (!producerID) {
      delete query.filter.producersId;
    }
    if (info !== 'all') {
      this.setState({
        fromValue: info.fromValue,
      });
      query.filter.fromValue = info.fromValue;
      query.filter.field = 'dealPrice';
    }
    if (info !== 'all' && info.toValue) {
      this.setState({
        toValue: info.toValue,
      });
      query.filter.toValue = info.toValue;
    }
    if (info === 'all') {
      this.setState({
        fromValue: null,
        toValue: null,
      });
    }
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        this.setState({
          // dataAll: res.result.list,
          dataAll: res && res.result,
        });
      },
    });
  };

  openMenuFilter = () => {
    const { isOpenMenu } = this.state;
    this.setState({
      isOpenMenu: !isOpenMenu,
    });
  };

  onFilter = e => {
    const { data, dispatch } = this.props;
    const { fromValue, toValue } = this.state;
    const idFilter = e.target.getAttribute('data-filter');
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        producersId: idFilter,
        sitesId: data.sitesId,
      },
      range: [0, PAGE_SIZE - 1],
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };
    if (fromValue) {
      query.filter.fromValue = fromValue;
      query.filter.field = 'dealPrice';
    }
    if (toValue) {
      query.filter.toValue = toValue;
    }
    if (!idFilter) delete query.filter.producersId;

    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        this.setState({
          // dataProduct: res.result.list,
          dataAll: (res && res.result) || [],
          producerID: idFilter,
        });
      },
    });
  };

  onSort = index => {
    this.setState({
      number: index,
    });
    this.goSort(index);
  };

  goSort = newSortType => {
    const { data, dispatch, dataSite } = this.props;
    const { sortType, arrSort, fromValue, toValue } = this.state;

    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        sitesId: dataSite.id,
        fromValue,
        toValue,
        field: 'dealPrice',
      },
      range: [0, PAGE_SIZE - 1],
      sort: arrSort[newSortType !== undefined ? newSortType : sortType].sort,
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };

    if (!fromValue && !toValue) {
      delete query.filter.fromValue;
      delete query.filter.toValue;
    }
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        if (res.success) {
          if (res.result.list) {
            this.setState({
              dataAll: res.result,
              sortType: newSortType !== undefined ? newSortType : sortType,
            });
          }
        }
      },
    });
  };

  activeMenu = e => {
    if (e.target.parentNode) {
      if (e.target.parentNode.className.search(' active') + 1) {
        e.target.parentNode.className = e.target.parentNode.className.replace(' active', '');
      } else {
        e.target.parentNode.className = `${e.target.parentNode.className} active`;
      }
    }
  };

  getAllProducer = () => {
    const { data, dispatch } = this.props;
    const { fromValue, toValue } = this.state;
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        sitesId: data.sitesId,
      },
      range: [0, PAGE_SIZE - 1],
      attributes: `id,name,images,price,dealPrice,categoriesId,producersId,createDate`,
    };
    if (fromValue) {
      query.filter.fromValue = fromValue;
      query.filter.field = 'dealPrice';
    }
    if (toValue) {
      query.filter.toValue = toValue;
    }
    dispatch({
      type: 'webs/fetchAllProduct',
      payload: query,
      callback: res => {
        this.setState({
          // dataProduct: res.result.list,
          dataAll: (res && res.result) || [],
          producerID: null,
        });
      },
    });
  };

  getSale = (price, dealPrice) => Math.ceil(((price - dealPrice) * 100) / price);

  selectProduct = product => this.setState({ productSelected: product });

  render() {
    const { data } = this.props;
    const {
      categories,
      dataAll,
      articles,
      slides,
      priceList,
      dataProducer,
      number,
      // dataArticle,
      arrSort,
      dataCatalog,
      // dataCatalog0,
      dataCatalogSite,
      dataCatalogSite0,
      arrayProduct,
      productSelected,
      sidebar,
    } = this.state;

    const total = dataAll && dataAll.pagination && dataAll.pagination.total;
    const currentPage = dataAll && dataAll.pagination && dataAll.pagination.current;
    const { startPage, endPage, totalPages } = findPage(total, PAGE_SIZE, currentPage);
    const pageNumbers = range(startPage, endPage);
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    console.log('dataAll', dataAll);
    const products = dataAll && dataAll.list;
    console.log('datacatalog', dataCatalog);
    console.log('arrayProduct', arrayProduct);

    return (
      <React.Fragment>
        <BreadCrumb data={data} />
        <div className="container">
          <div className="row">
            <div className="bg_collection">
              <aside
                className={
                  sidebar
                    ? 'col-lg-3 col-lg-3-fix dqdt-sidebar left-content openf sidebar'
                    : 'col-lg-3 col-lg-3-fix dqdt-sidebar left-content sidebar'
                }
              >
                <div className="wrap_background_aside asidecollection">
                  <aside className="aside-item sidebar-category collection-category">
                    <div className="aside-title">
                      <h3 className="title-head margin-top-0 margin-bottom-10">
                        <span>Danh mục</span>
                      </h3>
                    </div>
                    <div className="aside-content">
                      <nav className="nav-category navbar-toggleable-md">
                        <ul className="nav navbar-pills">
                          {categories &&
                            categories.map(category =>
                              category.children.length > 0 ? (
                                <li className="nav-item">
                                  <a href={`/${category.urlSlugs}`} className="nav-link">
                                    {category.name}
                                  </a>
                                  {category.children && (
                                    <i
                                      className="fa fa-angle-down"
                                      onClick={e => this.activeMenu(e)}
                                    />
                                  )}
                                  <ul className="dropdown-menu">
                                    {category.children.map(child => (
                                      <li className="dropdown-submenu nav-item lv2">
                                        <a className="nav-link" href={`/${child.urlSlugs}`}>
                                          {child.name}
                                        </a>
                                        {child.children && child.children.length > 0 && (
                                          <i
                                            className="fa fa-angle-down"
                                            onClick={e => this.activeMenu(e)}
                                          />
                                        )}
                                        <ul className="dropdown-menu">
                                          {child.children &&
                                            child.children.map(i => (
                                              <li className="nav-item lv2">
                                                <a className="nav-link" href={`/${i.urlSlugs}`}>
                                                  {i.name}
                                                </a>
                                              </li>
                                            ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ) : (
                                <li className="nav-item ">
                                  <a className="nav-link" href={`/${category.urlSlugs}`}>
                                    {category.name}
                                  </a>
                                </li>
                              )
                            )}
                        </ul>
                      </nav>
                    </div>
                  </aside>

                  <div className="aside-filter">
                    {/* Lọc giá */}
                    <div className="aside-hidden-mobile">
                      <div className="filter-container">
                        <aside className="aside-item filter-vendor">
                          <div className="aside-title">
                            <h2 className="title-head margin-top-0">
                              <span>Thương hiệu</span>
                            </h2>
                          </div>
                          <div className="aside-content filter-group">
                            <ul className="filter-vendor">
                              <li className="filter-item filter-item--check-box filter-item--green">
                                <label htmlFor="input-all" className="samsung">
                                  <input
                                    type="radio"
                                    name="producer"
                                    id="input-all"
                                    onChange={this.getAllProducer}
                                  />
                                  <i className="fa" />
                                  Tất cả
                                </label>
                              </li>
                              {dataProducer && dataProducer.length > 0 ? (
                                dataProducer.map(producer => (
                                  <li
                                    className="filter-item filter-item--check-box filter-item--green"
                                    key={producer.id}
                                  >
                                    <label htmlFor={`input-${producer.id}`} className="samsung">
                                      <input
                                        type="radio"
                                        name="producer"
                                        id={`input-${producer.id}`}
                                        data-filter={producer.id}
                                        onChange={this.onFilter}
                                      />
                                      <i className="fa" />
                                      {producer.name}
                                    </label>
                                  </li>
                                ))
                              ) : (
                                <p>ĐAng cập nhật</p>
                              )}
                            </ul>
                          </div>
                        </aside>
                        <aside className="aside-item filter-price">
                          <div className="aside-title">
                            <h2 className="title-head margin-top-0">
                              <span>Giá sản phẩm</span>
                            </h2>
                          </div>
                          <div className="aside-content filter-group">
                            <ul>
                              {priceList.map((price, index) => (
                                <li
                                  className="filter-item filter-item--check-box filter-item--green"
                                  key={price.name}
                                  onClick={() => {
                                    this.onAfterChange(price);
                                  }}
                                >
                                  <label htmlFor={`filter-aldo${index}`} className="aldo">
                                    <input type="radio" name="price" id={`filter-aldo${index}`} />
                                    <i className="fa" />
                                    {price.name}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </div>
                  {/* Co the ban thich */}
                  <div className="section_best_sale aside-filter hidden-xs">
                    <div className="aside-mini-list-product">
                      <div>
                        <div className="left-content">
                          <div className="aside-title">
                            {dataCatalogSite0 && dataCatalogSite0 && (
                              <h2 className="title-head margin-top-0">
                                <a title={dataCatalogSite0.name}>{dataCatalogSite0.name}</a>
                              </h2>
                            )}
                          </div>
                        </div>
                        <div className="related-products">
                          {arrayProduct &&
                            arrayProduct.map(products => (
                              <div
                                className="product-mini-lists owl-carousel owl-loaded owl-drag"
                                data-lg-items={1}
                                data-md-items={1}
                                data-sm-items={1}
                                data-xs-items={1}
                                data-margin={0}
                                data-nav="true"
                              >
                                <div className="owl-stage-outer">
                                  <div
                                    className="owl-stage"
                                    style={{
                                      transform: 'translate3d(0px, 0px, 0px)',
                                      transition: 'all 0s ease 0s',
                                      width: '810px',
                                    }}
                                  >
                                    <div className="owl-item active" style={{ width: '270px' }}>
                                      <div className="products itemss">
                                        <div className="row">
                                          <div className="col-sm-12">
                                            {products &&
                                              products.length > 0 &&
                                              products.map(product => (
                                                <>
                                                  <div className="item_small">
                                                    <div className="product-mini-item clearfix">
                                                      <a
                                                        href={getLinkProduct(product)}
                                                        className="product-img"
                                                      >
                                                        <img
                                                          className="lazyload loaded"
                                                          src={getResponsiveImage(
                                                            product.images &&
                                                              product.images.split(',')[0],
                                                            imageResize
                                                          )}
                                                          // style={{
                                                          //   width: '195px',
                                                          //   height: '195px',
                                                          //   objectFit: 'cover',
                                                          // }}
                                                          // data-src="//bizweb.dktcdn.net/thumb/small/100/334/091/products/bapcaitrang-vietgap.jpg?v=1538415435193"
                                                          alt={product.name}
                                                          data-was-processed="true"
                                                        />
                                                      </a>
                                                      <div className="product-info">
                                                        <h3>
                                                          <a
                                                            href={getLinkProduct(product)}
                                                            title={product.name}
                                                            className="product-name text3line"
                                                          >
                                                            {product.name}
                                                          </a>
                                                        </h3>
                                                        <div className="price-box">
                                                          <span className="special-price">
                                                            <span className="price product-price">
                                                              {formatNumber(Number(product.price))}
                                                            </span>
                                                          </span>
                                                          {product.dealPrice &&
                                                            product.price - product.dealPrice >
                                                              0 && (
                                                              <span className="product-item-price-sale old-price">
                                                                <span className="compare-price price sale-price product-price-old">
                                                                  {formatNumber(
                                                                    Number(product.dealPrice)
                                                                  )}
                                                                </span>
                                                              </span>
                                                            )}
                                                        </div>
                                                        <div
                                                          className="bizweb-product-reviews-badge"
                                                          data-id={12806175}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="main_container collection col-lg-9 col-lg-9-fix padding-col-left-0">
                {/* San pham goi y */}
                <div className="section section_suggested padding-top-10">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="section title_module_main">
                        {dataCatalogSite && (
                          <h2 className="h2">
                            <a href="san-pham-noi-bat" title={dataCatalogSite.name}>
                              {dataCatalogSite.name}
                            </a>
                          </h2>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      {dataCatalog && (
                        <OwlCarousel
                          className="owl-carousel owl_suggested owl-loaded owl-drag"
                          items={4}
                          data-dot="false"
                          data-nav="true"
                          data-loop="false"
                          data-play="true"
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
                            1000: { items: 4 },
                            768: { items: 2 },
                            500: { items: 2 },
                            0: { items: 2 },
                          }}
                        >
                          {dataCatalog &&
                            dataCatalog.length > 0 &&
                            dataCatalog.map(product => (
                              <div className="item_product_main itemcustome">
                                <div className="product-box product-item-main product-item-compare">
                                  <div className="product-thumbnail">
                                    <a
                                      className="image_thumb p_img"
                                      href={getLinkProduct(product)}
                                      title={product.name}
                                    >
                                      <img
                                        className="lazyload loaded"
                                        src={getResponsiveImage(
                                          product.images && product.images.split(',')[0],
                                          imageResize
                                        )}
                                        alt={product.name}
                                        data-was-processed="true"
                                      />
                                    </a>
                                    {product.dealPrice - product.price < 0 && (
                                      <div className="saleright">
                                        <span>
                                          -{this.getSale(product.price, product.dealPrice)}%
                                        </span>
                                      </div>
                                    )}
                                    <a
                                      data-toggle="tooltip"
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
                                      <form
                                        action="/cart/add"
                                        method="post"
                                        className="variants form-nut-grid"
                                        data-id="product-actions-12806175"
                                        encType="multipart/form-data"
                                      >
                                        <div className="group_action">
                                          <a
                                            data-toggle="tooltip"
                                            onClick={() => this.addToCart(product)}
                                            className="btn-buy firstc btn-cart button_35 left-to"
                                            title
                                            data-original-title="Chi tiết"
                                          >
                                            <i
                                              className="fa fa-shopping-basket"
                                              onClick={() => this.addToCart(product)}
                                            />
                                            Thêm vào giỏ
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
                                              {formatNumber(Number(product.price))}
                                            </span>
                                          </span>
                                          {product.dealPrice &&
                                            product.dealPrice - product.price < 0 && (
                                              <span className="product-item-price-sale old-price">
                                                <span
                                                  className="compare-price price product-price-old"
                                                  style={{
                                                    fontFamily: 'Tinos, Roboto, sans-serif',
                                                  }}
                                                >
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
                  </div>
                </div>
                <h1 className="title-head margin-top-0 hidden">{data.name}</h1>
                {slides && slides.length > 0
                  ? slides.map(slide => (
                      <div className="category-gallery margin-bottom-15">
                        <div className="image pd-bt30">
                          <img
                            src={getResponsiveImage(slide.contents && slide.contents.split(',')[0])}
                            alt={data.name}
                            className="img-responsive center-block"
                          />
                        </div>
                      </div>
                    ))
                  : ''}
                <div className="group-category">
                  {articles && articles.length > 0 && (
                    <OwlCarousel
                      className="home-slider owl-carousel owl-theme owl-loaded owl-drag"
                      items={1}
                      navText={[
                        `<span className="next-ex"></span>`,
                        '<span className="next-ex"></span>',
                      ]}
                      autoplay
                    >
                      {articles.map(article => (
                        <div className="item">
                          <div className="category-item">
                            <a href={`/${article.urlSlugs}`} title={article.title}>
                              <div className="group-category-image">
                                <img
                                  className="img-fluid"
                                  src={getResponsiveImage(
                                    article.image && article.image.split(',')[1]
                                  )}
                                  alt={article.title}
                                />
                              </div>
                              <h6>{article.title}</h6>
                            </a>
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  )}
                </div>
                <div className="category-products products">
                  <div className="sortPagiBar">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="bg-white sort-cate clearfix f-left">
                          {/* <div className="sort-cate clearfix margin-top-10 margin-bottom-10"> */}
                          <div className="sort-cate-left hidden-xs hidden-sm">
                            <h3>Ưu tiên theo:</h3>
                            <ul>
                              {arrSort.map((item, index) => (
                                <li
                                  className={
                                    index === number
                                      ? 'btn-quick-sort alpha-asc active '
                                      : 'btn-quick-sort alpha-asc'
                                  }
                                  key={item.id}
                                >
                                  <a onClick={() => this.onSort(index)}>
                                    <i style={{ pointerEvents: 'none' }} />
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* </div> */}
                          <div className="sort-cate-right-mobile hidden-lg hidden-md">
                            <div id="sort-by">
                              <label className="left">Sắp xếp: </label>
                              <ul>
                                <li>
                                  <span>Thứ tự</span>
                                  <ul>
                                    {arrSort.map((item, index) => (
                                      <li key={item.id}>
                                        <a onClick={() => this.onSort(index)}>{item.name}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show Product */}
                  <section className="products-view products-view-grid collection_reponsive list_hover_pro">
                    <div className="row">
                      {products && products.length > 0
                        ? products.map(product => (
                            <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3 product-col">
                              <div className="item_product_main margin-bottom-20 item_product_main_relative">
                                <div className="product-box product-item-main">
                                  <div className="product-thumbnail">
                                    <a
                                      className="image_thumb thumb_cls p_img"
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
                                    <a
                                      data-toggle="tooltip"
                                      title="Xem nhanh"
                                      href="#"
                                      data-handle="test-2-variant"
                                      className="xem_nhanh btn-circle btn_view btn right-to quick-view hidden-xs hidden-sm"
                                    >
                                      <i
                                        className="fa fa-eye"
                                        onClick={e => {
                                          e.preventDefault();
                                          this.selectProduct(product);
                                        }}
                                      />
                                    </a>
                                    {product.dealPrice && product.dealPrice - product.price < 0 && (
                                      <div className="saleright">
                                        <span
                                          style={{
                                            fontFamily: 'Tinos, Roboto, sans-serif',
                                          }}
                                        >
                                          - {this.getSale(product.price, product.dealPrice)}%
                                        </span>
                                      </div>
                                    )}

                                    <div className="product-action clearfix">
                                      <form
                                        action="#"
                                        method="post"
                                        className="variants form-nut-grid"
                                        data-id="product-actions-12839808"
                                        encType="multipart/form-data"
                                      >
                                        <div className="group_action">
                                          <input
                                            className="hidden"
                                            type="hidden"
                                            name="variantId"
                                          />
                                          <a
                                            data-toggle="tooltip"
                                            className="btn-cart firstb button_35 left-to"
                                            title="Mua hàng"
                                          >
                                            <i className="fa fa-shopping-basket" />
                                            <span onClick={() => this.addToCart(product)}>
                                              Thêm giỏ hàng
                                            </span>
                                          </a>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                  <div className="product-info product-bottom mh">
                                    <h3 className="product-name a-center">
                                      <a href={getLinkProduct(product)} title={product.name}>
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
                                            product.dealPrice - product.price < 0 && (
                                              <span className="product-item-price-sale old-price">
                                                <span
                                                  className="compare-price price product-price-old"
                                                  style={{
                                                    fontFamily: 'Tinos, Roboto, sans-serif',
                                                  }}
                                                >
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
                            </div>
                          ))
                        : ''}
                    </div>

                    <div className="text-left">
                      <nav className="clearfix nav_pagi f-left w_100">
                        <ul className="pagination clearfix">
                          {currentPage > 1 && (
                            <li className="page-item">
                              <a className="page-link" onClick={() => this.currentPage('prev')}>
                                <i className="fas fa-angle-left" />
                              </a>
                            </li>
                          )}

                          {pageNumbers &&
                            pageNumbers.length > 1 &&
                            pageNumbers.map(item => (
                              <li
                                className={`${currentPage === item && 'active'} page-item `}
                                onClick={() => this.chosePage(item)}
                                id={item}
                                key={item}
                              >
                                <a
                                  className="page-link"
                                  onClick={() => this.chosePage(item)}
                                  title={item}
                                >
                                  {item}
                                </a>
                              </li>
                            ))}

                          {currentPage < totalPages && (
                            <li className="page-item">
                              <a className="page-link" onClick={() => this.currentPage('next')}>
                                <i className="fas fa-angle-right" />
                              </a>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </section>
                </div>

                <div
                  id="open-filters"
                  className={sidebar ? 'hidden-lg open-filters openf' : 'hidden-lg open-filters'}
                  onClick={() => this.setState({ sidebar: !sidebar })}
                >
                  <i className="fa fa-filter" aria-hidden="true" />
                </div>
              </div>
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
export default Index;
