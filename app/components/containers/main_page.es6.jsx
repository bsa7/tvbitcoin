// Главная страница
import { bindActionCreators } from 'redux'
import { ExchangeRatesActions, SharedActions } from '../../actions'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { utils, restore_form_fields, store_form_fields } from '../../lib/utilities'
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
    }, 10000)
  }

  componentWillUnmount () {
    clearInterval(this.get_exchange_rates_interval)
  }

  render() {
    let exchange_rates_table_markup = [
      {
        formula: ({ row = {} }) => row.key.replace('_', ' / '),
        type: String,
        header: 'Наименование инструмента'
      }
    ]
    api_settings.forEach((api_setting) => {
      const stock_exchange_name =
      exchange_rates_table_markup.push({
        formula: ({ row = {} }) => pretty((row[api_setting.type_name] || {}).buy),
        type: String,
        class: 'numeric',
        header: `${api_setting.service_name} - Покупка`,
      })
      exchange_rates_table_markup.push({
        formula: ({ row = {} }) => pretty((row[api_setting.type_name] || {}).sell),
        type: String,
        class: 'numeric',
        header: `${api_setting.service_name} - Продажа`,
      })
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
                table_data={prepare_exchange_rates(this.props.exchange_rates)}
                table_model={exchange_rates_table_markup}
              />
            </div>
          </div>

          <Button label="Hello World!" />
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
  return {
    exchange_rates: (app.exchange_rates || {}).rows || {},
    last_request_time: (app.exchange_rates || {}).request_time,
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => dispatch(SharedActions.update_current(hash)),
  update_exchange_rates: () => dispatch(ExchangeRatesActions.get_exchange_rates()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
