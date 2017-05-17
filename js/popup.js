var list = document.getElementById('list');
var btn = document.getElementById('submit');

var travelWantedly = function(urls) {
  chrome.windows.create({ }, function(win) {
    var winId = win.id;
    var tabIds = [];
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (!tabIds.includes(tabId)) return;
      if (changeInfo.status && changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, {text: ''}, function(response) {
          setTimeout(function() {
            chrome.tabs.remove(tabId);
          }, 5000);
        });
      }
    });
    urls.forEach(function(url) {
      chrome.tabs.create({ windowId: winId, url: url }, function(tab) {
        tabIds.push(tab.id);
      });
    });
  });
};

btn.addEventListener('click', function(e) {
  e.preventDefault();
  var rawText = list.value;
  var urlList = rawText.match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g);

  travelWantedly(urlList);
});
