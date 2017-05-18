var list = document.getElementById('list');
var supportButton = document.getElementById('support');
var convertButton = document.getElementById('convert');

var textToUrls = function(text) {
  return text.match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g);
};

supportButton.addEventListener('click', function(e) {
  e.preventDefault();
  var rawText = list.value;
  chrome.runtime.sendMessage({ urls: textToUrls(rawText) });
});
convertButton.addEventListener('click', function(e) {
  e.preventDefault();
  var rawText = list.value;
  list.value = 'open \\\n' + textToUrls(rawText).join(' \\\n');
});
