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
    render() {
        const {
            dataSite,
        } = this.props;
        let url
        if (typeof window !== 'undefined') {
            url = window.location.href
        }
        return (
          <React.Fragment>
            <Head
              title="Tài khoản"
              dataSite={dataSite}
              keywords={dataSite && dataSite.seoKeywords}
              description={dataSite && dataSite.seoDescriptions}
              url={url || ""}
            />
            <RenderTemplatesCategory dataSite={dataSite} isUser />
          </React.Fragment>
        );
    }
}

export default Detail;
