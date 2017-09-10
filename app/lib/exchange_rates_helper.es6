module.exports = {
  prepare_exchange_rates: (exchange_rates) => {
    const stock_exchange_names = Object.keys(exchange_rates)
    let combined_by_instrument_data = {}
    stock_exchange_names.forEach((stock_exchange_name) => {
      const stock_exchange_instruments = exchange_rates[stock_exchange_name]
      stock_exchange_instruments.forEach((row) => {
        const instrument_name = row.key
        combined_by_instrument_data[instrument_name] = combined_by_instrument_data[instrument_name] || {}
        combined_by_instrument_data[instrument_name][stock_exchange_name] = {
          buy: row.buy,
          sell: row.sell,
        }
      })
    })
    let result = []
    Object.keys(combined_by_instrument_data).sort().forEach((instrument_name) => {
      let instrument_data = combined_by_instrument_data[instrument_name]
      instrument_data.key = instrument_name
      result.push(instrument_data)
    })
    return result
  }
}
