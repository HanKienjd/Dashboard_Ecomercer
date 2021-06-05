import React, { useState } from "react";
import SearchForm from "../common/SearchForm";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import usePushNotifications from "../../usePushNotifications";
import { Link } from "react-router-dom";

import { subjects2 } from "actions/common/getInfo";
import { logout, changeLayout, init } from "actions/userActions";
import "./styles/Header.scss";

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

  function logout() {
    props.logout();
  }

  function onError(e) {
    e.target.src = "images/default-avatar.jpg";
    e.target.onerror = null;
  }

  const renderDropDown3 = () => {
    return (
      <div className="avatar-dropdown dropdown">
        <div className="infor d-flex justify-content">
          <img
            className="img-avatar"
            src={
              props.avatar
                ? `data:image/png;base64,${props.avatar}`
                : "/images/default-avatar.jpg"
            }
            alt="not found"
            onError={(e) => onError(e)}
          />
          <div className="name d-flex align-items-center"></div>
        </div>
        <Link to="/thong-tin-ca-nhan">
          <div className="dropdown-item">Tài khoản cá nhân</div>
        </Link>
        <Link to="/lich-su">
          <div className="dropdown-item">Lịch sử thi</div>
        </Link>
        {(!props.role || !props.role.includes("ROLE_ADMIN")) &&
        props.isDone ? null : (
          <Link to="/admin" onClick={() => changeLayout(1)}>
            <div className="dropdown-item">Trang quản lý</div>
          </Link>
        )}
        <Link to="/doi-mat-khau">
          <div className="dropdown-item">Đổi mật khẩu</div>
        </Link>
        <Link to="/dang-nhap" onClick={() => logout()}>
          <div className="dropdown-item">Đăng xuất</div>
        </Link>
      </div>
    );
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
                <span>Chào mừng bạn đến với VGA Delta Fruits</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="accoutlink a-right">
                <div className="searchbox">
                  <SearchForm placeholder={placeholder} />
                </div>
                <div className="title_log">
                  <div className="achover">
                    {props.accessToken ? (
                      <div className="avatar route">{renderDropDown3}</div>
                    ) : (
                      <div className="btns">
                        <Link to="/dang-nhap">Đăng nhập</Link>
                      </div>
                    )}
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

const mapStateToProps = (state, ownProps) => {
  const {
    auth: {
      user: { name, avatar },
      layout,
      accessToken,
      account,
      isDone,
    },
  } = state;
  return {
    name,
    role: account.role,
    avatar,
    layout,
    accessToken,
    isDone,
  };
};

export default connect(mapStateToProps, {
  logout,
  changeLayout,
  init,
})(Header);
