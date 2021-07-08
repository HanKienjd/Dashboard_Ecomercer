import React from 'react';

import { connect } from 'react-redux';
import page from '@/layouts/page';
import Head from '@/componentWebs/head';

import dynamic from 'next/dynamic';

const RenderTemplatesCategory = dynamic(() => import('@/GroupTemplate'), {
  ssr: true,
  loading: () => null,
});
@page
@connect(({ webs }) => ({
  webs,
}))
class Detail extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    const {
      webs: { dataSite },
    } = store.getState();
    let data = {};

    if (query.byname) {
      const onQuery = {
        filter: { status: true, sitesId: dataSite.id, name: query.byname },
        range: [0, 9],
      };
      await dispatch({
        type: 'webs/fetchAllProduct',
        payload: onQuery,
        callback: res => {
          const list = (res && res.result) || {};
          data = list;
        },
      });
    } else if (query.title) {
      const onQuery = {
        filter: {
          status: true,
          sitesId: dataSite.id,
          title: query.title,
        },
        range: [0, 9],
      };
      await dispatch({
        type: 'webs/fetchAllArticle',
        payload: onQuery,
        callback: res => {
          const list = (res && res.result) || {};
          data = list;
        },
      });
    }

    // console.log('query', query)

    return {
      dataSearch: data,
      query,
    };
  }

  render() {
    const { dataSearch, dataSite } = this.props;
    // console.log("dataProducts", dataProducts)
    // console.log("dataSite", dataSite)
    // console.log("query", query)
    // if (
    //     (Number(dataProductInfo && dataProductInfo.id) === Number(query && query.id)) && (Number(dataSite.id) === Number(dataProductInfo && dataProductInfo.categories && dataProductInfo.categories.sitesId))
    // ) {

    //     const headTitle = `${dataSite.name} -  ${dataProductInfo && dataProductInfo.name}` || '';
    //     const ogImage = dataProductInfo && dataProductInfo.images && dataProductInfo.images.split(',')[0] || ""
    let url;
    if (typeof window !== 'undefined') {
      url = window.location.href;
    }
    return (
      <React.Fragment>
        <Head
          title="Kết quả tìm kiếm"
          dataSite={dataSite}
          keywords={dataSite && dataSite.seoKeywords}
          description={dataSite && dataSite.seoDescriptions}
          // ogImage={ogImage}
          url={url || ''}
        />
        <RenderTemplatesCategory data={dataSearch} dataSite={dataSite} isSearch />
      </React.Fragment>
    );
    // }
    // return <Exception style={{ clear: 'both' }} />;
  }
}

export default Detail;
