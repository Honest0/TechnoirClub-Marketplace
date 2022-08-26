



/* HELPER FUNTIONS  */

function open_window(url) {
    window.open(url, '_blank')
}

function go_to(url) {
    window.location.href = url;
}

//Get the variables from the url. 
function get_variables() {
    var $_GET = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
      $_GET[name] = value;                
    });
    return $_GET;
  }

function alert_msg(content, type) {
    var str = '';
    str += '<div class="alert alert-' + type + ' fit-content mt-3" role="alert">' + content + '<button type="button" class="close ml-2" data-dismiss="alert" aria-label="Close"> <i class="far fa-times-circle"></i> </button></div>';    
    $('#message').html(str)    
}

function log(data){
    return console.log(data)
 } 

function disable_alert() {
    setTimeout(function () {
        $('.alert').fadeOut();
    }, 3000);
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

function empty(str) {
    return (!str || 0 === str.length);
}

