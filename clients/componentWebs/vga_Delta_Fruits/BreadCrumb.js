/* eslint-disable react/no-danger */
import React from 'react'

class BreadCrumb extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="breadcrumb_background">
          <div className="title_full">
            <div className="container a-center">
              <h1 className="title_page">{data.name}</h1>
            </div>
          </div>
        </div>

        <section className="bread-crumb">
          <span className="crumb-border" />
          <div className="container">
            <div className="row">
              <div className="col-xs-12 a-left">
                <ul className="breadcrumb">
                  <li className="home">
                    <a href="/">
                      <span>Trang chủ</span>
                    </a>
                    <span className="mr_lr">&nbsp;/&nbsp;</span>
                  </li>
                  {data.categories ?
                    <li>
                      <a className="changeurl" href={`/${data.categories.urlSlugs}`}><span>{data.categories.name}</span></a>
                      <span className="mr_lr">&nbsp;/&nbsp;</span>
                    </li>
                    : ""}
                  <li>
                    <strong><span>{data.name || data.title}</span></strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}
export default BreadCrumb;