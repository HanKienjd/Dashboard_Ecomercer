import React from "react";

export default function News() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 hidden-sm hidden-xs detop">
            <p>Chào mừng bạn đến với <span>VGA Delta Fruits</span></p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="accoutlink a-right">
              <div className="searchbox">
                <form className="input-group search-bar" action="https://thucphamsach.vgasoft.vn/search" role="search">
                  <div className="input-group"><input type="search" name="byname" className="input-group-field auto-search" maxLength={70} id="search" placeholder="Rau, củ n" /><span className="input-group-btn"><button className="btn icon-fallback-text" type="submit" aria-label="Tìm kiếm"><svg viewBox="0 0 451 451" style={{width: '20px', paddingTop: '5px'}}>
                          <g fill="#000">
                            <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z">
                            </path>
                          </g>
                        </svg></button></span></div>
                </form>
              </div>
              <div className="title_log"><span><i className="far fa-user-circle" />&nbsp;Tài khoản</span>
                <div className="achover"><a className="btns" href="https://thucphamsach.vgasoft.vn/tin-tuc-68#">Đăng nhập</a><a href="https://thucphamsach.vgasoft.vn/tin-tuc-68#">Đăng ký</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div>
        <span className="icon"><img src="./VGA Delta Fruits - Tin Tức_files/place.png" alt="Số 20, Ngõ 118, ngách 8, hẻm 1 Nguyễn Khánh Toàn" /></span>
        <div className="fright"><span>Số 20, Ngõ 118, ngách 8, hẻm 1 Nguyễn
            Khánh Toàn</span></div>
      </div>
      <div>
        <span className="icon"><img src="./VGA Delta Fruits - Tin Tức_files/email.png" alt="contact@vgasoft.vn" /></span>
        <div className="fright"><a href="mailto:deltawebltd@gmail.com">contact@vgasoft.vn</a>
        </div>
      </div>
    </div>
  );
}
