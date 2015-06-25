var enabled = false;

chrome.browserAction.onClicked.addListener(function () {
  enabled = !enabled;

  chrome.browserAction.setBadgeText({
    text: enabled ? "ON" : ""
  });
});
