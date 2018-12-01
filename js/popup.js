console.log("START PANEL");

$('#Tinh').on('change', function () {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-huyen/' + $("#Tinh").val(),
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            
            $("#Huyen").find('option').not(':first').remove();
            $.each(json, function (i, value) {
                $('#Huyen').append($('<option>').text(value).attr('value', i));
            });
        }
    });
});

$('#Huyen').on('change', function () {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-xa/' + $("#Huyen").val(),
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $("#Xa").find('option').not(':first').remove();
            $.each(json, function (i, value) {
                $('#Xa').append($('<option>').text(value).attr('value', i));
            });
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
               console.log(data);
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$(document).ready(function () {

    console.log("Load Panel completed");
    
    // Load thong tin da copy
    var client_name = localStorage.getItem('client_name');
    var client_phone = localStorage.getItem('client_phone');
    var client_address = localStorage.getItem('client_address');
    $("#tenkhachhang").val(client_name);
    $("#sdt").val(client_phone);
    $("#diachi").val(client_address);
    
    // Load thong tin nhan vien
    var employee_code = localStorage.getItem('employee_code');
    var employee_token = localStorage.getItem('employee_token');
    $("#MaNhanVien").val(employee_code);
    $("#TokenKey").val(employee_token);
    
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-tinh',
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#Tinh').append($('<option>').text(value).attr('value', i));
            });
        }
    });

    // Load list trang ban hang
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-trang-ban-hang',
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#TrangBanHang').append($('<option>').text(value).attr('value', i));
            });
        }
    });
    
    // Load danh sach san pham
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-san-pham',
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            $.each(json, function (i, value) {
                $('#id_product').append($('<option>').text(value).attr('value', i));
            });
        }
    });

});