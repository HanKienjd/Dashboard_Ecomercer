/* eslint-disable prefer-destructuring */
import React from 'react';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import page from '@/layouts/page';
import Head from '@/componentWebs/head';

// import { renderTemplatesCategory } from '@/GroupTemplate/templateCategory';

const RenderTemplatesCategory = dynamic(() => import('@/GroupTemplate'), {
  ssr: true,
  loading: () => null,
});

const { publicRuntimeConfig } = getConfig();
const modifyCategoryWithTemplate = (category, checker) => {
  const categoriesTemplateLayout = (category && category.categoriesTemplateLayout) || {};
  const pageTemplate =
    categoriesTemplateLayout &&
    categoriesTemplateLayout.length > 0 &&
    categoriesTemplateLayout.find(e => e && e.isHome === checker);
  const modifedCategory = {
    ...category,
    templateLayouts: pageTemplate && pageTemplate.templateLayouts,
  };

  return modifedCategory;
};
// @page
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query, req } = ctx;
    let host = '';
    // let protocol = 'https:';
    if (req) {
      host = req.headers.host;
    } else {
      host = window.location.host;
    }
    if (host === 'localhost:8884') host = publicRuntimeConfig.SITE_NAME;
    let SITEID_WEB = '';
    const querySite = {
      filter: {
        status: true,
        url: `${host}`,
        groupSitesId: "40"
      },
      attributes:`id,url,name,seoKeywords,seoDescriptions,logo,icon`
    };
    await dispatch({
      type: 'webs/fetchSiteUrl',
      payload: querySite,
    });
    const {
      webs: { dataSite },
    } = store.getState();
    if (dataSite && dataSite.id) {
      SITEID_WEB = dataSite.id;
    } else {
      SITEID_WEB = publicRuntimeConfig.SITEID_WEB;
    }
    const queryCategory = {
      filter: {
        status: true,
        isHome: true,
        sitesId: SITEID_WEB,
      },
      sort: ['orderBy', 'ASC'],
    };
    if (SITEID_WEB) {
      await dispatch({
        type: 'webs/fetchAllCategory',
        payload: queryCategory,
      });
    }

    const {
      webs: { dataCategoryAll },
    } = store.getState();

    const modifiedCategoryAll =
      (dataCategoryAll &&
        dataCategoryAll.result &&
        dataCategoryAll.result.list &&
        dataCategoryAll.result.list.map(item => modifyCategoryWithTemplate(item, true))) ||
      [];
    const sortData =
      modifiedCategoryAll &&
      modifiedCategoryAll.length > 0 &&
      modifiedCategoryAll.sort((a, b) => a.orderHome - b.orderHome);
    return {
      modifiedCategoryAll: sortData,
      query,
      dataCategoryAll,
    };
  }

  render() {
    const { modifiedCategoryAll, dataSite} = this.props;
    // console.log("dataSite", dataSite);
    // console.log("dataChildrenCategoryAll", dataChildrenCategoryAll);
    // console.log("modifiedCategoryAll", modifiedCategoryAll);
    // console.log("sortData", sortData);
    const ogImage = dataSite && dataSite.logo && dataSite.logo.split(',')[0];
    let url;
    if (typeof window !== 'undefined') {
      url = window.location.href;
    }
    return (
      <React.Fragment>
        <Head
          dataSite={dataSite}
          ogImage={ogImage}
          keywords={dataSite && dataSite.seoKeywords}
          description={dataSite && dataSite.seoDescriptions}
          url={url || ''}
        />
        {modifiedCategoryAll &&
          modifiedCategoryAll.length > 0 &&
          modifiedCategoryAll.map((item) => 
            <RenderTemplatesCategory data={[item]} dataSite={dataSite} key={item.id} /> // add key
          )}
      </React.Fragment>
    );
  }
}

export default page(Index);
