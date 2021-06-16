import React from "react";

export default function News() {
  return (
    <div>
      <div className="htop section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 hidden-sm hidden-xs detop">
              <p>
                Chào mừng bạn đến với <span>VGA Delta Fruits</span>
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="accoutlink a-right">
                <div className="searchbox">
                  <form
                    className="input-group search-bar"
                    action="https://thucphamsach.vgasoft.vn/search"
                    role="search"
                  >
                    <div className="input-group">
                      <input
                        type="search"
                        name="byname"
                        className="input-group-field auto-search"
                        maxLength={70}
                        id="search"
                        placeholder="Rau, củ n"
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn icon-fallback-text"
                          type="submit"
                          aria-label="Tìm kiếm"
                        >
                          <svg
                            viewBox="0 0 451 451"
                            style={{ width: "20px", paddingTop: "5px" }}
                          >
                            <g fill="#000">
                              <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"></path>
                            </g>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div className="title_log">
                  <span>
                    <i className="far fa-user-circle" />
                    &nbsp;Tài khoản
                  </span>
                  <div className="achover">
                    <a
                      className="btns"
                      href="https://thucphamsach.vgasoft.vn/tin-tuc-68#"
                    >
                      Đăng nhập
                    </a>
                    <a href="https://thucphamsach.vgasoft.vn/tin-tuc-68#">
                      Đăng ký
                    </a>
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
                  <div className="menu-bar-h nav-mobile-button hidden-lg"><a href="https://thucphamsach.vgasoft.vn/"><img src="./VGA Delta Fruits - Tin Tức_files/i_menubar.png" alt="menu" /></a>
                  </div>
                  <div className="col-lg-3 logo-main">
                    <div className="logo"><a href="https://thucphamsach.vgasoft.vn/" className="logo-wrapper"><img src="./VGA Delta Fruits - Tin Tức_files/13.png" alt="logo Delta Fruits" /></a></div>
                  </div>
                  <div className="col-lg-7 col-md-7 hidden-xs hidden-sm hidden-md padding-0">
                    <div className="header-left">
                      <div className="bg-header-nav hidden-xs hidden-sm">
                        <div>
                          <div className="row row-noGutter-2">
                            <nav className="header-nav">
                              <ul className="item_big">
                                <li className="nav-item"><a className="a-img" href="https://thucphamsach.vgasoft.vn/"><span>Trang
                                      chủ</span></a></li>
                                <li className="nav-item"><a className="a-img" href="https://thucphamsach.vgasoft.vn/san-pham-79"><span>Sản
                                      Phẩm</span><i className="fa fa-angle-down" /></a>
                                  <ul className="item_small hidden-sm hidden-xs ">
                                    <li><a href="https://thucphamsach.vgasoft.vn/san-pham-noi-bat-8">Sản
                                        phẩm nổi bật</a></li>
                                    <li><a href="https://thucphamsach.vgasoft.vn/san-pham-khuyen-mai-3">Sản
                                        phẩm khuyến mãi</a></li>
                                    <li><a href="https://thucphamsach.vgasoft.vn/san-pham-ban-chay-3">Sản
                                        phẩm bán chạy</a></li>
                                    <li><a href="https://thucphamsach.vgasoft.vn/trai-cay-nhap-khau">Trái
                                        cây nhập khẩu</a></li>
                                    <li><a href="https://thucphamsach.vgasoft.vn/rau-cu-nhap-khau">Rau,
                                        củ nhật khẩu</a></li>
                                    <li><a href="https://thucphamsach.vgasoft.vn/hoa-qua-khac"><i className="fas fa-arrow-right" />Hoa
                                        quả khác</a><i className="fas fa-chevron-right" />
                                      <ul>
                                        <li className="nav-item lv2"><a href="https://thucphamsach.vgasoft.vn/hoa-qua-say">Hoa
                                            quả sấy</a></li>
                                        <li className="nav-item lv2"><a href="https://thucphamsach.vgasoft.vn/hoa-qua-lanh">Hoa
                                            quả lạnh</a></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                                <li className="nav-item active"><a className="a-img" href="https://thucphamsach.vgasoft.vn/tin-tuc-68"><span>Tin
                                      Tức</span></a></li>
                                <li className="nav-item"><a className="a-img" href="https://thucphamsach.vgasoft.vn/gioi-thieu-50"><span>Giới
                                      Thiệu</span></a></li>
                                <li className="nav-item"><a className="a-img" href="https://thucphamsach.vgasoft.vn/lien-he-59"><span>Liên
                                      Hệ</span></a></li>
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
                          <div className="heading-cart cart_header"><a className="img_hover_cart" href="https://thucphamsach.vgasoft.vn/cart" title="Giỏ hàng">
                              <div className="icon_hotline"><img src="./VGA Delta Fruits - Tin Tức_files/bag.png" alt="Giỏ hàng" /><span className="count_item_cart">0</span></div>
                            </a>
                            <div className="content_cart_header hidden-xs"><a className="bg_cart" href="https://thucphamsach.vgasoft.vn/cart" title="Giỏ hàng"><span className="text-giohang">Giỏ
                                  hàng:</span><strong>(<span className="count_item count_item_pr">0</span>)</strong>
                                Sản phẩm</a></div>
                          </div>
                          <div className="top-cart-content">
                            <ul id="cart-sidebar" className="mini-products-list count_li">
                              <div className="no-item">
                                <p>Không có sản phẩm nào.</p>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="top-cart-contain f-right hidden">
                        <div className="mini-cart text-xs-center">
                          <div className="heading-cart"><a className="bg_cart" href="https://thucphamsach.vgasoft.vn/cart" title="Giỏ hàng"><i className="ion-android-cart" /><span className="count_item count_item_pr">0</span></a></div>
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
      <div className="breadcrumb_background">
        <div className="title_full">
          <div className="container a-center">
            <h1 className="title_page">Tin Tức</h1>
          </div>
        </div>
      </div>
      <section className="bread-crumb"><span className="crumb-border" />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <ul className="breadcrumb">
                <li className="home"><a href="https://thucphamsach.vgasoft.vn/"><span>Trang
                      chủ</span></a><span className="mr_lr">&nbsp;/&nbsp;</span></li>
                <li><strong><span>Tin Tức</span></strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="container article-wraper">
        <div className="wrap_background_aside padding-top-15 margin-bottom-10">
          <div className="row">
            <div className="content_all f-left w_100 margin-top-20">
              <div className="right-content col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-push-3 col-md-push-3" style={{position: 'relative'}}>
                <div className="list-blogs blog-main">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="myblog">
                        <div className="blog_item">
                          <div className="left_item">
                            <div className="image-blog-left"><a href="https://thucphamsach.vgasoft.vn/meo-rua-sach-moi-loai-rau-dung-cach-va-sai-lam-khi-rua-rau"><img src="./VGA Delta Fruits - Tin Tức_files/22.jpg" alt="Mẹo rửa sạch mọi loại rau đúng cách và sai lầm khi rửa rau" style={{width: '408px', height: '306px'}} /></a></div>
                          </div>
                          <div className="right_item">
                            <div className="content_blog">
                              <div className="content_right">
                                <div className="time-post">Đăng bởi <span>Han Kien </span>
                                </div>
                                <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/meo-rua-sach-moi-loai-rau-dung-cach-va-sai-lam-khi-rua-rau" title="Mẹo rửa sạch mọi loại rau đúng cách và sai lầm khi rửa rau">Mẹo
                                    rửa sạch mọi loại rau đúng cách và sai lầm khi
                                    rửa rau</a></h3>
                              </div>
                              <div className="summary_item_blog">Mỗi loại rau có nguy cơ nhiễm
                                bẩn khác nhau vì thế cần có những cách rửa khác nhau để
                                rau sạch và loại bỏ phần nào hóa chất (nếu có).</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="myblog">
                        <div className="blog_item">
                          <div className="left_item">
                            <div className="image-blog-left"><a href="https://thucphamsach.vgasoft.vn/tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc"><img src="./VGA Delta Fruits - Tin Tức_files/21.jpg" alt="Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực " style={{width: '408px', height: '306px'}} /></a></div>
                          </div>
                          <div className="right_item">
                            <div className="content_blog">
                              <div className="content_right">
                                <div className="time-post">Đăng bởi <span>Đào Thương</span>
                                </div>
                                <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc" title="Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực ">Tại
                                    sao phải sử dụng thực phẩm sạch Tại sao phải sử
                                    dụng thực phẩm sạch Tại sao phải sử dụng thực
                                  </a></h3>
                              </div>
                              <div className="summary_item_blog">Thực phẩm an toàn không bao
                                giờ hết nóng trong những năm trở lại đây. Sử dụng một
                                thực phẩm sạch là điều mà mọi người điều muốn sử dụng,
                                vậy thực phẩm sạch là gì và tại sao thực phẩm sạch nên
                                sử dụng?
                                Thực phẩm an toàn không bao giờ hết nóng trong những năm
                                trở lại đây. Sử dụng một thực phẩm sạch là điều mà mọi
                                người điều muốn sử dụng, vậy thực phẩm sạch là gì và tại
                                sao thực phẩm sạch nên sử dụng?</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="myblog">
                        <div className="blog_item">
                          <div className="left_item">
                            <div className="image-blog-left"><a href="https://thucphamsach.vgasoft.vn/mach-ban-cach-xao-rau-that-xanh-khi-chan-khong-duoc-day-nap-kin-va-do-nuoc-ngap-rau"><img src="./VGA Delta Fruits - Tin Tức_files/20.jpg" alt="Mách bạn cách xào rau thật xanh- Khi chần không được đậy nắp kín và đổ nước ngập rau" style={{width: '408px', height: '306px'}} /></a></div>
                          </div>
                          <div className="right_item">
                            <div className="content_blog">
                              <div className="content_right">
                                <div className="time-post">Đăng bởi <span>Han Kien</span>
                                </div>
                                <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/mach-ban-cach-xao-rau-that-xanh-khi-chan-khong-duoc-day-nap-kin-va-do-nuoc-ngap-rau" title="Mách bạn cách xào rau thật xanh- Khi chần không được đậy nắp kín và đổ nước ngập rau">Mách
                                    bạn cách xào rau thật xanh- Khi chần không được
                                    đậy nắp kín và đổ nước ngập rau</a></h3>
                              </div>
                              <div className="summary_item_blog">Rau xào, món ăn tưởng như đơn
                                giản nhưng để có một đĩa rau xào thật xanh và giòn như
                                ngoài tiệm, bạn không thể thiếu những bí quyết.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="myblog">
                        <div className="blog_item">
                          <div className="left_item">
                            <div className="image-blog-left"><a href="https://thucphamsach.vgasoft.vn/thuoc-ngay-bi-kip-phan-biet-10-loai-rau-cu-qua-trung-quoc-va-viet-nam"><img src="./VGA Delta Fruits - Tin Tức_files/19.jpg" alt="Thuộc ngay bí kíp phân biệt 10 loại rau củ quả Trung Quốc và Việt Nam" style={{width: '408px', height: '306px'}} /></a></div>
                          </div>
                          <div className="right_item">
                            <div className="content_blog">
                              <div className="content_right">
                                <div className="time-post">Đăng bởi <span /></div>
                                <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/thuoc-ngay-bi-kip-phan-biet-10-loai-rau-cu-qua-trung-quoc-va-viet-nam" title="Thuộc ngay bí kíp phân biệt 10 loại rau củ quả Trung Quốc và Việt Nam">Thuộc
                                    ngay bí kíp phân biệt 10 loại rau củ quả Trung
                                    Quốc và Việt Nam</a></h3>
                              </div>
                              <div className="summary_item_blog">Nếu đang phân vân không biết
                                đâu là rau củ quả Trung Quốc, đâu là rau củ quả Việt
                                Nam, bạn có thể dựa vào những đặc điểm dưới đây.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="text-left">
                    <nav className="clearfix nav_pagi f-left w_100">
                      <ul className="pagination clearfix">
                        <li className="active page-item " id={1}><a className="page-link" title={1}>1</a></li>
                        <li className="false page-item " id={2}><a className="page-link" title={2}>2</a>
                        </li>
                        <li className="page-item"><a className="page-link"><i className="fas fa-angle-right" /></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="left left-content col-md-3 col-lg-3 col-sm-12 col-xs-12 col-lg-pull-9 col-md-pull-9" style={{position: 'relative'}}>
                <aside className="aside-item sidebar-category collection-category">
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0"><span>Danh mục tin tức</span></h2>
                  </div>
                  <div className="aside-content">
                    <nav className="nav-category navbar-toggleable-md">
                      <ul className="nav navbar-pills">
                        <li className="nav-item lv1"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/">Trang chủ</a></li>
                        <li className="nav-item lv1"><a href="https://thucphamsach.vgasoft.vn/san-pham-79" className="nav-link">Sản phẩm</a><i className="fa fa-angle-down" />
                          <ul className="dropdown-menu">
                            <li className="nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/san-pham-noi-bat-8">Sản
                                phẩm nổi bật</a></li>
                            <li className="nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/san-pham-khuyen-mai-3">Sản
                                phẩm khuyến mãi</a></li>
                            <li className="nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/san-pham-ban-chay-3">Sản
                                phẩm bán chạy</a></li>
                            <li className="nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/trai-cay-nhap-khau">Trái
                                cây nhập khẩu</a></li>
                            <li className="nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/rau-cu-nhap-khau">Rau,
                                củ nhập khẩu</a></li>
                            <li className="dropdown-submenu nav-item lv2"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/hoa-qua-khac">Hoa
                                quả khác</a><i className="fa fa-angle-down" />
                              <ul className="dropdown-menu">
                                <li className="nav-item lv3"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/hoa-qua-say">Hoa
                                    quả sấy</a></li>
                                <li className="nav-item lv3"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/hoa-qua-lanh">Hoa
                                    quả lạnh</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item lv1"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/tin-tuc-68">Tin tức</a>
                        </li>
                        <li className="nav-item lv1"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/gioi-thieu-50">Giới
                            thiệu</a></li>
                        <li className="nav-item lv1"><a className="nav-link" href="https://thucphamsach.vgasoft.vn/lien-he-59">Liên hệ</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>
                <div className="blog-aside aside-item blog-aside-article">
                  <div>
                    <div className="aside-title-article">
                      <h2 className="title-head"><span><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68#">Tin liên
                            quan</a></span></h2>
                    </div>
                    <div className="aside-content-article aside-content">
                      <div className="blog-list blog-image-list">
                        <div className="loop-blog">
                          <div className="thumb-left"><a href="https://thucphamsach.vgasoft.vn/meo-rua-sach-moi-loai-rau-dung-cach-va-sai-lam-khi-rua-rau"><img src="./VGA Delta Fruits - Tin Tức_files/22.jpg" className="img-responsive" alt="Mẹo rửa sạch mọi loại rau đúng cách và sai lầm khi rửa rau" style={{maxWidth: '100%'}} /></a></div>
                          <div className="name-right">
                            <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/meo-rua-sach-moi-loai-rau-dung-cach-va-sai-lam-khi-rua-rau" title="Mẹo rửa sạch mọi loại rau đúng cách và sai lầm khi rửa rau">Mẹo
                                rửa sạch mọi loại rau đúng cách và sai lầm khi rửa
                                rau</a></h3>
                          </div>
                        </div>
                        <div className="loop-blog">
                          <div className="thumb-left"><a href="https://thucphamsach.vgasoft.vn/tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc"><img src="./VGA Delta Fruits - Tin Tức_files/21.jpg" className="img-responsive" alt="Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực " style={{maxWidth: '100%'}} /></a></div>
                          <div className="name-right">
                            <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc-pham-sach-tai-sao-phai-su-dung-thuc" title="Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng thực ">Tại
                                sao phải sử dụng thực phẩm sạch Tại sao phải sử dụng
                                thực phẩm sạch Tại sao phải sử dụng thực </a></h3>
                          </div>
                        </div>
                        <div className="loop-blog">
                          <div className="thumb-left"><a href="https://thucphamsach.vgasoft.vn/mach-ban-cach-xao-rau-that-xanh-khi-chan-khong-duoc-day-nap-kin-va-do-nuoc-ngap-rau"><img src="./VGA Delta Fruits - Tin Tức_files/20.jpg" className="img-responsive" alt="Mách bạn cách xào rau thật xanh- Khi chần không được đậy nắp kín và đổ nước ngập rau" style={{maxWidth: '100%'}} /></a></div>
                          <div className="name-right">
                            <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/mach-ban-cach-xao-rau-that-xanh-khi-chan-khong-duoc-day-nap-kin-va-do-nuoc-ngap-rau" title="Mách bạn cách xào rau thật xanh- Khi chần không được đậy nắp kín và đổ nước ngập rau">Mách
                                bạn cách xào rau thật xanh- Khi chần không được đậy nắp
                                kín và đổ nước ngập rau</a></h3>
                          </div>
                        </div>
                        <div className="loop-blog">
                          <div className="thumb-left"><a href="https://thucphamsach.vgasoft.vn/thuoc-ngay-bi-kip-phan-biet-10-loai-rau-cu-qua-trung-quoc-va-viet-nam"><img src="./VGA Delta Fruits - Tin Tức_files/19.jpg" className="img-responsive" alt="Thuộc ngay bí kíp phân biệt 10 loại rau củ quả Trung Quốc và Việt Nam" style={{maxWidth: '100%'}} /></a></div>
                          <div className="name-right">
                            <h3><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68/thuoc-ngay-bi-kip-phan-biet-10-loai-rau-cu-qua-trung-quoc-va-viet-nam" title="Thuộc ngay bí kíp phân biệt 10 loại rau củ quả Trung Quốc và Việt Nam">Thuộc
                                ngay bí kíp phân biệt 10 loại rau củ quả Trung Quốc và
                                Việt Nam</a></h3>
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
      </div>
      <div>
        <div className="facebook-button-chat">
        </div>
        <div className="zalo-button-chat">
          <div className="zalo-chat-widget" data-oaid={76801581514589304} data-welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup={0} data-width={350} data-height={420} style={{zIndex: 2147483647, border: 'none', visibility: 'visible', bottom: '0px', right: '0px', position: 'fixed', width: '70px', height: '70px', top: 'auto'}}>
            <iframe frameBorder={0} allowFullScreen scrolling="no" width={70} height={70} src="./VGA Delta Fruits - Tin Tức_files/chat-widget.html" style={{position: 'absolute', bottom: '0px', right: '0px'}} />
            <div id="drag-holder" draggable="true" style={{position: 'absolute', top: '0px', right: '0px', width: '70px', height: '70px', cursor: 'move', display: 'block'}}>
            </div>
            <div id="drag-left" style={{position: 'absolute', top: '0px', left: '0px', width: '10px', height: '100%', cursor: 'w-resize', display: 'none'}}>
            </div>
            <div id="drag-right" style={{position: 'absolute', top: '0px', right: '0px', width: '10px', height: '100%', cursor: 'e-resize', display: 'none'}}>
            </div>
            <div id="drag-top" style={{position: 'absolute', top: '0px', width: '100%', height: '10px', cursor: 'n-resize', display: 'none'}}>
            </div>
            <div id="drag-bottom" style={{position: 'absolute', bottom: '0px', width: '100%', height: '10px', cursor: 's-resize', display: 'none'}}>
            </div>
            <div id="drag-top-left" style={{position: 'absolute', top: '0px', left: '0px', width: '15px', height: '15px', cursor: 'nw-resize', display: 'none'}}>
            </div>
            <div id="drag-top-right" style={{position: 'absolute', top: '0px', right: '0px', width: '15px', height: '15px', cursor: 'ne-resize', display: 'none'}}>
            </div>
            <div id="drag-bottom-right" style={{position: 'absolute', bottom: '0px', right: '0px', width: '15px', height: '15px', cursor: 'se-resize', display: 'none'}}>
            </div>
            <div id="drag-bottom-left" style={{position: 'absolute', bottom: '0px', left: '0px', width: '15px', height: '15px', cursor: 'sw-resize', display: 'none'}}>
            </div>
            <div id="overlay" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', display: 'none'}}>
            </div>
          </div>
        </div>
      </div>
      <nav className="quick-menu shadow-box bg-white" style={{zIndex: 9998}}>
        <div id="BG-position" style={{position: 'fixed', zIndex: 9999, width: '100%', height: '100%', top: '0px', left: '0px', background: 'rgba(154, 142, 142, 0.69)', display: 'none'}}>
        </div>
        <div className="box__button_share" id="_no-clickjacking-0" style={{opacity: 1, overflow: 'visible'}}>
          <div className="close__box" style={{position: 'absolute', top: '0px', right: '0px', padding: '0px 5px 5px'}}><i aria-label="icon: close" className="anticon anticon-close" style={{fontSize: '15px'}}><svg viewBox="64 64 896 896" focusable="false" className data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
                </path>
              </svg></i></div>
          <div className="fb-share-button fb_iframe_widget" data-href="https://thucphamsach.vgasoft.vn" data-layout="button" data-size="large" fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=&container_width=0&href=https%3A%2F%2Fthucphamsach.vgasoft.vn%2F&layout=button&locale=vi_VN&sdk=joey&size=large">
            <span style={{verticalAlign: 'bottom', width: '0px', height: '0px'}}><iframe name="f14f86f5e54c3b4" width="1000px" height="1000px" data-testid="fb:share_button Facebook Social Plugin" title="fb:share_button Facebook Social Plugin" frameBorder={0} allowTransparency="true" allowFullScreen="true" scrolling="no" allow="encrypted-media" src="./VGA Delta Fruits - Tin Tức_files/share_button.html" style={{border: 'none', visibility: 'visible', width: '0px', height: '0px'}} className /></span></div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="zalo-share-button" data-oaid={76801581514589304} data-layout={1} data-color="blue" data-href="https://thucphamsach.vgasoft.vn" data-customize="false" style={{overflow: 'hidden', display: 'inline-block', width: '70px', height: '20px'}}>
              <iframe frameBorder={0} allowFullScreen scrolling="no" width="70px" height="20px" src="./VGA Delta Fruits - Tin Tức_files/share.html" />
            </div>
          </div>
        </div>
        <ul className="gray-51 clearfix" style={{margin: '0px', display: 'flex', padding: '0px', width: '100%'}}>
          <li className="w-full tc relative perfect-center"><a className="pd5 w-full gray-51 " href="https://webshop.com.vn/" title="thucphamsach.vgasoft.vn" target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="20.421" height="19.41" viewBox="0 0 20.421 19.41">
                <path id="Path_1702" data-name="Path 1702" d="M20.078,21.3,10.916,12.95a1.042,1.042,0,0,0-1.411,0L.343,21.3a1.047,1.047,0,0,0,.705,1.821H2.512v8.365a.6.6,0,0,0,.6.6H8.134a.6.6,0,0,0,.6-.6V26.406h2.952v5.079a.6.6,0,0,0,.6.6h5.022a.6.6,0,0,0,.6-.6V23.12h1.464a1.047,1.047,0,0,0,.705-1.821Z" transform="translate(0 -12.675)" fill="#4b4b4b" />
              </svg></a></li>
          <li className="w-full tc relative perfect-center "><a className="pd5 w-full gray-51 contact-box phone_ringing" title="Liên hệ" href="tel:0589929999"><svg xmlns="http://www.w3.org/2000/svg" width="19.011" height="18.968" viewBox="0 0 19.011 18.968">
                <path id="Path_1701" data-name="Path 1701" d="M387.014,281.264c.048-.315.084-.634.146-.948a4.135,4.135,0,0,1,.778-1.766,9.021,9.021,0,0,1,1.054-1.133,1.483,1.483,0,0,1,2.037.074q1.458,1.441,2.9,2.9a1.511,1.511,0,0,1-.013,2.18c-.433.45-.881.886-1.324,1.326a1.41,1.41,0,0,1-.15.12,13.893,13.893,0,0,0,6.607,6.608c.463-.468.938-.946,1.41-1.425a1.6,1.6,0,0,1,.843-.473,1.465,1.465,0,0,1,1.391.427q1.116,1.113,2.231,2.229c.22.22.441.434.656.658a1.5,1.5,0,0,1,.074,2.056,5.156,5.156,0,0,1-3.019,1.849,5.655,5.655,0,0,1-2.118-.074,13.925,13.925,0,0,1-5.236-2.306,25.078,25.078,0,0,1-4.294-3.836,20.523,20.523,0,0,1-2.621-3.426,9.394,9.394,0,0,1-1.26-3.343c-.034-.219-.062-.438-.092-.658Z" transform="translate(-387.014 -277.048)" fill="#d43d3d" />
              </svg></a></li>
          <li className="w-full tc relative perfect-center " style={{zIndex: 2}}>
            <div id="share__btn" title="Chia sẻ ngay"><svg xmlns="http://www.w3.org/2000/svg" width={17} height={19} viewBox="0 0 17 19">
                <path id="Union_1" data-name="Union 1" d="M10.552,15.629a3.515,3.515,0,0,1,.086-.771l-5.131-2.98a3.146,3.146,0,0,1-2.283.993A3.3,3.3,0,0,1,0,9.5,3.3,3.3,0,0,1,3.224,6.129a3.146,3.146,0,0,1,2.283.993l5.131-2.98a3.515,3.515,0,0,1-.086-.771A3.3,3.3,0,0,1,13.776,0,3.3,3.3,0,0,1,17,3.371a3.3,3.3,0,0,1-3.224,3.371,3.146,3.146,0,0,1-2.283-.993L6.362,8.729a3.5,3.5,0,0,1,0,1.542l5.131,2.98a3.146,3.146,0,0,1,2.283-.993,3.374,3.374,0,0,1,0,6.742A3.3,3.3,0,0,1,10.552,15.629Z" fill="#4b4b4b" />
              </svg></div>
          </li>
          <li className="w-full tc relative perfect-center "><a className="dung-thu perfect-center" href="https://thucphamsach.vgasoft.vn/" title><span className="pd5 w-full gray-51 ar-new">Dùng thử</span></a></li>
        </ul>
      </nav>
      <div id="popupCartModal" className="modal fade" role="dialog">
        <div className="popup_overlay" />
        <div className="modal-dialog">
          <div className="modal-content"><button type="button" className="close" style={{position: 'relative', zIndex: 9}}><span aria-hidden="true">×</span></button>
            <div className="row row-noGutter">
              <div className="modal-left col-sm-6 col-lg-6 col-md-6">
                <h3 className="title"><i className="fa fa-check" /> Sản phẩm đã được thêm vào giỏ hàng</h3>
                <div className="modal-body">
                  <div className="media">
                    <div className="media-left">
                      <div className="thumb-1x1"><img src="https://thucphamsach.vgasoft.vn/tin-tuc-68" /></div>
                    </div>
                    <div className="media-body">
                      <div className="product-title" />
                      <div className="product-new-price"><span>0đ</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-right col-sm-6 col-lg-6 col-md-6">
                <h3 className="title right_title"><a href="https://thucphamsach.vgasoft.vn/cart">
                    <ion-icon name="cart" /> Giỏ hàng của bạn (<span><span className="cart-popup-count">0</span> sản phẩm</span>)
                  </a></h3>
                <div className="total_price"><span>Tổng tiền:</span><span>0đ</span></div><a href="https://thucphamsach.vgasoft.vn/checkout" className="btn btn-primary checkout_button btn-full">Tiến hành thanh toán</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer ">
        <div className="site-footer">
          <div className="mid-footer">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-3">
                  <div className="widget-ft last social_footer">
                    <div className="blocklogo"><a href="https://thucphamsach.vgasoft.vn/" className="logofooter"><img src="./VGA Delta Fruits - Tin Tức_files/13.png" alt="logo Delta Fruits" /></a></div>
                    <div className="contactfooter">
                      <div className="flop"><span className="icon"><img src="./VGA Delta Fruits - Tin Tức_files/headphone.png" alt="liên hệ ngay" /></span>
                        <div className="fright">
                          <p>Bạn cần tư vấn ?</p><a className="fone" href="tel:0388287614">0589929999</a>
                        </div>
                      </div>
                      <div className="flop mt">
                        <p>Thông tin địa chỉ</p>
                        <div className="section flex"><span className="icon"><img src="./VGA Delta Fruits - Tin Tức_files/place.png" alt="Số 20, Ngõ 118, ngách 8, hẻm 1 Nguyễn Khánh Toàn" /></span>
                          <div className="fright"><span>Số 20, Ngõ 118, ngách 8, hẻm 1 Nguyễn
                              Khánh Toàn</span></div>
                        </div>
                        <div className="section flex"><span className="icon"><img src="./VGA Delta Fruits - Tin Tức_files/email.png" alt="contact@vgasoft.vn" /></span>
                          <div className="fright"><a href="mailto:deltawebltd@gmail.com">contact@vgasoft.vn</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="social_footer">
                      <ul className="follow_option">
                        <li><a href="https://www.facebook.com/VGA-SOFT-103011295020063/" title="Theo dõi Facebook Delta Fruits"><i className="fab fa-facebook" /></a></li>
                        <li><a href="https://twitter.com/" title="Theo dõi Twitter Delta Fruits"><i className="fab fa-twitter" /></a></li>
                        <li><a href="https://www.google.com/" title="Theo dõi Google Plus Delta Fruits"><i className="fab fa-google" /></a></li>
                        <li><a href="https://www.instagram.com/" title="Theo dõi Instagam Delta Fruits"><i className="fab fa-instagram-square" /></a></li>
                        <li><a href="https://www.youtube.com/" title="Theo dõi Youtube Delta Fruits"><i className="fab fa-youtube" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-7 col-sm-12 col-xsm-12">
                  <div className="row rowsfooter">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                      <div className="widget-ft first">
                        <h4 className="title-menu"><a role="button" className="collapsed" data-toggle="collapse">Chính Sách<i className="fa fa-plus" /></a>
                        </h4>
                        <div className="collapse" id="collapseListMenu01" aria-expanded="false" style={{height: '0px'}}>
                          <ul className="list-menu">
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/">Trang chủ</a>
                            </li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/tat-ca-san-pham-10">Sản
                                Phẩm</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68">Tin
                                Tức</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/gioi-thieu-50">Giới
                                Thiệu</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/lien-he-59">Liên
                                Hệ</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                      <div className="widget-ft first">
                        <h4 className="title-menu"><a role="button" className="collapsed" data-toggle="collapse">Sản phẩm<i className="fa fa-plus" /></a>
                        </h4>
                        <div className="collapse" id="collapseListMenu01" aria-expanded="false" style={{height: '0px'}}>
                          <ul className="list-menu">
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/rau-cu-nhap-khau">Rau
                                củ nhập khẩu</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/trai-cay-nhap-khau">Trái
                                cây nhập khẩu</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/san-pham-khuyen-mai-3">Sản
                                phẩm khuyến mãi</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/san-pham-noi-bat-8">Sản
                                phẩm nổi bật</a></li>
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/san-pham-ban-chay-3">Sản
                                phẩm bán chạy</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                      <div className="widget-ft first">
                        <h4 className="title-menu"><a role="button" className="collapsed" data-toggle="collapse">Hướng dẫn<i className="fa fa-plus" /></a>
                        </h4>
                        <div className="collapse" id="collapseListMenu01" aria-expanded="false" style={{height: '0px'}}>
                          <ul className="list-menu">
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/">Hướng dẫn 1</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                      <div className="widget-ft first">
                        <h4 className="title-menu"><a role="button" className="collapsed" data-toggle="collapse">INSTAGRAM<i className="fa fa-plus" /></a>
                        </h4>
                        <div className="collapse" id="collapseListMenu01" aria-expanded="false" style={{height: '0px'}}>
                          <ul className="list-menu">
                            <li className="li_menu"><a href="https://thucphamsach.vgasoft.vn/">Intargram 1</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="payment_e">
            <div className="container a-center">
              <div className="iigpay"><img src="./VGA Delta Fruits - Tin Tức_files/payment.png" alt="Các hình thức thành toán" /></div>
            </div>
          </div>
          <div className="bg-footer-bottom copyright clearfix">
            <div className="container">
              <div className="inner clearfix">
                <div className="row tablet" />
              </div><a id="back-to-top" className="backtop show" title="Lên đầu trang" style={{position: 'fixed'}}><i className="fa fa-angle-up" aria-hidden="true" style={{position: 'relative'}} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
