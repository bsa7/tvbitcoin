import types from '../constants/action_types'

module.exports = {
  // Получение курсов валют из источника данных
  exchange_rates: (state = {}, action) => {
    let result = state
    switch (action.type) {
    case types.CURRENCIES_REQUEST: {
      break
    }
    case types.CURRENCIES_SUCCESS: {
      result = {...state, ...action.result}
      break
    }
    case types.CURRENCIES_ERROR: {
      console.log('Запрос к api - поиск экспонатов провален')
      break
    }
    default: {
      break
    }}
    return result
  },
}
