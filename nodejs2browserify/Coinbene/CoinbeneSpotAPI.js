const CoinbeneHttpMDUtil = require('./CoinbeneHttpMDUtil');

module.exports = class CoinbeneSpotAPI {

    constructor(url, apiid, secret) {
        this.url = url;
        this.apiid = apiid;
        this.secret = secret;
        this.httpMDUtil = new CoinbeneHttpMDUtil(apiid, secret);
    }

    // 获取Coinbene现货行情信息
    ticker(symbol = "", callback) {
        var TICKER_RESOURCE = "/v1/market/ticker";
        var params={};

        if (symbol != "") {
            params["symbol"] = symbol;
        } else {
            params["symbol"] = "all";
        }

        return this.httpMDUtil.httpGet(this.url, TICKER_RESOURCE, params, callback);
    }

    // 获取Coinbene现货市场深度信息
    orderbook(symbol = "", depth = 5, callback) {
        var DEPTH_RESOURCE = "/v1/market/orderbook";
        var params = {};

        if (symbol != "") {
            params["symbol"] = symbol;
            params["depth"] = depth;

            return this.httpMDUtil.httpGet(this.url, DEPTH_RESOURCE, params, callback);
        }
    }

    // 获取Coinbene现货历史交易信息
    trades(symbol = "", callback) {
        var TRADES_RESOURCE = "/v1/market/trades";
        var params = {};

        if (symbol != "") {
            params["symbol"] = symbol;

            return this.httpMDUtil.httpGet(this.url, TRADES_RESOURCE, params, callback);
        }
    }

    // 获取用户现货账户信息
    balance(callback) {
        var USERINFO_RESOURCE = "/v1/trade/balance";
        var params ={};

        params["account"] = "exchange";

        return this.httpMDUtil.httpPost(this.url, USERINFO_RESOURCE, params, callback);
    }

    // 现货交易
    place(symbol, tradeType, price="", quantity="", callback) {
        var TRADE_RESOURCE = "/v1/trade/order/place";
        var params = {
            "symbol":symbol,
            "type":tradeType
        };

        if (price != "") {
            params["price"] = price;
        }

        if (quantity != "") {
            params["quantity"] = quantity;
        }

        return this.httpMDUtil.httpPost(this.url, TRADE_RESOURCE, params, callback);
    }

    // 现货取消订单
    cancel(orderId, callback) {
        var CANCEL_ORDER_RESOURCE = "/v1/trade/order/cancel";
        var params = {
             'orderid':orderId
        };

        return this.httpMDUtil.httpPost(this.url, CANCEL_ORDER_RESOURCE, params, callback);
    }

    // 现货订单信息查询
    info(orderId, callback) {
        var ORDER_INFO_RESOURCE = "/v1/trade/order/info";
        var params = {
            'orderid':orderId
        };

        return this.httpMDUtil.httpPost(this.url, ORDER_INFO_RESOURCE, params, callback);
    }

    // 现货批量订单信息查询
    ordersinfo(symbol, callback) {
        var ORDERS_INFO_RESOURCE = "/v1/trade/order/open-orders";
        var params = {
            "symbol":symbol
        };

        return this.httpMDUtil.httpPost(this.url, ORDERS_INFO_RESOURCE, params, callback);
    }
}
