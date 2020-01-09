function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&').slice(1);
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$('.page-link').toArray().forEach(element => {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var newPage = "page=" + (parseInt(element.getAttribute("data-pagenum")));

    if (window.location.href.indexOf("?") < 0) {
        var link = "?" + newPage;
    } else {
        var parameters = "";
        var list = window.location.href.slice(window.location.href.indexOf('?') + 1).split("&");

        list.forEach(element => {
            if (element.indexOf("page") < 0) {
                parameters += element + "&";
            }
        });

        parameters = parameters.substring(0, parameters.length - 1);

        parameters += "&" + newPage;

        var link = "?" + parameters;
    }
    element.href = link;
});

$('.page-next').toArray().forEach(element => {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var newPage = "page=" + (parseInt(element.getAttribute("data-pagenum") + 1));

    if (window.location.href.indexOf("?") < 0) {
        var link = "?" + newPage;
    } else {
        var parameters = "";
        var list = window.location.href.slice(window.location.href.indexOf('?') + 1).split("&");

        list.forEach(element => {
            if (element.indexOf("page") < 0) {
                parameters += element + "&";
            }
        });

        parameters = parameters.substring(0, parameters.length - 1);

        parameters += "&" + newPage;

        var link = "?" + parameters;
    }
    element.href = link;
});

$('.page-previous').toArray().forEach(element => {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
    var newPage = "page=" + (parseInt(element.getAttribute("data-pagenum") - 1));

    if (window.location.href.indexOf("?") < 0) {
        var link = "?" + newPage;
    } else {
        var parameters = "";
        var list = window.location.href.slice(window.location.href.indexOf('?') + 1).split("&");

        list.forEach(element => {
            if (element.indexOf("page") < 0) {
                parameters += element + "&";
            }
        });

        parameters = parameters.substring(0, parameters.length - 1);

        parameters += "&" + newPage;

        var link = "?" + parameters;
    }
    element.href = link;
});