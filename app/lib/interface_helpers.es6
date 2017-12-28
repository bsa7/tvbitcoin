module.exports = {
  // pretty outputs currency exchange rates
  pretty: (value = 0, symbol = '') => {
    return [parseFloat(value || '0'), symbol].join(' ')
  }
}
