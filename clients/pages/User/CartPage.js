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
class Cart extends React.Component {
    render() {
        const { dataSite } = this.props;
        const headTitle = `Giỏ hàng - ${  dataSite && dataSite.name}`;
        const ogImage = (dataSite && dataSite.logo || '').split(',')[0];
        let url;
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
            <RenderTemplatesCategory dataSite={dataSite} isCart />
          </React.Fragment>
        );
    }
}

export default Cart;
