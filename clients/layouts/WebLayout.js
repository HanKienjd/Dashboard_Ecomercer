/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import {  getComponentDisplayName } from '../utils/helpers';

const { publicRuntimeConfig } = getConfig();
const Control = dynamic(() => import('./ControlLayout'), {
  ssr: true,
  loading: () => null,
});

export default ComposedComponent => {
  class WebLayout extends React.Component {
    static displayName = `WebLayout(${getComponentDisplayName(ComposedComponent)})`;

    static async getInitialProps(context) {
      const { req, asPath, pathname, query, store, dispatch } = context;
      let cookies;
      let host = '';
      // let protocol = 'https:';
      if (req) {
        cookies = req.cookies;
        host = req.headers.host;
      } else {
        const documentCookie = document.cookie;
        cookies = cookie.parse(documentCookie);
        host = window.location.host;
      }
      if (host === 'localhost:8884') host = publicRuntimeConfig.SITE_NAME;
      let SITEID_WEB = '';
      const querySite = {
        filter: {
          status: true,
          url: `${host}`,
          groupSitesId: "40"
        },
        attributes:`id,url,name,seoKeywords,seoDescriptions,logo,icon`
      };
      await dispatch({
        type: 'webs/fetchSiteUrl',
        payload: querySite,
      });
      const {
        webs: { dataSite },
      } = store.getState();
      if (dataSite && dataSite.id) {
        SITEID_WEB = dataSite.id;
      } else {
        SITEID_WEB = publicRuntimeConfig.SITEID_WEB;
      }
      const queryCategory = {
        filter: {
          status: true,
          menuPositionsId: `${publicRuntimeConfig.MENU__POSITIONID_TOP},${publicRuntimeConfig.MENU__POSITIONID_BOTTOM
            }`,
          sitesId: SITEID_WEB,
        },
        sort: ['orderBy', 'ASC'],
      };
      const queryAd = {
        filter: {
          status: true,
          sitesId: SITEID_WEB,
          adsTypeId: publicRuntimeConfig.SLIDEID,
        },
      };
      if (SITEID_WEB) {
        await dispatch({
          type: 'webs/fetchMenus',
          payload: queryCategory,
        });
        await dispatch({
          type: 'webs/fetchAllAd',
          payload: queryAd,
        });
      }
      const {
        webs,
        webs: { dataAd },
      } = store.getState();
      const menus = (webs && webs.data && webs.data.list) || [];
      const menuHeader =
        (menus && menus.length > 0 && menus.filter(item => Number(item.menuPositionsId) === 4)) ||
        [];
      const menuHeaderFilter =
        (menuHeader && menuHeader.length > 0 && menuHeader.filter(item => !item.parent)) || [];
      const menuFooter =
        (menus && menus.length > 0 && menus.filter(item => Number(item.menuPositionsId) === 3)) ||
        [];
      const menuFooterFilter =
        (menuFooter && menuFooter.length > 0 && menuFooter.filter(item => !item.parent)) || [];
      return {
        ...(ComposedComponent.getInitialProps
          ? await ComposedComponent.getInitialProps(context)
          : {}),
        cookies,
        asPath,
        pathname,
        dataSite,
        query,
        menuHeader: menuHeaderFilter,
        menuFooter: menuFooterFilter,
        dataSlide: dataAd,
      };
    }

    render() {
      const {   dataSlide, dataSite} = this.props;
      let ogImage = dataSlide && dataSlide.length > 0 && dataSlide[0].contents;
      ogImage = `${publicRuntimeConfig.IMAGE_SERVER_NEW}/${publicRuntimeConfig.IMAGE_PROJECT
        }${ogImage}`;
      return (
        <React.Fragment>
          <Control {...this.props}>
            <ComposedComponent
              {...this.props}
              dataSlide={dataSlide}
              ogImage={ogImage}
              dataSite={dataSite}
            />
          </Control>
        </React.Fragment>
      );
    }
  }

  return WebLayout;
};
