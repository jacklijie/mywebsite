/**
 * Created by Administrator on 2017/2/13.
 */
var getCodeReady = function() {
  //部署到对方服务器后将这里注释打开
  if (!Q_UTILS.IS_DEV) {
    var code = COMMON_UTILS.getUrlParam("code");
    Q_UTILS.CONSTANTS.INIT();
    if (Q_UTILS.CONSTANTS.RD_SESSION == null || Q_UTILS.CONSTANTS.RD_SESSION == 'undefined') {
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify({
        action: 'getrd_session',
        code: code,
        WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
        fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
        shareID: Q_UTILS.CONSTANTS.URL.SHAREID
      }), function(res) {
        // console.log(res.rd_session);
        res = JSON.parse(res);
        // Q_UTILS.CONSTANTS.RD_SESSION = res.rd_session;
        localStorage.setItem('q_rd_session', res.rd_session);
        window.location.reload();
      });
    } else {
      // Q_UTILS.CONSTANTS.RD_SESSION = localRdSession;
      window.location.href = 'index.html';
    }
  } else {
    localStorage.setItem('q_rd_session', 'np3p32s5f7n2zf3bhr8el42p1x1ysa3q');
    localStorage.setItem("_from", "test");
    localStorage.setItem("_shareId", "118");
    localStorage.setItem("WX_flag", "5");
    window.location.href = 'index.html';
  }
};
