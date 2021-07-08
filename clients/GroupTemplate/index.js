/* eslint-disable camelcase */
// import dynamic from 'next/dynamic';
import React, { Component } from 'react';
import moment from 'moment';
import Exception from '@/componentWebs/Exception';
import DATA_TEMPLATES from './data';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clo: false,
    };
  }

  componentDidMount() {
    this.setState({ clo: true });
  }

  render() {
    const {
      data,
      dataSite,
      isDetail,
      isProduct,
      isSearch,
      isCart,
      isCheckout,
      isUser,
    } = this.props;
    const {clo}=this.state
    if (clo) {
      // console.log('dataSite :>> ', dataSite);
      // console.log('data', data);
      // console.log("dataSite", dataSite);
      // console.log("detail", isDetail)
    }
    if (data && !isDetail && !isProduct && !isSearch && !isCart && !isCheckout) {
      return (
        data &&
        data.map(item => {
          if (
            item &&
            item.templateLayouts &&
            item.templateLayouts.folder !== null &&
            item.templateLayouts.folder !== ''
          ) {
            try {
              if (clo) console.log(item.name, ' :', item.templateLayouts.folder);

              const Templates =
                DATA_TEMPLATES[`${dataSite.templates.folder}_${item.templateLayouts.folder}`];
              if (Templates) {
                return React.createElement(Templates, {
                  data: item,
                  dataSite,
                  key: `${item.templateLayouts.folder}_${item.id}_${moment().format(
                    'YYYYMMDDHHMMSS'
                  )}`,
                });
              }
              return null;
            } catch (error) {
              return null;
            }
          }
          return null;
        })
      );
    }
    if (isDetail && !isProduct && !isSearch && !isCart && !isCheckout) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_detail`];
        if (Templates) {
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `${data.id}_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return null;
      } catch (error) {
        return null;
      }
    }
    if (isProduct && !isDetail && !isSearch && !isCart && !isCheckout) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_product`];

        if (Templates) {
          // console.log("Templates", DATA_TEMPLATES[`template_sea_kitchen_product`])
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `${data.id}_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return <Exception style={{ clear: 'both' }} />;
      } catch (error) {
        // console.log(error);
        return null;
      }
    }
    if (!isProduct && !isDetail && isSearch && !isCart && !isCheckout) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_search`];

        if (Templates) {
          // console.log("Templates", DATA_TEMPLATES[`template_sea_kitchen_product`])
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `key_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return <Exception style={{ clear: 'both' }} />;
      } catch (error) {
        // console.log(error);
        return null;
      }
    }
    if (!isProduct && !isDetail && !isSearch && isCart && !isCheckout) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_cart`];

        if (Templates) {
          // console.log("Templates", DATA_TEMPLATES[`template_sea_kitchen_product`])
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `key_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return <Exception style={{ clear: 'both' }} />;
      } catch (error) {
        // console.log(error);
        return null;
      }
    }
    if (!isProduct && !isDetail && !isSearch && !isCart && isCheckout) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_checkout`];
        // console.log('data', data)
        if (Templates) {
          // console.log("Templates", DATA_TEMPLATES[`template_sea_kitchen_product`])
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `key_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return <Exception style={{ clear: 'both' }} />;
      } catch (error) {
        // console.log(error);
        return null;
      }
    }
    if (isUser) {
      try {
        const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}_user`];
        if (Templates) {
          return React.createElement(Templates, {
            data,
            dataSite,
            key: `key_${moment().format('YYYYMMDDHHMMSS')}`,
          });
        }
        return <Exception style={{ clear: 'both' }} />;
      } catch (error) {
        return null;
      }
    }
    return <Exception style={{ clear: 'both' }} />;
  }
}

export default Index;
