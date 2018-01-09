 error-feedBack.js 前端js异常上报Mattermost

使用方法：

1、error-feedBack.js加载到其他的js之前

2、简单的使用方法：（这个执行方法要放在其他代码执行之前,main.js）

errorReportConfig({
  url:'http://www.baidu.com',  //发送到后台的url  *必须
})


3、如果需要新增上报参数，或者要知道发送给后台的回调。可以用下面的方法

errorReportConfig({

  url:'http://www.baidu.com', //发送到后台的url  *必须

  data:{},   //自定义添加上报参数

  successCallBack:function(response, xml){

      // 发送给后台成功的回调，-可省略
  },

  failCallBack:function(error){

      // 发送给后台失败的回调，-可省略
  }
})


