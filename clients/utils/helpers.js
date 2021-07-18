/* eslint-disable global-require */
import _ from 'lodash';
import getConfig from 'next/config';
// import log from '@/utils/log';
import cookie from 'js-cookie'
import KJUR from 'jsrsasign';

export const isClient = typeof window !== 'undefined';

export function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export const validateEmail = (email) => {
  const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  return re.test(String(email).toLowerCase());
}

export const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const makeFlatten = (data) => (
  data.reduce((acc, record) => {
    acc.push(record)
    if (record.children) {
      record.children.forEach(item => {
        acc.push(item)
      })
    }
    return acc;
  }, [])
);

export const findRoute = (name, data) => (
  _.find(data, (item) => item.path === name)
)

const getRouter = () => {
  const UrlPrettifier = require('next-url-prettifier').default;
  // const memoizeOne = require('memoize-one');
  const { isEqual } = require('lodash');
  /* const fs = require("fs-extra");
  const path = require("path"); */
  const aaRoutes = require("@/config/router.config").routes;

  // Conversion router to menu.
  function formatter(data, parentAuthority, parentName) {
    return data
      .map(item => {
        if (!item.path && !item.prettyUrl) {
          return null;
        }

        let locale = 'menu';
        if (parentName) {
          locale = `${parentName}.${item.name}`;
        } else {
          locale = `menu.${item.name}`;
        }

        const result = {
          ...item,
          name: item.name,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.routes) {
          const children = formatter(item.routes, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      })
      .filter(item => item);
  }

  const memoizeOneFormatter = formatter

  const makeFlatten1 = (data) => (
    data.reduce((acc, record) => {
      if (record.component && record.component !== null && record.component !== '') {
        let prettyPatterns = [];
        if (record.patterns) {
          prettyPatterns = record.patterns
        } else if (record.prettyPatterns) {
          // eslint-disable-next-line prefer-destructuring
          prettyPatterns = record.prettyPatterns
        }

        acc.push({
          page: record.component,
          prettyUrl: record.path || record.prettyUrl,
          prettyPatterns
        })
      }
      if (record.children) {
        const routesChild = makeFlatten(record.children)
        // log("routesChild: ", routesChild)
        routesChild.map(item => acc.push(item))
      }
      return acc;
    }, [])
  );

  let routes = [];
  try {
    const authority = ["admin", "user"];
    const menuRoutes = makeFlatten1(memoizeOneFormatter(aaRoutes.dashboard, authority));
    const siteRoutes = makeFlatten1(memoizeOneFormatter(aaRoutes.web, authority));
    routes = [
      ...siteRoutes,
      ...menuRoutes
    ];
    // console.log("MenuRouter: %o \nsiteRoutes: %o", menuRoutes, siteRoutes)
    // log("routes: %o \n __dirname: %o", routes, __dirname);

  } catch (error) {
    // log("MenuRouter error: ", new Error(error).message)
  }

  const urlPrettifier = new UrlPrettifier(routes)
  return urlPrettifier
}

export const Router = getRouter()

export function userid() {
  const cookieToken = cookie.get("token");
  const token = cookieToken !== "undefined" ? cookieToken : null;
  const decodedToken = KJUR.jws.JWS.parse(token)
  if (decodedToken && decodedToken.payloadObj.userId) {
    const { userId } = decodedToken.payloadObj
    return userId
  }
  return 0
}
