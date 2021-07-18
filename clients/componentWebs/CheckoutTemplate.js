/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
import React from 'react';
import { formatNumber, checkHttpLink } from '@/utils/utils';
import { getResponsiveImage } from '@/componentWebs/NbmImageNew';
import regexHelper from '@/utils/regexHelper';
import { checkDealPrice } from '@/static/web/js/templateCode'
import Router from 'next/router'

// eslint-disable-next-line camelcase
const { isEmail_v2 } = regexHelper;

// const checkout = '/static/template_sea_kitchen/web/css/checkoutcustom.css';


export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethodsId: "1",
      dataCartTemp: []
    };
    this.formRef = React.createRef();
  }

  openDetailCart = () => {
    const { isOpenDetailCart } = this.state
    this.setState({
      isOpenDetailCart: !isOpenDetailCart
    })
  }

  totalPrice = () => {
    const { dataCart } = this.props
    const { dataCartTemp } = this.state;
    let total = 0;
    const sum = dataCart && dataCart.length > 0 ? dataCart : dataCartTemp
    sum.map(product => {
      total += (checkDealPrice(product) ? product.dealPrice : product.price) * product.qty
      return total
    })
    return formatNumber(total)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, dataSite, dataCart } = this.props;
    const { email, name, mobile, shippingAddress, paymentMethodsId, notes } = this.state;
    this.setState({
      submited: true
    });
    if (email && name && mobile && shippingAddress && paymentMethodsId !== undefined && dataCart.length) {
      const { host } = window.location;
      const products = dataCart.map(product => {
        const nameProduct = `${product.name}${product.ecommerceProductsModel &&
          product.ecommerceProductsModel.ecommerceProductClassify1 &&
          `/ ${product.ecommerceProductsModel.ecommerceProductClassify1.name} / ` || ""}${product.ecommerceProductsModel &&
          product.ecommerceProductsModel.ecommerceProductClassify2 &&
          product.ecommerceProductsModel.ecommerceProductClassify2.name || ""
          }`
        const newData = {
          productsId: product.productId || product.id,
          quantities: product.qty,
          price: product.price,
          classifyName: nameProduct
        };
        if (checkDealPrice(product)) {
          newData.dealPrice = Number(product.dealPrice)
        }
        return ({ ...newData });
      });
      const data = {
        customer: {
          name,
          mobile,
          email,
        },
        orderUrl: `https://${host}/checkout`,
        notes,
        shippingAddress,
        sitesId: dataSite.id,
        paymentMethodsId,
        states: 0,
        products,
        customersId: 1
      };
      dispatch({
        type: "webs/postCreateOrder",
        payload: data,
        callback: res => {
          if (res.success) {
            this.setState({
              dataCheckout: res.result,
              dataCartTemp: dataCart
            })
            dispatch({
              type: "shoppingcart/cleanCart"
            });
            dispatch({
              type: "cart/cleanCart"
            });
          }
        }
      })

    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      submited: false
    });
  }

  handleFocus = (e) => {
    this.setState({
      onFocus: e.target.name
    })
  }

  handleBlur = () => {
    this.setState({
      onFocus: null
    });
  }

  getTotal = (data) => {
    const test = data.reduce((total, product) => {
      const price = checkDealPrice(product) ? product.dealPrice : product.price
      const totalPrice = total + price * product.quantities;
      return totalPrice
    }, 0)
    return test
  }

  render() {
    console.log('han')
    const { dataCart, dataSite, data } = this.props;
    const { dataCartTemp } = this.state;
    // console.log('isMobile', isMobile)
    const { isOpenDetailCart, name, email, mobile, notes, shippingAddress, submited, onFocus, dataCheckout } = this.state;
    const { router } = Router;
    if (dataCart.length <= 0 && !submited && !data.id && !dataCheckout) {
      return (
        <div style={{clear: 'both'}}>
          <h1 style={{ textAlign: "center", margin: "50px", color: '#707070' }}> Giỏ hàng trống, vui lòng mua hàng trước khi thanh toán,
            <a onClick={() => {
              router.back()
            }}
            >
              Nhấp quay lại
            </a>
          </h1>

        </div>)
    }
    const cartLength = dataCart && dataCart.length > 0 && dataCart.reduce((sum, product) => sum + product.qty, 0) || 0;
    return (
      <React.Fragment>

        {
          data && data.id ?
            (
              <div className="checkout thankyou-page">
                <div className="content">
                  <form>
                    <div className="wrap wrap--mobile-fluid">
                      <main className="main main--nosidebar">
                        <div className="main__content">
                          <article className="row">
                            <div className="col-12 col--primary">
                              <section className="section section--icon-heading">
                                <div className="section__icon unprintable">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                                    <g fill="none" stroke="#8EC343" strokeWidth={2}>
                                      <circle cx={36} cy={36} r={35} style={{ strokeDasharray: '240px, 240px', strokeDashoffset: '480px' }} />
                                      <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style={{ strokeDasharray: '50px, 50px', strokeDashoffset: '0px' }} />
                                    </g>
                                  </svg>
                                </div>
                                <div>
                                  <h2 className="section__title">Xác nhận đặt hàng thành công</h2>
                                  <p className="section__text">Cảm ơn bạn đã đặt hàng tại {dataSite.name}</p>
                                </div>
                              </section>
                            </div>
                            <div className="col-12 col--secondary">
                              <aside className={`order-summary order-summary--bordered${isOpenDetailCart ? " order-summary--is-collapsed" : ""}`} id="order-summary">
                                <div className="order-summary__header">
                                  <div className="order-summary__title"> Đơn hàng #{data.id} </div>
                                  <div className="order-summary__action hide-on-desktop unprintable" />
                                </div>
                                <div className="order-summary__sections">
                                  <div className="order-summary__section order-summary__section--product-list order-summary__section--is-scrollable">
                                    <table className="product-table">
                                      <tbody>
                                        {data.orderDetails.map(product => {
                                          const images = (product && product.products && product.products.images || '').split(',');
                                          return (
                                            <tr className="product" key={product.id}>
                                              <td className="product__image">
                                                <div className="product-thumbnail">
                                                  <div className="product-thumbnail__wrapper" data-tg-static>
                                                    <img src={checkHttpLink(images[0]) ? images[0] : getResponsiveImage(images[0])} alt={product.name} className="product-thumbnail__image" />
                                                  </div>
                                                  <span className="product-thumbnail__quantity">{product.quantities}</span>
                                                </div>
                                              </td>
                                              <th className="product__description">
                                                <span className="product__description__name">{product.classifyName}</span>
                                              </th>
                                              <td className="product__quantity printable-only">x{product.quantities}</td>
                                              <td className="product__price">{formatNumber((checkDealPrice(product) ? product.dealPrice : product.price) * product.quantities)}₫</td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="order-summary__section">
                                  <table className="total-line-table">
                                    <tbody className="total-line-table__tbody">
                                      <tr className="total-line total-line--subtotal">
                                        <th className="total-line__name">Tạm tính</th>
                                        <td className="total-line__price">{formatNumber(this.getTotal(data.orderDetails))}₫</td>
                                      </tr>
                                      <tr className="total-line total-line--shipping-fee">
                                        <th className="total-line__name">Phí vận chuyển</th>
                                        <td className="total-line__price">-</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="order-summary__section">
                                  <table className="total-line-table">
                                    <tbody className="total-line-table__tbody">
                                      <tr className="total-line payment-due">
                                        <th className="total-line__name">
                                          <span className="payment-due__label-total">Tổng cộng</span>
                                        </th>
                                        <td className="total-line__price">
                                          <span className="payment-due__price">{formatNumber(this.getTotal(data.orderDetails))}₫</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </aside>
                            </div>
                            <div className="col col--primary">
                              <section className="section">
                                <div className="section__content section__content--bordered">
                                  <div className="row">
                                    <div className="col col--md-two">
                                      <h2>Thông tin nhận hàng</h2>
                                      <p className="address-name">{name}</p>
                                      <p className="address-address">{shippingAddress}</p>
                                      <p className="address-mobile">{mobile}</p>
                                      <p className="address-email">{email}</p>
                                    </div>
                                    <div className="col col--md-two">
                                      <h2>Hình thức thanh toán</h2>
                                      <p>Thanh toán khi giao hàng (COD)</p>
                                      <h2>Hình thức vận chuyển</h2>
                                      <p>Giao hàng tận nơi</p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col col--md-two">
                                      <p>Ghi chú: {notes}</p>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section className="section unprintable">
                                <div className="field__input-btn-wrapper field__input-btn-wrapper--floating">
                                  <a href="/" className="btn btn--large">Tiếp tục mua hàng</a>
                                </div>
                              </section>
                            </div>
                          </article>
                        </div>
                      </main>
                    </div>
                  </form>
                </div>
              </div>
            )

            :
            dataCheckout ?
              <div className="checkout thankyou-page">
                <div className="content">
                  <form>
                    <div className="wrap wrap--mobile-fluid">
                      <main className="main main--nosidebar">
                        <div className="main__content">
                          <article className="row">
                            <div className="col  col--primary">
                              <section className="section section--icon-heading">
                                <div className="section__icon unprintable">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                                    <g fill="none" stroke="#8EC343" strokeWidth={2}>
                                      <circle cx={36} cy={36} r={35} style={{ strokeDasharray: '240px, 240px', strokeDashoffset: '480px' }} />
                                      <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style={{ strokeDasharray: '50px, 50px', strokeDashoffset: '0px' }} />
                                    </g>
                                  </svg>
                                </div>
                                <div>
                                  <h2 className="section__title">Cảm ơn bạn đã đặt hàng</h2>
                                  <p className="section__text">Một email xác nhận đã được gửi tới {email}. Xin vui lòng kiểm tra email của bạn</p>
                                </div>
                              </section>
                            </div>
                            <div className="col  col--primary">
                              <aside className={`order-summary order-summary--bordered${isOpenDetailCart ? " order-summary--is-collapsed" : ""}`} id="order-summary">
                                <div className="order-summary__header">
                                  <div className="order-summary__title"> Đơn hàng #{dataCheckout.id} </div>
                                  <div className="order-summary__action hide-on-desktop unprintable">
                                    <a className={`${isOpenDetailCart ? " toggled" : ""}`} onClick={this.openDetailCart}> Xem chi tiết </a>
                                  </div>
                                </div>
                                <div className="order-summary__sections">
                                  <div className="order-summary__section order-summary__section--product-list order-summary__section--is-scrollable">
                                    <table className="product-table">
                                      <tbody>
                                        {dataCartTemp.map(product => {
                                          const images = (product.images || '').split(',');
                                          return (
                                            <tr className="product" key={product.id}>
                                              <td className="product__image">
                                                <div className="product-thumbnail">
                                                  <div className="product-thumbnail__wrapper" data-tg-static>
                                                    <img src={checkHttpLink(images[0]) ? images[0] : getResponsiveImage(images[0])} alt={product.name} className="product-thumbnail__image" />
                                                  </div>
                                                  <span className="product-thumbnail__quantity">{product.qty}</span>
                                                </div>
                                              </td>
                                              <th className="product__description">
                                                <span className="product__description__name">{product.name}</span>
                                              </th>
                                              <td className="product__quantity printable-only">x{product.qty}</td>
                                              <td className="product__price">{formatNumber((checkDealPrice(product) ? product.dealPrice : product.price) * product.qty)}₫</td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className="order-summary__section">
                                  <table className="total-line-table">
                                    <tbody className="total-line-table__tbody">
                                      <tr className="total-line total-line--subtotal">
                                        <th className="total-line__name">Tạm tính</th>
                                        <td className="total-line__price">{this.totalPrice()}₫</td>
                                      </tr>
                                      <tr className="total-line total-line--shipping-fee">
                                        <th className="total-line__name">Phí vận chuyển</th>
                                        <td className="total-line__price">-</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="order-summary__section">
                                  <table className="total-line-table">
                                    <tbody className="total-line-table__tbody">
                                      <tr className="total-line payment-due">
                                        <th className="total-line__name">
                                          <span className="payment-due__label-total">Tổng cộng</span>
                                        </th>
                                        <td className="total-line__price">
                                          <span className="payment-due__price">{this.totalPrice()}₫</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </aside>
                            </div>
                            <div className="col col--primary">
                              <section className="section">
                                <div className="section__content section__content--bordered">
                                  <div className="row">
                                    <div className="col col--md-two">
                                      <h2>Thông tin nhận hàng</h2>
                                      <p className="address-name">{name}</p>
                                      <p className="address-address">{shippingAddress}</p>
                                      <p className="address-mobile">{mobile}</p>
                                      <p className="address-email">{email}</p>
                                    </div>
                                    <div className="col col--md-two">
                                      <h2>Hình thức thanh toán</h2>
                                      <p>Thanh toán khi giao hàng (COD)</p>
                                      <h2>Hình thức vận chuyển</h2>
                                      <p>Giao hàng tận nơi</p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col col--md-two">
                                      <p>Ghi chú</p>
                                      <p>{notes}</p>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section className="section unprintable">
                                <div className="field__input-btn-wrapper field__input-btn-wrapper--floating">
                                  <a href="/" className="btn btn--large">Tiếp tục mua hàng</a>
                                </div>
                              </section>
                            </div>
                          </article>
                        </div>
                      </main>
                    </div>
                  </form>
                </div>
              </div>
              :
              <div className="checkout">
                <aside>
                  <button className={`order-summary-toggle${isOpenDetailCart ? "  toggled" : ""}`} onClick={this.openDetailCart}>
                    <span className="wrap">
                      <span className="order-summary-toggle__inner">
                        <h2 className="order-summary-toggle__text">Đơn hàng ({cartLength} sản phẩm)</h2>
                        <a className="order-summary-toggle__btn">Xem chi tiết</a>
                      </span>
                    </span>
                  </button>
                </aside>
                <div className="content">
                  <form action="/checkout" method="POST" onSubmit={this.handleSubmit} ref={this.formRef}>
                    <div className="wrap">
                      <main className="main">
                        <div className="main__content">
                          <article className="animate-floating-labels row" style={{ width: "100%" }}>
                            <div className="col-sm-12 col-md-6 col--two">
                              <section className="section">
                                <div className="section__header">
                                  <div className="layout-flex">
                                    <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                      <i className="fa fa-id-card-o fa-lg section__title--icon hide-on-desktop" /> Thông tin đơn hàng
                                    </h2>
                                  </div>
                                </div>
                                <div className="section__content">
                                  <div className="fieldset">
                                    <div className={`field${email || onFocus === 'email' ? " field--show-floating-label" : ""}`}>
                                      <div className="field__input-wrapper">
                                        <label htmlFor="email" className="field__label">Email</label>
                                        <input
                                          name="email"
                                          id="email"
                                          type="email"
                                          pattern={isEmail_v2}
                                          className="field__input"
                                          onChange={this.handleChange}
                                          onFocus={this.handleFocus}
                                          onBlur={this.handleBlur}
                                          required
                                          autoComplete="checkout-email"
                                        />
                                      </div>
                                      {submited && !email && <p className="field__message field__message--error">Vui lòng nhập email</p>}
                                    </div>
                                    <div className={`field${name || onFocus === 'name' ? " field--show-floating-label" : ""}`}>
                                      <div className="field__input-wrapper">
                                        <label htmlFor="name" className="field__label">Họ và tên</label>
                                        <input
                                          name="name"
                                          id="name"
                                          type="text"
                                          className="field__input"
                                          onChange={this.handleChange}
                                          onFocus={this.handleFocus}
                                          onBlur={this.handleBlur}
                                          required
                                          autoComplete="checkout-name"
                                        />
                                      </div>
                                      {submited && !name && <p className="field__message field__message--error">Vui lòng nhập họ tên</p>}
                                    </div>
                                    <div className={`field${mobile || onFocus === 'mobile' ? " field--show-floating-label" : ""}`}>
                                      <div className="field__input-wrapper">
                                        <label htmlFor="mobile" className="field__label">Số điện thoại</label>
                                        <input
                                          name="mobile"
                                          id="mobile"
                                          type="number"
                                          pattern={regexHelper.isMobile}
                                          className="field__input"
                                          onChange={this.handleChange}
                                          onFocus={this.handleFocus}
                                          onBlur={this.handleBlur}
                                          required
                                          autoComplete="checkout-mobile"
                                        />
                                      </div>
                                      {submited && !mobile && <p className="field__message field__message--error">Vui lòng nhập số điện thoại</p>}
                                    </div>
                                    <div className={`field${shippingAddress || onFocus === 'shippingAddress' ? " field--show-floating-label" : ""}`}>
                                      <div className="field__input-wrapper">
                                        <label htmlFor="shippingAddress" className="field__label">Địa chỉ nhận hàng</label>
                                        <input
                                          name="shippingAddress"
                                          id="shippingAddress"
                                          type="text"
                                          className="field__input"
                                          onChange={this.handleChange}
                                          onFocus={this.handleFocus}
                                          onBlur={this.handleBlur}
                                          required
                                          autoComplete="checkout-shippingAddress"
                                        />
                                      </div>
                                      {submited && !shippingAddress && <p className="field__message field__message--error">Vui lòng nhập địa chỉ nhận hàng</p>}
                                    </div>
                                  </div>
                                </div>
                              </section>

                              <div className="fieldset">
                                <h3 className="visually-hidden">Ghi chú</h3>
                                <div className={`field${notes || onFocus === 'notes' ? " field--show-floating-label" : ""}`}>
                                  <div className="field__input-wrapper">
                                    <label htmlFor="notes" className="field__label">Ghi chú (tùy chọn)</label>
                                    <textarea
                                      name="notes"
                                      id="notes"
                                      type="text"
                                      className="field__input"
                                      onChange={this.handleChange}
                                      onFocus={this.handleFocus}
                                      onBlur={this.handleBlur}
                                      autoComplete="checkout-notes"
                                      style={{
                                        marginTop: "0px", marginBottom: "0px", height: "75px"
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col--two">

                              <section className="section">
                                <div className="section__header">
                                  <div className="layout-flex">
                                    <h2 className="section__title layout-flex__item layout-flex__item--stretch">
                                      <i className="fa fa-credit-card fa-lg section__title--icon hide-on-desktop" /> Thanh toán
                                    </h2>
                                  </div>
                                </div>
                                <div className="section__content">
                                  <div className="content-box">
                                    <div className="content-box__row">
                                      <div className="radio-wrapper">
                                        <div className="radio__input">
                                          <input
                                            type="radio"
                                            className="input-radio"
                                            name="paymentMethodsId"
                                            id="paymentMethodsId"
                                            defaultChecked
                                            onChange={this.handleChange}
                                          />
                                        </div>
                                        <label htmlFor="paymentMethodsId" className="radio__label">
                                          <span className="radio__label__primary">Thanh toán khi giao hàng (COD)</span>
                                          <span className="radio__label__accessory">
                                            <span className="content-box__emphasis">{this.totalPrice()}₫</span>
                                          </span>
                                        </label>
                                      </div>
                                      <div className="content-box__row__desc">
                                        <p>Bạn chỉ phải thanh toán khi nhận được hàng</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </article>
                          <div className="field__input-btn-wrapper field__input-btn-wrapper--vertical hide-on-desktop">
                            <button type="submit" className="btn btn-checkout spinner">
                              <span className="spinner-label">ĐẶT HÀNG</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="spinner-loader">
                                <use href="#spinner" />
                              </svg>
                            </button>
                            <a onClick={() => router.back()} className="previous-link">
                              <i className="previous-link__arrow">❮</i> <span className="previous-link__content">Quay lại trang trước </span>
                            </a>
                          </div>
                          <div id="common-alert" data-tg-refresh="refreshError">
                            {/* <div className="alert alert--danger hide-on-desktop hide">Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại</div> */}
                          </div>
                        </div>
                        {/* <div className="main__footer unprintable">
                  <ul className="main__policy">
                    <li>
                    </li>
                    <li>
                    </li>
                    <li>
                    </li>
                  </ul>
                  <p />
                  <div className="modal-wrapper hide" id="refund_term">
                    <div className="modal" style={{ display: 'inline-block' }}>
                      <div className="modal-header">
                        <h2 className="modal-title">Chính sách hoàn trả</h2>
                        <span className="close" data-toggle="#refund_term" data-toggle-className="hide">×</span>
                      </div>
                      <div className="modal-body">
                        <pre className="term-preview" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-wrapper hide" id="privacy_term">
                    <div className="modal" style={{ display: 'inline-block' }}>
                      <div className="modal-header">
                        <h2 className="modal-title">Chính sách bảo mật</h2>
                        <span className="close" data-toggle="#privacy_term" data-toggle-className="hide">×</span>
                      </div>
                      <div className="modal-body">
                        <pre className="term-preview" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-wrapper hide" id="service_term">
                    <div className="modal" style={{ display: 'inline-block' }}>
                      <div className="modal-header">
                        <h2 className="modal-title">Điều khoản sử dụng</h2>
                        <span className="close" data-toggle="#service_term" data-toggle-className="hide">×</span>
                      </div>
                      <div className="modal-body">
                        <pre className="term-preview" />
                      </div>
                    </div>
                  </div>
                </div> */}
                      </main>
                      <aside className="sidebar">
                        <div className="sidebar__header">
                          <h2 className="sidebar__title">  Đơn hàng ({cartLength} sản phẩm) </h2>
                        </div>
                        <div className="sidebar__content">
                          <div id="order-summary" className={`order-summary${isOpenDetailCart ? "" : " order-summary--is-collapsed"}`}>
                            <div className="order-summary__sections">
                              <div className="order-summary__section order-summary__section--product-list order-summary__section--is-scrollable">
                                <table className="product-table">
                                  <caption className="visually-hidden">Chi tiết đơn hàng</caption>
                                  <thead className="product-table__header">
                                    <tr>
                                      <th><span className="visually-hidden">Ảnh sản phẩm</span></th>
                                      <th><span className="visually-hidden">Mô tả</span></th>
                                      <th><span className="visually-hidden">Sổ lượng</span></th>
                                      <th><span className="visually-hidden">Đơn giá</span></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dataCart.map(product => {
                                      const images = (product.images || '').split(',');
                                      return (
                                        <tr className="product" key={product.id}>
                                          <td className="product__image">
                                            <div className="product-thumbnail">
                                              <div className="product-thumbnail__wrapper" data-tg-static>
                                                <img src={checkHttpLink(images[0]) ? images[0] : getResponsiveImage(images[0])} alt={product.name} className="product-thumbnail__image" />
                                              </div>
                                              <span className="product-thumbnail__quantity">{product.qty}</span>
                                            </div>
                                          </td>
                                          <th className="product__description">
                                            <span className="product__description__name">{product.name}
                                              {product.ecommerceProductsModel &&
                                                product.ecommerceProductsModel.ecommerceProductClassify1 &&
                                                `/ ${product.ecommerceProductsModel.ecommerceProductClassify1.name} / `

                                              }{product.ecommerceProductsModel &&
                                                product.ecommerceProductsModel.ecommerceProductClassify2 &&
                                                product.ecommerceProductsModel.ecommerceProductClassify2.name
                                              }
                                            </span>
                                          </th>
                                          <td className="product__quantity visually-hidden"><em>Số lượng:</em>{product.qty}</td>
                                          <td className="product__price">
                                            {formatNumber((checkDealPrice(product) ? product.dealPrice : product.price) * product.qty)}₫
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                              {/* <div className="order-summary__section order-summary__section--discount-code" data-tg-refresh="refreshDiscount" id="discountCode">
                        <h3 className="visually-hidden">Mã khuyến mại</h3>
                        <div className="edit_checkout animate-floating-labels">
                          <div className="fieldset">
                            <div className="field  ">
                              <div className="field__input-btn-wrapper">
                                <div className="field__input-wrapper">
                                  <label htmlFor="reductionCode" className="field__label">Nhập mã giảm giá</label>
                                  <input name="reductionCode" id="reductionCode" type="text" className="field__input" autoComplete="off" data-bind-disabled="isLoadingReductionCode" data-bind-event-keypress="handleReductionCodeKeyPress(event)" data-define="{reductionCode: null}" data-bind="reductionCode" />
                                </div>
                                <button className="field__input-btn btn spinner" type="button" data-bind-disabled="isLoadingReductionCode || !reductionCode" data-bind-className="{'spinner--active': isLoadingReductionCode}" data-bind-event-click="applyReductionCode()" disabled>
                                  <span className="spinner-label">Áp dụng</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="spinner-loader">
                                    <use href="#spinner" />
                                  </svg>
                                </button>
                              </div>
                              <p className="field__message field__message--error field__message--error-always-show hide" data-bind-show="!isLoadingReductionCode && isLoadingReductionCodeError" data-bind="loadingReductionCodeErrorMessage">Có lỗi xảy ra khi áp dụng khuyến mãi. Vui lòng thử lại</p>
                            </div>
                          </div>
                        </div>
                      </div> */}
                              <div className="order-summary__section order-summary__section--total-lines" id="orderSummary">
                                <table className="total-line-table">
                                  <caption className="visually-hidden">Tổng giá trị</caption>
                                  <thead>
                                    <tr>
                                      <td><span className="visually-hidden">Mô tả</span></td>
                                      <td><span className="visually-hidden">Giá tiền</span></td>
                                    </tr>
                                  </thead>
                                  <tbody className="total-line-table__tbody">
                                    <tr className="total-line total-line--subtotal">
                                      <th className="total-line__name"> Tạm tính </th>
                                      <td className="total-line__price">{this.totalPrice()}₫</td>
                                    </tr>
                                    <tr className="total-line total-line--shipping-fee">
                                      <th className="total-line__name">  Phí vận chuyển </th>
                                      <td className="total-line__price">-</td>
                                    </tr>
                                  </tbody>
                                  <tfoot className="total-line-table__footer">
                                    <tr className="total-line payment-due">
                                      <th className="total-line__name">
                                        <span className="payment-due__label-total"> Tổng cộng </span>
                                      </th>
                                      <td className="total-line__price">
                                        <span className="payment-due__price">{this.totalPrice()}₫</span>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                              <div className="order-summary__nav field__input-btn-wrapper hide-on-mobile">
                                <a onClick={() => router.back()} className="previous-link">
                                  <i className="previous-link__arrow">❮</i> <span className="previous-link__content">Quay lại trang trước </span>
                                </a>
                                <button type="submit" className="btn btn-checkout spinner">
                                  <span className="spinner-label">ĐẶT HÀNG</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="spinner-loader">
                                    <use href="#spinner" />
                                  </svg>
                                </button>
                              </div>
                              <div id="common-alert-sidebar">
                                <div className="alert alert--danger hide-on-mobile hide" data->Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </form>
                </div>
              </div>
        }
      </React.Fragment>
    );
  }
}