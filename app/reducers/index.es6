import { combineReducers } from 'redux'
import { environment_info } from './environment_data_reducers'
import { exchange_rates } from './exchange_rates_reducers'
import { shared_props } from './shared_reducers'

export default combineReducers({
  application: combineReducers({
    environment_info,
    exchange_rates,
    shared_props,
  }),
})
