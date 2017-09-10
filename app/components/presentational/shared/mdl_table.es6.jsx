import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table'
import PropTypes from 'prop-types'
import React from 'react'
import { SharedActions } from '../../../actions'
import { connect } from 'react-redux'
import { utils } from '../../../lib/utilities'

class MdlTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Table
        multiSelectable={this.props.multiSelectable}
        selectable={this.props.selectable}
        onSelect={this.props.onSelect}
        onRowSelect={this.props.onRowSelect} >
        <TableHead>
          {
            this.props.tableModel.map((column, index) => (
              <TableCell key={index}>{column.header}</TableCell>
            ))
          }
        </TableHead>
        {
          this.props.tableData.map((row, row_index) => (
            <TableRow
              key={row_index}
              selected={(this.props.selectedRows || []).includes(row_index)}
              >
              {
                this.props.tableModel.map((column, column_index) => (
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
  multiSelectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
  onSelect: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.Number),
  tableData: PropTypes.arrayOf(PropTypes.object),
  tableModel: PropTypes.arrayOf(PropTypes.object),
}

module.exports = {
  MdlTable,
}
