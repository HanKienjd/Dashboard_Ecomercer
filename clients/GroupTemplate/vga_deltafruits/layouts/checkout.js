import React from 'react';
import Checkout from '@/componentWebs/CheckoutTemplate';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

const BreadCrumb = dynamic(() => import('@/componentWebs/vga_Delta_Fruits/BreadCrumb'), {
  ssr: true,
  loading: () => null,
});
@connect(({ cart }) => ({ dataCart: cart.dataCart }))
class Index extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <BreadCrumb data={data} />

        <Checkout {...this.props} />
      </React.Fragment>
    );
  }
}

export default Index;
