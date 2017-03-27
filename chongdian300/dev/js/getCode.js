/**
 * Created by Administrator on 2017/2/13.
 */
var getCodeReady = function() {
  //部署到对方服务器后将这里注释打开
  if (!Q_UTILS.IS_DEV) {
    var code = COMMON_UTILS.getUrlParam("code");
    var localRdSession = localStorage.getItem("q_rd_session");
    if (localRdSession == null || localRdSession == 'undefined') {
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify({
        action: 'getrd_session',
        code: code,
        WX_flag: 5
      }), function(res) {
        console.log(res.rd_session);
        res = JSON.parse(res);
        Q_UTILS.CONSTANTS.RD_SESSION = res.rd_session;
        localStorage.setItem('q_rd_session', res.rd_session);
        window.location.reload();
      });
    } else {
      Q_UTILS.CONSTANTS.RD_SESSION = localRdSession;
      window.location.href = 'index.html';
    }
  } else {
    // localStorage.setItem('q_rd_session', 'np3p32s5f7n2zf3bhr8el42p1x1ysa3q');
    // Q_UTILS.CONSTANTS.RD_SESSION = 'np3p32s5f7n2zf3bhr8el42p1x1ysa3q';
    window.location.href = 'index.html';
  }
};
