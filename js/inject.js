// 创建一个heatmap实例对象
// “h337” 是heatmap.js全局对象的名称.可以使用它来创建热点图实例
// 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
function initDom() {
  let dom = document.createElement("div"),
    domParent = document.createElement("div");
  dom.id = "heatmapContainer";
  domParent.id = "heatmapContainerWrapper";
  domParent.appendChild(dom);
  domParent.style.height = document.documentElement.offsetHeight + "px";
  domParent.style.width = document.documentElement.offsetWidth + "px";
  document.getElementById("root").appendChild(domParent);
}

function getDrawData(data) {
  return {
    x: data.pageX,
    y: data.pageY,
    value: 1
  };
}

function drawHeatMap(data) {
  var heatmapInstance = h337.create({
    container: document.getElementById("heatmapContainer")
  });
  //构建一些随机数据点,网页切图价格这里替换成你的业务数据
  //   var points = [];
  //   var max = 0;
  //   var width = document.body.clientWidth;
  //   var height = document.body.clientHeight;
  //   var len = 300;
  //   while (len--) {
  //     var val = Math.floor(Math.random() * 100);
  //     max = Math.max(max, val);
  //     var point = {
  //       x: Math.floor(Math.random() * width),
  //       y: Math.floor(Math.random() * height),
  //       value: val
  //     };
  //     points.push(point);
  //   }
  //   var data = {
  //     max: max,
  //     data: points
  //   };
  //因为data是一组数据,web切图报价所以直接setData
  //   heatmapInstance.setData(data); //数据绑定还可以使用

  for (let i = 0; i < data.length; i++) {
    heatmapInstance.addData(getDrawData(data[i]));
  }
}

//给background发消息
function send_message(data) {
  var param = { type: "message", data: data };
  chrome.runtime.sendMessage(param, function(response) {
    console.log("77777response", response);
    var list = JSON.parse(response).data.list;
    drawHeatMap(list);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(5555, request);
  if (request) {
    initDom();
    send_message({ url: window.location.href });
    // drawHeatMap();
  } else {
    var hiddenDom = document.getElementById("heatmapContainer");
    hiddenDom.parentNode.removeChild(hiddenDom);
    // hiddenDom.className = "hidden";
  }
});
