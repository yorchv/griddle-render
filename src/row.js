import React from 'react';
import ColumnHelper from './utils/column-helper';
import { getStyleProperties } from './utils/styleHelper';

class Row extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    //TODO: Refactor this  -- the logic to show / hide columns is kind of rough
    //      Also, it seems that if we moved this operation to a store, it could be a bit faster
    let columns = [];
    const { columnProperties, ignoredColumns, tableProperties, rowData, events, rowIndex } = this.props;
    const { griddleKey } = rowData;
    //render just the columns that are contained in the metdata
    for (var column in rowData) {
      //get the additional properties defined in the creation of the object
      let columnProperty = ColumnHelper.getColumnPropertyObject(columnProperties, column);
      //render the column if there are no properties, there are properties and the column is in the collection OR there are properties and no column properties.

      if(ColumnHelper.isColumnVisible(column, {columnProperties, ignoredColumns: ignoredColumns || []})) {
        columns.push(<this.props.components.Column
          {...this.props}
          key={column}
          dataKey={column}
          value={rowData[column]}
          {...columnProperty} />);
      }
    }

    const { style, className } = getStyleProperties(this.props, 'row');
    return (
      <tr
        style={style}
        className={className}
        onMouseOver={this._handleHover}
        onClick={this._handleSelect}
        key={griddleKey}
      >
        {columns}
      </tr>
    );
  }

  _handleHover = (e) => {
    this.props.events.rowHover(this.props.rowIndex, this.props.rowData);
  }

  _handleSelect = (e) => {
    this.props.events.rowSelect(this.props.rowIndex, this.props.rowData);
  }
}

export default Row;
