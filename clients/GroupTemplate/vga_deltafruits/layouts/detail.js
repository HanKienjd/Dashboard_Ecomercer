/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';

const BreadCrumb = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/BreadCrumb'), {
  ssr: true,
  loading: () => null,
});

const PAGE_SIZE = 4;
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch, data, dataSite } = this.props;
    const query = {
      filter: {
        status: true,
        categoriesId: data.categories.id,
        sitesId: dataSite.id,
      },
      range: [0, PAGE_SIZE - 1],
    };
    dispatch({
      type: 'webs/fetchAllArticle',
      payload: query,
      callback: res => {
        if (res.success) {
          this.setState({
            dataIntroduse: res && res.result.list,
          });
        }
      },
    });
  }

  activeMenu = e => {
    if (e.target.parentNode) {
      if (e.target.parentNode.className.search(' active') + 1) {
        e.target.parentNode.className = e.target.parentNode.className.replace(' active', '');
      } else {
        e.target.parentNode.className = `${e.target.parentNode.className} active`;
      }
    }
  };

  render() {
    const { data } = this.props;
    const { visible } = this.state;
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    const { dataIntroduse } = this.state;
    console.log(dataIntroduse);
    return (
      <React.Fragment>
        <BreadCrumb data={data} />
        <div className="container article-wraper">
          <div className="wrap_background_aside padding-top-15 margin-bottom-10">
            <div className="row">
              <section
                className="right-content col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-push-3 col-md-push-3"
                style={{ position: 'relative' }}
              >
                <div className="box-heading relative" />
                <article className="article-main">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="article-details">
                        <h1 className="article-title">
                          <a href={`${data.urlSlugs}`}>{data.title}</a>
                        </h1>
                        <div className="date">
                          <i className="fa fa-calendar-o" />
                          <div className="news_home_content_short_time">{data.createDate}</div>
                          <div className="post-time">
                            <i className="fa fa-user" aria-hidden="true" />
                            ????ng b???i <span>{data.author}</span>
                          </div>
                        </div>
                        <div className="article-content">
                          <div
                            className="rte"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-xs-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row row-noGutter tag-share">
                        <div className="col-xs-12 col-sm-6 tag_article">
                          <b>Tags:</b>
                          <a href={`${data.url}`}>{data.tag}</a>,
                        </div>
                      </div>
                    </div> */}
                    <div className="col-xs-12">
                      <form acceptCharset="utf-8" id="article_comments" method="post">
                        <input name="FormType" type="hidden" defaultValue="article_comments" />
                        <input name="utf8" type="hidden" />
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="form-coment">
                            <div className="row">
                              <div className="margin-top-0 margin-bottom-30">
                                <h5 className="title-form-coment">Vi???t b??nh lu???n c???a b???n:</h5>
                              </div>
                              {/* <div className> */}
                              <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6">
                                  <fieldset className="form-group">
                                    <input
                                      placeholder="H??? v?? t??n"
                                      type="text"
                                      className="form-control form-control-lg"
                                      id="full-name"
                                      name="Author"
                                      required
                                      style={{ marginLeft: '13px' }}
                                    />
                                  </fieldset>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6">
                                  <fieldset className="form-group">
                                    <input
                                      placeholder="Email"
                                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                                      type="email"
                                      className="form-control form-control-lg"
                                      name="Email"
                                      required
                                    />
                                  </fieldset>
                                </div>
                              </div>
                              {/* </div> */}
                              <fieldset className="form-group col-xs-12 col-sm-12 col-md-12">
                                <textarea
                                  placeholder="Vi???t b??nh lu???n"
                                  className="form-control form-control-lg"
                                  id="comment"
                                  name="Body"
                                  rows={6}
                                  required
                                  defaultValue=""
                                />
                              </fieldset>
                              <div className="margin-bottom-fix margin-bottom-50-article clearfix">
                                <button type="submit" className="btn btn-primary">
                                  G???i b??nh lu???n
                                </button>
                              </div>
                            </div>
                          </div>{' '}
                          {/* End form mail */}
                        </div>
                      </form>
                    </div>
                  </div>
                </article>
              </section>
              <aside
                className="blog_hai left left-content col-lg-3 col-md-3 col-sm-12 col-xs-12 col-lg-pull-9 col-md-pull-9"
                style={{ position: 'relative' }}
              >
                <aside
                  className="aside-item sidebar-category collection-category"
                  style={{
                    paddingLeft: '0',
                  }}
                >
                  <div className="aside-title">
                    <h2 className="title-head margin-top-0">
                      <span>Danh m???c tin t???c</span>
                    </h2>
                  </div>
                  <div className="aside-content">
                    <nav className="nav-category navbar-toggleable-md">
                      <ul className="nav navbar-pills">
                        <li className="nav-item lv1">
                          <a className="nav-link" href="/">
                            Trang ch???
                          </a>
                        </li>
                        <li className={visible ? 'nav-item lv1 active ' : 'nav-item lv1'}>
                          <a href="/san-pham-79" className="nav-link">
                            S???n ph???m
                          </a>
                          <i className="fa fa-angle-down" onClick={e => this.activeMenu(e)} />
                          <ul className="dropdown-menu">
                            <li className="nav-item lv2">
                              <a className="nav-link" href="/san-pham-noi-bat-8">
                                S???n ph???m n???i b???t
                              </a>
                            </li>
                            <li className="nav-item lv2">
                              <a className="nav-link" href="/san-pham-khuyen-mai-3">
                                S???n ph???m khuy???n m??i
                              </a>
                            </li>
                            <li className="nav-item lv2">
                              <a className="nav-link" href="/san-pham-ban-chay-3">
                                S???n ph???m b??n ch???y
                              </a>
                            </li>
                            <li className="nav-item lv2">
                              <a className="nav-link" href="/trai-cay-nhap-khau">
                                Tr??i c??y nh???p kh???u
                              </a>
                            </li>
                            <li className="nav-item lv2">
                              <a className="nav-link" href="/rau-cu-nhap-khau">
                                Rau, c??? nh???p kh???u
                              </a>
                            </li>
                            <li className="dropdown-submenu nav-item lv2">
                              <a className="nav-link" href="/hoa-qua-khac">
                                Hoa qu??? kh??c
                              </a>
                              <i className="fa fa-angle-down" onClick={e => this.activeMenu(e)} />
                              <ul className="dropdown-menu">
                                <li className="nav-item lv3">
                                  <a className="nav-link" href="/hoa-qua-say">
                                    Hoa qu??? s???y
                                  </a>
                                </li>
                                <li className="nav-item lv3">
                                  <a className="nav-link" href="/hoa-qua-lanh">
                                    Hoa qu??? l???nh
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item lv1">
                          <a className="nav-link" href="/tin-tuc-68">
                            Tin t???c
                          </a>
                        </li>
                        <li className="nav-item lv1">
                          <a className="nav-link" href="/gioi-thieu-50">
                            Gi???i thi???u
                          </a>
                        </li>
                        <li className="nav-item lv1">
                          <a className="nav-link" href="/lien-he-59">
                            Li??n h???
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>

                {/* Tin lien quan  */}
                <div
                  className="blog-aside aside-item blog-aside-article"
                  style={{
                    paddingLeft: '0',
                  }}
                >
                  <div>
                    <div className="aside-title-article">
                      <h2 className="title-head">
                        <span>
                          <a href="#">Tin li??n quan</a>
                        </span>
                      </h2>
                    </div>

                    <div className="aside-content-article aside-content">
                      <div className="blog-list blog-image-list">
                        {dataIntroduse &&
                          dataIntroduse.length > 0 &&
                          dataIntroduse.map(article => (
                            <div className="loop-blog">
                              <div className="thumb-left">
                                <a href={`/${article.urlSlugs}`}>
                                  <img
                                    src={getResponsiveImage(
                                      article.image && article.image.split(',')[0],
                                      imageResize
                                    )}
                                    style={{ maxWidth: '100%' }}
                                    className="img-responsive"
                                    alt={article.title}
                                  />
                                </a>
                              </div>
                              <div className="name-right">
                                <h3>
                                  <a href={`/tin-tuc-68/${article.urlSlugs}`} title={article.title}>
                                    {article.title}
                                  </a>
                                </h3>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;
