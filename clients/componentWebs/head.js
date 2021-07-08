import NextHead from 'next/head';
import { string } from 'prop-types';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const defaultOGURL = `${publicRuntimeConfig.APP_URL}`;
const defaultOGImage = `${publicRuntimeConfig.APP_ICON}`;
const defaultOGSiteName = `${publicRuntimeConfig.APP_NAME}`;
const defaultOGType = `${publicRuntimeConfig.APP_TYPE}`;
// const defaultIcon = `${publicRuntimeConfig.APP_ICON}`
const defaultTitle = `${publicRuntimeConfig.APP_NAME || ''}`;
const origin = publicRuntimeConfig.IMAGE_SERVER_NEW + publicRuntimeConfig.IMAGE_PROJECT;

const Head = ({ title, url, keywords, description, siteName, type, ogImage, dataSite }) => {
  let icon = dataSite && dataSite.icon;
  if (icon && icon.indexOf("/") !== 0) {
    icon = "/" + icon;
  }
  let titleName = title ? title : (dataSite && dataSite.name)
  return (

    <NextHead  >
      <title>{titleName || ''}</title>
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content={description}
      />
      {/* Google / Search Engine Tags  */}
      <meta itemProp="name" content={titleName} />
      <meta itemProp="image" content={`${origin}${ogImage}`} />

      {/* Facebook Meta Tags  */}
      <meta property="og:url" content={url || defaultOGURL} />
      <meta property="og:title" content={titleName} />
      <meta name="robots" content="index,follow,all" />
      <meta property="og:site_name" content={siteName || defaultOGSiteName} />
      <meta property="og:type" content={type || defaultOGType} />
      <meta
        property="og:description"
        content={description}
      />
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${origin}${ogImage}`} />
      <meta property="og:image" content={`${origin}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <link rel="canonical" href={url || defaultOGURL} />
      <link rel="icon" type="image/png" sizes="32x32" href={icon ? `${origin + icon}` : ''} />
      <link rel="icon" type="image/png" sizes="96x96" href={icon ? `${origin + icon}` : ''} />
      <link rel="icon" type="image/png" sizes="16x16" href={icon ? `${origin + icon}` : ''} />
    </NextHead >
  )
};

Head.propTypes = {
  // title: string,
  description: string,
  url: string,
  ogImage: string,
  siteName: string,
  type: string,
  keywords: string,
};

Head.defaultProps = {
  // title: defaultTitle,
  description: '',
  url: defaultOGURL,
  ogImage: defaultOGImage,
  siteName: defaultOGSiteName,
  type: defaultOGType,
  keywords: '',
};

export default Head
