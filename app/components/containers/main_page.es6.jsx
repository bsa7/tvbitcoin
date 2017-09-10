// Главная страница
import { bindActionCreators } from 'redux'
import { ExchangeRatesActions, SharedActions } from '../../actions'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { utils, restore_form_fields, store_form_fields } from '../../lib/utilities'
import { Button } from 'react-toolbox/lib/button'

class MainPage extends React.Component {
  static needs = [
    ExchangeRatesActions.get_exchange_rates,
  ]

  constructor(props) {
    super(props)
    this.actions = bindActionCreators([ExchangeRatesActions, SharedActions], props.dispatch)
  }

  render() {
    return (
      <div className='markup__column-start-center'>
        <div className='m_markup__content-wrapper'>
          <div className='markup__column-start-stretch markup__wrap-padding'>
            <h2 className="font-size-30 font-pt-regular">Тестовое задание</h2>
          </div>

          <div className='markup__column-start-stretch markup__wrap-padding'>
            {JSON.stringify(this.props.exchange_rates)}
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
    exchange_rates: app.exchange_rates || {},
  }
}

const mapDispatchToProps = (dispatch) => ({
  update_current: (hash) => dispatch(SharedActions.update_current(hash)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
