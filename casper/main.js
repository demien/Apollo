var ip_server = '127.0.0.1:8585';

//includes web server modules
var server = require('webserver').create();

//start web server
var service = server.listen(ip_server, function(request, response) {

    var url = getParameterByName('url', request.url);
    console.log(url);
    url = 'http://' + url;
    console.log(url);
    var casper = require('casper').create();

    casper.start(url, function() {
    });

    casper.then(function() {
    });

    casper.run(function() {
        response.statusCode = 200;
        response.write(this.getHTML());
        response.close();
    });

});
console.log('Server running at http://' + ip_server+'/');

function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
