/* eslint-disable camelcase */
/* import { routerRedux } from 'dva/router';
import { message } from 'antd'; */
// import log from '@/utils/log';
import {
  insertContactManager,
  queryDocumentManagers,
  queryOneDocumentManager,
} from '@/services/managerRedux';

export default {
  namespace: 'managers',

  state: {
  },
  effects: {
    *insertManager({ payload, callback }, { call}) {
      const response = yield call(insertContactManager, payload);
      if (callback) callback(response);
    },
    *fetchDocumentAll({ payload, callback }, { call}) {
      const response = yield call(queryDocumentManagers, payload);
      if (callback) callback(response);
    },
    *fetchDocumentById({ payload, callback }, { call}) {
      const response = yield call(queryOneDocumentManager, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    saveContact(state, action) {
      return {
        ...state,
        dataContact: action.payload.result
      }
    },
    saveDocuments(state, action) {
      return {
        ...state,
        dataDocument: action.payload.result
      }
    },
    saveCurrentDocument(state, action) {
      return {
        ...state,
        currentDocument: action.payload
      }
    },
  },
};
