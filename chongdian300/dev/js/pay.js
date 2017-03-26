var payReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var payApp = new Vue({
    el: ".pay-app",
    data: {
      payIndex: -1,
      payment: []
    },
    created: function() {
      Q_UTILS.SHOW_SLOGAN();
      var self = this;
      var payList = localStorage.getItem("Payment");
      if (payList) {
        self.payment = JSON.parse(payList);
        Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
      }
    },
    methods: {
      payClick: function() {
        if (this.payIndex != -1) {
          var req = {
            action: 'FM300creatConsume',
            rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
            WX_flag: 5,
            fromplace: "",
            shareID: "",
            para: this.payment[this.payIndex].substance
          }
          var _form = localStorage.getItem("_form");
          if (_form != null) {
            req.fromplace = _form;
          }
          var self = this;
          $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
            res = JSON.parse(res);
            if (res.result == "OK") {
              localStorage.setItem("payParams", JSON.stringify(res.pay));
              window.location.href = "paying.html";
            }
          })
        }
      }
    }
  })
}
