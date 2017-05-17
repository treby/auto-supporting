(function() {
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    $('.project-support-link').click();
    $('.sns-checkbox-wrapper .sns-checkbox input[type=checkbox]').checked = false;
    setTimeout(function() {
      $('#support-with-comment-form button[type=submit]').click();
      sendResponse( {title: 'ok'} );
    }, 3000);
  });
})();
