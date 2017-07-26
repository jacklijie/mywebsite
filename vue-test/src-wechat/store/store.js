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
            idCard: '',
            psncl: 1
        },
        contract: {
            daiban: null,
            historyList: [],
            cloudList:[],
            token:''
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
            // state.userInfo.psncl = payload.psncl;
        },
        [types.CLEAR_DAIBAN_STATE](state, payload) {
            state.contract.daiban = null;
            state.contract.historyList = [];
            state.contract.cloudList = [];
        },
        [types.CONTRACT_STATE](state, payload) {
            if (!!payload.daiban) state.contract.daiban = payload.daiban;
            if (!!payload.historyList) state.contract.historyList = payload.historyList;
            if (!!payload.cloudList) state.contract.cloudList = payload.cloudList;
            if (!!payload.token) state.contract.token = payload.token;
        }
    }
})

export default store