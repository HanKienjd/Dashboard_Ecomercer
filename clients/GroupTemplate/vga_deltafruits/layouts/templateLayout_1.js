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

  render() {
    const { data, dataSite } = this.props;
    const images = data.image.split(',');
    const template = data.templateLayouts && data.templateLayouts.templates && data.templateLayouts.templates[0];
    const imageResize = template && template.templateLayoutTemplates && template.templateLayoutTemplates.imagesResize;
    // console.log(images);
    return (
      <React.Fragment>
        {images && images.length > 0 && (
          <OwlCarousel
            className="home-slider owl-carousel owl-theme owl-loaded owl-drag"
            items={1}
            navText={[`<span className="next-ex"></span>`, '<span className="next-ex"></span>']}
            autoplay
          >
            {images &&
              images.map(img => (
                <div className="item">
                  <a className="clearfix" style={{ width: '100%', display: 'block' }}>
                    <img
                      src={getResponsiveImage(images && images[0], imageResize)}
                      alt={dataSite.name}
                      style={{ width: '100%' }}
                    />
                  </a>
                </div>
              ))}
          </OwlCarousel>
        )}
      </React.Fragment>
    );
  }
}

export default Index;
