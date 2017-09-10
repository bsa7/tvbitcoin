// Представляет аналог файла layouts/application.html в Rails
import { AppBar } from 'react-toolbox/lib/app_bar'
import React from 'react'
import RootContainer from './root_container.es6.jsx'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className='markup__wrapper'>
          <div className='markup__header'>
            <AppBar>
              <h1 className="font-size-30 font-pt-regular">Тестовое задание</h1>
            </AppBar>
          </div>
          <div className='markup__content'>
            {
              this.props.children
              ?
              this.props.children
              :
              <RootContainer />
            }
          </div>
        </div>
    )
  }
}

export default Layout
