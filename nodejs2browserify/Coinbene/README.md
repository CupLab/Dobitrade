# Coinbene 

目前网络上没有找到针对[Coinbene](http://www.coinbene.com)交易所的Javascript API，所以实现了其HTTP相关的认证，参考信息如下：  
[0.0.0 Coinbene API文档](https://github.com/Coinbene/API-Documents-CHN/wiki/0.0.0-Coinbene-API%E6%96%87%E6%A1%A3)

Support Browser Javascript and Node.js

## Download 

* Browser Javascript: [Coinbene.browser.js](Coinbene.browser.js)
* Node.js:
  * [Coinbene.js](Coinbene.js)
  * [CoinbeneSpotAPI.js](CoinbeneSpotAPI.js)
  * [CoinbeneHttpMDUtil.js](CoinbeneHttpMDUtil.js)


#### Javascript

```Javascript
$(function(){
    coinbene = new Coinbene("put your apiid key", "put your secret key");
    coinbene.ticker("ziberusdt");
    coinbene.orderbook("ziberusdt");
    coinbene.trades("ziberusdt");
    coinbene.balance();
    coinbene.place("ziberusdt", "sell-limit", 10000.00, 1.000);
    coinbene.ordersinfo("ziberusdt");
    coinbene.info("S180418185128711694601");
    coinbene.cancel("S180418185128711694601");
});
```

### Javascript API说明

* `new Coinbene("put your apiid key", "put your secret key")`: [Coinbene](http://www.coinbene.com)账户的`apiid key`和`secret key`；
* `Coinbene.ticker(symbol)`: 获取币币最新交易价；
  * `symbol`: 币币交易类型；
* `Coinbene.orderbook(symbol, depth = 5)`: 获取当前系统挂单；
  * `symbol`: 币币交易类型；
  * `depth`: 市场深度，默认值是买卖方各5个；
* `Coinbene.trades(symbol)`：获取成交记录；
  * `symbol`: 币币交易类型；
* `Coinbene.balance()`：查询账户余额；
* `Coinbene.place(symbol, tradeType, price="", quantity="")`：进行币币交易的买入、卖出；
  * `symbol`: 币币交易类型；
  * `tradetype`: 币币买卖类型；
    * `buy-limit`: 买入；
    * `sell-limit`: 卖出；
  * `price`: 币币交易价格；
  * `quantity`: 币币交易数量；
* `Coinbene.ordersinfo(symbol)`：查询当前所有的委托单；
  * `symbol`: 币币交易类型；
* `Coinbene.info(orderId)`：查询指定的委托单信息；
  * `orderId`: 委托单的订单`id`；
* `Coinbene.cancel(orderId)`：撤销指定的委托单；
  * `orderId`: 委托单的订单`id`；
