import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import PropTypes from 'prop-types'
import React from 'react'

class MdlTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Table multiSelectable onRowSelect={this.handleRowSelect}>
        <TableHead>
          {
            this.props.table_model.map((column, index) => (
              <TableCell key={index}>{column.header}</TableCell>
            ))
          }
        </TableHead>
        {
          this.props.table_data.map((row, row_index) => (
            <TableRow key={row_index} >
              {
                this.props.table_model.map((column, column_index) => (
                  <TableCell
                    className={column.class}
                    key={column_index + 1}
                    >
                    {
                      column.formula({ row })
                    }
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </Table>
    )
  }
}

MdlTable.PropTypes = {
  table_data: PropTypes.arrayOf(PropTypes.object),
  table_model: PropTypes.arrayOf(PropTypes.object),
}

module.exports = {
  MdlTable,
}
