import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './type.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loading: {
            text: '加载中',
            show: false
        },
        valert:{
            text: '',
            show: false
        },
        notice:{
            text: '',
            show: false
        },
        from: "app",
        userInfo: {
            idCard: '411081198212231559'
        }
    },
    getters: {

    },
    mutations: {
        [types.LOADING_STATE](state, payload) {
            if (!!payload.loadingText) state.loading.text = payload.loadingText;
            state.loading.show = payload.showLoading;
        },
        [types.ALERT_STATE](state, payload) {
            state.valert.text = payload.alertText;
            state.valert.show = payload.showAlert;
        },
        [types.NOTICE_STATE](state, payload) {
            state.notice.text = payload.noticeText;
            state.notice.show = payload.showNotice;
        },
        [types.FROM_STATE](state, payload) {
            state.from = payload.from;
        },
        [types.IDCARD_STATE](state, payload) {
            state.userInfo.idCard = payload.idCard;
        }
    }
})

export default store