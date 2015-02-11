//via http://qiita.com/suin/items/5e1aa942e654bce442f7
var injectScript;

injectScript = function(file, node) {
  var s, th;
  th = document.getElementsByTagName(node)[0];
  s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  return th.appendChild(s);
};

injectScript(chrome.extension.getURL('/embeded-script.js'), 'body');