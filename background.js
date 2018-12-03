console.log('TEST BACK');

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if(command === "AHoTen"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, { action: "HoTen" });
        });
    }
    
    if(command === "BDienThoai"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, { action: "DienThoai" });
        });
    }
    
    if(command === "CDiaChi"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs[0].id);
            chrome.tabs.sendMessage(tabs[0].id, { action: "DiaChi" });
        });
    }
});
