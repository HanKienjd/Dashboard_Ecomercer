/* eslint-disable camelcase */
/* import { routerRedux } from 'dva/router';
import { message } from 'antd'; */
// import log from '@/utils/log';
import {
  queryMenus,
  queryCategoryInfo,
  queryCategoryAll,
  queryArticleAll,
  queryArticleInfo,
  queryArticleInfoByName,
  queryAd,
  queryCategoryInfoByName,
  queryChildrenCategoryAll,
  queryTreeCategoryById,
  queryDataSiteUrl,
  queryProductAll,
  queryProductInfo,
  queryProductsCataLog,
  getListProducers,
  queryOrderByToken,
  createOrders,
  queryPricingInfor,
  queryServicesInfor,
  queryOpenShedules,
  queryProductVACAll,
  queryProductVACInfo,
  createProductVAC,
  queryProductCollection,
} from '@/services/websRedux';

export default {
  namespace: 'webs',

  state: {
    dataAll: [],
    dataAdd: [],
    data: {
      list: [],
      pagination: {},
    },
    info: {},
    query: {},
    filter: {},
    dataCategoryInfo: {},
    dataCategoryAll: [],
    dataSiteUrl: {},
    dataArticleAll: [],
    datainfoArticle: {},
    dataAd: [],
    dataSite: {},
    products: {
      list: [],
      pagination: {},
    },
    dataProductInfo: {},
    dataProducers: [],
    dataCheckout: {},
    dataOpenShedules: {},
  },
  effects: {
    *fetchMenus({ payload, callback }, { call, put }) {
      const response = yield call(queryMenus, payload);
      // console.log("servie model fetch response: %o ", response)
      if (response) {
        yield put({
          type: 'save',
          payload: response || {},
        });
      }
      if (callback) callback(response);
    },
    *fetchQuery({ payload }, { put }) {
      if (payload) {
        yield put({ type: 'savequery', payload: payload || {} });
      }
    },
    // *fetchSiteInfo({ payload: { id }, callback }, { call, put }) {
    //   const response = yield call(queryWebInfo, id);
    //   // const page = yield select(state => state.users.page);
    //   // console.log("dsasad", response)
    //   if (response) {
    //     yield put({ type: 'saveSiteInfo', payload: response || {} });

    //   }
    //   if (callback)
    //     callback(response)
    // },
    *fetchCategoryInfo(
      {
        payload: { id },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(queryCategoryInfo, id);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveCategoryInfo', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchAllCategory({ payload, callback }, { call, put }) {
      const response = yield call(queryCategoryAll, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveCategoryAll', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchAllArticle({ payload, callback }, { call }) {
      const response = yield call(queryArticleAll, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        // yield put({ type: 'saveArticle', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchAllAd({ payload, callback }, { call, put }) {
      const response = yield call(queryAd, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveAd', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchArticleInfoByName({ payload, callback }, { call, put }) {
      const response = yield call(queryArticleInfoByName, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveArticleInfo', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchCategoryInfoByName(
      {
        payload: { name },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(queryCategoryInfoByName, name);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveCategoryInfo', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchAllChildrenCategory({ payload, callback }, { call }) {
      const response = yield call(queryChildrenCategoryAll, payload);
      // const page = yield select(state => state.users.page);
      // console.log('dsasad', response);
      if (callback) callback(response);
    },
    *fetchTreeCategory({ payload, callback }, { call }) {
      const response = yield call(queryTreeCategoryById, payload);
      if (callback) callback(response);
    },
    *fetchArticleInfo({ payload, callback }, { call }) {
      const response = yield call(queryArticleInfo, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        // yield put({ type: 'saveArticleInfo', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchSiteUrl({ payload, callback }, { call, put }) {
      const response = yield call(queryDataSiteUrl, payload);
      if (response) {
        yield put({ type: 'saveDataSiteUrl', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchAllProduct({ payload, callback }, { call }) {
      const response = yield call(queryProductAll, payload);
      if (response) {
        // yield put({ type: 'saveProduct', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchProductInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryProductInfo, payload);
      if (response) {
        yield put({ type: 'saveProductInfo', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchProducers({ payload, callback }, { call }) {
      // console.log("asdaf")
      const response = yield call(getListProducers, payload);
      if (response) {
        // yield put({ type: 'saveProducers', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchOrderByToken({ payload, callback }, { call, put }) {
      const response = yield call(queryOrderByToken, payload);
      if (response) {
        yield put({ type: 'saveCheckout', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *postCreateOrder({ payload, callback }, { call }) {
      const response = yield call(createOrders, payload);
      if (callback) callback(response);
    },

    *fetchAllPricingInfor({ payload, callback }, { call }) {
      const response = yield call(queryPricingInfor, payload);
      // const page = yield select(state => state.users.page);

      if (response) {
        // yield put({ type: 'savePricingInfor', payload: response || {} });
        if (callback) callback(response);
      }
    },
    *fetchServicesInfor({ payload, callback }, { call }) {
      const response = yield call(queryServicesInfor, payload);
      // const page = yield select(state => state.users.page);

      if (response) {
        // yield put({ type: 'saveServicesInfor', payload: response || {} });
        if (callback) callback(response);
      }
    },
    *fetchOpenShedules({ payload, callback }, { call }) {
      const response = yield call(queryOpenShedules, payload);
      // const page = yield select(state => state.users.page);

      if (response) {
        // yield put({ type: 'saveOpenShedules', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *postProductVAC({ payload, callback }, { call }) {
      const response = yield call(createProductVAC, payload);
      if (response) {
        if (callback) callback(response);
      }
    },
    *fetchProductVAC({ payload, callback }, { call }) {
      const response = yield call(queryProductVACAll, payload);
      if (response) {
        if (callback) callback(response);
      }
    },
    *fetchProductVACInfo({ payload, callback }, { call }) {
      const response = yield call(queryProductVACInfo, payload);
      if (response) {
        if (callback) callback(response);
      }
    },
    *fetchCategoryInfoById(
      {
        payload: { id },
        callback,
      },
      { call }
    ) {
      const response = yield call(queryCategoryInfo, id);
      if (callback) callback(response);
    },
    *fetchAllProductCatalog({ payload, callback }, { call }) {
      const response = yield call(queryProductsCataLog, payload);
      if (response) {
        // yield put({ type: 'saveProduct', payload: response || {} });
      }
      if (callback) callback(response);
    },
    *fetchDataProductCollection({ payload, callback }, { call }) {
      const response = yield call(queryProductCollection, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveAd(state, action) {
      return { ...state, dataAd: action.payload.result };
    },
    save(state, action) {
      return { ...state, data: action.payload.result };
    },
    // saveSiteInfo(state, action) {
    //   return {
    //     ...state,
    //     dataSite: action.payload
    //   }
    // },
    savequery(state, action) {
      return { ...state, query: action.payload };
    },
    saveArticleInfo(state, action) {
      return { ...state, datainfoArticle: action.payload };
    },
    saveCategoryInfo(state, action) {
      return { ...state, dataCategoryInfo: action.payload };
    },
    saveCategoryAll(state, action) {
      return { ...state, dataCategoryAll: action.payload };
    },
    saveArticle(state, action) {
      return { ...state, dataArticleAll: action.payload.result };
    },
    saveChildrenCategoryAll(state, action) {
      return {
        ...state,
        dataChildrenCategoryAll:
          (action.payload && action.payload.result && action.payload.result.list) || [],
      };
    },
    saveDataSiteUrl(state, action) {
      return {
        ...state,
        dataSiteUrl: action.payload,
        dataSite:
          action.payload &&
          action.payload.result &&
          action.payload.result.list.length > 0 &&
          action.payload.result.list[0],
      };
    },
    saveProducts(state, action) {
      return { ...state, products: action.payload.result };
    },
    saveProductInfo(state, action) {
      return { ...state, dataProductInfo: action.payload };
    },
    saveProducers(state, action) {
      return { ...state, dataProducers: action.payload };
    },
    saveCheckout(state, action) {
      return { ...state, dataCheckout: action.payload };
    },
    saveOpenShedules(state, action) {
      return {
        ...state,
        dataOpenShedules: action.payload,
      };
    },
    saveProductCatalog(state, action) {
      return {
        ...state,
        dataProductCatalog: action.payload,
      };
    },
  },
};
