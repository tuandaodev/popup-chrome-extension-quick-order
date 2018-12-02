console.log('TEST BACK');

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
});

