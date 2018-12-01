function reload_save() {
    var employee_name = localStorage.getItem('employee_name');
    var employee_code = localStorage.getItem('employee_code');
    var employee_token = localStorage.getItem('employee_token');
    console.log(employee_name);
    console.log(employee_code);
    console.log(employee_token);
    $("#employee_name").val(employee_name);
    $("#employee_code").val(employee_code);
    $("#employee_token").val(employee_token);
}

$( document ).ready(function() {
    $("#option_save").click(function(e) {
        console.log("SUBMITED.");
        chrome.extension.sendRequest({storage: 'employee_name', value: $("#employee_name").val()});
        chrome.extension.sendRequest({storage: 'employee_code', value: $("#employee_code").val()});
        chrome.extension.sendRequest({storage: 'employee_token', value: $("#employee_token").val()});
        
        $("#notice").show();
    });

    $("#reload_save").click(function(e) {
        reload_save();
    });
    console.log("Load Option Page completed");
    reload_save();
});