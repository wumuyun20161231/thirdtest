 error-feedBack.js ǰ��js�쳣�ϱ�Mattermost

ʹ�÷�����

1��error-feedBack.js���ص�������js֮ǰ

2���򵥵�ʹ�÷����������ִ�з���Ҫ������������ִ��֮ǰ,main.js��

errorReportConfig({
  url:'http://www.baidu.com',  //���͵���̨��url  *����
})


3�������Ҫ�����ϱ�����������Ҫ֪�����͸���̨�Ļص�������������ķ���

errorReportConfig({

  url:'http://www.baidu.com', //���͵���̨��url  *����

  data:{},   //�Զ�������ϱ�����

  successCallBack:function(response, xml){

      // ���͸���̨�ɹ��Ļص���-��ʡ��
  },

  failCallBack:function(error){

      // ���͸���̨ʧ�ܵĻص���-��ʡ��
  }
})


