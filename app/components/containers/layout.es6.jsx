// Представляет аналог файла layouts/application.html в Rails
import { AppBar } from 'react-toolbox/lib/app_bar'
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'
import { List, ListItem } from 'react-toolbox/lib/list'
import { Link } from 'react-router-dom'
import React from 'react'
import RootContainer from './root_container.es6.jsx'
import { path_settings, seo_link } from '../../../config/seo_settings'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='markup__wrapper'>
        <div className='markup__header'>
          <AppBar>
            <div className='markup__row-between-center full-width'>
              <div className='markup__row-start-center'>
                <h1 className='font-size-30 font-pt-regular'>Тестовое задание</h1>
              </div>
              <div className='markup__row-end-center'>
                <IconMenu className='white-color__icon' icon='more_vert' position='topRight' menuRipple>
                  <List>
                    <ListItem rightIcon='home'>
                      <Link className='black-color' to={seo_link(path_settings.ROOT)}>Монитор инструментов</Link>
                    </ListItem>
                    <ListItem rightIcon='settings'>
                      <Link className='black-color' to={seo_link(path_settings.SETTINGS)}>Настройки</Link>
                    </ListItem>
                  </List>
                </IconMenu>
              </div>
            </div>
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
