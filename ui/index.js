function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(12345, chrome.extension.lastError);

    if (callback) {
      callback(tabs.length ? tabs[0].id : null);
    }
    return true;
  });
}

function openHeatMap(flag) {
  getCurrentTabId(function(tabId) {
    console.log(56789, chrome.extension.lastError);
    chrome.tabs.sendMessage(tabId, flag, function(response) {
      console.log(33333, chrome.extension.lastError);
    });
  });
}

document.getElementById("open").addEventListener("click", function() {
  openHeatMap(true);
});

document.getElementById("close").addEventListener("click", function() {
  openHeatMap(false);
});
