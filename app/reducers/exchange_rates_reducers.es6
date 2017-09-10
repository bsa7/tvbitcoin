import types from '../constants/action_types'
import { api_settings } from '../../config/api_settings'
const moment = require('moment')

module.exports = {
  // Получение курсов валют из источника данных
  exchange_rates: (state = {}, action) => {
    let result = state
    if (new RegExp(`${types.CURRENCIES_SUCCESS}$`).test(action.type)) {
      const stock_exchange_name = action.type.replace(`_${types.CURRENCIES_SUCCESS}`, '')
      const api_setting = api_settings.find((api_setting) => {
        return api_setting.type_name == stock_exchange_name
      })
      let current_exchange_rates = api_setting.serializer(action.result)
      let rows_history = state.rows_history || []
      if (state.rows_history) {
        rows_history.unshift({
          timestamp: (new Date()).getTime(),
          stock_exchange_name,
          rows: current_exchange_rates,
        })
      }
      result = {
        ...state,
        rows_history,
        request_time: moment().format('DD.MM.YYYY HH:mm:ss')
      }
      if (!result.rows) result.rows = {}
      result.rows[stock_exchange_name] = current_exchange_rates
    } else if (new RegExp(`${types.CURRENCIES_ERROR}$`).test(action.type)) {
      console.log('Запрос к api - поиск курсов валют провален', action.type)
    }
    return result
  },
}
