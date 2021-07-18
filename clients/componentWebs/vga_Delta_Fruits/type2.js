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
class Type2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arraySlide: [],
    };
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    const { arraySlide } = this.state;
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
        const result = (res && res.result && res.result.length > 0 && res.result[0].articles) || [];
        const div = Math.trunc(result.length / 3);
        const chunk = 3;
        for (let i = 1; i <= div; i++) {
          const array1 = result.splice(0, chunk);
          arraySlide.push(array1);
        }
        this.setState({
          dataNews: result,
        });
      },
    });
  }

  render() {
    const { data } = this.props;
    const { arraySlide } = this.state;
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    return (
      <React.Fragment>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <div className="title_module_fix cot3">
            <h2 className="h2">
              <span>{data.name}</span>
            </h2>
          </div>
          <div
            className="content_module"
            style={{ width: '100%', float: 'left', marginTop: '15px' }}
          >
            <div className="wrap_content">
              {arraySlide && arraySlide.length > 0 && (
                <OwlCarousel
                  navText={[
                    `
                  <span className="owl-prev">
                  <i class="fas fa-arrow-left"></i>
                  </span>`,
                    `<span className="owl-next">
                  <i class="fas fa-arrow-right"></i>
                  </span>
                  `,
                  ]}
                  className="owldanhgia owl-carousel owl-loaded owl-drag custom_calosel"
                  items={1}
                  nav
                  dots={false}
                  responsive={{ 768: { items: 1 }, 1000: { items: 1 } }}
                  key="2"
                >
                  {arraySlide &&
                    arraySlide.length > 0 &&
                    arraySlide.map(news => (
                      <div className="wrapdanhgia">
                        <div className="inwap">
                          {news &&
                            news.map(item => (
                              <div className="item_danhgia">
                                <div className="image_left">
                                  <img
                                    src={getResponsiveImage(
                                      item.image && item.image.split(',')[0],
                                      imageResize
                                    )}
                                    alt={item.name}
                                  />
                                </div>
                                <div className="content_dg">
                                  <p>
                                    {item.author}&nbsp;<span>{item.tag}</span>
                                  </p>
                                  <span className="section cmt">{item.shortDescription}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Type2;
