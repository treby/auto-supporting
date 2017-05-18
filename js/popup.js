var list = document.getElementById('list');
var supportButton = document.getElementById('support');
var convertButton = document.getElementById('convert');

var travelWantedly = function(urls) {
  chrome.windows.create({ active: false }, function(win) {
    var winId = win.id;
    var tabIds = [];
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
    urls.forEach(function(url) {
      chrome.tabs.create({ windowId: winId, url: url }, function(tab) {
        tabIds.push(tab.id);
      });
    });
  });
};

var textToUrls = function(text) {
  return text.match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g);
};

supportButton.addEventListener('click', function(e) {
  e.preventDefault();
  var rawText = list.value;

  travelWantedly(textToUrls(rawText));
});
convertButton.addEventListener('click', function(e) {
  e.preventDefault();
  var rawText = list.value;
  list.value = 'open \\\n' + textToUrls(rawText).join(' \\\n');
});
