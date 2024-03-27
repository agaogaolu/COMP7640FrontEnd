import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import cart from './modules/cart';
Vue.use(Vuex);

// Create a new store instance
const store = new Vuex.Store({
    state() {
        return {

        }
    },
    mutations: {
    },
    actions: {},
    getters: {
        userInfo(state) {
            return state.user.userInfo
        },
        cartList(state){
            return state.cart.cartList
        }

    },
    modules: {
        user, cart
    }
})
export default store
