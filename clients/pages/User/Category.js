import React from 'react';
import { connect } from 'react-redux';
// import getConfig from 'next/config';
import dynamic from 'next/dynamic';
// import router from 'next/router';
import Exception from '@/componentWebs/Exception';
import page from '@/layouts/page';
import Head from '@/componentWebs/head';
// import { modifyCategoryWithTemplate } from '@/componentWebs/BaseConverter/BaseConverter';
const RenderTemplatesCategory = dynamic(() => import('@/GroupTemplate'), {
  ssr: true,
  loading: () => null,
});

@page
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    await dispatch({
      type: 'webs/fetchCategoryInfoByName',
      payload: { name: query.name, status: true },
    });
    const {
      webs: { dataCategoryInfo },
    } = store.getState();

    const categoriesTemplateLayout =
      (dataCategoryInfo && dataCategoryInfo.categoriesTemplateLayout) || {};
    const pageTemplate =
      categoriesTemplateLayout &&
      categoriesTemplateLayout.length > 0 &&
      categoriesTemplateLayout.find(e => e && e.isHome === false);
    const modifedCategory = {
      ...dataCategoryInfo,

      templateLayouts: pageTemplate && pageTemplate.templateLayouts,
    };

    return {
      modifedCategory,
      query,
    };
  }

  render() {
    const {
      modifedCategory,
      dataSite,
    } = this.props;
    // console.log("modifedCategory", modifedCategory)
    // console.log("query", query)
    let keywords;
    let description;
    let headTitle;
    const { seoKeywords, seoDescriptions, name } = modifedCategory;

    if (seoKeywords !== undefined && seoKeywords !== null) {
      keywords = `${seoKeywords}`;
    }
    if (seoDescriptions !== undefined && seoDescriptions !== null) {
      description = `${seoDescriptions}`;
    }
    if (name !== undefined && name !== null) {
      headTitle = `${dataSite.name} - ${name}`;
    }
    // console.log("fsfssag");
    const ogImage = dataSite && dataSite.logo && dataSite.logo.split(',')[0]
    let url
    if (typeof window !== 'undefined') {
      url = window.location.href
    }
    if (dataSite.id !== modifedCategory.sitesId) return <Exception style={{ clear: 'both' }} />
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
        {modifedCategory.templateLayouts.folder && <RenderTemplatesCategory data={[modifedCategory]} dataSite={dataSite} />}
      </React.Fragment>
    );
  }
}

export default Index;
