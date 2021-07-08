import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

const BreadCrumb = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/BreadCrumb`), {
  ssr: true,
  loading: () => null,
});

@connect(({ webs }) => ({
  webs,
}))
class Index extends React.PureComponent {
  state = {};

  componentDidMount() {
    const { data, dispatch } = this.props;
    const query = {
      filter: {
        status: true,
        categoriesId: data.id,
      },
      attributes: `id,title,description,shortDescription,image,createDate,source,tag,author,urlSlugs`,
    };
    dispatch({
      type: 'webs/fetchAllArticle',
      payload: query,
      callback: res => {
        this.setState({
          dataArticle: res.result && res.result.list,
        });
      },
    });
  }

  render() {
    const { data } = this.props;
    const { dataArticle } = this.state;
    console.log(dataArticle);
    // console.log(data)
    return (
      <React.Fragment>
        <BreadCrumb data={data} />
        <section className="page">
          <div className="container">
            <div className="wrap_background_aside padding-top-15 margin-bottom-40">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="page-title category-title">
                    <h1 className="title-head">
                      <a href="#">{data.name}</a>
                    </h1>
                  </div>
                  <div
                    className="content-page rte"
                    dangerouslySetInnerHTML={{ __html: dataArticle && dataArticle[0].description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;
