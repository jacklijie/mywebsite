import loadingComponent from './loading.vue'

export default {
    install: function (Vue) {
        Vue.component('loading', loadingComponent);
    }
}