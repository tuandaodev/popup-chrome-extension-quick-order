console.log("START PANEL");

function matchCustom(params, data) {
    
//    console.log(params.term);
//    console.log(data);
    
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
      return data;
    }
    
    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined' || !data.text) {
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
};

//$('select').on('change', function () {
//    if ($(this).val() !== "") {
//        $(this).parent().find('.select2-selection--single').css({'background-color' : '#fdff5d'});
//    } else {
//        $(this).parent().find('.select2-selection--single').css({'background-color' : ''});
//    }
//});

//$('#Tinh').on('change', function () {
//    
//    console.log($('#Tinh').val());
//    
//    if ($('#Tinh').val().length !== 0) {
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : '#fdff5d'});
//        $('#Tinh option:not(:selected)').remove();
//        load_huyen();
//    } else {
//        $('#Tinh option').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        $('#Huyen option').remove();
//        $('#Huyen').parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        $('#Xa option').remove();
//        $('#Xa').parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        load_tinh();
//    }
//});

//$('#Huyen').on('change', function () {
//    if ($('#Huyen').val().length !== 0) {
//        $('#Huyen option:not(:selected)').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : '#fdff5d'});
//        load_xa();
//    } else {
//        $('#Huyen option').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        $('#Xa option').remove();
//        $('#Xa').parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        load_huyen();
//    }
//});
//
//$('#Xa').on('change', function () {
//    if ($('#Xa').val().length !== 0) {
//        $('#Xa option:not(:selected)').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : '#fdff5d'});
//    } else {
//        $('#Xa option').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        load_xa();
//    }
//});

var selected_tinh = null;
var selected_huyen = null;
var selected_xa = null;

$('#list_diachi').on('change', function () {
    
    console.log($('#list_diachi').val());
    
    selected_tinh = $('#list_diachi option[class="op-tinh"]:selected').val();
    
    if (selected_tinh) {
        console.log(selected_tinh);
        $('#list_diachi option[class="op-tinh"]:not(:selected)').remove();
        
        selected_huyen = $('#list_diachi option[class="op-huyen"]:selected').val();
        if (selected_huyen) {
            console.log(selected_huyen);
            $('#list_diachi option[class="op-huyen"]:not(:selected)').remove();
            
            selected_xa = $('#list_diachi option[class="op-xa"]:selected').val();
            if (selected_xa) {
                console.log(selected_xa);
                $('#list_diachi option[class="op-xa"]:not(:selected)').remove();
            } else {
                $('#list_diachi option[class="op-xa"]').remove();
                load_xa();
            }
        } else {
            $('#list_diachi option[class="op-huyen"]').remove();
            load_huyen();
            $('#list_diachi option[class="op-xa"]').remove();
        }
        
    } else {
        $('#list_diachi option').remove();
        load_tinh();
        $('#list_diachi').select2("open");
    }
    
    if ($('#list_diachi').val().length !== 0) {
        $(this).parent().find('.select2-selection--multiple').css({'background-color' : '#fdff5d'});
    } else {
        $(this).parent().find('.select2-selection--multiple').css({'background-color' : ''});
    }
    
//    if ($('#Tinh').val().length !== 0) {
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : '#fdff5d'});
//        $('#Tinh option:not(:selected)').remove();
//        load_huyen();
//    } else {
//        $('#Tinh option').remove();
//        $(this).parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        $('#Huyen option').remove();
//        $('#Huyen').parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        $('#Xa option').remove();
//        $('#Xa').parent().find('.select2-selection--multiple').css({'background-color' : ''});
//        load_tinh();
//    }
});


function load_tinh() {
        $.ajax({
            url: 'http://thoitrangs2.com/api/danh-sach-tinh',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $.each(json, function (i, value) {
                    $('#list_diachi').append($('<option class="op-tinh">').text(value).attr('value', i));
                });
                $('#list_diachi').select2({
                    matcher: matchCustom,
                    multiple: true,
                    allowClear: true,
                    placeholder: "Chọn tỉnh/thành phố"
                });
                
                
            }
        });
}

function load_huyen() {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-huyen/' + selected_tinh,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
//            console.log(json);
            $.each(json, function (i, value) {
                $('#list_diachi').append($('<option class="op-huyen">').text(value).attr('value', i));
            });
            
            $('#list_diachi').select2({
                matcher: matchCustom,
                multiple: true,
                allowClear: true,
                placeholder: "Chọn tỉnh/thành phố"
            });
            $('#list_diachi').select2("open");
        }
    });
}

function load_xa() {
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-xa/' + selected_huyen,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
//            console.log(json);
            $.each(json, function (i, value) {
                $('#list_diachi').append($('<option class="op-xa">').text(value).attr('value', i));
            });
            
            $('#list_diachi').select2({
                matcher: matchCustom,
                multiple: true,
                allowClear: true,
                placeholder: "Chọn tỉnh/thành phố"
            });
            $('#list_diachi').select2("open");
        }
    });
}

$('#logout').on('click', function (event) {
    localStorage.removeItem('employee_name');
    localStorage.removeItem('employee_code');
    localStorage.removeItem('employee_token');
    window.close();
});

$('#chitietdonhang').on('click', '.delete-button', function (event) {
    $(this).closest("tr").remove();
    
    var count_product = $("#count_product").val();
    count_product = parseInt(count_product) - 1;
    $("#count_product").val(count_product);
});

//$('#add_product').on('click', function (event) {
$('#id_product').on('change', function (event) {
    
    if ($(this).val() !== "") {
        $(this).parent().find('.select2-selection--single').css({'background-color' : '#fdff5d'});
    } else {
        $(this).parent().find('.select2-selection--single').css({'background-color' : ''});
    }
    
    if ($('#id_product').val() === "") {
        return;
    }
    
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
    var product_quantity_html = '<input class="form-control" type="number" min="1" required name="SoLuong[]" value="' + $("#product_quantity").val() + '">';
    
    var html = '<tr><td>' + count_product + '</td><td>' + product_name + '</td><td class="td-quantity">' + product_quantity_html + '</td><td><button type="button" class="delete-button btn btn-danger btn-xs">X</button></td><input type="hidden" name="MaSP[]" value="' + product_code + '"></tr>';
    $("#chitietdonhang").append(html);
    
});


$("#don_hang").submit(function(e) {

    if ($("#count_product").val() == "0") {
        bootbox.alert({
            message: "Chưa chọn sản phẩm.",
            size: 'small',
            backdrop: true
        });
        e.preventDefault();
        return;
    }

    var form = $(this);
    var url = form.attr('action');
    
    selected_tinh = $('#list_diachi option[class="op-tinh"]:selected').val();
    selected_huyen = $('#list_diachi option[class="op-huyen"]:selected').val();
    selected_xa = $('#list_diachi option[class="op-xa"]:selected').val();
    
    $.ajax({
           type: "POST",
           url: url,
           data: form.serialize() + '&Tinh='+selected_tinh+'&Huyen='+selected_huyen+'&Xa='+selected_xa, // serializes the form's elements.
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
    
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

function load_thongtinnhanvien() {
    // Load thong tin nhan vien
    var employee_name = localStorage.getItem('employee_name');
    $("#ten_nhan_vien").html('NV: ' + employee_name);
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

var employee_code = localStorage.getItem('employee_code');
var employee_token = localStorage.getItem('employee_token');
    
$(document).ready(function () {

    console.log("Load Panel completed");
    
    // Load thong tin da copy
//    var client_name = localStorage.getItem('client_name');
//    var client_phone = localStorage.getItem('client_phone');
//    var client_address = localStorage.getItem('client_address');
//    $("#tenkhachhang").val(client_name);
//    $("#sdt").val(client_phone);
//    $("#diachi").val(client_address);

    load_exists_data();
    load_thongtinnhanvien();
    
    load_tinh();
    
//    // Load list trang ban hang
//    $.ajax({
//        url: 'http://thoitrangs2.com/api/danh-sach-trang-ban-hang',
//        type: 'GET',
//        dataType: 'json',
//        success: function (json) {
//            console.log(json);
//            $.each(json, function (i, value) {
//                $('#TrangBanHang').append($('<option>').text(value).attr('value', i));
//            });
//            
//            $('#TrangBanHang').select2();
//        }
//    });
    
    // Load danh sach san pham
    $.ajax({
        url: 'http://thoitrangs2.com/api/danh-sach-san-pham',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
//            console.log(json);
            $.each(json, function (i, value) {
                $('#id_product').append($('<option>').text(value).attr('value', i));
            });
            
            $('#id_product').select2();
        }
    });
    
    $(document).on('focus', '.select2-selection--single', function(e) {
        select2_open = $(this).parent().parent().siblings('select');
        select2_open.select2('open');
    });
    
    $('input[type="text"]').on('keyup', function(e) {
        if ($(this).val()) {
            $(this).css({'background-color' : '#fdff5d'});
        } else {
            $(this).css({'background-color' : ''});
        }
        
        console.log($(this).attr('id'));
        
//        if ($(this).attr('id') == "sdt") {
//            remove_sdt_alert();
//        }
    });
    
    $.ajax({
            url: 'http://thoitrangs2.com/api/tong-don-hang',
            type: 'POST',
            dataType: 'json',
            data: {
              MaNhanVien:employee_code,
              TokenKey:employee_token
            },
            success: function (json) {
                console.log(json);
                if (json.result == true) {
                   $("#tong_don_hang").html(json.detail);
                } else {
                    $("#tong_don_hang").html("--");
                }
            },
            error: function (json) {
                $("#tong_don_hang").html("--");
            }
    });
    
    check_sdt();
    $('#sdt').on('change', function () {
        check_sdt();
    });
});

function check_sdt() {
    if (!$('#sdt').val()) {
        return;
    }

    $.ajax({
        url: 'http://thoitrangs2.com/api/check-sdt',
        type: 'POST',
        dataType: 'json',
        data: {
          MaNhanVien:employee_code,
          TokenKey:employee_token,
          sdt:$('#sdt').val()
        },
        success: function (json) {
            console.log(json);
            if (json.result == true) {
                if (json.detail != "0") {
                    $("#count-sdt-alert").html(json.detail);
                    sdt_alert();
                } else {
                    remove_sdt_alert();
                }
            } else {
                remove_sdt_alert();
            }
        },
        error: function (json) {
            remove_sdt_alert();
        }
    });
}

function sdt_alert() {
    $("#sdt").css('border-color', '#f00');
    $("#sdt-alert").show();
}

function remove_sdt_alert() {
    $("#sdt").css('border-color', '');
    $("#sdt-alert").hide();
}

function load_exists_data() {
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

      check_sdt();
    }

    if (!client_address) {

    } else {
        $("#diachi").val(client_address);
        $("#diachi").css({'background-color' : '#fdff5d'});
    }

    $("#url").val(client_url);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    if (typeof request.value != 'undefined') {
      localStorage[request.storage] = request.value;
    }
    sendResponse({storage: localStorage[request.storage]});
  } else {
    sendResponse({});
  }
  
    load_exists_data();
  
});
