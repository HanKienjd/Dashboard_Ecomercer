import React from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { connect } from 'react-redux';

moment.locale('vi');

const Type1 = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/type1'), {
  ssr: false,
  loading: () => null,
});
const Type2 = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/type2'), {
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
    const query = {
      filter: {
        status: true,
        sitesId: data.sitesId,
        // categoriesId: data.id
      },
    };
    const query1 = {
      filter: {
        status: true,
        parentId: data.id,
        sitesId: data.sitesId,
      },
      sort: ['orderBy', 'asc'],
    };
    dispatch({
      type: 'webs/fetchAllProductCatalog',
      payload: query,
      callback: res => {
        const result = (res && res.result && res.result.length > 0 && res.result[0].products) || [];
        this.setState({
          dataProduct: result,
        });
      },
    });
    dispatch({
      type: 'webs/fetchAllChildrenCategory',
      payload: query1,
      callback: item => {
        // console.log("item", item)
        const dataChildren = item && item.result && item.result.list;
        this.setState({
          dataChildrenCategoryAll: dataChildren,
        });
      },
    });
  }

  render() {
    const { dataSite } = this.props;
    const { dataChildrenCategoryAll } = this.state;

    return (
      <React.Fragment>
        <section className=" awe-section-5">
          <section className="section section_threecol">
            <div className="container">
              <div className="row">
                {dataChildrenCategoryAll &&
                  dataChildrenCategoryAll.length > 0 &&
                  dataChildrenCategoryAll.map(item => {
                    if (item.typesId === '2') {
                      return <Type1 data={item} dataSite={dataSite} />;
                    }
                    if (item.typesId === '1') {
                      return <Type2 data={item} dataSite={dataSite} />;
                    }
                    return null;
                  })}
              </div>
            </div>
          </section>
        </section>
      </React.Fragment>
    );
  }
}
export default Index;
