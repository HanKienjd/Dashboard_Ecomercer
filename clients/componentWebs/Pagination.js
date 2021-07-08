import React from 'react';

const defaultProps = {
  initialPage: 1
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentDidMount() {
    const { items, initialPage } = this.props
    if (items && items > 0) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    const { items, initialPage } = this.props
    // reset page if items array has changed
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage = (page) => {
    const { items, pageSize } = this.props
    const { pager } = this.state
    let pagers = pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    pagers = this.getPager(items, page, pageSize);
    this.setState({ pager: pagers });
  }

  getPager = (totalItems, currentPage, pageSize) => {
    const currentPages = currentPage || 1;
    const pageSizes = pageSize || 10;
    const totalPages = Math.ceil(totalItems / pageSizes);

    let startPage; let endPage;
    if (currentPages <= 1)
      startPage = 1;
    else
      startPage = (currentPages - 1);


    if ((totalPages - (startPage + 2)) >= 0) {
      endPage = startPage + 2;
    } else {
      endPage = totalPages;
    }

    // calculate start and end item indexes
    const startIndex = (currentPages - 1) * pageSizes;
    const endIndex = Math.min(startIndex + pageSizes - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage: currentPages,
      pageSize: pageSizes,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const { pager } = this.state
    const { fetchMore } = this.props
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    return (
      <React.Fragment>
        <div style={{ float: "right" }}>
          {pager.currentPage !== 1 &&
            <a
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: "400",
                float: "left",
                margin: "0 2.5px",
                borderRadius: "5px",
                width: "40px",
                background: "#fff",
                border: "solid 1px #ebebeb",
                textAlign: "center",
                height: "40px",
                fontSize: "14px",
                padding: "0",
                lineHeight: "40px",
                color: "#292929",
                textDecoration: "none",
              }}
              onClick={() => { this.setPage(pager.currentPage - 1); fetchMore(pager.currentPage - 1) }}
            >
              <i className="fa fa-angle-left" aria-hidden="true" />
            </a>}
          {pager.pages.map((page) =>
            <React.Fragment key={page}>
              {pager.currentPage === page &&
                <a
                  style={{
                    backgroundColor: "#008baf",
                    borderColor: "#30335C",
                    color: "#fff",
                    display: "block",
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: "400",
                    float: "left",
                    margin: "0 2.5px",
                    borderRadius: "5px",
                    width: "40px",
                    border: "solid 1px #ebebeb",
                    textAlign: "center",
                    height: "40px",
                    fontSize: "14px",
                    padding: "0",
                    lineHeight: "40px",
                    textDecoration: "none",
                  }}
                >
                  {page}
                </a>
              }
              {pager.currentPage !== page &&
                <a
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontWeight: "400",
                    float: "left",
                    margin: "0 2.5px",
                    borderRadius: "5px",
                    width: "40px",
                    background: "#fff",
                    border: "solid 1px #ebebeb",
                    textAlign: "center",
                    height: "40px",
                    fontSize: "14px",
                    padding: "0",
                    lineHeight: "40px",
                    color: "#292929",
                    textDecoration: "none",
                  }}
                  onClick={() => { this.setPage(page); fetchMore(page) }}
                >
                  {page}
                </a>
              }
            </React.Fragment>
          )}
          {pager.currentPage !== pager.totalPages &&
            <a
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontWeight: "400",
                float: "left",
                margin: "0 2.5px",
                borderRadius: "5px",
                width: "40px",
                background: "#fff",
                border: "solid 1px #ebebeb",
                textAlign: "center",
                height: "40px",
                fontSize: "14px",
                padding: "0",
                lineHeight: "40px",
                color: "#292929",
                textDecoration: "none",
              }}
              onClick={() => { this.setPage(pager.currentPage + 1); fetchMore(pager.currentPage + 1) }}
            >
              <i className="fa fa-angle-right" aria-hidden="true" />
            </a>}
        </div>
        <div className="clr" />
      </React.Fragment>
    );
  }
}

Pagination.defaultProps = defaultProps;

export default Pagination
