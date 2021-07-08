import React from 'react';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
// import moment from 'moment';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    const query = {
      filter: {
        status: true,
        sitesId: data.sitesId,
        categoriesId: data.id,
      },
    };
    dispatch({
      type: 'webs/fetchAllProductCatalog',
      payload: query,
      callback: res => {
        // console.log(res);
        const result = (res && res.result && res.result.length > 0 && res.result[0].articles) || [];
        this.setState({
          dataArticle: result,
        });
      },
    });
  }

  render() {
    const { data } = this.props;
    const { dataArticle } = this.state;
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    return (
      <React.Fragment>
        <section className=" awe-section-6">
          <section className="section_blog_and_brand">
            <div className="container">
              <div className="wrap_bgd">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="section title_blog_module">
                      <h2>
                        <a href={`${data.url}`} title={data.name}>
                          {data.name}
                        </a>
                      </h2>
                      <p>{data.descriptions}</p>
                    </div>
                    <div className="section blog_owlrap">
                      {dataArticle && dataArticle.length > 0 && (
                        <OwlCarousel
                          className="owl-carousel owl-theme brand_content not-nav2 owl-loaded owl-drag"
                          nav
                          data-dot="false"
                          data-nav="true"
                          data-loop="false"
                          data-play="true"
                          responsive={{
                            1000: { items: 3 },
                            768: { items: 1, nav: false },
                            500: { items: 1, nav: false },
                            0: { items: 1, nav: false },
                          }}
                          dots={false}
                        >
                          {dataArticle &&
                            dataArticle.length > 0 &&
                            dataArticle.map(article => (
                              <div className="itemblog" style={{ marginLeft: '30px' }}>
                                <div className="blog_index">
                                  <div className="myblog">
                                    <div className="image-blog-left">
                                      <a href={`/tin-tuc-68/${article.urlSlugs}`}>
                                        <img
                                          className="lazyload loaded"
                                          src={getResponsiveImage(article.image, imageResize)}
                                          title={article.title}
                                          alt={article.title}
                                          style={{ height: '270px' }}
                                        />
                                      </a>
                                    </div>
                                    <div className="content_blog">
                                      <span className="time_post">
                                        Đăng bởi: <span className="name_">{article.author || article.title}</span>
                                      </span>
                                      <h3 className="h3">
                                        <a
                                          href={`/tin-tuc-68/${article.urlSlugs}`}
                                          title={article.title}
                                        >
                                          {article.title}
                                        </a>
                                      </h3>
                                      <div className="summary_item_blog">
                                        <p>{article.shortDescription}</p>
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
              </div>
            </div>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;
