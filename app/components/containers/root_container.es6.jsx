// Главная страница
import MainPage from './main_page.es6'
import React from 'react'

class RootContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <MainPage />
    )
  }
}

export default RootContainer
