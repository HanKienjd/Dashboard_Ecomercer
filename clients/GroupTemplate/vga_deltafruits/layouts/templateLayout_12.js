import React from 'react';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';

const { publicRuntimeConfig } = getConfig();
const BreadCrumb = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/BreadCrumb`), {
  ssr: true,
  loading: () => null,
});
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { dataAd } = this.props;
    document.addEventListener('scroll', this.checkScroll);

    if (dataAd && dataAd.list) {
      const slides = dataAd.list.filter(a => a.adsPositionsId === '28');

      this.setState({ slides });
    }
  }

  onChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const { dataSite, data } = this.props;
    const { value } = this.state;
    const placeHere =
      (dataSite.siteProfiles && dataSite.siteProfiles.addressHere) ||
      (dataSite.places && dataSite.places.placeHere);

    return (
      <React.Fragment>
        <BreadCrumb data={data} />
        <div className="page_contact">
          <div className="container">
            <div className="rows">
              <div className="wrap_background_aside padding-top-15 margin-bottom-20">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-lg-push-8 col-md-push-8">
                    <div className="select_maps section">
                      <div className="aa mid-footer padding-0">
                        <div className="page_cotact">
                          <h1 className="title-head-contact">
                            <span>Thông tin liên hệ</span>
                          </h1>
                          <p className="text_des">
                            Công ty cổ phần thực phẩm trực tuyến Delta Fruits là một trong các đơn
                            vị cung cấp thực phẩm, rau củ quả sạch nhập khẩu số 1 tại Việt Nam.
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
                              <a href="https://twitter.com/" title="Theo dõi Twitter Delta Fruits">
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
                              <a href="https://youtube.com/" title="Theo dõi Youtube Delta Fruits">
                                <i className="fab fa-youtube" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-pull-4 col-md-pull-4">
                    <div className="section right_contact">
                      <div className="page-login page_cotact">
                        <h2 className="title-head-contact a-left">
                          <span>Liên hệ với chúng tôi</span>
                        </h2>
                        <p className="text_des" style={{ marginBottom: '40px' }}>
                          Để liên hệ và nhận các thông in khuyến mại sớm nhất, xin vui lòng điền đầy
                          đủ thông tin của bạn vào form dưới đây. Chúng tôi sẽ liên lạc lại với bạn
                          trong thời gian sớm nhất{' '}
                        </p>
                        <div id="pagelogin">
                          <form
                            id="contact"
                            onSubmit={() => {
                              window.location.href = '/';
                            }}
                          >
                            <div className="form-signup clearfix">
                              <div className="row group_contact">
                                <fieldset className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <input
                                    placeholder="Họ và tên"
                                    type="text"
                                    className="form-control  form-control-lg"
                                    required
                                  />
                                </fieldset>
                                <fieldset className="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <input
                                    placeholder="Số điện thoại"
                                    className="form-control form-control-comment form-control-lg"
                                    type="phone"
                                    id="phone"
                                    // name="phone"
                                    value={value}
                                    onChange={e => this.onChange(e)}
                                    required
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
                                    // name="contact[body]"
                                    id="comment"
                                    className="form-control content-area form-control-lg"
                                    rows={5}
                                    required
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section section_maps section margin-bottom-0">
            <div className="box-maps">
              <div className="iFrameMap">
                <div className="google-map">
                  <div id="contact_map" className="map">
                    <iframe
                      src={`${publicRuntimeConfig.GOOGLE_MAP}${placeHere || ''}`}
                      width="100%"
                      height="450px"
                      title="map"
                      style={{ border: 'none' }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Index;
