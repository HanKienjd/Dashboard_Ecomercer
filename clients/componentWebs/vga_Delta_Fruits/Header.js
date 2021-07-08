/* eslint-disable array-callback-return */
import React from 'react';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { getLinkProduct, formatNumber } from '@/utils/utils';
import SearchForm from '@/componentWebs/vga_Delta_Fruits/SearchForm';

// import Drawer from 'react-motion-drawer';

@connect(({ cart, webs: { dataAd } }) => ({ dataCart: cart.dataCart, dataAd }))
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      visible: false,
    };
  }

  showCart = () => {
    const { dispatch, showCart } = this.props;
    dispatch({
      type: 'cart/showCart',
      showCart: !showCart,
    });
  };

  onShowMenu = event => {
    event.preventDefault();
    this.setState({
      showMenu: !this.showMenu,
    });
    // console.log(this.showMenu);
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

  removeItem = product => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cart/removeItem',
      product,
    });
  };

  increaseItem = data => {
    const product = { ...data };
    const { dispatch } = this.props;
    if (product.qty < 999) {
      product.qty += 1;
      dispatch({
        type: 'cart/increaseItem',
        product,
      });
    }
  };

  decreaseItem = data => {
    const product = { ...data };
    const { dispatch } = this.props;
    if (product.qty > 1) {
      dispatch({
        type: 'cart/decreaseItem',
        product,
      });
    }
  };

  submitItem = data => {
    const { dispatch } = this.props;
    const { productId, qty } = this.state;
    const product = { ...data };
    if (productId === product.id && qty) {
      product.qty = parseInt(qty, 10);
      dispatch({
        type: 'cart/increaseItem',
        product,
      });
    }
    this.setState({
      productId: 0,
    });
  };

  changeItem = (e, product) => {
    const qty = e.target.value;
    if ((qty <= 999 && qty >= 1) || qty === '') {
      this.setState({
        productId: product.id,
        qty: e.target.value ? parseInt(e.target.value, 10) : e.target.value,
      });
    }
  };

  render() {
    const { dataSite, menuHeader, asPath, dataCart } = this.props;

    const logo = dataSite.logo && dataSite.logo;
    const { showMenu, visible, qty, productId } = this.state;

    const productsIndex = menuHeader.findIndex(
      item => item.urlSlugs === 'san-pham-79' || item.urlSlugs === 'products'
    );

    let totalqty = 0;
    dataCart.map(product => {
      totalqty += product.qty;
    });

    const products =
      (menuHeader[productsIndex !== -1 ? productsIndex : 1] || { children: [] }).children || [];
    const placeholder = ['Bạn muốn tìm gì?'];
    products.map(item => placeholder.push(item.name));

    return (
      <React.Fragment>
        <div
          className={showMenu ? 'hidden-lg opacity_menu open_opacity' : 'opacity_menu'}
          onClick={() => this.setState({ showMenu: !showMenu })}
        />
        <div className="htop section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 hidden-sm hidden-xs detop">
                <p>
                  Chào mừng bạn đến với <span>{dataSite.name}</span>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="accoutlink a-right">
                  <div className="searchbox">
                    <SearchForm placeholder={placeholder} />
                  </div>
                  <div className="title_log">
                    <span>
                      <i className="far fa-user-circle" />
                      &nbsp;Tài khoản
                    </span>
                    <div className="achover">
                      <a className="btns" href="#">
                        Đăng nhập
                      </a>
                      <a href="#">Đăng ký</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="header">
          <div className="mid-header">
            <div className="container">
              <div className="row">
                <div className="content_header">
                  <div className="header-main">
                    <div className="menu-bar-h nav-mobile-button hidden-lg">
                      <a href="/">
                        <img
                          src="http://bizweb.dktcdn.net/100/334/091/themes/688241/assets/i_menubar.png?1594635661929"
                          onClick={this.onShowMenu}
                          alt="menu"
                        />
                      </a>
                    </div>
                    <div className="col-lg-3 logo-main">
                      <div className="logo">
                        <a href="/" className="logo-wrapper">
                          <img src={getResponsiveImage(logo)} alt="logo Delta Fruits" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 hidden-xs hidden-sm hidden-md padding-0">
                      <div className="header-left">
                        <div className="bg-header-nav hidden-xs hidden-sm">
                          <div>
                            <div className="row row-noGutter-2">
                              <nav className="header-nav">
                                <ul className="item_big">
                                  <li className={asPath === '/' ? 'nav-item active' : 'nav-item'}>
                                    <a className="a-img" href="/">
                                      <span>Trang chủ</span>
                                    </a>
                                  </li>
                                  {menuHeader &&
                                    menuHeader.length > 0 &&
                                    menuHeader.map(item =>
                                      item.children ? (
                                        <li
                                          key={item.id}
                                          className={
                                            asPath === `/${item.urlSlugs}`
                                              ? 'nav-item active'
                                              : 'nav-item'
                                          }
                                        >
                                          <a className="a-img" href={`/${item.urlSlugs}`}>
                                            <span>{item.name}</span>
                                            {item.children && (
                                              <i
                                                className="fa fa-angle-down"
                                                onClick={e => this.activeMenu(e)}
                                              />
                                            )}
                                          </a>
                                          {item.children && (
                                            <ul className="item_small hidden-sm hidden-xs ">
                                              {item.children.map(child =>
                                                child.children ? (
                                                  <li key={child.id}>
                                                    <a href={`/${child.urlSlugs}`}>
                                                      <i className="fas fa-arrow-right" />
                                                      {child.name}
                                                    </a>
                                                    {child.children && (
                                                      <i
                                                        className="fas fa-chevron-right"
                                                        onClick={e => this.activeMenu(e)}
                                                      />
                                                    )}
                                                    <ul>
                                                      {child.children &&
                                                        child.children.map(item2 => (
                                                          <li className="nav-item lv2">
                                                            <a href={`/${item2.urlSlugs}`}>
                                                              {item2.name}
                                                            </a>
                                                          </li>
                                                        ))}
                                                    </ul>
                                                  </li>
                                                ) : (
                                                  <li key={child.id}>
                                                    <a href={`/${child.urlSlugs}`}>{child.name}</a>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </li>
                                      ) : (
                                        <li
                                          key={item.id}
                                          className={
                                            asPath === `/${item.urlSlugs}`
                                              ? 'nav-item active'
                                              : 'nav-item'
                                          }
                                        >
                                          <a className="a-img" href={`/${item.urlSlugs}`}>
                                            <span>{item.name}</span>
                                            {item.children && (
                                              <i
                                                className="fa fa-angle-down"
                                                onClick={e => this.activeMenu(e)}
                                              />
                                            )}
                                          </a>
                                        </li>
                                      )
                                    )}
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-xs-12 no-padding-left cartright">
                      <div className="header-right">
                        <div className="top-cart-contain f-right">
                          <div className="mini-cart text-xs-center">
                            <div className="heading-cart cart_header">
                              <a className="img_hover_cart" href="/cart" title="Giỏ hàng">
                                <div className="icon_hotline">
                                  <img src="/static/vga_deltafruits/img/bag.png" alt="Giỏ hàng" />
                                  <span className="count_item_cart">{totalqty}</span>
                                </div>
                                {/* <span>{totalqty}</span> */}
                              </a>
                              <div className="content_cart_header hidden-xs">
                                <a className="bg_cart" href="/cart" title="Giỏ hàng">
                                  <span className="text-giohang">Giỏ hàng:</span>
                                  <strong>
                                    (<span className="count_item count_item_pr">{totalqty}</span>)
                                  </strong>{' '}
                                  Sản phẩm
                                </a>
                              </div>
                            </div>
                            <div className="top-cart-content">
                              <ul id="cart-sidebar" className="mini-products-list count_li">
                                {dataCart.length === 0 && (
                                  <div className="no-item">
                                    <p>Không có sản phẩm nào.</p>
                                  </div>
                                )}
                                {dataCart &&
                                  dataCart.length > 0 &&
                                  dataCart.map(item => (
                                    <ul id="cart-sidebar" className="mini-products-list count_li">
                                      <ul className="list-item-cart">
                                        <li className="item productid-20924439">
                                          <div className="border_list">
                                            <a
                                              className="product-image"
                                              href={getLinkProduct(item)}
                                            >
                                              <img
                                                alt={item.name}
                                                src={getResponsiveImage(
                                                  item.images && item.images.split(',')[0]
                                                )}
                                                width={100}
                                              />
                                            </a>
                                            <div className="detail-item">
                                              <div className="product-details">
                                                <p className="product-name">
                                                  <a
                                                    className="text2line"
                                                    href={getLinkProduct(item)}
                                                    title={item.name}
                                                  >
                                                    {item.name}
                                                  </a>
                                                </p>
                                              </div>
                                              <div className="product-details-bottom">
                                                <span className="price">
                                                  {formatNumber(Number(item.dealPrice))}
                                                </span>
                                                <a
                                                  title="Xóa"
                                                  className="remove-item-cart fa fa-trash"
                                                  onClick={() => this.removeItem(item)}
                                                >
                                                  &nbsp;
                                                </a>
                                                <div className="quantity-select qty_drop_cart">
                                                  <input
                                                    className="variantID"
                                                    type="hidden"
                                                    name="variantId"
                                                  />
                                                  <button
                                                    className=" btn_reduced reduced items-count btn-minus"
                                                    type="button"
                                                    onClick={() => this.decreaseItem(item)}
                                                  >
                                                    –
                                                  </button>
                                                  <input
                                                    type="text"
                                                    maxLength={3}
                                                    min={1}
                                                    className="input-text number-sidebar qty20924439"
                                                    name="Lines"
                                                    size={4}
                                                    value={item.qty}
                                                    // value={totalqty}
                                                  />
                                                  <button
                                                    className="btn_increase increase items-count btn-plus"
                                                    type="button"
                                                    onClick={() => this.increaseItem(item)}
                                                  >
                                                    +
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <div className="pd">
                                        <div className="top-subtotal">
                                          Tổng tiền:{' '}
                                          <span className="price price_big">
                                            {formatNumber(
                                              Number(item.dealPrice) * Number(item.qty)
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pd right_ct">
                                        <a href="/checkout" className="btn btn-primary">
                                          <span>Tiến hành thanh toán</span>
                                        </a>
                                        <a href="/cart" className="btn btn-white hidden">
                                          <span>Đi đến giỏ hàng</span>
                                        </a>
                                      </div>
                                    </ul>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="top-cart-contain f-right hidden">
                          <div className="mini-cart text-xs-center">
                            <div className="heading-cart">
                              <a className="bg_cart" href="/cart" title="Giỏ hàng">
                                <i className="ion-android-cart" />
                                <span className="count_item count_item_pr">{dataCart.length}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Menu Mobile */}
        <div
          id="mySidenav"
          className={
            showMenu
              ? 'menu_mobile sidenav max_991 hidden-lg open_sidebar_menu'
              : 'sidenav menu_mobile hidden-lg'
          }
        >
          {/* <Drawer open={false}> */}
          <ul className="ul_collections">
            <li className="special">
              <a href="#">Tất cả danh mục</a>
              {/* <i className="fas fa-arrow-left" /> */}
            </li>
            <li className="level0 level-top parent">
              <a href="/">Trang chủ</a>
            </li>
            {menuHeader &&
              menuHeader.map(item => (
                <li className="level0 level-top parent">
                  <a href={`/${item.urlSlugs}`}>{item.name}</a>
                  {item.children && (
                    <i
                      className={visible ? 'fa fa-angle-up' : 'fa fa-angle-down'}
                      onClick={() =>
                        this.setState({
                          visible: !visible,
                        })
                      }
                    />
                  )}
                  <ul
                    className="level0"
                    style={visible ? { display: 'block' } : { display: 'none' }}
                  >
                    {item.children &&
                      item.children.map(child => (
                        <li className="level1" key={child.id}>
                          <a href={`${child.urlSlugs}`}>
                            <span>{child.name}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
