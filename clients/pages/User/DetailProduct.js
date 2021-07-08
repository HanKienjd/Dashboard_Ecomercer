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
            type: 'webs/fetchProductInfo',
            payload: { id: query.id, status: true },
        });
        // console.log('query', query)
        await dispatch({
            type: 'webs/fetchQuery',
            payload: { ...query },
        });
        const {
            webs: { dataProductInfo },
        } = store.getState();
        return {
            dataProductInfo,
            query,
        };
    }

    render() {
        const {
            dataProductInfo, query,
            dataSite,
        } = this.props;
        // console.log("dataProductInfo", dataProductInfo)
        // console.log("dataSite", dataSite)
        // console.log("query", query)
        if (
            (Number(dataProductInfo && dataProductInfo.id) === Number(query && query.id)) && (Number(dataSite.id) === Number(dataProductInfo && dataProductInfo.categories && dataProductInfo.categories.sitesId))
        ) {

            const headTitle = `${dataSite.name} -  ${dataProductInfo && dataProductInfo.name}` || '';
            const ogImage = dataProductInfo && dataProductInfo.images && dataProductInfo.images.split(',')[0] || ""
            let url
            if (typeof window !== 'undefined') {
                url = window.location.href
            }
            return (
              <React.Fragment>
                <Head
                  title={headTitle}
                  dataSite={dataSite}
                  keywords={dataSite && dataSite.seoKeywords}
                  description={dataSite && dataSite.seoDescriptions}
                  ogImage={ogImage}
                  url={url || ""}
                />
                <RenderTemplatesCategory data={dataProductInfo} dataSite={dataSite} isProduct />
              </React.Fragment>
            );
        }
        return <Exception style={{ clear: 'both' }} />;
    }
}

export default Detail;
