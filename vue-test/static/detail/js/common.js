var host = location.origin;//"http://10.230.28.200:8080";//
$(document).ready(function (e) {
	var scaleDpi = window.screen.width / 900;
	$(".contract-title .title").css("font-size", 18 / scaleDpi + "px");
	$("body,html,button").css("font-size", 12 / scaleDpi + "px");
	$(".sign").width(30 / scaleDpi + "px").height(30 / scaleDpi + "px").css("padding", 15 / scaleDpi + "px");

	if (navigator.userAgent.indexOf('iPhone') == -1) {
		$("#header,#footer,.sign,.down").addClass("android-style");
	}


	setTimeout(function () {
		// alert(window.innerHeight);
		$(".contract-bd").height($("body").height() - 220 + "px");
	}, 300);


	// $(".sign").hide();
	$(".down").hide();
	$("#loading").hide();

	//初始化
	var params = getUrlObj();
	if (params.type == "do") {
		var contractInfoList = JSON.parse(sessionStorage.getItem("daiban")).cloudList;
		showFoot(contractInfoList);
		var signTip = "";
		contractInfoList.forEach(function (cli) {
			signTip += cli.contractName + "、";
		});
		signTip = signTip.substring(0, signTip.length - 1);
		$("#signTip").text(signTip);
		if (!!params.isSign) {
			var jsonPost = {
				"request": { "contractId": params.contractid }
			};
			$("#loading").show();
			$.ajax({
				type: "POST",
				url: host + "/nhr/elcontract/querySign.action",
				data: JSON.stringify(jsonPost),
				dataType: "json",
				contentType: "application/json;charset=UTF-8"
			}).success(function (res) {
				$("#loading").hide();
				if (res && res.response && res.response.result) {
					if (res.response.result == "0") {
						$(".sign").hide();
						// $(".down").show();
						YHT.init("AppID", function (obj) {
							YHT.setToken(res.response.token);//重新设置token
							YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
						});
						previewContract(contractInfoList[0].cloudcontractId, res.response.token);
					} else {
						// if (!!params.isSign) {
						$("#alertText").html(res.response.reason);
						$("#modal").show();
						// }
						initToken(contractInfoList[0].cloudcontractId);
						console.info("===debug", res.response.reason);
					}
				} else {
					$(".sign").hide();
					$("#alertText").html(res.message);
					$("#modal").show();
					console.info("===debug", res.message);
				}
			}).error(function (err) {
				$(".sign").hide();
				$("#loading").hide();
				$("#alertText").html("服务异常，请联系系统管理员");
				$("#modal").show();
			})
		} else {
			initToken(contractInfoList[0].cloudcontractId);
		}
	} else {
		$(".sign").hide();
		// $(".down").show();
		var jsonPost = {
			"request": { "contractId": params.contractid }
		};
		$("#loading").show();
		$.ajax({
			type: "POST",
			url: host + "/nhr/elcontract/queryToken.action",
			data: JSON.stringify(jsonPost),
			dataType: "json",
			contentType: "application/json;charset=UTF-8"
		}).success(function (res) {
			$("#loading").hide();
			if (res.response) {
				var contractInfoList = res.response.cloudList, signTip = "";
				showFoot(contractInfoList);
				contractInfoList.forEach(function (cli) {
					signTip += cli.contractName + "、";
				});
				signTip = signTip.substring(0, signTip.length - 1);
				$("#signTip").text(signTip);

				YHT.init("AppID", function (obj) {
					YHT.setToken(res.response.cloudList[0].token);//重新设置token
					YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
				});
				previewContract(contractInfoList[0].cloudcontractId, res.response.cloudList[0].token);
			} else {
				$("#alertText").html(res.message);
				$("#modal").show();
			}
		}).error(function (err) {
			$("#loading").hide();
			$("#alertText").html("服务异常，请联系系统管理员");
			$("#modal").show();
		})
	}


	var width = window.innerWidth;
	var $targetObj = $('body');

	touch.on($targetObj, 'pinch', function (e) {
		e.stopPropagation();
		e.cancelBubble = true;
		e.preventDefault();
		console.log("pinch" + window.innerWidth);
	});

	touch.on($targetObj, 'pinchend', function (e) {
		e.stopPropagation();
		e.cancelBubble = true;
		e.preventDefault();
		if (window.innerWidth >= (width - 50)) {
			console.log('显示')
			$('#header').removeClass('contract-hd-hidden').addClass('contract-hidding');
			$('#footer').removeClass('contract-ft-hidden').addClass('contract-hidding');
		} else {
			console.log('隐藏')
			$('#header').removeClass('contract-hidding').addClass('contract-hd-hidden');
			$('#footer').removeClass('contract-hidding').addClass('contract-ft-hidden');

		}

	});

	window.onresize = function () {
		console.log("onresize:" + window.innerWidth);
		if (window.innerWidth >= 900) {
			$('#header').removeClass('contract-hd-hidden').addClass('contract-hidding');
			$('#footer').removeClass('contract-ft-hidden').addClass('contract-hidding');
		} else {
			$('#header').removeClass('contract-hidding').addClass('contract-hd-hidden');
			$('#footer').removeClass('contract-ft-hidden').addClass('contract-hidding');
		}
	};
});
function backToList() {
	// var backUrl = "../../index.html" + sessionStorage.getItem("urlStr") + "#/contract/list";
	var backUrl = "toQrCode.action" + sessionStorage.getItem("urlStr") + "#/contract/list";
	var params = getUrlObj();
	if (params.isSign) {
		backUrl += "?isSign=1";
		sessionStorage.removeItem("daiban");
		sessionStorage.removeItem("historyList");
	}
	location.href = backUrl;
}
function download() {
	var downloadUrl = "https://sdk.yunhetong.com/sdk/contract/download?token=" + sessionStorage.getItem("currentToken") + "&contractId=" + sessionStorage.getItem("currentContractId");
	console.log(downloadUrl);
	window.open(downloadUrl, "_blank");
}
function goToSignPage() {
	var params = getUrlObj();
	var jsonPost = {
		"request": { "contractId": params.contractid }
	};
	$("#loading").show();
	var contractInfoList = JSON.parse(sessionStorage.getItem("daiban")).cloudList;
	$.ajax({
		type: "POST",
		url: host + "/nhr/elcontract/querySign.action",
		data: JSON.stringify(jsonPost),
		dataType: "json",
		contentType: "application/json;charset=UTF-8"
	}).success(function (res) {
		$("#loading").hide();
		$('#modal-panel').hide();
		if (res && res.response && res.response.result) {
			if (res.response.result == "0") {
				$(".sign").hide();
				// $(".down").show();
				initToken(contractInfoList[0].cloudcontractId);
			} else if (res.response.result == "1") {
				// location.href = "../../index.html#/contract/sign?type=" + params.type + "&id=" + params.contractid + "&token=" + res.response.token;
				location.href = "toQrCode.action#/contract/sign?type=" + params.type + "&id=" + params.contractid + "&token=" + res.response.token;
			} else {
				$("#alertText").html(res.response.reason);
				$("#modal").show();
				initToken(contractInfoList[0].cloudcontractId);
			}
		} else {
			$("#alertText").html(res.message);
			$("#modal").show();
		}
	}).error(function (err) {
		$("#loading").hide();
		$('#modal-panel').hide();
		$("#alertText").html("服务异常，请联系系统管理员");
		$("#modal").show();
	})
}

function showFoot(contractList) {
	var showStr = "";
	contractList.forEach(function (cli, i) {
		showStr += '<span onclick="initToken(' + cli.cloudcontractId + ',' + (i + 1) + ')">' + cli.contractName + '</span>';
	}, this);
	$(".foot-table").html(showStr);
	$(".foot-table span:first-of-type").addClass("active");
}
function initToken(contractId,index) {
	if (index) {
		$(".foot-table span:nth-of-type(" + index + ")").addClass("active").siblings("span").removeClass("active");
	}
	var params = getUrlObj();
	var jsonPost = {
		"request": { "contractId": params.contractid }
	};
	$("#loading").show();
	$.ajax({
		type: "POST",
		url: host + "/nhr/elcontract/queryToken.action",
		data: JSON.stringify(jsonPost),
		dataType: "json",
		contentType: "application/json;charset=UTF-8"
	}).success(function (res) {
		$("#loading").hide();
		if (res && res.response) {
			YHT.init("AppID", function (obj) {
				YHT.setToken(res.response.cloudList[0].token);//res.response.token);//重新设置token
				YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
			});
			previewContract(contractId, res.response.cloudList[0].token);
		} else {
			$("#alertText").html(res.message);
			$("#modal").show();
		}
	}).error(function (err) {
		$("#loading").hide();
		$("#alertText").html("服务异常，请联系系统管理员");
		$("#modal").show();
	})
}
function previewContract(contractId, token) {
	var backUrl = '', noticeParams = '';
	sessionStorage.setItem("currentContractId", contractId);
	sessionStorage.setItem("currentToken", token);
	YHT.queryContract(
		function successFun(url) {
			$("#frame").attr("src", url);
			YHT.setToken("");//res.response.token);//重新设置token
		},
		function failFun(data) {
			$("#alertText").html(data);
			$("#modal").show();
			// alert(data);
		},
		contractId,
		backUrl,
		noticeParams
	);
}

function getUrlObj() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
		}
	}
	return theRequest;
}