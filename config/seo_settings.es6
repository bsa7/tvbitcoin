import constants from 'flux-constants'
import { domains } from './host_settings'
import { PAGE_TYPES } from '../app/constants/reused_strings'

const slugs_regexps = {
  // id объекта
  id: '[a-z0-9]+',
}

let path_settings = {
  // Все настройки роутинга здесь
  ROOT: {
    component_name: 'MainPage',
    type: [PAGE_TYPES.CATALOG],
    location: '/',
    domain: domains.MAIN,
  },
}

module.exports = {
  path_settings,
  slugs_regexps,
}
