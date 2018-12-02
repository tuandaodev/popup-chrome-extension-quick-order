var w = 830;
var h = 520;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2); 

chrome.windows.create({url: "popup.html", type: "popup", height: h, width: w, left: left});
window.close();
