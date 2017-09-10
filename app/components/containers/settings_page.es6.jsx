// Страница настроек приложения
import React from 'react'
import PropTypes from 'prop-types'
import { MdlTable } from '../presentational/shared'
import { ExchangeRatesActions, SharedActions } from '../../actions'
import { connect } from 'react-redux'
import { utils, restore_form_fields, store_form_fields } from '../../lib/utilities'
import { api_settings } from '../../../config/api_settings'
import Slider from 'react-toolbox/lib/slider'

class SettingsPage extends React.Component {
  static needs = [
    ExchangeRatesActions.get_exchange_rates,
  ]

  constructor(props) {
    super(props)
    this.active_instrument_names = {}
    this.active_stock_exchange_names = {}
    this.active_row_indexes = this.active_row_indexes.bind(this)
    this.handle_select = this.handle_select.bind(this)
  }

  /**
  * Для настройки, сохранённой в props (в виде строк) возвращает массив из соответствуюзщих индексов
  */
  active_row_indexes = (settings_name) => {
    return this.props[settings_name].map((selected_row_name) => {
      return this[settings_name].data.findIndex((item) => {
        return item == selected_row_name
      })
    })
  }

  handle_interval_change = (value) => {
    this.props.update_current({
      refresh_data_interval: value,
    })
  }

  handle_select = (props, settings_name) => {
    let selected_rows = {}
    let selected_row_names = props.map((row_index) => {
      return this[settings_name].data[row_index]
    })
    selected_rows[settings_name] = selected_row_names
    this.props.update_current({ ...selected_rows })
  }

  render() {

    this.active_stock_exchange_names.model = [
      {
        formula: ({ row = '' }) => row,
        type: String,
        header: 'Наименование провайдера данных',
      }
    ]

    this.active_stock_exchange_names.data = Object.keys(api_settings).map((key) => {
      return api_settings[key].service_name
    })

    this.active_instrument_names.model = [
      {
        formula: ({ row = '' }) => row,
        type: String,
        header: 'Наименование инструмента',
      }
    ]

    this.active_instrument_names.data = {}
    Object.keys(this.props.exchange_rates).forEach((provider_key) => {
      // Если провайдер выбран пользователем, то мы предоставим выбор инструментов
      const api_setting = api_settings.find((item) => item.type_name == provider_key)
      if (this.props.active_stock_exchange_names.includes(api_setting.service_name)) {
        this.props.exchange_rates[provider_key].map((instrument_data) => {
          this.active_instrument_names.data[instrument_data.key] = true
        })
      }
    })
    this.active_instrument_names.data = Object.keys(this.active_instrument_names.data).sort()

    return (
      <div className='markup__column-start-center'>
        <div className='m_markup__content-wrapper'>
          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h2>Настройки приложения</h2>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h3>Активные / доступные провайдеры данных</h3>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <div className='data-table'>
              <MdlTable
                multiSelectable={true}
                onRowSelect={(props) => this.handle_select(props, 'active_stock_exchange_names')}
                onSelect={(props) => this.handle_select(props, 'active_stock_exchange_names')}
                selectable={true}
                selectedRows={this.active_row_indexes('active_stock_exchange_names')}
                tableData={this.active_stock_exchange_names.data}
                tableModel={this.active_stock_exchange_names.model}
              />
            </div>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h3>Активные / доступные инструменты</h3>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <div className='data-table'>
              <MdlTable
                multiSelectable={true}
                onRowSelect={(props) => this.handle_select(props, 'active_instrument_names')}
                onSelect={(props) => this.handle_select(props, 'active_instrument_names')}
                selectable={true}
                selectedRows={this.active_row_indexes('active_instrument_names')}
                tableData={this.active_instrument_names.data}
                tableModel={this.active_instrument_names.model}
              />
            </div>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h3>Интервал обновления: {(this.props.refresh_data_interval / 1000).toFixed(2)} секунд</h3>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <Slider
              max={60000}
              min={500}
              onChange={this.handle_interval_change}
              value={this.props.refresh_data_interval} />
          </div>
        </div>
      </div>
    )
  }
}

SettingsPage.propTypes = {
  active_stock_exchange_names: PropTypes.arrayOf(PropTypes.string),
  active_instrument_names: PropTypes.arrayOf(PropTypes.string),
  refresh_data_interval: PropTypes.number,
}

function mapStateToProps(state, ownProps) {
  const shared_props = (state.application || {}).shared_props || {}
  const exchange_rates = (state.application || {}).exchange_rates || {}
  const local_stored_active_stock_exchange_names = restore_form_fields({
    form_name: 'active_stock_exchange_names',
  })
  const local_stored_active_instrument_names = restore_form_fields({
    form_name: 'active_instrument_names',
  })
  const local_stored_refresh_data_interval = restore_form_fields({
    form_name: 'refresh_data_interval',
  })
  return {
    active_stock_exchange_names: shared_props.active_stock_exchange_names || local_stored_active_stock_exchange_names || [],
    active_instrument_names: shared_props.active_instrument_names || local_stored_active_instrument_names || [],
    exchange_rates: exchange_rates.rows || {},
    refresh_data_interval: shared_props.refresh_data_interval || local_stored_refresh_data_interval || 10000,
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => {
    Object.keys(hash).forEach((key) => {
      store_form_fields({
        form_name: key,
        form_fields: hash[key],
      })
    })
    dispatch(SharedActions.update_current(hash))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
