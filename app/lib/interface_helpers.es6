module.exports = {
  // pretty outputs currency exchange rates
  pretty: (value = 0, symbol = '') => {
    return [(value || 0).toFixed(2), symbol].join(' ')
  }
}
