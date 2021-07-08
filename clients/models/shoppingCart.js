export default {
    namespace: 'shoppingcart',
    state: {
        dataModal: '',
        dataCart: []
    },
    effects: {
        *setDataModal({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'saveDataModal',
                    payload: payload || {},
                })
            }
        },
        *setInitialState({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'saveDataInitial',
                    payload: payload || {},
                })
            }
        },
        *setDataCart({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'saveDataCart',
                    payload: payload || {}
                })
            }
        },
        *addCollection({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'saveCollection',
                    payload: payload || {}
                })
            }
        },
        *delItemStore({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: 'delItem',
                    payload: payload || null
                })
            }
        },
        *increaseQty({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: "increase",
                    payload: payload || null
                })
            }
        },
        *reductionQty({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: "reduction",
                    payload: payload || null
                })
            }
        },
        *callChangeQty({ payload }, { put }) {
            if (payload) {
                yield put({
                    type: "changeQty",
                    payload: payload || null
                })
            }
        },
        *cleanCart( { put }) {
        yield    put({
                type: "cleanCart",
            })
        },
    },
    reducers: {
        saveDataInitial(state, action) {
            return {
                ...state,
                dataCart: action.payload
            }
        },
        saveCollection(state, action) {
            const { dataCart } = state
            const dataCollection = action.payload
            const newCollection = dataCollection && dataCollection.length > 0 && dataCollection.filter(item => !(dataCart.map(e => e.id).includes(item.id)))
            const newData = [...dataCart]
            sessionStorage.setItem("dataCart", JSON.stringify([...newData, ...newCollection]))
            return {
                ...state,
                dataCart: [...newData, ...newCollection]
            }
        },
        saveDataModal(state, action) {
            return {
                ...state,
                dataModal: action.payload
            }
        },
        saveDataCart(state, action) {
            const { dataCart } = state
            let newData
            const index = dataCart.findIndex(item => item.id === action.payload.id)
            sessionStorage.setItem("lastProduct", JSON.stringify(action.payload))
            if (index < 0) {
                sessionStorage.setItem("dataCart", JSON.stringify([...state.dataCart, action.payload]))
                newData = [...dataCart]
                newData.push(action.payload)
                return {
                    ...state,
                    dataCart: newData
                }
            }
            if (index >= 0) {
                newData = [...dataCart]
                newData[index].qty+= action.payload.qty
                sessionStorage.setItem("dataCart", JSON.stringify(newData))
                return {
                    ...state,
                    dataCart: newData
                }
            }
            return {
                ...state
            }
        },
        delItem(state, action) {
            const { dataCart } = state
            const newData = [...dataCart].filter((item) => action.payload !== item.id)
            sessionStorage.setItem("dataCart", JSON.stringify(newData))
            return {
                ...state,
                dataCart: newData
            }
        },
        reduction(state, action) {
            const { dataCart } = state

            const index = dataCart.findIndex(item => item.id === action.payload)
            if (index < 0) return state
            const newData = [...dataCart]
            newData[index].qty+=1
            sessionStorage.setItem("dataCart", JSON.stringify(newData))
            return {
                ...state,
                dataCart: newData
            }
        },
        increase(state, action) {
            const { dataCart } = state

            const index = dataCart.findIndex(item => item.id === action.payload)

            if (index < 0) return state
            const newData = [...dataCart]
            if (newData[index].qty <= 1) {
                newData[index].qty = 1
            } else {
                newData[index].qty-=1
            }
            sessionStorage.setItem("dataCart", JSON.stringify(newData))
            return {
                ...state,
                dataCart: newData
            }
        },
        changeQty(state, action) {
            const { dataCart } = state
            const index = dataCart.findIndex(item => item.id === action.payload.id)
            if (index < 0) return state
            const newData = [...dataCart]
            newData[index].qty = action.payload.qty
            sessionStorage.setItem("dataCart", JSON.stringify(newData))
            return {
                ...state,
                dataCart: newData
            }
        },
        cleanCart(state) {
            sessionStorage.setItem("dataCart", JSON.stringify([]));
            return {
                ...state,
                dataCart: []
            }
        }
    }
}