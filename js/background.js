chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  const urls = msg.urls;
  chrome.windows.create({ focused: false }, function(win) {
    var winId = win.id;
    var tabIds = [];
    /*
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (!tabIds.includes(tabId)) return;
      if (changeInfo.status && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {text: ''}, function(response) {
          setTimeout(function() {
            chrome.tabs.remove(tabId);
          }, 8000);
        });
      }
    });
    */
    urls.forEach(function(url) {
      chrome.tabs.create({ windowId: winId, url: url }, function(tab) {
        tabIds.push(tab.id);
      });
    });
  });
});
