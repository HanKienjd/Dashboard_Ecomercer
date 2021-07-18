let cartName = 'cart';
export default {
  namespace: 'cart',

  state: {
    dataCart: [],
    lastProduct: {},
    showCart: false,
    currentProduct: {},
  },
  effects: {
    createCart({ listProducts }, { put }) {
      put({
        type: 'createCart',
        listProducts,
      });
    },
    cleanCart({ put }) {
      put({
        type: 'cleanCart',
      });
    },
    increaseItem({ product, showCart }, { put }) {
      put({
        type: 'increaseItem',
        product,
        showCart,
      });
    },
    decreaseItem({ product }, { put }) {
      put({
        type: 'decreaseItem',
        product,
      });
    },
    removeItem({ product }, { put }) {
      put({
        type: 'removeItem',
        product,
      });
    },
    *showCart({ showCart }, { put }) {
      yield put({
        type: 'changeStatus',
        showCart,
      });
    },
    *addCollection({ payload }, { put }) {
      yield put({
        type: 'saveCollection',
        payload: payload || null,
      });
    },
  },

  reducers: {
    createCart(state, action) {
      cartName = action.cartName || cartName;
      const listProducts = localStorage.getItem(cartName)
        ? JSON.parse(localStorage.getItem(cartName))
        : action.listProducts || [];
      const lastProduct = listProducts[0] || {};
      return {
        ...state,
        dataCart: listProducts,
        lastProduct,
      };
    },
    cleanCart(state) {
      localStorage.setItem(cartName, JSON.stringify([]));
      return {
        ...state,
        dataCart: [],
        lastProduct: {},
      };
    },
    increaseItem(state, action) {
      const dataCart = [...state.dataCart];
      const { product } = action;
      const currentProduct = { ...product };
      const itemIndex = dataCart.findIndex(p => p.id === product.id);

      if (itemIndex > -1) {
        const newItem = dataCart[itemIndex];
        const oldQty = dataCart[itemIndex].qty || 0;
        const newQty = (product.qty && oldQty + product.qty) || oldQty + 1;
        dataCart[itemIndex] = { ...dataCart[itemIndex], qty: newQty };
        localStorage.setItem(cartName, JSON.stringify(dataCart));
        return {
          ...state,
          currentProduct: currentProduct,
          dataCart,
          showCart: action.showCart !== undefined ? action.showCart : state.showCart,
        };
      }

      const newItem = { ...product, qty: product.qty || 1 };
      localStorage.setItem(cartName, JSON.stringify([newItem].concat(dataCart)));
      return {
        ...state,
        dataCart: [newItem].concat(dataCart),
        lastProduct: newItem,
        currentProduct: currentProduct,
        showCart: action.showCart !== undefined ? action.showCart : state.showCart,
      };
    },

    decreaseItem(state, action) {
      const dataCart = [...state.dataCart];
      const itemIndex = dataCart.findIndex(product => product.id === action.product.id);
      if (itemIndex > -1 && dataCart[itemIndex].qty > 1) {
        dataCart[itemIndex] = { ...dataCart[itemIndex], qty: dataCart[itemIndex].qty - 1 };
        localStorage.setItem(cartName, JSON.stringify(dataCart));
        return {
          ...state,
          dataCart,
        };
      }
      return state;
    },

    removeItem(state, action) {
      const dataCart = [...state.dataCart];
      localStorage.setItem(
        cartName,
        JSON.stringify(dataCart.filter(product => product.id !== action.product.id))
      );
      return {
        ...state,
        dataCart: dataCart.filter(product => product.id !== action.product.id),
      };
    },

    changeStatus(state) {
      return {
        ...state,
        showCart: !state.showCart,
      };
    },

    saveCollection(state, action) {
      const { dataCart } = state;
      const dataCollection = action.payload;
      const newCollection =
        dataCollection &&
        dataCollection.length > 0 &&
        dataCollection.filter(item => !dataCart.map(e => e.id).includes(item.id));

      const newData = [...dataCart];
      localStorage.setItem(cartName, JSON.stringify([...newData, ...newCollection]));
      return {
        ...state,
        dataCart: [...newData, ...newCollection],
      };
    },
  },
};
