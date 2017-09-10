import { api_settings } from '../../config/api_settings'

module.exports = {
  prepare_exchange_rates: ({ data, active_instrument_names, active_stock_exchange_names }) => {
    const stock_exchange_keys = Object.keys(data)
    let combined_by_instrument_data = {}
    stock_exchange_keys.forEach((stock_exchange_key) => {
      const stock_exchange_name = Object.values(api_settings).find((api_setting) => {
        return api_setting.type_name == stock_exchange_key
      }).service_name
      if (active_stock_exchange_names.includes(stock_exchange_name)) {
        const stock_exchange_instruments = data[stock_exchange_key]
        stock_exchange_instruments.forEach((row) => {
          const instrument_name = row.key
          if (active_instrument_names.includes(instrument_name)) {
            combined_by_instrument_data[instrument_name] = combined_by_instrument_data[instrument_name] || {}
            combined_by_instrument_data[instrument_name][stock_exchange_name] = {
              buy: row.buy,
              sell: row.sell,
            }
          }
        })
      }
    })
    let result = []
    Object.keys(combined_by_instrument_data).sort().forEach((instrument_name) => {
      if (active_instrument_names.includes(instrument_name)) {
        let instrument_data = combined_by_instrument_data[instrument_name]
        instrument_data.key = instrument_name
        result.push(instrument_data)
      }
    })
    return result
  }
}
