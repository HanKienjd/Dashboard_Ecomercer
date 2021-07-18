import React from 'react';
import dva from 'dva-no-router';
import { Provider } from 'react-redux';
import models from '../models/index';

const checkServer = () => Object.prototype.toString.call(global.process) === '[object process]';

// eslint-disable-next-line
const __NEXT_DVA_STORE__ = '__NEXT_DVA_STORE__'

function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState,
    });
  } else {
    app = dva({});
  }
  const isArray = Array.isArray(models);
  if (isArray) {
    models.forEach((m) => {
      app.models(m);
    });
  } else {
    app.models(models);
  }
  app.router(() => { });
  app.start();
  // console.log(app);
  // eslint-disable-next-line
  const store = app._store
  return store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) { // run in server
    return createDvaStore(initialState);
  }
  // eslint-disable-next-line
  if (!window[__NEXT_DVA_STORE__]) {
    // console.log('client');
    // eslint-disable-next-line
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }
  // eslint-disable-next-line
  return window[__NEXT_DVA_STORE__];
}

export default (args) => ComposedComponent => {
  class WithDva extends React.Component {
    static async getInitialProps(appContext) {
      const store = getOrCreateStore();
      const { dispatch } = store;
      // console.log("store: %o", store.getState())
      // call children's getInitialProps
      // get initProps and transfer in to the page
      // eslint-disable-next-line no-param-reassign

      const initialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps({ ...appContext, store })
        : {};
      return {
        ...initialProps,
        store,
        dispatch,
        initialState: store.getState()
      };
    }

    constructor(props, context) {
      super(props, context);

      const { initialState } = props;

      this.store = getOrCreateStore({
        initialState,
      });
    }

    render() {
      const { store, initialState, dispatch } = this.props;
      const state = args(initialState);
      
      // console.log("withDva objState: %o", state)
      return (
        <Provider store={store && store.dispatch ? store : this.store}>
          <ComposedComponent {...this.props} {...state} dispatch={dispatch} />
        </Provider>
      )
    }
  }

  return (WithDva);
}

/* export default function withDva(...args) {
  return function CreateNextPage(Component) {
    const ComponentWithDva = (props = {}) => {
      const { store, initialProps, initialState } = props;
      const ConnectedComponent = connect(...args)(Component);
      return React.createElement(
        Provider,
        // in client side, it will init store with the initial state tranfer from server side
        { store: store && store.dispatch ? store : getOrCreateStore(initialState) },
        // transfer next.js's props to the page
        React.createElement(ConnectedComponent, initialProps),
      );
    };
    ComponentWithDva.getInitialProps = async (props = {}) => {
      // console.log('get......');
      const isServer = checkServer();
      const store = getOrCreateStore(props.req);
      // call children's getInitialProps
      // get initProps and transfer in to the page
      const initialProps = Component.getInitialProps
        ? await Component.getInitialProps({ ...props, isServer, store })
        : {};
      return {
        store,
        initialProps,
        initialState: store.getState(),
      };
    };
    return ComponentWithDva;
  };
} */