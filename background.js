var enabled = false;

var replacements = [{
  x: "Google",
  y: "Something"
}];

var sendAllReplacementsToTab = function (tabId) {
  for (var i = 0; i < replacements.length; i++) {
    sendReplacementToTab(tabId, replacements[i]);
  };
};

var sendReplacementToTab = function (tabId, replacement) {
  chrome.tabs.sendMessage(tabId, {
    type: "replacement",
    x: replacement.x,
    y: replacement.y
  });
};

chrome.browserAction.onClicked.addListener(function () {
  enabled = !enabled;

  chrome.browserAction.setBadgeText({
    text: enabled ? "ON" : ""
  });

  if (enabled) {
    chrome.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        sendAllReplacementsToTab(tabs[i].id);
      };
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (enabled && message.type == "requestReplacements") {
    sendAllReplacementsToTab(sender.tab.id);
  }
});
