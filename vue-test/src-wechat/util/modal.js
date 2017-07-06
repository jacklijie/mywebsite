export default {
    loading(_this, show, text) {
        _this.$store.commit("LOADING_STATE", {
            loadingText: text || "加载中",
            showLoading: show
        });
    },
    valert(_this, text, show) {
        _this.$store.commit("ALERT_STATE", {
            alertText: text,
            showAlert: show || true
        });
    },
    notice() {

    }
}