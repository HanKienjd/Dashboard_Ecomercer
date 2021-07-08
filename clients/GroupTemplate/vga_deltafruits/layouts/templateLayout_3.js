/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('@/componentWebs/Global/OwlCarousel'), {
  ssr: false,
  loading: () => null,
});

@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  state = {};

  componentDidMount() {
    const { data, dispatch } = this.props;

    dispatch({
      type: 'webs/fetchAllArticle',
      payload: {
        filter: {
          status: true,
          categoriesId: data.id,
        },
        attributes: `id,title,description,shortDescription,image,createDate,source,tag,author,urlSlugs`,
      },
      callback: res => {
        if (res.success) {
          if (res.result.list.length) {
            this.setState({
              dataIntroduse: res.result.list.reverse(),
            });
          }
        }
      },
    });
  }

  render() {
    const { data } = this.props;
    const { dataIntroduse } = this.state;
    // console.log(dataIntroduse);
    // console.log(data);
    const template =
      data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize =
      template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;

    return (
      <React.Fragment>
        <section className=" awe-section-7">
          <link
            href="./static/vga_deltafruits/img/ekko-lightbox.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <section className="section section_album">
            {dataIntroduse && dataIntroduse.length > 0 && (
              <OwlCarousel
                className="owl_album owl-carousel owl-loaded owl-drag"
                items={6}
                // dots={false}
                responsive={{
                  0: {
                    items: 2,
                    nav: true,
                  },
                  425: {
                    items: 2,
                    nav: true,
                  },
                  768: {
                    items: 3,
                    nav: true,
                  },
                  1000: {
                    items: 6,
                    nav: true,
                  },
                }}
                navText={[`<span className="next-ex"></span>`, '<span className="next-ex"></span>']}
                autoplay
              >
                {dataIntroduse &&
                  dataIntroduse.length > 0 &&
                  dataIntroduse.map(item => {
                    const images = item.image && item.image.length > 0 && item.image.split(',');
                    return images.map(index => (
                      <div className="item item_js_width">
                        <div className=" al-item relative">
                          {/* <a href="#" data-toggle="lightbox" data-gallery="example-gallery"> */}
                          <img
                            src={getResponsiveImage(index, imageResize)}
                            className="lazyload loaded"
                          />
                        </div>
                      </div>
                    ));
                  })}
              </OwlCarousel>
            )}
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;
