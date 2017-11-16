
$(document).ready(function(){
  $('#theForm').on('submit', function(event){
    if(fixing == false){
        event.preventDefault();
        var formData = new FormData();
        formData.append("file", this.file.files[0], this.file.files[0].name);
        formData.append("upload_file", true);
        $.ajax({
          url: 'http://127.0.0.1:5000/verify',
          type: 'POST',
          data: formData,
          async: true,
          contentType: false,
          processData: false,
          timeout: 60000,
          success: function(res){
            $('#warnings').remove();
            res = res.split('warnings.warn(line, VerifyWarning)');
            to_append = ''
            for (var i = 0; i < res.length; i++){
              to_append += res[i].split('VerifyWarning:')[1]
            }
            $('body').append($('<textarea id="warnings"></textarea>').text(to_append).height(500).width(500))
          }

        });
      }

  });
});
