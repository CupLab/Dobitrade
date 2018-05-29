const request = require('sync-request');
const crypto = require('crypto');

module.exports = class CoinbeneHttpMDUtil {

    constructor(apiid, secret) {
        this.apiid = apiid;
        this.secret = secret;
        this.result = null;
    }

    buildMySign(data, secret) {
        var params = JSON.parse(JSON.stringify(data));
        params["secret"] = secret;

        var ordered = {};
        var keysSort = Object.keys(params).sort();
        keysSort.forEach(function (key) {
            ordered[key] = params[key];
        });

        var params_str = "";
        var paramsKeys = Object.keys(ordered)
        paramsKeys.forEach(function(key) {
            params_str += key.toUpperCase() + "=" + ordered[key].toString().toUpperCase() + "&";
        });
        params_str = params_str.substring(0, params_str.length - 1);

        return crypto.createHash('md5').update(params_str).digest('hex'); 
    }

    httpGet(url, resource, params='', callback) {
        var params_str = "";
        var paramsKeys = Object.keys(params)
        paramsKeys.forEach(function(key) {
            params_str += key + "=" + params[key] + "&";
        });

        var url_str = url + resource + "?" + params_str.substring(0, params_str.length - 1);
        // console.log("httpGet: " + url_str);

	var res = request('GET', url_str, {
            headers: {
                "contentType": "application/x-www-form-urlencoded",
            },
        });
	
	if (res.statusCode == 200) {
	    callback(JSON.parse(res.getBody('utf8')));
	} else {
            callback({"status":"error"});
        }
    }

    httpPost(url, resource, params, callback) {
        params["timestamp"] = Date.now();
        params["apiid"] = this.apiid;
        params["sign"] = this.buildMySign(params, this.secret);

        var url_str = url + resource;

        // console.log("httpPost: " + url_str + "\r\n    data:" + JSON.stringify(params) + "\r\n    hash:" + params["sign"]);

	var res = request('POST', url_str, {
            headers: {
                "contentType": "application/json",
            },
            json: params,
        });

	if (res.statusCode == 200) {
	    callback(JSON.parse(res.getBody('utf8')));
	} else {
            callback({"status":"error"});
        }
    }
}
