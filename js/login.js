var clienteId = '1114ae2f38da397e9f2c';
var clienteSecret = 'ac5ee7582b395d38696186ba30919621af253a80';
var boton = $('.gitlog');

boton.click(function(){
    window.open('https://github.com/login/oauth/authorize?client_id='+clienteId+'&scopes=user&state=unguessable-string');
});

function error(){
    console.log("Mal");
}
// Extract the auth code from the original URL

function getAuthCode(url){
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
        throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
}


$.ajax({
    url: 'https://github.com/login/oauth/authorize?client_id='+clienteId+'&scopes=scopes',
    type: 'GET',
    dataType: 'jsonp',
    success: function (mj){
        console.log(mj);
    },
    error: error()
});

function llamoToken(){
    var authCode = getAuthCode(window.location.href);

    $.ajax({
        url: 'https://github.com/login/oauth/access_token?client_id='+clienteId+'&client_secret='+clienteSecret+'&code='+authCode,
        type: 'POST',
        dataType: 'application/json',
        success: function (myJson){
            console.log(myJson);
        },
        error: error()
    });
}