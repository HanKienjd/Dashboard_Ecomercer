/* eslint-disable react/no-unused-state */
import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import { scrollTop, findPage, range } from '@/static/web/js/templateCode';

const BreadCrumb = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/BreadCrumb`), {
  ssr: true,
  loading: () => null,
});
const PAGE_SIZE = 4;
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataIntroduse: [],
      dataAll: [],
      visible: false,
    };
  }

  componentDidMount() {
    const { data, dispatch, dataSite, webs } = this.props;
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
        sitesId: dataSite.id,
      },
      range: [0, PAGE_SIZE - 1],
      attributes: `id,title,description,shortDescription,image,createDate,source,tag,author,urlSlugs`,
    };

    dispatch({
      type: 'webs/fetchAllArticle',
      payload: query,
      callback: res => {
        if (res.success) {
          if (res.result.list.length) {
            this.setState({
              dataIntroduse: res.result.list,
              dataAll: res && res.result,
            });
          }
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
                  categories: webs.data.list,
                });
              }
            }
          },
        });
      },
    });
  }

  goToPage = numberPage => {
    const { dispatch, data, dataSite } = this.props;
    const indexOfLastNews = numberPage * PAGE_SIZE; // vị trí của tin cuối cùng trong list được hiển thị
    const indexOfFirstNews = indexOfLastNews - PAGE_SIZE; // vị trí của tin đầu tiên trong list tin
    const query = {
      filter: {
        status: true,
        sitesId: dataSite.id,
        categoriesId: data.id,
      },
      range: [indexOfFirstNews, indexOfLastNews - 1],
    };
    dispatch({
      type: 'webs/fetchAllArticle',
      payload: query,
      callback: res => {
        this.setState({
          dataIntroduse: res && res.result.list,
          dataAll: res && res.result,
        });
        scrollTop();
      },
    });
  };

  chosePage = item => {
    // event.preventDefault()
    this.goToPage(Number(item));
  };

  currentPage = key => {
    const { dataAll } = this.state;
    const numberPage = dataAll && dataAll.pagination && dataAll.pagination.current;
    if (key === 'next') {
      this.goToPage(numberPage + 1);
    } else {
      this.goToPage(numberPage - 1);
    }
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

  render() {
    const { data } = this.props;
    const { dataIntroduse, dataAll, categories, visible } = this.state;
    console.log(data);
    console.log(categories);
    const total = dataAll && dataAll.pagination && dataAll.pagination.total;
    const currentPage = dataAll && dataAll.pagination && dataAll.pagination.current;
    const { startPage, endPage, totalPages } = findPage(total, PAGE_SIZE, currentPage);
    const pageNumbers = range(startPage, endPage);
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    return (
      <React.Fragment>
        <BreadCrumb data={data} />
        <div className="container article-wraper">
          <div className="wrap_background_aside padding-top-15 margin-bottom-10">
            <div className="row">
              <div className="content_all f-left w_100 margin-top-20">
                <div
                  className="right-content col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-push-3 col-md-push-3"
                  style={{ position: 'relative' }}
                >
                  <div className="list-blogs blog-main">
                    <div className="row">
                      {dataIntroduse &&
                        dataIntroduse.length > 0 &&
                        dataIntroduse.map(article => (
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="myblog">
                              <div className="blog_item">
                                <div className="left_item">
                                  <div className="image-blog-left">
                                    <a href={`/${article.urlSlugs}`}>
                                      <img
                                        src={getResponsiveImage(
                                          article.image && article.image.split(',')[0],
                                          imageResize
                                        )}
                                        alt={article.title}
                                        style={{ width: '408px', height: '306px' }}
                                      />
                                    </a>
                                  </div>
                                </div>
                                <div className="right_item">
                                  <div className="content_blog">
                                    <div className="content_right">
                                      <div className="time-post">
                                        Đăng bởi <span>{article.author}</span>
                                        {/* <i
                                          className="fa fa-comment"
                                          aria-hidden="true"
                                          style={{ color: '#ffaf00' }}
                                        /> */}
                                      </div>
                                      <h3>
                                        <a
                                          href={`/${article.categories.urlSlugs}/${
                                            article.urlSlugs
                                          }`}
                                          title={article.title}
                                        >
                                          {article.title}
                                        </a>
                                      </h3>
                                    </div>
                                    <div className="summary_item_blog">
                                      {article.shortDescription}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="row">
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
                  </div>
                </div>

                <div
                  className="left left-content col-md-3 col-lg-3 col-sm-12 col-xs-12 col-lg-pull-9 col-md-pull-9"
                  style={{ position: 'relative' }}
                >
                  {/* <aside className="aside-item sidebar-category collection-category">
                    <div className="aside-title">
                      <h3 className="title-head margin-top-0 margin-bottom-10">
                        <span>Danh mục</span>
                      </h3>
                    </div>
                    <div className="aside-content">
                      <nav className="nav-category navbar-toggleable-md">
                        <ul className="nav navbar-pills">
                          {categories &&
                            categories.map((category) =>
                              category.children ? (
                                <li className="nav-item">
                                  <a href={`/${category.urlSlugs}`} className="nav-link">
                                    {category.name}
                                  </a>
                                  {category.children && (
                                    <i className="fa fa-angle-down" onClick={e => this.activeMenu(e)} />
                                  )}
                                  <ul className="dropdown-menu">
                                    {category.children.map((child) => (
                                      <li className="dropdown-submenu nav-item lv2">
                                        <a className="nav-link" href={`/${child.urlSlugs}`}>
                                          {child.name}
                                        </a>
                                        {child.children && (
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
                              ) : (<li className="nav-item ">
                                <a className="nav-link" href={`/${category.urlSlugs}`}>
                                  {category.name}
                                </a>total
                              </li>
                                ))}
                        </ul>
                      </nav>
                    </div>

                  </aside> */}

                  <aside className="aside-item sidebar-category collection-category">
                    <div className="aside-title">
                      <h2 className="title-head margin-top-0">
                        <span>Danh mục tin tức</span>
                      </h2>
                    </div>
                    <div className="aside-content">
                      <nav className="nav-category navbar-toggleable-md">
                        <ul className="nav navbar-pills">
                          <li className="nav-item lv1">
                            <a className="nav-link" href="/">
                              Trang chủ
                            </a>
                          </li>
                          <li className={visible ? 'nav-item lv1 active ' : 'nav-item lv1'}>
                            <a href="/san-pham-79" className="nav-link">
                              Sản phẩm
                            </a>
                            <i className="fa fa-angle-down" onClick={e => this.activeMenu(e)} />
                            <ul className="dropdown-menu">
                              <li className="nav-item lv2">
                                <a className="nav-link" href="/san-pham-noi-bat-8">
                                  Sản phẩm nổi bật
                                </a>
                              </li>
                              <li className="nav-item lv2">
                                <a className="nav-link" href="/san-pham-khuyen-mai-3">
                                  Sản phẩm khuyến mãi
                                </a>
                              </li>
                              <li className="nav-item lv2">
                                <a className="nav-link" href="/san-pham-ban-chay-3">
                                  Sản phẩm bán chạy
                                </a>
                              </li>
                              <li className="nav-item lv2">
                                <a className="nav-link" href="/trai-cay-nhap-khau">
                                  Trái cây nhập khẩu
                                </a>
                              </li>
                              <li className="nav-item lv2">
                                <a className="nav-link" href="/rau-cu-nhap-khau">
                                  Rau, củ nhập khẩu
                                </a>
                              </li>
                              <li className="dropdown-submenu nav-item lv2">
                                <a className="nav-link" href="/hoa-qua-khac">
                                  Hoa quả khác
                                </a>
                                <i className="fa fa-angle-down" onClick={e => this.activeMenu(e)} />
                                <ul className="dropdown-menu">
                                  <li className="nav-item lv3">
                                    <a className="nav-link" href="/hoa-qua-say">
                                      Hoa quả sấy
                                    </a>
                                  </li>
                                  <li className="nav-item lv3">
                                    <a className="nav-link" href="/hoa-qua-lanh">
                                      Hoa quả lạnh
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="nav-item lv1">
                            <a className="nav-link" href="/tin-tuc-68">
                              Tin tức
                            </a>
                          </li>
                          <li className="nav-item lv1">
                            <a className="nav-link" href="/gioi-thieu-50">
                              Giới thiệu
                            </a>
                          </li>
                          <li className="nav-item lv1">
                            <a className="nav-link" href="/lien-he-59">
                              Liên hệ
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </aside>

                  <div className="blog-aside aside-item blog-aside-article">
                    <div>
                      <div className="aside-title-article">
                        <h2 className="title-head">
                          <span>
                            <a href="#">Tin liên quan</a>
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
                                    <a
                                      href={`/tin-tuc-68/${article.urlSlugs}`}
                                      title={article.title}
                                    >
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
