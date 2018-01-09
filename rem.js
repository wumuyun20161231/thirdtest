/*
 *REM为页面基准单位，可以根据移动设备的 宽度自己适应变化，
 *1REM暂时设置为 375px宽度分辨率下的 100像素  即 在375px宽度的分辨率下 1rem = 100px;
 *页面中字体图片元素等的大小宽度均可用rem来操作，
 *example:font-size:16px;即可写为  0.16rem  (16/100)
*/

(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //rem单位设置  (定义的基础像素大小) * (clientWidth / 定义基础像素大小的分辨率尺寸) + 'px';
            docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);