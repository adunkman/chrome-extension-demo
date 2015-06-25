var replaceText = function (x, y, node) {
  var child, next;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // DocumentFragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        replaceText(x, y, child);
        child = next;
      }
      break;
    case 3: // Text
      var v = node.nodeValue;

      v = v.replace(new RegExp(x, "g"), y);

      node.nodeValue = v;
      break;
  }
};

chrome.runtime.onMessage.addListener(function (message) {
  if (message.type == "replacement") {
    replaceText(message.x, message.y, document.body);
  }
});

chrome.runtime.sendMessage({ type: "requestReplacements" });
