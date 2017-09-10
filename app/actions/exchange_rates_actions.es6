// Экшены для списка объектов
import types from '../constants/action_types'
import { utils } from '../lib/utilities'

// Поиск объектов в соответствии с выбранными параметрами отбора (фильтры)
module.exports = {
  get_exchange_rates: (props = {}) => {
    let api_path = '/ticker?cors=true'
    return {
      types: [ types.CURRENCIES_REQUEST, types.CURRENCIES_SUCCESS, types.CURRENCIES_ERROR ],
      promise: utils.fetch_json({
        api_path,
        params: props
      })
    }
  },
}
