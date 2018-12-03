if (window == top) {
    window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
}

//KeyCode: 49 => Num1 ...
function doKeyPress(e){
	if (e.shiftKey && e.keyCode == 50){ 
		console.log("Shift + 2: Get họ tên");
                var current_text = window.getSelection().toString();
                if (!current_text || current_text == "") {
                    console.log("Get clipboard");
                    navigator.clipboard.readText()
                        .then(text => {
                          console.log('Pasted content: ', text);
                            current_text = text;
                            chrome.extension.sendRequest({storage: 'client_name', value: current_text});
                        })
                        .catch(err => {
                          console.log('Failed to read clipboard contents: ', err);
                        });
                } else {
                    console.log(current_text);
                    chrome.extension.sendRequest({storage: 'client_name', value: current_text});
                }
                chrome.extension.sendRequest({storage: 'client_url', value: window.location.href});
	}
        
        if (e.shiftKey && e.keyCode == 51){
		console.log("Shift + 3: Get điện thoại");
                var current_text = window.getSelection().toString();
                if (!current_text || current_text == "") {
                    console.log("Get clipboard");
                    navigator.clipboard.readText()
                        .then(text => {
                          console.log('Pasted content: ', text);
                            current_text = text;
                            chrome.extension.sendRequest({storage: 'client_phone', value: current_text});
                        })
                        .catch(err => {
                          console.log('Failed to read clipboard contents: ', err);
                        });
                } else {
                    console.log(current_text);
                    chrome.extension.sendRequest({storage: 'client_phone', value: current_text});
                }
                chrome.extension.sendRequest({storage: 'client_url', value: window.location.href});
	}
        
        if (e.shiftKey && e.keyCode == 52){
            console.log("Shift + 4: Get địa chỉ");
            var current_text = window.getSelection().toString();

            if (!current_text || current_text == "") {
                console.log("Get clipboard");
                navigator.clipboard.readText()
                    .then(text => {
                      console.log('Pasted content: ', text);
                        current_text = text;
                        chrome.extension.sendRequest({storage: 'client_address', value: current_text});
                    })
                    .catch(err => {
                      console.log('Failed to read clipboard contents: ', err);
                    });
            } else {
                console.log(current_text);
                chrome.extension.sendRequest({storage: 'client_address', value: current_text});
            }
            chrome.extension.sendRequest({storage: 'client_url', value: window.location.href});
	}
}
