if (window == top) {
    window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
}

//KeyCode: 49 => Num1 ...
function doKeyPress(e){
	if (e.altKey && e.keyCode == 50){ 
		console.log("Alt + 2");
                var current_text = window.getSelection().toString();
                console.log(current_text);
                chrome.extension.sendRequest({storage: 'client_name', value: current_text});
	}
        
        if (e.altKey && e.keyCode == 51){
		console.log("Alt + 3");
                var current_text = window.getSelection().toString();
                console.log(current_text);
                chrome.extension.sendRequest({storage: 'client_phone', value: current_text});
	}
        
        if (e.altKey && e.keyCode == 52){
		console.log("Alt + 4");
                var current_text = window.getSelection().toString();
                console.log(current_text);
                chrome.extension.sendRequest({storage: 'client_address', value: current_text});
	}
}

