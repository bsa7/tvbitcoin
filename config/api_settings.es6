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
        return Object.keys(server_response).map((key) => {
          return {
            buy: server_response[key].buy,
            key: `BTC_${key.toUpperCase()}`,
            sell: server_response[key].sell
          }
          let row = action.result[key]
          row.key = key
          return row
        })
      },
      type_name: 'BLOCKCHAIN_INFO',
    },
    {
      // Биржа exmo.me
      api_path: '/v1/ticker',
      host: 'https://api.exmo.com',
      service_name: 'exmo.me',
      serializer: (server_response) => {
        return Object.keys(server_response).map((key) => {
          return {
            buy: parseFloat(server_response[key].buy_price),
            key,
            sell: parseFloat(server_response[key].sell_price),
          }
          let row = action.result[key]
          row.key = key
          return row
        })
      },
      type_name: 'EXMO_ME',
    },
  ]
}
