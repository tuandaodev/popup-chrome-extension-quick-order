var employee_token = localStorage.getItem('employee_token');
if (employee_token) {
    
    var w = 300;
    var top_bar = 80;
    var h = screen.height - top_bar;
    var left = screen.width - w;
    var top = (screen.height/2)-(h/2); 
    
    w = Math.round(w);
    top_bar = Math.round(top_bar);
    h = Math.round(h);
    left = Math.round(left);
    top = Math.round(top);
    
    chrome.windows.create({url: "popup.html", type: "popup", height: h, width: w, left: left, top: top_bar});
    window.close();
} else {
    
    var w = screen.width*0.4;
    var h = 420;
    var left = (screen.width/2)-(w/2); 
    var top_bar = (screen.height/2)-(h/2); 
    
    w = Math.round(w);
    h = Math.round(h);
    left = Math.round(left);
    top_bar = Math.round(top_bar);
    
    chrome.windows.create({url: "login.html", type: "popup", height: h, width: w, left: left, top: top_bar});
    window.close();
}
