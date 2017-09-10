// Страница настроек приложения
import React from 'react'
import PropTypes from 'prop-types'
import { SharedActions } from '../../actions'
import { connect } from 'react-redux'
import { utils, restore_form_fields, store_form_fields } from '../../lib/utilities'
import { api_settings } from '../../../config/api_settings'

class SettingsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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
            <h3>Активные / доступные инструменты</h3>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h3>Интервал обновления, секунд</h3>
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
  return {
    active_stock_exchange_names: shared_props.active_stock_exchange_names || [],
    active_instrument_names: shared_props.active_instrument_names || [],
    refresh_data_interval: shared_props.refresh_data_interval || 1000,
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => dispatch(SharedActions.update_current(hash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
