module.exports = {
  api_settings: [
    {
      // Биржа blockchain.info
      api_path: '/ru/ticker?cors=true',
      host: 'https://blockchain.info',
      service_name: 'blockchain.info',
      // Сериализатор приводит ответ биржи к общему виду:
      // key: Наименование валютной пары в upcase, например 'BTC_USD'
      // sell: Числовое значение - текущий курс продажи биржей инструмента, например 4700.00 (USD за 1 BTC)
      // buy: Числовое значение - текущи курс покупки биржей инструмента, например 4700.00 (USD за 1 BTC)
      serializer: (server_response) => {
        const result = []
        Object.keys(server_response).forEach((key) => {
          // Прямая пара, например BTC_USD
          result.push({
            buy: server_response[key].buy,
            key: `BTC${key.toUpperCase()}`,
            sell: server_response[key].sell
          })
          // Обратная пара, например USD_BTC
          result.push({
            buy: 1 / server_response[key].buy,
            key: `${key.toUpperCase()}BTC`,
            sell: 1 / server_response[key].sell,
          })
        })
        return result
      },
      type_name: 'BLOCKCHAIN_INFO',
    },
    {
      // Биржа exmo.me
      api_path: '/v1/ticker',
      host: 'https://api.exmo.com',
      service_name: 'exmo.me',
      serializer: (server_response) => {
        const result = []
        Object.keys(server_response).forEach((key) => {
          result.push({
            buy: parseFloat(server_response[key].buy_price),
            key: key.replace('_', ''),
            sell: parseFloat(server_response[key].sell_price),
          })
          result.push({
            buy: parseFloat(1 / server_response[key].buy_price),
            key: key.split('_').reverse().join(''),
            sell: parseFloat(1 / server_response[key].sell_price),
          })
        })
        return result
      },
      type_name: 'EXMO_ME',
    },
    {
      // Биржа bitflip.cc
      api_path: '/method/market.getRates',
      host: 'https://api.bitflip.cc',
      service_name: 'bitflip.cc',
      serializer: (server_response) => {
        const result = []
        server_response.filter((x) => x)[0].forEach((pair_hash) => {
          result.push({
            buy: parseFloat(pair_hash.buy),
            key: pair_hash.pair.replace(':', ''),
            sell: parseFloat(pair_hash.sell),
          })
          result.push({
            buy: parseFloat(1 / pair_hash.buy),
            key: pair_hash.pair.split(':').reverse().join(''),
            sell: parseFloat(1 / pair_hash.sell),
          })
        })
        return result
      },
      type_name: 'BITFLIP_CC',
    },
    {
      // Биржа poloniex.com
      api_path: '/public?command=returnTicker',
      host: 'https://poloniex.com',
      service_name: 'poloniex.com',
      serializer: (server_response) => {
        const result = []
        Object.keys(server_response).forEach((key) => {
          const reverse_key = key.split('_').reverse().join('')
          result.push({
            buy: parseFloat(1 / server_response[key].highestBid),
            key: key.replace('_', ''),
            sell: parseFloat(1 / server_response[key].lowestAsk),
          })
          result.push({
            buy: parseFloat(server_response[key].highestBid),
            key: reverse_key,
            sell: parseFloat(server_response[key].lowestAsk),
          })
        })
        return result
      },
      type_name: 'POLONIEX_COM'
    },
//    {
//      // Биржа bittrex.com - не поддерживает CORS
//      api_path: '/api/v1.1/public/getmarketsummaries?cors=true',
//      host: 'https://bittrex.com',
//      service_name: 'bittrex.com',
//      serializer: (server_response) => {
//        return server_response.result.map((item) => {
//          return {
//            key: item.MarketName.replace('-', '').replace('USDT', 'USD'),
//            buy: item.Ask,
//            sell: item.Bid,
//          }
//        })
//      },
//      type_name: 'BITTREX_COM',
//    },
//    {
//      // Биржа hitbtc.com - не поддерживает CORS
//      api_path: '/api/1/public/ticker',
//      host: 'http://api.hitbtc.com',
//      service_name: 'hitbtc.com',
//      serializer: (server_response) => {
//        return Object.keys(server_response).map((key) => {
//          const item = server_response[key]
//          return {
//            key,
//            buy: parseFloat(item.ask),
//            sell: parseFloat(item.bid),
//          }
//        })
//      },
//      type_name: 'HITBTC_COM',
//    },
//    {
//      // Биржа coinmarketcap.com - не поддерживает CORS
//      api_path: '/v1/ticker',
//      host: 'https://api.coinmarketcap.com',
//      mode: 'cors',
//      service_name: 'coinmarketcap.com',
//      serializer: (server_response) => {
//       return server_response.map((item) => {
//         return {
//           key: `${item.symbol}BTC`,
//           buy: item.price_btc,
//           sell: item.price_btc,
//         }
//       })
//      },
//      type_name: 'COIN_MARKET_CAP',
//    },
//    {
//      // Биржа livecoin.net - не поддерживает CORS
//      api_path: '/exchange/ticker?cors=true',
//      host: 'https://api.livecoin.net',
//      service_name: 'livecoin.net',
//      serializer: (server_response) => {
//        return server_response.map((item) => {
//          return {
//            key: item.symbol.replace('/', '_'),
//            buy: item.min_ask,
//            sell: item.max_bid,
//          }
//        })
//      },
//      type_name: 'LIVECOIN_NET',
//    }
  ]
}
