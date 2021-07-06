import React from "react";

export default function Contact() {
  return (
    <React.Fragment>
      <div>
        <span className="crumb-border" />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <ul className="breadcrumb">
                <li className="home">
                  <a href="https://thucphamsach.vgasoft.vn/">
                    <span>Trang chủ</span>
                  </a>
                  <span className="mr_lr">&nbsp;/&nbsp;</span>
                </li>
                <li>
                  <strong>
                    <span>Liên Hệ</span>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="aa mid-footer padding-0">
        <div className="page_cotact">
          <h1 className="title-head-contact">
            <span>Thông tin liên hệ</span>
          </h1>
          <p className="text_des">
            Công ty cổ phần thực phẩm trực tuyến Delta Fruits là một trong các
            đơn vị cung cấp thực phẩm, rau củ quả sạch nhập khẩu số 1 tại Việt
            Nam.
          </p>
        </div>
        <div className="social_footer">
          <ul className="follow_option">
            <li>
              <a
                href="https://www.facebook.com/"
                title="Theo dõi Facebook Delta Fruits"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                title="Theo dõi Twitter Delta Fruits"
              >
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://googleplus.com/"
                title="Theo dõi Google Plus Delta Fruits"
              >
                <i className="fab fa-google" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                title="Theo dõi Instagam Delta Fruits"
              >
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/"
                title="Theo dõi Youtube Delta Fruits"
              >
                <i className="fab fa-youtube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="page-login page_cotact">
        <h2 className="title-head-contact a-left">
          <span>Liên hệ với chúng tôi</span>
        </h2>
        <p className="text_des" style={{ marginBottom: "40px" }}>
          Để liên hệ và nhận các thông in khuyến mại sớm nhất, xin vui lòng điền
          đầy đủ thông tin của bạn vào form dưới đây. Chúng tôi sẽ liên lạc lại
          với bạn trong thời gian sớm nhất
        </p>
        <div id="pagelogin">
          <form id="contact">
            <div className="form-signup clearfix">
              <div className="row group_contact">
                <fieldset
                  className="
                                    form-group
                                    col-lg-6 col-md-6 col-sm-12 col-xs-12
                                  "
                >
                  <input
                    placeholder="Họ và tên"
                    type="text"
                    className="form-control form-control-lg"
                    required
                  />
                </fieldset>
                <fieldset className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12s">
                  <input
                    placeholder="Số điện thoại"
                    className="form-control form-control-comment form-control-lg"
                    type="phone"
                    id="phone"
                    required
                    defaultValue
                  />
                </fieldset>
                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    id="email1"
                    className="form-control form-control-lg"
                  />
                </fieldset>
                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <textarea
                    placeholder="Nội dung"
                    id="comment"
                    className="form-control content-area form-control-lg"
                    rows={5}
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-10">
                  <button type="submit" className="btn btn-primary btn-lienhe">
                    Gửi liên hệ
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="box-maps">
        <div className="iFrameMap">
          <div className="google-map">
            <div id="contact_map" className="map">
              <iframe
                src="./VGA Delta Fruits - Liên Hệ_files/place.html"
                width="100%"
                height="450px"
                title="map"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
