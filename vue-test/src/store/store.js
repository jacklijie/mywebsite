import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './type.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        loadingText: '加载中'
    },
    getters: {

    },
    mutations: {
        [types.LOADING_TEXT](state,payload){
            state.loadingText = payload.loadingText;
        }
    }
})