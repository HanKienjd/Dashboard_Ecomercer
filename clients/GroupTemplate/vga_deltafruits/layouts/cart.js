import React from 'react';
import { formatNumber, getNameProduct, getLinkProduct } from '@/utils/utils';
import { connect } from 'react-redux';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import dynamic from 'next/dynamic';

const Breadcrumb = dynamic(() => import(`@/componentWebs/vga_Delta_Fruits/BreadCrumb`), {
  ssr: true,
  loading: () => null,
});

@connect(({ cart }) => ({ ...cart }))
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  totalPrice = () => {
    const { dataCart } = this.props;
    let total = 0;
    dataCart.forEach(product => {
      total += (parseInt(product.dealPrice || 0, 10) || product.price) * product.qty;
    });
    return formatNumber(total);
  };

  increaseItem = data => {
    const product = { ...data };
    const { dispatch } = this.props;
    if (product.qty < 999) {
      product.qty += 1;
      dispatch({
        type: 'cart/increaseItem',
        product,
      });
    }
  };

  decreaseItem = data => {
    const product = { ...data };
    const { dispatch } = this.props;
    if (product.qty > 1) {
      dispatch({
        type: 'cart/decreaseItem',
        product,
      });
    }
  };

  changeItem = (e, product) => {
    const qty = e.target.value;
    if ((qty <= 999 && qty >= 1) || qty === '') {
      this.setState({
        productId: product.id,
        qty: e.target.value ? parseInt(e.target.value, 10) : e.target.value,
      });
    }
  };

  submitItem = data => {
    const { dispatch } = this.props;
    const { productId, qty } = this.state;
    const product = { ...data };
    if (productId === product.id && qty) {
      product.qty = parseInt(qty, 10);
      dispatch({
        type: 'cart/increaseItem',
        product,
      });
    }
    this.setState({
      productId: 0,
    });
  };

  removeItem = product => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cart/removeItem',
      product,
    });
  };

  render() {
    const { dataCart } = this.props;
    const { qty, productId } = this.state;
    const imageResize = [200, 80, 80];
    const cartLength =
      (dataCart.length && dataCart.reduce((sum, product) => sum + product.qty, 0)) || 0;
    console.log('cartLength', cartLength);
    console.log('dataCart', dataCart);
    return (
      <React.Fragment>
        <Breadcrumb data={{ name: 'Giỏ hàng' }} />
        <section className="main-cart-page main-container col1-layout page-backgroud">
          <div className="main container hidden-xs hidden-sm">
            <div className="wrap_background_aside padding-top-15 margin-bottom-40">
              <div className="header-cart">
                <h1 className="title_cart">
                  <a>
                    Giỏ hàng của bạn
                    <span>
                      {' '}
                      <span className="cart-popup-count">{cartLength} sản phẩm</span>
                    </span>
                  </a>
                </h1>
                <div className="header-cart title_cart_pc hidden-sm hidden-xs" />
              </div>
              <div className="col-main cart_desktop_page cart-page">
                {dataCart && dataCart.length > 0 ? (
                  <div className="cart page_cart cart_des_page hidden-xs-down">
                    <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 pd-right cart_desktop">
                      <div className="bg-scroll">
                        <div className="cart-thead">
                          <div className="text-left" style={{ width: '43%' }}>
                            <span>Sản phẩm</span>
                          </div>
                          <div style={{ width: '19%' }} className="a-center">
                            <span className="nobr">Giá</span>
                          </div>
                          <div style={{ width: '13%' }} className="a-center">
                            Số lượng
                          </div>
                          <div style={{ width: '25%' }} className="a-center">
                            Thành tiền
                          </div>
                        </div>
                        <div className="cart-tbody">
                          {dataCart.length > 0
                            ? dataCart.map(product => (
                                <div className="item-cart productid-20924430">
                                  <div style={{ width: '15%' }} className="content_ content_s">
                                    <a
                                      className="product-image"
                                      title={product.name}
                                      href={getLinkProduct(product)}
                                    >
                                      <img
                                        alt={product.name}
                                        src={getResponsiveImage(
                                          product.images && product.images.split(',')[0]
                                        )}
                                        style={{
                                          width: '75px',
                                          height: 'auto',
                                        }}
                                      />
                                    </a>
                                  </div>
                                  <div className="content_ content_s" style={{ width: '28%' }}>
                                    <h3 className="product-name">
                                      <a
                                        className="text2line"
                                        href={getLinkProduct(product)}
                                        title={product.name}
                                      >
                                        {product.name}
                                      </a>
                                    </h3>
                                    <span className="variant-title" style={{ display: 'none' }}>
                                      {product.title}
                                    </span>
                                    <a
                                      className="button remove-item remove-item-cart"
                                      title="Xóa sản phẩm"
                                      onClick={() => this.removeItem(product)}
                                    >
                                      <i className="fa fa-trash" aria-hidden="true" /> Xóa sản phẩm
                                    </a>
                                  </div>
                                  <div style={{ width: '20%' }} className="a-center">
                                    <span className="item-price">
                                      {' '}
                                      <span className="price">
                                        {formatNumber(Number(product.dealPrice))}₫
                                      </span>
                                    </span>
                                  </div>
                                  <div style={{ width: '15%' }} className="a-center">
                                    <div className="input_qty_pr">
                                      <input
                                        className="variantID"
                                        type="hidden"
                                        name="variantId"
                                        defaultValue={23681457}
                                      />
                                      <button
                                        onClick={() => this.decreaseItem(product)}
                                        className="reduced_pop items-count btn-minus"
                                        type="button"
                                        disabled={product.qty <= 1}
                                      >
                                        <i className="fas fa-caret-down" />
                                      </button>
                                      <input
                                        type="text"
                                        className="input-text number-sidebar input_pop input_pop qtyItem20924439"
                                        id="qty"
                                        readOnly
                                        value={product.qty}
                                        maxLength={2}
                                        onChange={this.changeItem}
                                      />
                                      <button
                                        onClick={() => this.increaseItem(product)}
                                        className="increase_pop items-count btn-plus"
                                        type="button"
                                      >
                                        <i className="fas fa-caret-up" />
                                      </button>
                                    </div>
                                  </div>
                                  <div style={{ width: '22%' }} className="a-center">
                                    <span className="item-price cart-price">
                                      {' '}
                                      <span className="price pink">
                                        {formatNumber(Number(product.dealPrice) * product.qty)}₫
                                      </span>{' '}
                                    </span>
                                  </div>
                                </div>
                              ))
                            : ''}
                        </div>
                        <div className="btn_bottom">
                          <a href="/" className="button btn-continue">
                            <span>
                              <span>Tiếp tục mua hàng</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 cart-collaterals cart_submit row margin-top-15">
                      <div className="totals">
                        <div className="totals">
                          <div className="inner">
                            <div className="wrap_checkprice">
                              <div className="li_table shopping-cart-table-total hidden">
                                <span className="li-left">Tạm tính:</span>
                                <span className="li-right totals_price price pink">
                                  {this.totalPrice()}₫
                                </span>
                              </div>
                              <div className="li_table shopping-cart-table-total">
                                <span className="li-left li_text">Thành tiền:</span>
                                <span className="li-right totals_price price">
                                  {this.totalPrice()}₫
                                </span>
                              </div>
                            </div>
                            <div className="wrap_btn">
                              <a
                                className="btn btn-primary checkout_button btn-full"
                                title="Tiến hành thanh toán"
                                type="button"
                                onClick={() => {
                                  window.location.href = '/checkout';
                                }}
                              >
                                <span>Tiến hành thanh toán</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="hidden-xs-down" style={{ fontSize: '16px', color: '#252525 ' }}>
                    Không có sản phẩm nào. Quay lại &nbsp;<a href="/">cửa hàng</a>&nbsp; để tiếp tục
                    mua sắm.
                  </p>
                )}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="shopping-cart">
                    <div className="visible-sm visible-xs">
                      {dataCart[0] ? (
                        <div className="cart-mobile">
                          <form
                            action="/cart"
                            method="post"
                            className="margin-bottom-0 has-validation-callback"
                          >
                            <div className="header-cart">
                              <div className="title-cart">
                                <h3>Giỏ hàng của bạn</h3>
                              </div>
                            </div>
                            <div className="header-cart-content">
                              <div className="cart_page_mobile content-product-list">
                                {dataCart.map(product => {
                                  const images =
                                    (product.images && product.images.split(',')[0]) || [];
                                  return (
                                    <div key={product.id} className="item-product item">
                                      <div className="item-product-cart-mobile">
                                        <a href="/sandal-si-pu-be-trai-van-hoa-dan-gian"> </a>
                                        <a className="product-images1" title={product.name}>
                                          <img
                                            width={80}
                                            height={150}
                                            alt={product.name}
                                            src={getResponsiveImage(images, imageResize)}
                                          />
                                        </a>
                                      </div>
                                      <div className="title-product-cart-mobile">
                                        <h3>
                                          <a
                                            href="/sandal-si-pu-be-trai-van-hoa-dan-gian"
                                            title={product.name}
                                          >
                                            {getNameProduct(product)}
                                          </a>
                                        </h3>
                                        <p>
                                          Giá: <span>{formatNumber(product.dealPrice)}₫</span>
                                        </p>
                                      </div>
                                      <div className="select-item-qty-mobile">
                                        <div className="txt_center">
                                          <input
                                            className="variantID"
                                            type="hidden"
                                            name="variantId"
                                          />
                                          <button
                                            className="reduced items-count btn-minus"
                                            type="button"
                                            onClick={() => this.decreaseItem(product)}
                                          >
                                            –
                                          </button>
                                          <input
                                            type="text"
                                            maxLength={3}
                                            min={0}
                                            className="input-text number-sidebar"
                                            name="Lines"
                                            size={4}
                                            value={productId === product.id ? qty : product.qty}
                                            onChange={e => this.changeItem(e, product)}
                                            onBlur={() => this.submitItem(product)}
                                          />
                                          <button
                                            className="increase items-count btn-plus"
                                            type="button"
                                            onClick={() => this.increaseItem(product)}
                                          >
                                            +
                                          </button>
                                        </div>
                                        <a
                                          className="button remove-item remove-item-cart"
                                          onClick={() => this.removeItem(product)}
                                        >
                                          Xoá
                                        </a>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="header-cart-price">
                                <div className="title-cart ">
                                  <h3 className="text-xs-left">Tổng tiền</h3>
                                  <a className="text-xs-right totals_price_mobile">
                                    {this.totalPrice()}₫
                                  </a>
                                </div>
                                <div className="checkout">
                                  <button
                                    className="button btn-proceed-checkout"
                                    title="Thanh toán ngay"
                                    type="button"
                                    onClick={() => {
                                      window.location.href = '/checkout';
                                    }}
                                  >
                                    <span>Thanh toán ngay</span>
                                  </button>
                                </div>
                                {/* <button className="button btn-proceed-checkout" title="Tiếp tục mua hàng" type="button" onClick={() => { window.location.href = "/" }}>Tiếp tục mua hàng</button> */}
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <div className="cart-empty">
                          <i className="icon cart-empty-icon" />
                          <div className="btn-cart-empty">
                            <a className="btn btn-default" href="/" title="Tiếp tục mua sắm">
                              Tiếp tục mua hàng
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap_background_aside padding-top-15 margin-bottom-40 padding-left-0 padding-right-0 hidden-md hidden-lg hidden-sm">
            <div className="cart-mobile">
              <form className="margin-bottom-0">
                {dataCart && dataCart.length > 0 ? (
                  <div className="header-cart-content" style={{ background: '#fff' }}>
                    <div className="cart_page_mobile content-product-list">
                      {dataCart &&
                        dataCart.map(product => (
                          <div className="item-product item productid-20924464 ">
                            <div className="item-product-cart-mobile">
                              <a href={getLinkProduct(product)}> </a>
                              <a className="product-images1" href title={product.name}>
                                <img
                                  width={80}
                                  height={150}
                                  src={getResponsiveImage(
                                    product.images && product.images.split(',')[0],
                                    imageResize
                                  )}
                                  alt={product.name}
                                />
                              </a>
                            </div>
                            <div className="title-product-cart-mobile">
                              <h3
                                style={{
                                  fontFamily:
                                    'Tinos, Montserrat, HelveticaNeue, "Helvetica Neue", sans-serif',
                                }}
                              >
                                <a href={getLinkProduct(product)} title={product.name}>
                                  {product.name}
                                </a>
                              </h3>
                              <p>
                                Giá:{' '}
                                <span style={{ fontFamily: 'Tinos, Roboto, sans-serif' }}>
                                  {product.price}
                                </span>
                              </p>
                            </div>
                            <div className="select-item-qty-mobile">
                              <div className="txt_center">
                                <input className="variantID" type="hidden" name="variantId" />
                                <button
                                  onClick={() => this.decreaseItem(product)}
                                  className="reduced items-count btn-minus"
                                  type="button"
                                  style={{
                                    fontFamily:
                                      'Tinos, Montserrat, HelveticaNeue, "Helvetica Neue", sans-serif',
                                  }}
                                >
                                  –
                                </button>
                                <input
                                  type="text"
                                  maxLength={3}
                                  min={1}
                                  className="input-text number-sidebar qtyMobile20924464"
                                  name="Lines"
                                  size={4}
                                  value={productId === product.id ? qty : product.qty}
                                  onChange={e => this.changeItem(e, product)}
                                  onBlur={() => this.submitItem(product)}
                                />
                                <button
                                  onClick={() => this.increaseItem(product)}
                                  className="increase items-count btn-plus"
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                              <a
                                className="button remove-item remove-item-cart"
                                data-id={20924464}
                                onClick={() => this.removeItem(product)}
                              >
                                Xoá
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="header-cart-price">
                      <div className="title-cart">
                        <h3
                          className="text-xs-left"
                          style={{ fontFamily: 'Tinos, Arial, sans-serif' }}
                        >
                          Tổng tiền
                        </h3>
                        <a
                          className="text-xs-right pull-right totals_price_mobile"
                          style={{ fontFamily: 'Tinos, Arial, sans-serif' }}
                        >
                          {this.totalPrice()}₫
                        </a>
                      </div>
                      <div className="checkout">
                        <a href="/checkout">
                          <button
                            className="btn-proceed-checkout-mobile"
                            title="Tiến hành thanh toán"
                            type="button"
                          >
                            <span href="/checkout">Tiến hành thanh toán</span>
                          </button>
                        </a>
                        <a href="/san-pham-79">
                          <button
                            className="btn btn-white f-left"
                            title="Tiếp tục mua hàng"
                            type="button"
                            href="/san-pham-79"
                          >
                            <span href="/san-pham-79">Tiếp tục mua hàng</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="header-cart">
                    <div className="title-cart">
                      <h3 style={{ fontFamily: 'Tinos, Arial, sans-serif' }}>Giỏ hàng của bạn</h3>
                      <p style={{ fontFamily: 'Tinos, Arial, sans-serif' }}>
                        (Chưa có sản phẩm nào) nhấn vào <a href="/">cửa hàng</a> để mua hàng
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Index;
