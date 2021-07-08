/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { formatNumber } from '@/utils/utils';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';

@connect(({ cart }) => ({
  dataCart: cart.dataCart,
  showCart: cart.showCart,
  lastProduct: cart.lastProduct,
}))
class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dataSite, dispatch } = this.props;
    dispatch({
      type: 'cart/createCart',
      listProducts: [],
      cartName: `cart.${dataSite.url}`,
    });
  }

  totalPrice = () => {
    const { dataCart } = this.props;
    let total = 0;
    dataCart.slice(0, dataCart.length).map(product => {
      total += (Number(product.dealPrice || 0) || product.price) * product.qty;
    });
    return formatNumber(total);
  };

  increaseItem = product => {
    const { dispatch } = this.props;

    product.qty += 1;
    dispatch({
      type: 'cart/increaseItem',
      product,
    });
  };

  decreaseItem = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'cart/decreaseItem',
      product,
    });
  };

  removeItem = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'cart/removeItem',
      product,
    });
  };

  showCart = () => {
    const { dispatch, showCart } = this.props;

    dispatch({
      type: 'cart/showCart',
      showCart: !showCart,
    });
  };

  render() {
    const { lastProduct, dataCart, showCart } = this.props;
    let totalqty = 0;
    dataCart.map(product => {
      totalqty += product.qty;
    });
    return (
      <React.Fragment>
        <div
          id="popupCartModal"
          className={showCart ? 'modal fade in' : 'modal fade'}
          role="dialog"
          style={showCart ? { display: 'block', paddingRight: '17px' } : {}}
          onClick={e => {
            if (e.target.className === 'modal fade in') this.showCart();
          }}
        >
          <div className="popup_overlay" />
          <div className="modal-dialog">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                style={{ position: 'relative', zIndex: 9 }}
                onClick={this.showCart}
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="row row-noGutter">
                <div className="modal-left col-sm-6 col-lg-6 col-md-6">
                  <h3 className="title">
                    <i className="fa fa-check" /> Sản phẩm đã được thêm vào giỏ hàng
                  </h3>
                  <div className="modal-body">
                    <div className="media">
                      <div className="media-left">
                        <div className="thumb-1x1">
                          <img
                            src={getResponsiveImage(
                              lastProduct.images && lastProduct.images.split(',')[0]
                            )}
                            alt={lastProduct.name}
                          />
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="product-title">{lastProduct.name}</div>
                        <div className="product-new-price">
                          <span>{formatNumber(Number(lastProduct.dealPrice))}đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-right col-sm-6 col-lg-6 col-md-6">
                  <h3 className="title right_title">
                    <a href="/cart">
                      <ion-icon name="cart" /> Giỏ hàng của bạn (
                      <span>
                        <span className="cart-popup-count">{totalqty}</span> sản phẩm
                      </span>
                      ){' '}
                    </a>
                  </h3>
                  <div className="total_price">
                    <span>Tổng tiền:</span>
                    <span className>{formatNumber(Number(lastProduct.dealPrice))}đ</span>
                  </div>
                  <a href="/checkout" className="btn btn-primary checkout_button btn-full">
                    Tiến hành thanh toán
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showCart ? 'modal-backdrop fade in' : ''} />
      </React.Fragment>
    );
  }
}

export default Cart;
