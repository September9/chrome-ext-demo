const MainPageUrl = "https://bbs.hupu.com/all-gambia";

/* ajax同步请求函数封装 */
function ajax(url, type, data, callback) {
  $.ajax({
    type: type, // post,get
    async: false,
    url: url,
    data: data,
    success: function(response) {
      callback(response);
    }
  });
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle-tags") {
    chrome.tabs.create({ url: MainPageUrl, selected: true });
  }
});

// message listener 来自 injection ======================================================
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('data:' + JSON.stringify(request.data));
  if (request.type == "message") {
    var data = request.data;
    ajax(
      "http://10.26.37.60:7300/mock/5e8319f396ad88674d2af8bf/heatData/:pageId",
      "get",
      data,
      function(res) {
        console.log(88888, res);
        sendResponse(JSON.stringify(res));
      }
    );
  }
  // 等待 sendResponse 把数据返回
  return true;
});
