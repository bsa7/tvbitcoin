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

class MainPage extends React.Component {
  static needs = [
    ExchangeRatesActions.get_exchange_rates,
  ]

  constructor(props) {
    super(props)
    this.actions = bindActionCreators([ExchangeRatesActions, SharedActions], props.dispatch)
  }

  render() {
    const exchange_rates_table_markup = [
      {
        formula: ({ row }) => `${row.key}/BTC`,
        type: String,
        header: 'Наименование пары'
      }, {
        formula: ({ row }) => pretty(row.last, row.symbol),
        type: String,
        class: 'numeric',
        header: 'Текущий курс',
      }, {
        formula: ({ row }) => pretty(row.buy, row.symbol),
        type: String,
        class: 'numeric',
        header: 'Покупка',
      }, {
        formula: ({ row }) => pretty(row.sell, row.symbol),
        type: String,
        class: 'numeric',
        header: 'Продажа',
      },
    ]

    return (
      <div className='markup__column-start-center'>
        <div className='m_markup__content-wrapper'>
          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h2 className="font-size-30 font-pt-regular">Тестовое задание</h2>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            <MdlTable
              table_data={this.props.exchange_rates}
              table_model={exchange_rates_table_markup}
            />
          </div>

          <Button label="Hello World!" />
        </div>
      </div>
    )
  }
}

MainPage.propTypes = {
  exchange_rates: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const app = state.application || {}
  return {
    exchange_rates: (app.exchange_rates || {}).rows || [],
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => dispatch(SharedActions.update_current(hash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
