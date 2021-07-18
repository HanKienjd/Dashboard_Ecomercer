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
class Checkout extends React.Component {
    static async getInitialProps(ctx) {
        const { store, dispatch, query } = ctx;
        if (query.token) {
            await dispatch({
                type: 'webs/fetchOrderByToken',
                payload: { token: query.token },
            });
        }
        const {
            webs: { dataCheckout },
        } = store.getState();
        return { dataCheckout, };
    }
    
    render() {
        const { dataSite, dataCheckout } = this.props;
        const headTitle = `Thanh toán đơn hàng - ${  dataSite && dataSite.name}`;
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
            <RenderTemplatesCategory data={dataCheckout} dataSite={dataSite} isCheckout />
          </React.Fragment>
        );
    }
}

export default Checkout;
