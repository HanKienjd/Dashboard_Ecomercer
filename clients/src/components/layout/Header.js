import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../common/SearchForm";

const menuHeader = [
  {
    name: "Sản Phẩm",
    urlSlugs: "san-pham",
    children: [
      { name: "Sản phẩm nổi bật" },
      { name: "Sản phẩm khuyến mãi" },
      { name: "Sản phẩm bán chạy" },
      { name: "Rau củ nhập khẩu" },
    ],
  },
  { name: "Tin tức", urlSlugs: "tin-tuc" },
  { name: "Giới thiệu", urlSlugs: "gioi-thieu" },
  { name: "Liên hệ", urlSlugs: "lien-he" },
];
const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState("/");

  const logout = () => {
    props.logout();
  };

  const handleClickActiveMenu = (e) => {
    setActiveMenu(e.target.innerHTML);
  };
  const onShowMenu = (event) => {
    event.preventDefault();
    setShowMenu(!showMenu);
  };
  const placeholder = ["Bạn muốn tìm gì?"];
  return (
    <React.Fragment>
      <div
        className={
          showMenu ? "hidden-lg opacity_menu open_opacity" : "opacity_menu"
        }
        onClick={() => setShowMenu(!showMenu)}
      />
      <div className="htop section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 hidden-sm hidden-xs detop">
              <p>
                Chào mừng bạn đến với{" "}
                <span>Chào mừng bạn đến với VGA Delta Fruits</span>
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
                    <Link className="btns" to="/dang-nhap">
                      Đăng nhập
                    </Link>
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
                        onClick={onShowMenu}
                        alt="menu"
                      />
                    </a>
                  </div>
                  <div className="col-lg-3 logo-main">
                    <div className="logo">
                      <a href="/" className="logo-wrapper">
                        <img src="/images/logo.png" alt="logo Delta Fruits" />
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
                                <li
                                  className={
                                    activeMenu === "/"
                                      ? "nav-item active"
                                      : "nav-item"
                                  }
                                >
                                  <a className="a-img" href="/">
                                    <span>Trang chủ</span>
                                  </a>
                                </li>
                                {menuHeader &&
                                  menuHeader.length > 0 &&
                                  menuHeader.map((item) =>
                                    item.children ? (
                                      <li
                                        key={item.id}
                                        className={
                                          activeMenu === `/${item.urlSlugs}`
                                            ? "nav-item active"
                                            : "nav-item"
                                        }
                                      >
                                        <Link
                                          className="a-img"
                                          to={`/${item.urlSlugs}`}
                                        >
                                          <span>{item.name}</span>
                                          {item.children && (
                                            <i
                                              className="fa fa-angle-down"
                                              onClick={(e) =>
                                                handleClickActiveMenu(e)
                                              }
                                            />
                                          )}
                                        </Link>
                                        {item.children && (
                                          <ul className="item_small hidden-sm hidden-xs ">
                                            {item.children.map((child) =>
                                              child.children ? (
                                                <li key={child.id}>
                                                  <Link
                                                    href={`/${child.urlSlugs}`}
                                                  >
                                                    <i className="fas fa-arrow-right" />
                                                    {child.name}
                                                  </Link>
                                                  {child.children && (
                                                    <i
                                                      className="fas fa-chevron-right"
                                                      onClick={(e) =>
                                                        handleClickActiveMenu(e)
                                                      }
                                                    />
                                                  )}
                                                  <ul>
                                                    {child.children &&
                                                      child.children.map(
                                                        (item2) => (
                                                          <li className="nav-item lv2">
                                                            <Link
                                                              to={`/${item2.urlSlugs}`}
                                                            >
                                                              {item2.name}
                                                            </Link>
                                                          </li>
                                                        )
                                                      )}
                                                  </ul>
                                                </li>
                                              ) : (
                                                <li key={child.id}>
                                                  <Link
                                                    to={`/${child.urlSlugs}`}
                                                  >
                                                    {child.name}
                                                  </Link>
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
                                          activeMenu === `/${item.urlSlugs}`
                                            ? "nav-item active"
                                            : "nav-item"
                                        }
                                      >
                                        <Link
                                          className="a-img"
                                          to={`/${item.urlSlugs}`}
                                        >
                                          <span>{item.name}</span>
                                          {item.children && (
                                            <i
                                              className="fa fa-angle-down"
                                              onClick={(e) =>
                                                handleClickActiveMenu(e)
                                              }
                                            />
                                          )}
                                        </Link>
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
                            <a
                              className="img_hover_cart"
                              href="/cart"
                              title="Giỏ hàng"
                            >
                              <div className="icon_hotline">
                                <img src="/images/bag.png" alt="Giỏ hàng" />
                                <span className="count_item_cart">
                                  {/* {totalqty} */}
                                </span>
                              </div>
                              {/* <span>{totalqty}</span> */}
                            </a>
                            <div className="content_cart_header hidden-xs">
                              <a
                                className="bg_cart"
                                href="/cart"
                                title="Giỏ hàng"
                              >
                                <span className="text-giohang">Giỏ hàng:</span>
                                <strong>
                                  (
                                  <span className="count_item count_item_pr">
                                    {/* {totalqty} */}
                                  </span>
                                  )
                                </strong>{" "}
                                Sản phẩm
                              </a>
                            </div>
                          </div>
                          {/* <div className="top-cart-content">
                            <ul
                              id="cart-sidebar"
                              className="mini-products-list count_li"
                            >
                              {dataCart.length === 0 && (
                                <div className="no-item">
                                  <p>Không có sản phẩm nào.</p>
                                </div>
                              )}
                              {dataCart &&
                                dataCart.length > 0 &&
                                dataCart.map((item) => (
                                  <ul
                                    id="cart-sidebar"
                                    className="mini-products-list count_li"
                                  >
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
                                                item.images &&
                                                  item.images.split(",")[0]
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
                                                {formatNumber(
                                                  Number(item.dealPrice)
                                                )}
                                              </span>
                                              <a
                                                title="Xóa"
                                                className="remove-item-cart fa fa-trash"
                                                onClick={() =>
                                                  this.removeItem(item)
                                                }
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
                                                  onClick={() =>
                                                    this.decreaseItem(item)
                                                  }
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
                                                  onClick={() =>
                                                    this.increaseItem(item)
                                                  }
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
                                        Tổng tiền:{" "}
                                        <span className="price price_big">
                                          {formatNumber(
                                            Number(item.dealPrice) *
                                              Number(item.qty)
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="pd right_ct">
                                      <a
                                        href="/checkout"
                                        className="btn btn-primary"
                                      >
                                        <span>Tiến hành thanh toán</span>
                                      </a>
                                      <a
                                        href="/cart"
                                        className="btn btn-white hidden"
                                      >
                                        <span>Đi đến giỏ hàng</span>
                                      </a>
                                    </div>
                                  </ul>
                                ))}
                            </ul>
                          </div>
                         */}
                        </div>
                      </div>

                      <div className="top-cart-contain f-right hidden">
                        <div className="mini-cart text-xs-center">
                          <div className="heading-cart">
                            <a
                              className="bg_cart"
                              href="/cart"
                              title="Giỏ hàng"
                            >
                              <i className="ion-android-cart" />
                              <span className="count_item count_item_pr">
                                {/* {dataCart.length} */}
                              </span>
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
            ? "menu_mobile sidenav max_991 hidden-lg open_sidebar_menu"
            : "sidenav menu_mobile hidden-lg"
        }
      >
        {/* <Drawer open={false}> */}
        <ul className="ul_collections">
          <li className="special">
            <Link to="#">Tất cả danh mục</Link>
            {/* <i className="fas fa-arrow-left" /> */}
          </li>
          <li className="level0 level-top parent">
            <Link to="/">Trang chủ</Link>
          </li>
          {menuHeader &&
            menuHeader.map((item) => (
              <li className="level0 level-top parent">
                <Link to={`/${item.urlSlugs}`}>{item.name}</Link>
                {item.children && (
                  <i
                    className={visible ? "fa fa-angle-up" : "fa fa-angle-down"}
                    onClick={() => setVisible(!visible)}
                  />
                )}
                <ul
                  className="level0"
                  style={visible ? { display: "block" } : { display: "none" }}
                >
                  {item.children &&
                    item.children.map((child) => (
                      <li className="level1" key={child.id}>
                        <Link to={`${child.urlSlugs}`}>
                          <span>{child.name}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Header;
