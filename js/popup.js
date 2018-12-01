console.log("START PANEL");

$( document ).ready(function() {
    
    console.log("Load Panel completed");
    
    var client_name = localStorage.getItem('client_name');
    var client_phone = localStorage.getItem('client_phone');
    var client_address = localStorage.getItem('client_address');
    
    console.log(client_name);
    console.log(client_phone);
    console.log(client_address);
    
    $("#client_name").val(client_name);
    $("#client_phone").val(client_phone);
    $("#client_address").val(client_address);
    
});