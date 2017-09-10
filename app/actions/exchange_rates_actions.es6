// Экшены для списка объектов
import { api_settings } from '../../config/api_settings'
import types from '../constants/action_types'
import { utils } from '../lib/utilities'

module.exports = {
  // Инициирует запросы ко всем прописанным в api_settings биржам.
  // В итоге по каждой из бирж должен отработать отдельный редусер
  get_exchange_rates: (props = {}) => {
    const action_type_templates = [ types.CURRENCIES_REQUEST, types.CURRENCIES_SUCCESS, types.CURRENCIES_ERROR ]
    return api_settings.map((api_setting) => {
      const action_types = action_type_templates.map((action_type) => `${api_setting.type_name}_${action_type}`)
      return {
        types: action_types,
        promise: utils.fetch_json({
          api_host: api_setting.host,
          api_path: api_setting.api_path,
        })
      }
    })
  },
}
