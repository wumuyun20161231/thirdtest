/*
 * 前端错误反馈
 * Data: 20171207
 * Author: wuhuafei
 */

;(function () {
  'use strict';
  if (window.errorFeedBack) {
    return window.errorFeedBack
  }
  /*
  *  默认上报的错误信息
  */
  var defaults = {
    msg: '',  // 错误的具体信息
    url: '',  // 错误所在的url
    line: '', // 错误所在的行
    col: '',  // 错误所在的列
    error: '' // 具体的error对象
  };
  /*
  *ajax封装
  */
  function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = options.data;
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          options.fail && options.fail(status);
        }
      }
    }

    if (options.type === "GET") {
      xhr.open("GET", options.url + "?" + params, true);
      xhr.send(null);
    } else if (options.type === "POST") {
      xhr.open("POST", options.url);
      // 设置表单提交时的内容类型
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({text: JSON.stringify(params.text), username: 'test_sweeper'}))
    }
  }

  /*
  *格式化参数
  */
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
  }

  /**
   * 核心方法
   **/
  var errorReportConfig = function (params) {

    //if(!params.url){return}
    window.onerror = function (msg, url, line, col, error) {
      // 采用异步的方式,避免阻塞
      setTimeout(function () {
        // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
        col = col || (window.event && window.event.errorCharacter) || 0;
        defaults.url = url;
        defaults.line = line;
        defaults.col = col;
        if (error && error.stack) {
          // 如果浏览器有堆栈信息，直接使用
          defaults.msg = error.stack.toString();
        }
        params.text = defaults;
        // 把错误信息发送给后台
        ajax({
          url: params.url,      // 请求地址
          type: "POST",         // 请求方式
          data: params,     // 请求参数
          dataType: "json",
          success: function (response, xml) {
            params.successCallBack && params.successCallBack(response, xml);
          },
          fail: function (status) {
            params.failCallBack && params.failCallBack(status);
          }
        });
      }, 0);
      return true;   // 错误不会console浏览器上,如需要，可将这样注释
    };

  };
  window.errorReportConfig = errorReportConfig;
})();

