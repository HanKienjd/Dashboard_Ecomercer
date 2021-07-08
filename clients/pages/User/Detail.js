import React from 'react';
import { connect } from 'react-redux';
import page from '@/layouts/page';
import Head from '@/componentWebs/head';
import Exception from '@/componentWebs/Exception';
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
    await dispatch({
      type: 'webs/fetchArticleInfoByName',
      payload: { name: query.title, status: true },
    });
    await dispatch({
      type: 'webs/fetchQuery',
      payload: { ...query },
    });
    const {
      webs: { datainfoArticle },
    } = store.getState();
    return {
      datainfoArticle,
      query,
    };
  }

  render() {
    
    const {
      datainfoArticle, query,
      dataSite,
    } = this.props;
    if (
      (String(datainfoArticle && datainfoArticle.urlSlugs) === String(query && query.title)) && (Number(dataSite.id) === Number(datainfoArticle && datainfoArticle.categories && datainfoArticle.categories.sitesId))
    ) {
      let keywords;
      let description;
      const headTitle = `${dataSite.name} -  ${datainfoArticle && datainfoArticle.title}` || '';
      const { seoKeywords, seoDescriptions } = datainfoArticle;
      if (seoKeywords !== undefined && seoKeywords !== null) {
        keywords = `${seoKeywords}`;
      }
      if (seoDescriptions !== undefined && seoDescriptions !== null) {
        description = `${dataSite.name} - ${seoDescriptions}`;
      }
      const ogImage = datainfoArticle && datainfoArticle.image && datainfoArticle.image.split(',')[0] || ""
      let url
      if (typeof window !== 'undefined') {
        url = window.location.href
      }
      return (
        <React.Fragment>
          <Head
            title={headTitle}
            dataSite={dataSite}
            keywords={keywords}
            description={description}
            ogImage={ogImage}
            url={url || ""}
          />
          <RenderTemplatesCategory data={datainfoArticle} dataSite={dataSite} isDetail />
        </React.Fragment>
      );
    }
    return <Exception style={{ clear: 'both' }} />;
  }
}

export default Detail;
