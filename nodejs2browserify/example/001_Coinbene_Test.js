const Coinbene = require('../Coinbene/Coinbene');

coinbene = new Coinbene("Your apiid", "Your secret");

console.log(coinbene.ticker('ziberusdt'))
console.log(coinbene.orderbook('ziberusdt'))
console.log(coinbene.trades('ziberusdt'))
console.log(coinbene.balance())
console.log(coinbene.place("ziberusdt", "sell-limit", "1.00000000", "2.0000"))
console.log(coinbene.ordersinfo("ziberusdt"))
