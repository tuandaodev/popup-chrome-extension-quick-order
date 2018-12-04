var w = 300;
var top_bar = 80;
var h = screen.height - top_bar;
var left = screen.width - w;
var top = (screen.height/2)-(h/2); 

chrome.windows.create({url: "popup.html", type: "popup", height: h, width: w, left: left, top: top_bar});
window.close();
