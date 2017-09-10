import React from 'react'
import PropTypes from 'prop-types'
import { RealtyObjectPropTypes } from './realty_object_prop_types'

module.exports = {
  CatalogPagePropTypes: {
    dispatch: PropTypes.func,
    filters: PropTypes.arrayOf(
      PropTypes.shape({})
    ),
    hostname: PropTypes.string,
    paging_object_count: PropTypes.shape({
      objects_count: PropTypes.number,
      page_count: PropTypes.number,
    }),
    params: PropTypes.shape({}),
    realty_objects: PropTypes.arrayOf(RealtyObjectPropTypes).isRequired,
    routes: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
  }
}
