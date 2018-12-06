$("#Login").submit(function(e) {

    var form = $(this);
    var url = form.attr('action');
    
    $.ajax({
           type: "POST",
           url: url,
           data: form.serialize(), // serializes the form's elements.
           success: function(response)
           {
               console.log(response);
               try {
                    var data = JSON.parse(response);
                    if (data.TenNhanVien && data.MaNhanVien && data.tokenkey) {
                         localStorage.setItem('employee_name', data.TenNhanVien);
                         localStorage.setItem('employee_code', data.MaNhanVien);
                         localStorage.setItem('employee_token', data.tokenkey);

                         var w = 300;
                         var top_bar = 80;
                         var h = screen.height - top_bar;
                         var left = screen.width - w;
                         var top = (screen.height/2)-(h/2); 

                         chrome.windows.create({url: "popup.html", type: "popup", height: h, width: w, left: left, top: top_bar});
                         window.close();
                    }
                } catch(e) {
                     bootbox.alert({
                         message: response,
                         size: 'small',
                         backdrop: true
                     });
                }
           },
           error: function (data) {
                console.log(data);
                bootbox.alert({
                    message: "Có lỗi xảy ra, vui lòng thử lại.",
                    size: 'small',
                    backdrop: true
                });
            }
         });

    e.preventDefault();
});