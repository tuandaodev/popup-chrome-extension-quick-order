console.log("START PANEL");

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
        alert("Chưa chọn sản phẩm.");
        return;
    }
    
    if (!$("#product_quantity").val() || parseInt($("#product_quantity").val()) < 1) {
        alert("Chưa chọn số lượng.");
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
                   alert(data.detail);
                   console.log(data.detail);
                   
                   if (window.confirm("Đơn hàng đã tạo thành công. Bạn có muốn reset thông tin đơn hàng không?")) { 
                    $("#don_hang .reset").click();
                  }
                   
               } else {
                   alert(data.detail);
                   console.log(data.detail);
               }
           },
           error: function (data) {
                console.log(data);
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$("#don_hang .reset").on('click', function(e) {
    
//    $("#don_hang").trigger("reset");
    
    localStorage.removeItem('client_name');
    localStorage.removeItem('client_phone');
    localStorage.removeItem('client_address');
    
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
  $("#tenkhachhang").val(client_name);
  $("#sdt").val(client_phone);
  $("#diachi").val(client_address);
  
});