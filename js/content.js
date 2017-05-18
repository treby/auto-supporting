(function() {
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    $('.project-support-link').click();
    setTimeout(function() {
      $('.sns-checkbox-wrapper .sns-checkbox input[type=checkbox]').toArray().forEach(function(cb) { cb.checked = false });
      setTimeout(function() {
        $('#support-with-comment-form button[type=submit]').click();
        sendResponse( {title: 'ok'} );
      }, 800);
    }, 2000);
  });
})();
