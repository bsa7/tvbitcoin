import constants from 'flux-constants'

export default constants([
  'CURRENCIES_ERROR',                           // Запрос валютных пар потерпел крах
  'CURRENCIES_REQUEST',                         // Запрос валютных пар инициирован
  'CURRENCIES_SUCCESS',                         // Запрос валютных пар успешно выполнен (получены данные)
  'UPDATE_SHARED_PROPS',                        // Обновление общего раздела shared_props
  'URI_INFO_SUCCESS',                           // Сохранить инфу об урл
])
