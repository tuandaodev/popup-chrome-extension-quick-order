console.log("START PANEL");

$('select').on('change', function () {
    if ($(this).val() !== "") {
        $(this).parent().find('.select2-selection--single').css({'background-color' : '#fdff5d'});
    } else {
        $(this).parent().find('.select2-selection--single').css({'background-color' : ''});
    }
});

$('#Tinh').on('change', function () {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-huyen/' + $("#Tinh").val(),
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            
            $("#Huyen").find('option').not(':first').remove();
            $.each(json, function (i, value) {
                $('#Huyen').append($('<option>').text(value).attr('value', i));
            });
            
            $('#Huyen').select2();
        }
    });
});

$('#Huyen').on('change', function () {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-xa/' + $("#Huyen").val(),
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $("#Xa").find('option').not(':first').remove();
            $.each(json, function (i, value) {
                $('#Xa').append($('<option>').text(value).attr('value', i));
            });
            
            $('#Xa').select2();
        }
    });
});

$('#chitietdonhang').on('click', '.delete-button', function (event) {
    $(this).closest("tr").remove();
    
    var count_product = $("#count_product").val();
    count_product = parseInt(count_product) - 1;
    $("#count_product").val(count_product);
});

$('#add_product').on('click', function (event) {
    
    if (!$("#id_product").val()) {
//        alert("Chưa chọn sản phẩm.");
        bootbox.alert({
            message: "Chưa chọn sản phẩm.",
            size: 'small',
            backdrop: true
        });
        return;
    }
    
    if (!$("#product_quantity").val() || parseInt($("#product_quantity").val()) < 1) {
//        alert("Chưa chọn số lượng.");
        bootbox.alert({
            message: "Chưa chọn số lượng.",
            size: 'small',
            backdrop: true
        });
        return;
    }
    
    var count_product = $("#count_product").val();
    count_product = parseInt(count_product) + 1;
    $("#count_product").val(count_product);
    
    var product_name = $("#id_product option:selected").text();
    var product_code = $("#id_product").val();
    var product_quantity = $("#product_quantity").val();
    
    var html = '<tr><td>' + count_product + '</td><td>' + product_name + '</td><td>' + product_quantity + '</td><td><button type="button" class="delete-button btn btn-danger btn-xs">X</button></td><input type="hidden" name="MaSP[]" value="' + product_code + '"><input type="hidden" name="SoLuong[]" value="' + product_quantity + '"></tr>';
    $("#chitietdonhang").append(html);
    
});


$("#don_hang").submit(function(e) {

    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
           type: "POST",
           url: url,
           data: form.serialize(), // serializes the form's elements.
           success: function(data)
           {
               data = JSON.parse(data);
               console.log(data);
               if (data.result == true) {
//                   alert(data.detail);
                   bootbox.alert({
                        message: data.detail,
                        size: 'small',
                        backdrop: true
                    });
                   console.log(data.detail);
                   $("#don_hang .reset").click();
                } else {
//                   alert(data.detail);
                    bootbox.alert({
                        message: data.detail,
                        size: 'small',
                        backdrop: true
                    });
                   console.log(data.detail);
               }
           },
           error: function (data) {
                console.log(data);
//                alert("Có lỗi xảy ra, vui lòng thử lại.");
                bootbox.alert({
                        message: "Có lỗi xảy ra, vui lòng thử lại.",
                        size: 'small',
                        backdrop: true
                    });
            }
         });

    e.preventDefault();
});

$("#don_hang .reset").on('click', function(e) {
    
//    $("#don_hang").trigger("reset");
    
    localStorage.removeItem('client_name');
    localStorage.removeItem('client_phone');
    localStorage.removeItem('client_address');
    localStorage.removeItem('client_url');
    
    location.reload();
    
//    $("#count_product").val(0);
//    $("#chitietdonhang tr").remove();
    
//    load_thongtinnhanvien();
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

function load_thongtinnhanvien() {
    // Load thong tin nhan vien
    var employee_code = localStorage.getItem('employee_code');
    var employee_token = localStorage.getItem('employee_token');
    $("#MaNhanVien").val(employee_code);
    $("#TokenKey").val(employee_token);
}

function convertVietnamese(str) { 
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str= str.replace(/đ/g,"d"); 
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    str= str.replace(/-+-/g,"-");
    str= str.replace(/^\-+|\-+$/g,""); 

    return str; 
}

$(document).ready(function () {

    console.log("Load Panel completed");
    
    // Load thong tin da copy
    var client_name = localStorage.getItem('client_name');
    var client_phone = localStorage.getItem('client_phone');
    var client_address = localStorage.getItem('client_address');
    $("#tenkhachhang").val(client_name);
    $("#sdt").val(client_phone);
    $("#diachi").val(client_address);
    
    load_thongtinnhanvien();
    
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-tinh',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#Tinh').append($('<option>').text(value).attr('value', i));
            });
            $('#Tinh').select2();
        }
    });

    // Load list trang ban hang
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-trang-ban-hang',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#TrangBanHang').append($('<option>').text(value).attr('value', i));
            });
            
            $('#TrangBanHang').select2();
        }
    });
    
    // Load danh sach san pham
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-san-pham',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#id_product').append($('<option>').text(value).attr('value', i));
            });
            
            $('#id_product').select2();
        }
    });
    
    $.fn.select2.defaults.set('matcher', function(params, data) {
        // If there are no search terms, return all of the data
        if ($.trim(params.term) === '') {
          return data;
        }

        // Do not display the item if there is no 'text' property
        if (typeof data.text === 'undefined') {
          return null;
        }
        
        
        var str = convertVietnamese(data.text);
        
        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join(''); // JSON
        
//        console.log(params.term.toUpperCase());
//        console.log(acronym.toUpperCase());
//        console.log(params.term.toUpperCase().indexOf(acronym.toUpperCase()));
        
        if (params.term.toUpperCase().indexOf(acronym.toUpperCase()) !== -1 || acronym.toUpperCase().indexOf(params.term.toUpperCase()) !== -1) {
            return data;
        }
        
        var words = params.term.toUpperCase().split(" ");
        for (var i = 0; i < words.length; i++) {
          if (data.text.toUpperCase().indexOf(words[i]) < 0) {
            return null;
          }
        }

        return data;
      });

});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.storage] = request.value;
    }
    sendResponse({storage: localStorage[request.storage]});
  } else {
    sendResponse({});
  }
  
    // Load thong tin da copy
  var client_name = localStorage.getItem('client_name');
  var client_phone = localStorage.getItem('client_phone');
  var client_address = localStorage.getItem('client_address');
  var client_url = localStorage.getItem('client_url');
  
  if (!client_name) {
    
  } else {
      $("#tenkhachhang").val(client_name);
      $("#tenkhachhang").css({'background-color' : '#fdff5d'});
  }
  
  if (!client_phone) {
      
  } else {
    $("#sdt").val(client_phone);
    $("#sdt").css({'background-color' : '#fdff5d'});
  }
  
  if (!client_address) {
      
  } else {
      $("#diachi").val(client_address);
      $("#diachi").css({'background-color' : '#fdff5d'});
  }
  
  $("#url").val(client_url);
  
});

$(document).on('focus', '.select2', function (e) {
  if (e.originalEvent) {
    $(this).siblings('select').select2('open');    
  } 
});
