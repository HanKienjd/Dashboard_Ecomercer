/* eslint-disable camelcase */
// import dynamic from 'next/dynamic';
import React, { PureComponent } from 'react';
import DATA_TEMPLATES from './dataImport';

class Control extends PureComponent {
  render() {
    const { dataSite } = this.props;
    try {
      const Templates = DATA_TEMPLATES[`${dataSite.templates.folder}`];
      // console.log('tempalte', dataSite.templates.folder);
      if (Templates) {
        return React.createElement(Templates, {
          ...this.props,
        });
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export default Control;
