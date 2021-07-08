/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { fetchJson } from '@/utils/fetch';
import Promise from '@/utils/promise';
import publicRuntimeConfig from '@/utils/config';

const { SCREEN_DESKTOP, SCREEN_TABLET, SCREEN_MOBILE } = publicRuntimeConfig;
const getResponsiveImage = (url, imageResize) => {
  let responsiveWidth = 768;
  let screenWidth = 768;
  try {
    if (typeof window !== undefined) {
      screenWidth = window.innerWidth;
    }
  }
  catch (err) { }
  if (!url || url === "") return ""
  let newUrl = url
  if (url.indexOf("/") !== 0) {
    newUrl = "/" + url
  }
  if (Number(screenWidth) > Number(SCREEN_TABLET)) {
    if (imageResize && typeof imageResize[0] === 'number') responsiveWidth = imageResize[0];
    else if (imageResize && imageResize[0] && imageResize[0].desktop && imageResize[0].desktop.width) responsiveWidth = imageResize[0].desktop.width;
    else responsiveWidth = SCREEN_DESKTOP;
  }
  else if (Number(screenWidth) > Number(SCREEN_MOBILE)) {
    if (imageResize && typeof imageResize[0] === 'number') responsiveWidth = imageResize[1] || imageResize[0];
    else if (imageResize && imageResize[1] && imageResize[1].tablet && imageResize[1].tablet.width) responsiveWidth = imageResize[1].tablet.width;
    else responsiveWidth = SCREEN_TABLET;
  }
  else {
    if (imageResize && typeof imageResize[0] === 'number') responsiveWidth = imageResize[2] || imageResize[0];
    else if (imageResize && imageResize[2] && imageResize[2].mobile && imageResize[2].mobile.width) responsiveWidth = imageResize[2].mobile.width;
    else responsiveWidth = SCREEN_MOBILE;
  }
  const typeArray = ['\\.gif', '\\.GIF', '\\.svg', '\\.SVG', '\\.ico', '\\.ICO'];
  let originImage;
  typeArray.map(item => { if (typeof url === 'string' && url && url.search(item) + 1) originImage = true; });
  if (originImage) return (`${publicRuntimeConfig.IMAGE_SERVER_NEW}${publicRuntimeConfig.IMAGE_PROJECT}${newUrl}`);
  return (`${publicRuntimeConfig.IMAGE_SERVER_NEW}${publicRuntimeConfig.IMAGE_PROJECT}${newUrl}?widthImage=${Math.ceil(responsiveWidth)}`);
}

class NbmImageNew extends PureComponent {
  render() {
    const { src, imageResize, destopDivision, tableDivision, mobileDivision, ...propertyProps } = this.props;
    return (
      <img src={getResponsiveImage(src, imageResize)} {...propertyProps} />
    )
  }
}
export { getResponsiveImage };

export default NbmImageNew;
