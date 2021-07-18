import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
import EncodeUrl from '@/utils/encode';
import pathToRegexp from 'path-to-regexp';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
export const generateUrl = (names, parentName, site, parent) => {
  if (parentName) {
    return `/${EncodeUrl(parentName)}/${EncodeUrl(names)}${site ? `-${site}` : ''}${parent ? `-${parent}` : ''
      }`;
  }
  return `/${EncodeUrl(names)}`;
};

export const formatNumber = value => {
  if (!value) {
    return '0'
  }
  // eslint-disable-next-line no-param-reassign
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
};

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    // console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

/**
 * find route in router.config.js
 *
 * @param {*} routeData
 * @param {*} pathname
 */
export const findRouter = (routeData, pathname) => {
  // log("pathname %o, routeData %o", pathname, routeData)
  if (routeData && routeData.length === 1) {
    return routeData[0];
  }
  let routeAuthority = {};
  const getAuthority = (key, routes) => {
    routes.map(route => {
      if (route && route.path && route.component && pathToRegexp(route.path).test(key)) {
        routeAuthority = route;
      } else if (route && route.routes) {
        routeAuthority = getAuthority(key, route.routes);
      }
      return route;
    });
    return routeAuthority;
  };
  return getAuthority(pathname, routeData);
};

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  if (typeof window !== 'undefined') return window.location.hostname === 'preview.pro.ant.design';
  return '';
}

export const fnKhongDau = str => {
  let str1 = str;
  str1 = str1.toLowerCase();
  str1 = str1.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str1 = str1.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str1 = str1.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str1 = str1.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str1 = str1.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str1 = str1.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str1 = str1.replace(/đ/g, 'd');
  // str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
  // str = str.replace(/-+-/g, " ");
  // str = str.replace(/^\-+|\-+$/g, "");
  // str = str.replace('-', ' ');
  return str1;
};

export const baseUrl = (url, name) => {
  if (!url || !name || name === '') {
    return url;
  }

  const arrUrl = url.split('/');
  const length = arrUrl && arrUrl.length;
  if (name === 'create') {
    return arrUrl.slice(0, length - 2).join('/');
  }
  return arrUrl.slice(0, length - 3).join('/');
};

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
export const getQueryString = (field, url) => {
  const href = url || window.location.href;
  const reg1 = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
  const string = reg1.exec(href);
  return string ? string[1] : null;
};

export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};
export const getSaleRate = product => {
  if (!product || !product.price) return null;
  return `${parseInt((product.dealPrice / product.price - 1) * 100, 10)}%`;
};

export const getLinkProduct = product => {
  if (!product || !product.categories) return null;
  if (!product.categories.urlSlugs && product.id) {
    return `/product/${fnKhongDau(
      product.categories.name
        .split(' ')
        .join('')
        .toLowerCase()
    )}/${product.id}`;
  }

  return `/product/${product.categories.urlSlugs}/${product.productId || product.id}`;
};
export const getLinkArticle = article => {
  if (!article || !article.categories) return null;
  return `/${article.categories.urlSlugs}/${article.urlSlugs}`;
};
export const getInterval = (time, upperCase) => {
  if (!time) return null;
  moment.locale('vi');
  const str = moment(time).fromNow();
  return upperCase ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const getProfileAfterPrd = (data, option = {}) => {
  const { price, dealPrice, stock, id } = option;
  if (!data) return {};
  if (data.ecommerceProductsModelList && data.ecommerceProductsModelList.length <= 1) {
    return { ...data, ecommerceProductsModel: {} };
  }
  return {
    categories: { ...data.categories },
    categoriesId: data.categoriesId,
    createDate: data.createDate,
    description: data.description,
    id: id || data.id,
    productId: data.id,
    images: data.images,
    imagesSizeConversionTable: data.imagesSizeConversionTable,
    name: data.name,
    dealPrice: dealPrice || data.dealPrice,
    price: price || data.price,
    ecommerceProductsModel: option,
    producers: { ...data.producers },
    producersId: data.producersId,
    quantities: stock || data.quantities,
    shortDescription: data.shortDescription,
    status: data.status,
    suppliersId: data.suppliersId,
  };
};

export const getInfoOptions = data => {
  const { ecommerceProductClassify1, ecommerceProductClassify2, ecommerceProductsModelList } = data;
  let infoOptions;
  const optionId1 =
    (ecommerceProductClassify1 &&
      ecommerceProductClassify1.length > 0 &&
      ecommerceProductClassify1[0].id) ||
    '';
  const optionId2 =
    (ecommerceProductClassify2 &&
      ecommerceProductClassify2.length > 0 &&
      ecommerceProductClassify2[0].id) ||
    '';
  if (ecommerceProductsModelList && ecommerceProductsModelList.length <= 1) {
    infoOptions = { ...data };
  } else {
    infoOptions =
      ecommerceProductsModelList &&
      ecommerceProductsModelList.length > 0 &&
      ecommerceProductsModelList.find(
        item =>
          item.ecommerceProductClassify1Id === optionId1 &&
          item.ecommerceProductClassify2Id === optionId2
      );
  }

  return {
    optionId1,
    optionId2,
    infoOptions,
  };
};

export const getNameProduct = (data = {}) => `${data.name}${(data.ecommerceProductsModel &&
  data.ecommerceProductsModel.ecommerceProductClassify1 &&
  ` / ${data.ecommerceProductsModel.ecommerceProductClassify1.name} / `) ||
  ''}
    ${(data.ecommerceProductsModel &&
    data.ecommerceProductsModel.ecommerceProductClassify2 &&
    data.ecommerceProductsModel.ecommerceProductClassify2.name) ||
  ''}`;
export const checkHttpLink = file => {
  const allowedExtensions = /(http:\/\/|https:\/\/)/;
  if (!allowedExtensions.exec(file)) {
    return false;
  }
  return true;
};

export const checkDealPrice = (data) => {
  const { price, dealPrice } = data
  if (dealPrice && price && (Number(dealPrice) > 0) && (Number(dealPrice) === Number(price))) {
    return false
  } if (dealPrice && price && (Number(dealPrice) > 0) && Number(dealPrice) !== Number(price)) {
    return true
  }

  return false
}

export const getImageHeight = (className, ratio) => {
  // call in didMount
  const el = document.querySelector(`.${className}`);
  let padding = el && window.getComputedStyle(el).getPropertyValue('padding-left');
  padding = parseInt(padding.replace('px',''), 10)
  console.log(padding);
  const width = el && el.offsetWidth - (padding && padding*2 || 0);
  const height = width && width*ratio || 'auto';
  return height;
}