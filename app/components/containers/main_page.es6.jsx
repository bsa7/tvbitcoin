// Главная страница
import { bindActionCreators } from 'redux'
import { ExchangeRatesActions, SharedActions } from '../../actions'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { utils, restore_form_fields } from '../../lib/utilities'
import { Button } from 'react-toolbox/lib/button'
import { MdlTable } from '../presentational/shared'
import { pretty } from '../../lib/interface_helpers'
import { api_settings } from '../../../config/api_settings'
import { prepare_exchange_rates } from '../../lib/exchange_rates_helper'

class MainPage extends React.Component {
  static needs = [
    ExchangeRatesActions.get_exchange_rates,
  ]

  constructor(props) {
    super(props)
    this.actions = bindActionCreators([ExchangeRatesActions, SharedActions], props.dispatch)
  }

  componentDidMount() {
    this.get_exchange_rates_interval = setInterval(() => {
      this.props.update_exchange_rates()
    }, this.props.refresh_data_interval)
  }

  componentWillUnmount () {
    clearInterval(this.get_exchange_rates_interval)
  }

  render() {
    let exchange_rates_table_model = [
      {
        formula: ({ row = {} }) => row.key.replace('_', ' / '),
        type: String,
        header: 'Наименование инструмента'
      }
    ]
    api_settings.forEach((api_setting) => {
      if (this.props.active_stock_exchange_names.includes(api_setting.service_name)) {
        exchange_rates_table_model.push({
          formula: ({ row = {} }) => pretty((row[api_setting.service_name] || {}).buy),
          type: String,
          class: 'numeric',
          header: `${api_setting.service_name} - Покупка`,
        })
        exchange_rates_table_model.push({
          formula: ({ row = {} }) => pretty((row[api_setting.service_name] || {}).sell),
          type: String,
          class: 'numeric',
          header: `${api_setting.service_name} - Продажа`,
        })
      }
    })

    return (
      <div className='markup__column-start-center'>
        <div className='m_markup__content-wrapper'>
          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h2>Курсы основных валют по отношению к BTC на {this.props.last_request_time}</h2>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <div className='data-table'>
              <MdlTable
                multiSelectable={false}
                selectable={false}
                tableData={prepare_exchange_rates({
                  data: this.props.exchange_rates,
                  active_instrument_names: this.props.active_instrument_names,
                  active_stock_exchange_names: this.props.active_stock_exchange_names,
                })}
                tableModel={exchange_rates_table_model}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MainPage.propTypes = {
  exchange_rates: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const app = state.application || {}
  const active_stock_exchange_names = restore_form_fields({
    form_name: 'active_stock_exchange_names',
  })
  const active_instrument_names = restore_form_fields({
    form_name: 'active_instrument_names',
  })
  const refresh_data_interval = restore_form_fields({
    form_name: 'refresh_data_interval',
  })
  return {
    exchange_rates: (app.exchange_rates || {}).rows || {},
    last_request_time: (app.exchange_rates || {}).request_time,
    active_stock_exchange_names,
    active_instrument_names,
    refresh_data_interval,
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => dispatch(SharedActions.update_current(hash)),
  update_exchange_rates: () => dispatch(ExchangeRatesActions.get_exchange_rates()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
