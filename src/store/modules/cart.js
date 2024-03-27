export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        // 所有mutations的第一个参数，都是state
        setCart(state, { vendorId, products }) {
            state.cartList = {
                ...state.cartList,
                [vendorId]: {

                    products: products
                }
            }
            console.log(state.cartList)
        },
        deleteItem(state, { vendorId, products }) {
            state.cartList = {
                ...state.cartList,
                [vendorId]: {

                    products: products
                }
            }
            console.log(state.cartList)
        }
    },
    actions: {
        clearCart(context) {
            // Personal information should be reset
            context.commit('setCart', [])

        }
    },
    getters: {}
}